import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Generate_Rotulado from './components/Generate_Rotulado'
import List from './components/List'
import Post from './components/Post'
import Enabled_list from './components/Enabled_list'



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
            <Route exact path="/list" component={List} />
            <Route exact path="/post" component={Post} />
            <Route exact path="/enabled_list" component={Enabled_list} />
         

            
          </div>
        </div>
      </Router>
    )
  }
}

export default App
