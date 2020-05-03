import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Generate_Rotulado from './components/Generate_Rotulado'
import Profile from './components/Profile'
import List from './components/List'
import Post from './components/Post'
import Auxiliary_list from './components/Auxiliary_list'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/Generate_Rotulado" component={Generate_Rotulado} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/list" component={List} />
            <Route exact path="/post" component={Post} />
            <Route exact path="/auxiliary_list" component={Auxiliary_list} />
            
         

            
          </div>
        </div>
      </Router>
    )
  }
}

export default App
