import React, { Component } from 'react'
import {getQualifiedPostulants} from './UserFunctions'
import {getConfigMeritos} from './UserFunctions'

var notas = []
var configs = []

class MeritosRegister extends Component {
  constructor() {
      super()
      this.state = {
        postulants:[],
        postulantsBackup:[],
        textBuscar:'',
        auxiliary:'',
        announcement:'',
        showPostulants:false,
        showPostulantData:false,
        showTable:false,
        total:0,
        errorNota:''
      }
      this.onSubmit = this.onSubmit.bind(this)      
  }

  componentDidMount() {
    getQualifiedPostulants().then(res => {
      this.setState({postulants:res, postulantsBackup:res})
    })
  }

  filter(event){
    notas = []
    this.setState({
        showPostulants:true, 
        showPostulantData:false,
        showTable:false,
        errorNota:''
    })
    var text = event.target.value
    const data = this.state.postulantsBackup
    const newData = data.filter(function(item){
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
        postulants: newData,
        textBuscar: text,
    })

  }

  selectPostulant(postulant){
    this.setState({
      textBuscar:postulant.name,
      auxiliary:postulant.auxiliary,
      announcement:postulant.announcement,
      showPostulantData:true,
      showPostulants:false,
    })
    getConfigMeritos(postulant.announcement).then(res =>{
      configs = res
      this.setState({showTable:true}, this.llenarNotasCero(res))
    })
  }

  changeNota(event, config){
    this.setState({errorNota:''})
    var nota
    if(event.target.value !== ''){
       nota = parseInt(event.target.value, 10)
    }else{
      nota = 0
    }
    var posicion = notas.map(function(e) { return e.merito; }).indexOf(config.name);
    notas[posicion].nota = nota
    this.updateTotal()
  }

  llenarNotasCero(res){
    for( var i=0 ; i<res.length ; i++){
      var object = {}
      object.merito = res[i].name
      object.nota = 0
      notas.push(object)
    }
  }

  updateTotal(){
    var suma = 0
    for(var i=0 ; i< notas.length ; i++){
      suma = suma + notas[i].nota
    }
    if(suma>100){
      suma = null
      this.setState({errorNota:"Se ha introducido incorrectamente una nota"})
    }
    this.setState({total:suma})
  }


  onSubmit(e){
    e.preventDefault()
    console.log("entra")
    var postulants = this.state.postulantsBackup
    for( var i=0 ; i<postulants.length ; i++){
      if(postulants[i].name === this.state.textBuscar){
        postulants.splice(i,1)
        console.log("aqui")
      }
    }
  }

  render() {
      return (
          <div className="justify-content-center">
            <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white rounded">
              Registro de notas de merito
            </h1>
            <div className="mt-5 text-center">
              <label htmlFor="user">Nombre del postulante</label>
              <input className="form-control" 
                value={this.state.textBuscar} 
                name="text"
                placeholder="Ingrese el nombre del postulante"
                onChange={(text) => this.filter(text)}
              />
            </div>
            {this.state.showPostulants?
              <div className="container mt-3 mb-4">
                {this.state.postulants.map( postulant =>(
                  <button 
                    className="btn btn-outline-secondary btn-block text-left" 
                    key={postulant.id}
                    onClick={()=>this.selectPostulant(postulant)}>
                      {postulant.name+" --- "+postulant.auxiliary }
                  </button>
                ))} 
              </div>
            :null}
            <form onSubmit={this.onSubmit}>
              {this.state.showPostulantData?
              <div className="mt-3">
                <div><b>{"Auxiliatura: "}</b>{this.state.auxiliary}</div>
                <div><b>{"Convocatoria: "}</b>{this.state.announcement}</div> 
              </div>
              :null} 
              {this.state.showTable?
              <div className="mt-3 mb-4">
                <table className="table table-bordered">
                  <thead>
                    <tr className="d-flex table-info">
                      <th className="col-md-11">Descripción</th>
                      <th className="col-md-1">Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                  {configs.map(con =>(
                    <tr className="d-flex" key={con.id}>
                        <td className="col-md-11">{con.name} <b>{"  ("+con.percentage+" puntos max.)" }</b></td>
                        <td className="col-md-1">
                          <input
                            className="form-control"
                            type="number"
                            min="0"
                            max={con.percentage}
                            required
                            onChange={(event)=>this.changeNota(event,con)}
                          />
                        </td>
                    </tr>
                    ))}
                    <tr className="d-flex">
                      <td className="col-md-11"><b>Total (sobre 100 puntos) </b></td>
                      <td className="col-md-1 table-info text-center">
                        {this.state.total}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p style={{color:"red"}}><b>{this.state.errorNota}</b></p>
                <button type="submit" className="btn btn-info mt-2 mb-5">Registrar nota</button>
              </div>
              :null}  
            </form>       
          </div>        
      )
  }
}


export default MeritosRegister