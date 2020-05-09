import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'



class Landing extends Component {

  constructor() {
    super()
    this.state = {
        user: '',
        password: '',
        userError: '',
        passwordError: '',
        showLogin:false,
        showInicialItem:true,
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

  hide(){
    this.setState({showLogin:false})
  }

  show(){
    this.setState({showLogin:true})
  }
  
  onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
      this.setState({userError:'', passwordError:''})
  }
  onSubmit(e) {
      e.preventDefault()
      if(this.valid()){
      console.log("entra")
      }
  }


  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Admin
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Generate_Rotulado" className="nav-link">
            Generar Rotulado
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/list" className="nav-link">
            Lista de convocatorias
          </Link>
        </li>
        <li className = "nav-item">
          <Link to ="/Post" className= "nav-link">
            Publicar Convocatoria
          </Link>
        </li>
        <li className = "nav-item">
          <Link to ="/auxiliary_list" className= "nav-link">
            lista de postulantes de auxiliatura
          </Link>
        </li>
        <li className = "nav-item">
          <Link to ="/scores_list" className= "nav-link">
            lista de notas
          </Link>
        </li>
        <li>
          <Link to ="/enabled_list" className= "nav-link">
            Lista de Habilitados/Inhabilitados
          </Link>
        </li>
        <li className = "nav-item">
          <Link to ="/postulant_register" className= "nav-link">
            Registrar postulante
          </Link>
        </li>
       <li>  
          <Link to ="/PostulantEnable" className= "nav-link">
            Habilitar Postulante
          </Link>
        </li>
        <li className = "nav-item">
          <Link to ="/RegisterDate" className= "nav-link">
            Registrar Fecha
          </Link>
        </li>

        
      </ul>
    )


    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href=" " onClick="" className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    )

    return (
        <div>          
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarsExample10"
                  aria-controls="navbarsExample10"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                {this.state.showInicialItem?
                  <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample10">
                    {this.navItems()}
                    {//loginRegLink}
                    }
                  </div>
                :null
                }   
              </nav>
            {this.state.showLogin?
              <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto d-flex justify-content-center">
                        <form noValidate>
                            <div className="mt-3 p-3 bg-info text-white">
                                <h1 className="h3 font-weight-normal text-center">
                                    Ingresar a mi cuenta
                                </h1>
                            </div>
                            <div className="my-4 text-info text-center">
                                <h4>
                                   ¡Esta seccion solo es de acceso para los usuarios autorizados!
                                </h4>
                            </div>
                            <div className="form-group">
                                <label htmlFor="user">Usuario</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="user"
                                    placeholder="Ingrese su usuario"
                                    maxLength="50"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                <p style={{color:"red"}}>{this.state.userError}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="ingrese su contraseña"
                                    maxLength="60"
                                    autocomplete="on"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                <p style={{color:"red"}}>{this.state.passwordError}</p>
                            </div>
                            <button
                                type="button"
                                onClick={this.onSubmit}
                                className="btn btn-lg btn-info btn-block mt-4"
                            >
                                Iniciar sesión
                            </button>
                        </form>
                    </div>
                </div>
              </div>
              :null
            }
        </div>
    )
  }

  navItems() {
    return (
      <ul className="navbar-nav">
        <li className="nav-item" onClick={()=>this.show()}>
          <Link to="/" className="nav-link">
            Iniciar Sesión
          </Link>
        </li>
        <li className="nav-item" onClick={()=>this.hide()}>
          <Link to="/list" className="nav-link">
            Lista de convocatorias
          </Link>
        </li>
        <li className="nav-item" onClick={()=>this.hide()}>
          <Link to="/Generate_Rotulado" className="nav-link">
            Generar Rotulado
          </Link>
        </li>
      </ul>
    )
 }  

}



export default withRouter(Landing)
