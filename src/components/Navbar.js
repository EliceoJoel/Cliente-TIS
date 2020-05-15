import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {getPermissions} from './UserFunctions'
import { getProfile } from './UserFunctions'


class Landing extends Component {
  constructor() {
      super()
      this.state = {
          items:[]
      }
  }

  componentDidMount() {
    if(localStorage.usertoken){
      getProfile().then(res => {
        getPermissions(res.user.idRol).then(permissions =>{
          this.setState({
            items: permissions
          })
        })
      })
    }
  }

  
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }


  render() {
    const loginLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item px-2">
          <Link to="/login" className="nav-link">
            Iniciar sesión
          </Link>
        </li>
<<<<<<< HEAD
      </ul>
    )
=======
        <li className = "nav-item">
          <Link to ="/ScoreSetup" className= "nav-link">
            Configuracion Notas
          </Link>
        </li>
        <li className = "nav-item">
          <Link to ="/AnnouncementSetup" className= "nav-link">
            Configuracion Convocatoria
          </Link>
        </li>
>>>>>>> ya envia datos a la db scoresetup

    const logoutLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item px-2">
          <a href="/" onClick={this.logOut.bind(this)} className="nav-link">
            Cerrar sesión
          </a>
        </li>
      </ul>
    )

    const noUserLinks = (
      <ul className="navbar-nav">
        <li className="nav-item ml-auto px-2">
          <Link to="Generar.rotulado" className="nav-link">
            Generar rotulado
          </Link>
        </li>
        <li className="nav-item ml-auto px-2">
          <Link to="Convocatorias" className="nav-link">
            Convocatorias
          </Link>
        </li>
      </ul>  
    )    

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <img src="/storage/file/icon.svg" width="30" height="30" className="d-inline-block align-top mr-2" alt="" />
              AConv
            </a>
          {localStorage.usertoken ? logoutLink : loginLink}
        </nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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

          <div
            className="collapse navbar-collapse justify-content-md-center"
            id="navbarsExample10"
          >
            {localStorage.usertoken ? this.state.items.map(item=>(
              <ul className="navbar-nav" key={item.id}>
                <li className="nav-item">
                  <Link to={item.route} className="nav-link">
                    {item.permission}
                  </Link>
                </li>
              </ul> 
            )) : noUserLinks}
            
          </div>
        </nav>
      </div>
    )
  }
 
}

export default withRouter(Landing)
