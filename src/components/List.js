import React, {Component} from 'react';
import axios from 'axios'

class List extends Component{

  constructor(props) {
      super(props);
      this.state = {
        convocatorias: [],
      };  
    }
    componentDidMount() {
      axios.get('/api/announcement')
      .then(response => {
          this.setState({convocatorias : response.data});
      })
      .catch(e => {
          console.log(e);
      })
    }

    render(){
      var url = 'http://127.0.0.1:8000/storage/file/';
      return(
          <div className="container">
                  <div className="justify-content-center">
                      <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white"> Lista de convocatorias </h1>
                      {this.state.convocatorias.map( convocatoria => (
                      <div class="convocatoria">
                          <div><h2>{convocatoria.name} </h2> </div>
                          <embed class="pdf"  src= {url + convocatoria.file} height='400' width='100%'></embed>
                          <div class = "etiqueta">
                          <div class="gestion"> <a href = {url + convocatoria.file}> { "gestion " + convocatoria.year +", "  + convocatoria.departament} </a></div>
                          <div>{convocatoria.type} </div>
                          <div>{"publicado en " + convocatoria.created_at} </div>
                          
                          <div> {JSON.parse(convocatoria.auxiliary).map( items => (
                              <i>{items.item + "  "}</i>
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