import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Landing extends Component {


  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }

  render() {
    console.log(localStorage.usertoken)
    const loginLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item px-2">
          <Link to="/login" className="nav-link">
            Iniciar sesión
          </Link>
        </li>
      </ul>
    )

    const logoutLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item px-2">
          <a href="/" onClick={this.logOut.bind(this)} className="nav-link">
            Cerrar sesión
          </a>
        </li>
      </ul>
    )

    const userLinks = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            User
          </Link>
        </li>
      </ul>
    )

    const noUserLinks = (
      <ul className="navbar-nav">
        <li className="nav-item ml-auto px-2">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item ml-auto px-2">
          <Link to="/Generate_Rotulado" className="nav-link">
            Generar rotulado
          </Link>
        </li>
        <li className="nav-item ml-auto px-2">
          <Link to="/list" className="nav-link">
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
            {localStorage.usertoken ? userLinks : noUserLinks}
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Landing)
