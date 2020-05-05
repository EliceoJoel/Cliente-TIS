import React, { Component } from 'react'
import axios from 'axios'
class Landing extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         arreglo:[]
      }
    }
    componentDidMount() {
      axios.get('/api/importantDate')
      .then(response => {
          this.setState({arreglo : response.data});
      })
      .catch(e => {
          console.log(e);
      })
    }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <main 
            
          >
            <h1 className="text-center">WELCOME</h1>
          </main>
          
        
        <section>

          <div className="col-md-12" >
            <h2 className="col-md-10 ">AVISO DE FECHAS</h2>
          {this.state.arreglo.map(aviso =>
                    <div >
                                 
                                  <h5 className="col-md-10 " htmlFor="Nombre">{aviso.event}</h5>
                                  <h6 className="col-md-8 " htmlFor="Nombre">fecha de evento:{aviso.date}</h6>
                                  <label className="col-md-5 " htmlFor="Nombre">{aviso.description}</label> 
                                 
                                 
                                  <br></br>
                                  </div>
                                   )}
                                 
                             
                         
         
          </div>
         
        </section>
        
          </div>
      </div>
      
    )
  }
}

export default Landing