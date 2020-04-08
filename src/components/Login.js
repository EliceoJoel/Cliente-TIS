import React, { Component } from 'react'
import { login } from './UserFunctions'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            user: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const user = {
            user: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if (res) {
                this.props.history.push(`/profile`)
            }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto d-flex justify-content-center">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="mt-3 p-3 bg-info text-white">
                                <h1 className="h3 font-weight-normal text-center">
                                    Ingresar a mi cuenta
                                </h1>
                            </div>
                            <div className="my-4 text-info text-center">
                                <h4>
                                   ¡Esta seccion solo es de acceso para los usuarios administradores!
                                </h4>
                            </div>
                            <div className="form-group">
                                <label htmlFor="user">Usuario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="user"
                                    placeholder="Ingrese su usuario"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                <i className="fa fa-eye password-icon"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="ingrese su contraseña"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-info btn-block mt-4"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login