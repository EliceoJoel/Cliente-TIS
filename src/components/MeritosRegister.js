import React, { Component } from 'react'
import {getQualifiedPostulants} from './UserFunctions'
import {getConfigMeritos} from './UserFunctions'
import {registrarNotaMerito} from './UserFunctions'
import {notaMerito} from './UserFunctions'

let notasOne =[]
let notasTwo = []
let configsOne =[]
let configsTwo = []

class MeritosRegister extends Component {
  constructor() {
      super()
      this.state = {
        postulants:[],
        postulantsBackup:[],
        idPostulant:'',
        textBuscar:'',
        auxiliary:'',
        announcement:'',
        showPostulants:false,
        showPostulantData:false,
        showTable:false,
        aprob:0.0,
        gral:0.0,
        total:0.0,
        errorNota:'', 
        success:''
      }
      this.onSubmit = this.onSubmit.bind(this)      
  }

  componentDidMount() {
    getQualifiedPostulants().then(res => {
      this.setState({postulants:res, postulantsBackup:res})
    })
  }

  filter(event){
    notasOne = []
    notasTwo = []
    this.setState({
        showPostulants:true, 
        showPostulantData:false,
        showTable:false,
        errorNota:'',
        success:''
    })
    let text = event.target.value
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
    configsOne=[]
    configsTwo=[]
    this.setState({
      idPostulant:postulant.id,
      textBuscar:postulant.name,
      auxiliary:postulant.auxiliary,
      announcement:postulant.announcement,
      showPostulantData:true,
      showPostulants:false,
    })
    getConfigMeritos(postulant.announcement).then(res =>{
      console.log(res)
      for(let i=0 ; i<res.length ; i++){
        if(res[i].type === 'Porcentaje'){
          res[i].promedio = 0
          configsOne.push(res[i])
        }else{
          configsTwo.push(res[i])
        }
      }
      this.setState({showTable:true}, this.llenarNotasCero(res))
    })
  }

  llenarNotasCero(res){
    for(let i=0 ; i<res.length ; i++){
      let object = {}
      object.id = res[i].id
      object.nota = 0
      if(res[i].number>=30){
       notasOne.push(object)
      }else{
        notasTwo.push(object)
      }
    }
  }

  changeNota1(event, config){
    this.setState({errorNota:''})
    let promedio = 0.0
    if(event.target.value !== ''){
      promedio = parseFloat(event.target.value)
    }else{
      promedio = 0.0
    }
    let posicion = notasOne.map(function(e) { return e.id; }).indexOf(config.id);
    promedio = promedio * (configsOne[posicion].number/100)
    promedio = 	this.redondear(promedio,2)
    configsOne[posicion].promedio = promedio
    notasOne[posicion].nota = promedio
    this.updateTotal()
  }

  changeNota2(event, config){
    this.setState({errorNota:''})
    let nota = 0.0
    if(event.target.value !== ''){
       nota = parseFloat(event.target.value)
    }else{
      nota = 0.0
    }
    let posicion = notasTwo.map(function(e) { return e.id; }).indexOf(config.id);
    notasTwo[posicion].nota = nota
    this.updateTotal()
  }

  updateTotal(){
    let suma = 0.0 
    for(let i=0 ; i< configsOne.length ; i++){
      suma = suma + configsOne[i].promedio
    }
    for(let i=0 ; i< notasTwo.length ; i++){
      suma = suma + notasTwo[i].nota
    }
    suma = this.redondear(suma,2)
    if(suma>100){
      suma = null
      this.setState({errorNota:"Se ha introducido incorrectamente una nota, la suma de notas sobrepasa los 100 pts"})
    }
    this.setState({total:suma})
  }

  redondear(numero, decimales) {
    let numeroRegexp = new RegExp('\\d\\.(\\d){' + decimales + ',}');
    if (numeroRegexp.test(numero)) {
        return Number(numero.toFixed(decimales));
    } else {
        return Number(numero.toFixed(decimales)) === 0 ? 0 : numero;
    }
  }


  onSubmit(e){
    e.preventDefault()
    let postulants = this.state.postulantsBackup
    for( let i=0 ; i<postulants.length ; i++){
      if(postulants[i].name === this.state.textBuscar){
        postulants.splice(i,1)
        i = postulants.length
      }
    }
    this.registrar()
  }

  async registrar(){
    const notas = notasOne.concat(notasTwo);
    console.log(notas)
    for(let i=0 ; i<notas.length ; i++){
      const newRegister ={
        id_postulant : this.state.idPostulant,
        id_merito : notas[i].id,
        nota_merito: notas[i].nota
      }

      await registrarNotaMerito(newRegister)
    }
    const data = {
      notaMerito: this.state.total,
      idPostulant: this.state.idPostulant,
      announcement: this.state.announcement
    }
    notaMerito(data)
    this.setState({
      showPostulants:false,
      showPostulantData:false,
      showTable:false,
      success:"Registro de notas exitoso",
      textBuscar:"",
      aprob:0.0,
      gral:0.0
    })
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
              <p style={{color:"green"}} className="text-center mt-4"><b>{this.state.success}</b></p>
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
                      <th className="col-md-10">Descripción</th>
                      <th className="col-md-1">Promedio (100pts)</th>
                      <th className="col-md-1">Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                  {configsOne.map(con =>(
                  <tr className="d-flex" key={con.id}>
                      <td className="col-md-10">{con.name} <b>{"  ("+con.number+" puntos max.)" }</b>
                      </td>
                      <td className="col-md-1">
                        <input
                          className="form-control"
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          required
                          onChange={(event)=>this.changeNota1(event, con)}
                        />
                      </td>
                      <td className="col-md-1 text-center">{con.promedio}</td>
                    </tr>
                  ))}
                  {configsTwo.map(con =>(
                    <tr className="d-flex" key={con.id}>
                      <td className="col-md-10">
                        {con.name} <b>{"  ("+con.number+" puntos max.)" }</b><br />
                        {con.description}
                      </td>
                      <td className="col-md-1"></td>
                      <td className="col-md-1">
                        <input
                          className="form-control"
                          type="number"
                          step="0.01"
                          min="0"
                          max={con.number}
                          required
                          onChange={(event)=>this.changeNota2(event,con)}
                        />
                      </td>
                    </tr>
                    ))}
                    <tr className="d-flex">
                      <td className="col-md-11" colSpan="11"><b>Total (sobre 100 puntos) </b></td>
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