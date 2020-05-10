import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import{Modal, Button} from 'react-bootstrap'



class Landing extends Component {

  constructor(props) {
    super(props)
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
            <nav className="navbar navbar-dark bg-dark">
              <a className="navbar-brand" href="/">
                AConv
              </a>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item px-2" onClick={()=>this.setState({showLogin:true})}>
                  <Link to="/" className="nav-link">
                    Iniciar Sesión
                  </Link>
                </li>
              </ul>
            </nav>         
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button
                  className="navbar-toggler navbar-toggler-left"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbar"
                  aria-controls="navbar"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                {this.state.showInicialItem?
                  <div className="collapse navbar-collapse justify-content-md-center" id="navbar">
                    {this.navItems()}
                    {//loginRegLink}
                    }
                  </div>
                :null
                }   
              </nav>
            
              <Modal
              show = {this.state.showLogin}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              >
              <Modal.Header>
                <Modal.Title id="Iniciar Sesión">
                </Modal.Title>
              </Modal.Header>
                <Modal.Body>
                            <form>
                                <div className="h3 text-center mb-5">
                                  Iniciar Sesión
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
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" size="lg" onClick={()=>this.setState({showLogin:false})}  block>Cerrar</Button>
                </Modal.Footer>
              </Modal> 
              
            
        </div>
    )
  }

  navItems() {
    return (
      <ul className="navbar-nav">
        <li className="nav-item" onClick={()=>this.setState({showLogin:false})}>
          <Link to="/list" className="nav-link">
            Lista de convocatorias
          </Link>
        </li>
        <li className="nav-item" onClick={()=>this.setState({showLogin:false})}>
          <Link to="/Generate_Rotulado" className="nav-link">
            Generar Rotulado
          </Link>
        </li>
      </ul>
    )
 }  
}

export default withRouter(Landing)
