import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Generate_Rotulado from './components/Generate_Rotulado'
import List from './components/List'
import Post from './components/Post'
import Auxiliary_list from './components/Auxiliary_list'
import Scores_list from './components/Scores_list'
import Enabled_list from './components/Enabled_list'
import Postulant_Register from './components/Postulant_Register'
import PostulantEnable from './components/PostulantEnable'
import RegisterDate from './components/RegisterDate'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Route exact path="/Generate_Rotulado" component={Generate_Rotulado} />
            <Route exact path="/list" component={List} />
            <Route exact path="/post" component={Post} />
            <Route exact path="/auxiliary_list" component={Auxiliary_list} />
            <Route exact path="/scores_list" component={Scores_list} />
            <Route exact path="/enabled_list" component={Enabled_list} />
            <Route exact path="/postulant_register" component={Postulant_Register} />
            <Route exact path="/PostulantEnable" component={PostulantEnable} />
            <Route exact path="/RegisterDate" component={RegisterDate} />
          </div>
        
        </div>

      </Router>
    )
  }
}

export default App
