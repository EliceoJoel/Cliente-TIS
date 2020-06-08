import React, {Component} from 'react';
import {getAnn} from './UserFunctions'


var data = []
class List extends Component{

  constructor(props) {
      super(props);
      this.data = []
      this.state = {
        convocatoria:[],
      };  
    }
    async componentDidMount() {
      this.data = await getAnn()
      await this.setState({convocatoria:data})
      console.log(this.state.convocatoria)
    }

    render(){
      var url = 'http://127.0.0.1:8000/storage/file/';
      return(
          <div className="container">
                  <div className="justify-content-center">
                      <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white rounded"> Lista de convocatorias </h1>
                      {this.state.convocatoria.map( convocatoria => (
                        <div className="text-center mt-3" key={convocatoria.id}>
                          <a href = {url + convocatoria.file}> 
                          <div><h5>{convocatoria.name} </h5> </div>
                          </a>
                          <div className = "etiqueta">
                          <div className="gestion"> <a href = {url + convocatoria.file}> { "gestion " + convocatoria.year +", "  + convocatoria.departament} </a></div>
                          <div>{convocatoria.type} </div>
                          <div>{"publicado en " + convocatoria.created_at} </div>
                          <div> {JSON.parse(convocatoria.auxiliary).map( items => (
                              <i key={items.name}>{items.name + " - "}</i> 
                          ))}</div>

                          <br/>
                          </div>
                      </div>
                      ))}
                  </div>
        </div>
        )
    }
  }
  export default List;