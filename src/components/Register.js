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
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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
            console.log(res)
        })
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal text-center">
                                Registro de usuarios
                            </h1>
                            <div className="form-group">
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
                            <div className="form-group">
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
                            <div className="form-group">
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
                            <div className="form-group">
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
                            <button
                                type="submit"
                                className="btn btn-lg btn-info btn-block"
                            >
                                Registrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
