import React, { Component } from 'react'
import { register } from './UserFunctions'


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
            userID:{},
            message:'',
        }

        this.onChange = this.onChange.bind(this)
        this.ChangeName = this.ChangeName.bind(this)
        this.register = this.register.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    async ChangeName (e) {
        this.setState({message:""})
        await this.setState({ [e.target.name]: e.target.value })
        let a = this.state.first_name + this.state.last_name
        a = a.replace(/\s/g, '') ;
        this.setState({user:a})
    }
    register(e) {
        this.setState({first_name:"", last_name:"", user:"", password:"", message:""})
        console.log(this.state.first_name + ' ' + this.state.last_name)
        console.log(this.state.user)
        console.log(this.state.password)
        console.log(this.state.rol.id)
        var newUser = {
            fullname: this.state.first_name + ' ' + this.state.last_name,
            user: this.state.user,
            password: this.state.password,
            idRol:-1,
        }
        register(newUser)
        .then(this.setState({message:'datos guardado'}))
    }

    render () {
        return (
            <div>
            <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white rounded">
                        Registro de usuarios
            </h1>
                <formdata>
                    <div className="row mt-5">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Nombres</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                placeholder="Ingrese su nombre o nombres"
                                value={this.state.first_name}
                                onChange={this.ChangeName}
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
                                onChange={this.ChangeName}
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
                    <p style={{color:"green"}} className="mt-2"><b>{this.state.message}</b></p>
                    <button className="btn btn-info mt-2 mb-5" onClick={(e) => this.register(e)}>
                        guardar datos
                    </button>
                </formdata>
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
