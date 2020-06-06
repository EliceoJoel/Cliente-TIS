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
            userID:{}
        }

        this.onChange = this.onChange.bind(this)
        this.register = this.register.bind(this)
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
            idRol:-1,
        }
        register(newUser)
    }

    render () {
        return (
            <div>
            <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white rounded">
                        Registro de usuarios
            </h1>
                <form onSubmit={this.register}>
                    <div className="row mt-5">
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
                    <button
                            className="btn btn-info mt-2 mb-5"
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
