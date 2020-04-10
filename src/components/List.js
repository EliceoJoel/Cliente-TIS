import React, {Component} from 'react';


class List extends Component{

  constructor(props) {
      super(props);
      this.state = {
        convocatorias: [],
      };  
    }
    componentDidMount() {
      fetch('http://127.0.0.1:8000/api/convs')
        .then(response => response.json())
        .then(data => this.setState({ convocatorias: data }));
  }
  
  render(){
    return(
        <div className="container">
                <div className="justify-content-center">
                    <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white"> Lista de convocatorias </h1>
                    {this.state.convocatorias.map( convocatoria => (
                    <div class="convocatoria">
                        <embed class="pdf" src= {convocatoria.pdf} height='400' width='100%'></embed>
                        <div class = "etiqueta">
                        <div class="gestion"> <a href = {convocatoria.pdf}> { "gestion "+ convocatoria.gestion +", " +  convocatoria.año + "  " + convocatoria.materia} </a></div>
                        <div>{convocatoria.tipo} </div>
                        <div>{"publicado en " + convocatoria.created_at} </div>
                        </div>
                    </div>
                    ))}
                </div>
      </div>
      )
  }
}
export default List;
