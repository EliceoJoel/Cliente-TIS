import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import{Modal, Button} from 'react-bootstrap'
import {getUser} from './UserFunctions'
import {updateUser} from './UserFunctions'

var Users
var permissions = [
  {
    "id": 1,
    "idRol": 1,
    "permission": "Registrar postulante",
    "route":"postulant_register",
    "created_at": "2020-05-09 18:43:53",
    "updated_at": "2020-05-09 18:43:53"
  },
  {
    "id": 2,
    "idRol": 1,
    "permission": "Publicar Convocatoria",
    "route":"Post",
    "created_at": "2020-05-09 18:43:53",
    "updated_at": "2020-05-09 18:43:53"
  },
  {
    "id": 3,
    "idRol": 1,
    "permission": "Lista de habilitados e inhabilitados",
    "route":"enabled_list",
    "created_at": "2020-05-09 18:43:53",
    "updated_at": "2020-05-09 18:43:53"
  }
]

class Landing extends Component {

  constructor(props) {
    super(props)
    this.state = {
        UserLogged: null,
        user: '',
        password: '',
        userError: '',
        passwordError: '',
        userNotExist:'',
        showLogin:false,
        showInicialItem:true,
        showItems:false,
        showLogout:false,
        showSesionLink:this.isLogged(),
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  //fill users
  componentDidMount() {
    getUser().then(res => {
        Users = res
        //console.log(Users)
    })
  }

  isLogged(){
    var result=true
    getUser().then(res =>{
      for(var i=0; i<res.length; i++){
        if(res[i].logged === true){
          result = false
          this.setState({UserLogged:res[i]}, this.fillPermission(res[i]))
          this.setState({showSesionLink:false})
          this.setState({showInicialItem:false})
          this.setState({showItems:true})
          this.setState({showLogout:true})
        }
      }
    })
    return result
  }

  fillPermission(us){
    console.log(us)
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

  isUser(){
    var result = false
      for (var i=0; i < Users.length; i++) {
          if(Users[i].user === this.state.user && Users[i].password === this.state.password){
            this.setState({UserLogged:Users[i]}, this.editUserLog(Users[i], true))
            result = true
          }
        }
    return result
  }

  editUserLog(us, value){
    const userUpdate = {
      id: us.id,
      logged: value
    }
    updateUser(userUpdate).then(res => {
      this.props.history.push(`/`)
   })
  }

  LogoutSesion(){
    this.setState({showInicialItem:true, showItems:false, showSesionLink:true, showLogout:false})
    this.editUserLog(this.state.UserLogged, false)
  }
  
  onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
      this.setState({userError:'', passwordError:'', userNotExist:''})
  }
  onSubmit(e) {
      e.preventDefault()
      
      this.setState({password:""})
      if(this.valid()){
        if(this.isUser()){
          this.setState({showLogin:false, showInicialItem:false, showItems:true, showLogout:true, showSesionLink:false})
        }else{
          this.setState({userError:"Usuario incorrecto", passwordError:"Contraseña incorrecta"})
        }
      }
  }

  render() {
    return (
        <div> 
            <nav className="navbar navbar-dark bg-dark">
              <a className="navbar-brand" href="/">
                <img src="http://127.0.0.1:8000/storage/file/icon.svg" width="30" height="30" className="d-inline-block align-top mr-2" alt=""/>
                AConv
              </a>
              {this.state.showSesionLink?
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item px-2" onClick={()=>this.setState({showLogin:true})}>
                    <Link to="/" className="nav-link">
                      Iniciar Sesión
                    </Link>
                  </li>
                </ul>
              :null
              }
              {this.state.showLogout?
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item px-2" onClick={() => this.LogoutSesion()}>
                    <Link to="/" className="nav-link">
                      Cerrar Sesion
                    </Link>
                  </li>
                </ul>
              :null
              }
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
                  </div>
                :null
                }
                {this.state.showItems?
                  <div className="collapse navbar-collapse justify-content-md-center" id="navbar">
                    <ul className="navbar-nav">
                    {permissions.map( permission =>(
                      <li className="nav-item" key= {permission.id} onClick={()=>this.setState({showLogin:false})}>
                        <Link to={{ pathname: permission.route, state: {UserLogged:this.state.UserLogged}}} className="nav-link">
                          {permission.permission}
                        </Link>
                      </li>
                    ))}
                    </ul>
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
                  <Button variant="danger" size="lg" onClick={()=>this.setState({showLogin:false, userError:'', passwordError:'', user:'', password:''})}  block>Cerrar</Button>
                </Modal.Footer>
              </Modal> 
              
            
        </div>
    )
  }

  navItems() {
    return (
      <ul className="navbar-nav">
        <li className="nav-item" onClick={()=>this.setState({showLogin:false})}>
          <Link to="list" className="nav-link">
            Lista de convocatorias
          </Link>
        </li>
        <li className="nav-item" onClick={()=>this.setState({showLogin:false})}>
          <Link to="Generate_Rotulado" className="nav-link">
            Generar Rotulado
          </Link>
        </li>
      </ul>
    )
 }  
}

export default withRouter(Landing)
