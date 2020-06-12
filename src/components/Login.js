import React, { Component } from 'react'
import axios from 'axios'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            password: '',
            userError: '',
            passwordError: '',
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    valid(){
        if(this.state.user === ''){
            this.setState({userError:'Campo vacio'})
          }
          else if(this.state.password === ''){
            this.setState({passwordError:'Campo vacio'})
          }
          else{
            return true;
          }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        this.setState({passwordError:""})
        this.setState({userError:""})
    }
    onSubmit(e) {
        e.preventDefault()

        if(this.valid()){
            const user = {
                user: this.state.user,
                password: this.state.password
            }
    
            axios
            .post(
            'api/login',
                {
                    user: user.user,
                    password: user.password
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            .then(response => {
                localStorage.setItem('usertoken', response.data.token)
                this.props.history.push(`/`)
                window.location.reload()
                return response.data.token
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    userError:"Usuario incorrecto",
                    passwordError:"Contraseña incorrecta"
                })
            })
        }
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal text-center">
                                Inicio de sesión
                            </h1>
                            <div className="form-group">
                                <label htmlFor="user">Nombre de usuario</label>
                                <input
                                    type="text"
                                    className="form-control shadow"
                                    name="user"
                                    placeholder="Ingrese su nombre de usuario"
                                    maxLength="50"
                                    value={this.state.user}
                                    onChange={this.onChange}
                                />
                                <p style={{color:"red"}}>{this.state.userError}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control shadow"
                                    name="password"
                                    placeholder="Ingrese su contraseña"
                                    autoComplete="on"
                                    maxLength="50"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                <p style={{color:"red"}}>{this.state.passwordError}</p>
                            </div>
                            <button
                                type="submit"
                                className="shadow btn btn-info btn-block mt-5"
                            >
                                Iniciar sesión
                            </button>
                        </form>
                    </div>
                </div>
            </div> 
        )   
    }
}


export default Login
