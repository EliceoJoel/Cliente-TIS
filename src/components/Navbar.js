import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Landing extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
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
            Convocatorias
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

        
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            User
          </Link>
        </li>
        <li className="nav-item">
          <a href=" " onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    )

    return (
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

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    )
  }
}

export default withRouter(Landing)
