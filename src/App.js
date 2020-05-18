import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Generate_Rotulado from './components/Generate_Rotulado'
import List from './components/List'
import Post from './components/Post'
import Auxiliary_list from './components/Auxiliary_list'
import Scores_list from './components/Scores_list'
import Enabled_list from './components/Enabled_list'
import Postulant_Register from './components/Postulant_Register'
import PostulantEnable from './components/PostulantEnable'
import RegisterDate from './components/RegisterDate'
import ScoreSetup from './components/ScoreSetup'
import AnnouncementSetup from './components/AnnouncementSetup'
import Laboratory_scores from './components/laboratory_scores'
import Roles_permission from './components/Roles_permission'

class App extends Component {
  render() { 
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} /> 
          <div className="container">
            <Route exact path="/Registrar.usuario" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/Generar.rotulado" component={Generate_Rotulado} />
            <Route exact path="/Convocatorias" component={List} />
            <Route exact path="/Publicar.convocatoria" component={Post} />
            <Route exact path="/Lista.por.auxiliaturas" component={Auxiliary_list} />
            <Route exact path="/Lista.de.puntos" component={Scores_list} />
            <Route exact path="/Lista.de.habilitados" component={Enabled_list} />
            <Route exact path="/Registrar.postulante" component={Postulant_Register} />
            <Route exact path="/Habilitar.postulante" component={PostulantEnable} />
            <Route exact path="/Registrar.fecha" component={RegisterDate} />
            <Route exact path="/Configuracion.notas" component={ScoreSetup} />
            <Route exact path="/Configuracion.convocatoria" component={AnnouncementSetup} />
            <Route exact path="/Registro.de.rol" component={Roles_permission} />
            <Route exact path="/Registro.de.notas.laboratorio" component={Laboratory_scores} />
          </div>
        
        </div>

      </Router>
    )
  }
}

export default App
