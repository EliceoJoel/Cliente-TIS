import React, { Component } from 'react'
import { register } from './UserFunctions'
import Select from 'react-select'
import {getAnnouncement} from './UserFunctions'
import {getRol} from './UserFunctions'
import {saveAnnouncement} from './UserFunctions'

var conv = []
var rol = []
class Register extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            user: '',
            password: '',
            errors: {},
            rol:'',
            convocatoria:[],
            convocatoria_temp: '',
            rol_temp: '',
            userID:{}
        }

        this.onChange = this.onChange.bind(this)
        this.register = this.register.bind(this)
    }

    componentDidMount() {
        getAnnouncement().then(res => {
            for (var i=0; i < res.length; i++) {
                var object = {}
                object.id = res[i].id
                object.label = res[i].name
                conv[i] = object
              }
        })

        getRol().then(roles => {
            for (var i=0; i < roles.length; i++) {
                var object = {}
                object.id = roles[i].id
                object.label = roles[i].rol
                rol[i] = object
              }
        })
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    register(e) {
        e.preventDefault()
        console.log(this.state.first_name + ' ' + this.state.last_name)
        console.log(this.state.user)
        console.log(this.state.password)
        console.log(this.state.rol.id)
        var newUser = {
            fullname: this.state.first_name + ' ' + this.state.last_name,
            user: this.state.user,
            password: this.state.password,
            idRol:this.state.rol.id,
        }
        register(newUser).then(res => {
                console.log(res.user.id)
                this.setState({userID:res.user.id})
                console.log(this.state.userID)
                for(var i =0; i<this.state.convocatoria.length; i++){
                    var announcement = {
                        idAnnouncement:this.state.convocatoria[i].id,
                        idUser:this.state.userID
                    }
                    saveAnnouncement(announcement);
                }
            }
        )
    }

    render () {
        return (
            <div>
            <h1 className="h3 mb-3 font-weight-normal text-center">
                        Registro de usuarios
            </h1>
                <form onSubmit={this.register}>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Nombres</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                placeholder="Ingrese su nombre o nombres"
                                value={this.state.first_name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Apellidos</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                placeholder="Ingrese su apellido o apellidos"
                                value={this.state.last_name}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="user">Nombre de usuario</label>
                            <input
                                type="user"
                                className="form-control"
                                name="user"
                                placeholder="Ingresa el nombre de ususario"
                                value={this.state.user}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Ingresa su contraseña"
                                autoComplete="on"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6 text-center">
                            <label htmlFor="Nombre">Selecciona una convocatoria</label>
                            <Select
                            name="conv"
                            options={conv}
                            onChange={(e) => this.setState({convocatoria_temp:e})}
                            placeholder=""
                            className="basic-select"
                            classNamePrefix="select"
                            />
                            <br/>
                            {this.state.convocatoria.map( convocatoria => (
                                <h5 htmlFor="Nombre">{convocatoria.label}</h5>
                        ))}
                        </div>
    
                        <div className="form-group col-md-6 text-center">
                            <label htmlFor="Nombre">Selecciona un rol</label>
                            <Select
                            name="rol"
                            options={rol}
                            onChange={(e) => this.setState({rol_temp:e})}
                            placeholder=""
                            className="basic-select"
                            classNamePrefix="select"
                            />
                            
                            <h5 htmlFor="Nombre">{this.state.rol.label}</h5>
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="form-group col-md-6">
                            <button type="button" className="col btn btn-info mt-2" onClick={() => this.selectConv()}>seleccionar convocatoria</button>
                        </div>
                        <div className="form-group col-md-6">
                            <button type="button" className="col btn btn-info mt-2" onClick={() => this.selectRol()}>seleccionar rol</button>
                        </div>
                    </div>
                    <button
                            className="btn btn-lg btn-info btn-block"
                            type= "submit"
                        >
                            Registrar
                    </button>
                </form>
            </div>
        )
    }

    selectRol(){
        var roles = this.state.rol_temp;
        this.setState({rol:roles})
    }
    
    selectConv(){
        var convocatorias = this.state.convocatoria;
        convocatorias.push(this.state.convocatoria_temp)
        this.setState({convocatoria:convocatorias})
        console.log(this.state.convocatoria)
    }
}


export default Register
