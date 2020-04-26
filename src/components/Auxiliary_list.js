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
      
      return(
        <div>
        <h1> Lista de postulantes de auxiliatura </h1>
        <p>{this.state.convocatorias.map( convocatoria =>(
            <i>{convocatoria.name}</i>))}</p>
        </div>)
    }
  }
  export default List;