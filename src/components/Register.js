import React, { Component } from 'react'
import { register } from './UserFunctions'
import Select from 'react-select'
import {getAnnouncement} from './UserFunctions'

var conv = []
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
            convocatoria:'',
            convocatoria_temp: '',
            rol_temp: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit (e) {
        e.preventDefault()

        const newUser = {
            fullname: this.state.first_name + ' ' + this.state.last_name,
            user: this.state.user,
            password: this.state.password,
            idRol:1,
            idAnnouncement:1
        }

        register(newUser).then(res => {
            this.props.history.push(`/login`)
        })
    }

    render () {
        return (
            <div>
            <h1 className="h3 mb-3 font-weight-normal text-center">
                        Registro de usuarios
            </h1>
                <form>
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
                    <div className="form-group col-md-6">
                        <label htmlFor="Nombre">Selecciona una convocatoria</label>
                        <Select
                        name="conv"
                        options={conv}
                        onChange={(e) => this.setState({convocatoria_temp:e})}
                        placeholder=""
                        className="basic-select"
                        classNamePrefix="select"
                        />
                        <label htmlFor="Nombre">{this.state.convocatoria.label}</label>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="Nombre">Selecciona un rol</label>
                        <Select
                        name="conv"
                        options={conv}
                        onChange={(e) => this.setState({rol_temp:e})}
                        placeholder=""
                        className="basic-select"
                        classNamePrefix="select"
                        />
                        <label htmlFor="Nombre">{this.state.rol.label}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-md-6">
                        <button type="button" class="col btn btn-info mt-2" onClick={() => this.selectConv()}>seleccionar convocatoria</button>
                    </div>
                    <div className="form-group col-md-6">
                        <button type="button" class="col btn btn-info mt-2" onClick={() => this.selectRol()}>seleccionar rol</button>
                    </div>
                </div>


                    <button
                        type="submit"
                        className="btn btn-lg btn-info btn-block"
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
        console.log(this.state.rol)
    }
    
    selectConv(){
        var convocatorias = this.state.convocatoria_temp;
        this.setState({convocatoria:convocatorias})
    }
}


export default Register
