import React, { Component } from 'react'
import Select from 'react-select'
import {getAnnouncement} from './UserFunctions'
import {getAllNotes} from './UserFunctions'

var conv = []
var notas = []

class Note_final_list extends Component {
    constructor() {
        super()
        this.state = {
            selectConv:null,
            selectConvError:"",
            showList:false,
        }

        this.selectConvChange = this.selectConvChange.bind(this)
    }

    //fill announcement
    componentDidMount() {
        getAnnouncement().then(res => {
            for (var i=0; i < res.length; i++) { 
                var object = {}
                object.value = res[i].id
                object.label = res[i].name
                conv[i] = object
              }
        })
    }


    selectConvChange = selectConv =>{
        this.setState({selectConvError:"", showList:false})
        this.setState({selectConv}, ()=>this.fillPostulant())
    }


    fillPostulant(){
        var array = []
        notas = array
        getAllNotes().then(res => {
            for (var i=0; i < res.length; i++) {
                if(res[i].announcement === this.state.selectConv.label){
                    var object = {}
                    object.id = res[i].id
                    object.name = res[i].name
                    object.auxiliary = res[i].auxiliary
                    object.nota_merito = res[i].nota_merito
                    object.nota_conocimiento = res[i].nota_conocimiento
                    object.nota_final = res[i].nota_final
                    notas.push(object)
                }
                //ordenamos alfaveticamente
                notas.sort(function (a, b) {
                    if (a.name > b.name) {
                      return 1;
                    }
                    if (a.name < b.name) {
                      return -1;
                    }
                    return 0;
                  });
            }
        })
    }

    show(){
        if(this.state.selectConv){
           this.setState({showList:true})
        }else{
            this.setState({selectConvError:"No se ha seleccionado una convocatoria"})
        }
    }

    render() {
        const { selectConv } = this.state

        return (
            <div className="container">
              <div className="justify-content-center">
                <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white">
                   Lista de notas de mérito
                </h1>
                <div className="row">
                  <div className="form-group col-8 my-4">
                      <label htmlFor="Nombre">Selecciona una convocatoria</label>
                      <Select
                        name="conv"
                        value={selectConv}
                        options={conv}
                        onChange={this.selectConvChange}
                        placeholder=""
                        className="basic-select"
                        classNamePrefix="select"
                      />
                      <p style={{color:"red"}}>{this.state.selectConvError}</p>
                  </div>
                  <div className="form-group col-4 mt-5">
                      <button type="button" className="col btn btn-info mt-2" onClick={() => this.show()} >Generar lista</button>
                  </div>
                  <div className="row col-md-12">
                    <label className="col-md-3 text-info font-weight-bold" htmlFor="Nombre">Nombre del postulante</label>
                    <label className="col-md-3 text-info font-weight-bold text-center" htmlFor="Nombre">Nombre de la auxiliatura</label>
                    <label className="col-md-2 text-info font-weight-bold text-center" htmlFor="Nombre">Mérito(/100)</label>
                    <label className="col-md-2 text-info font-weight-bold text-center" htmlFor="Nombre">Conocimiento(/100)</label>
                    <label className="col-md-2 text-info font-weight-bold text-center" htmlFor="Nombre">Nota de final(/100)</label>
                    <div className="my-1" style={{border:"0.5px solid silver", width: "100%"}}></div>
                  </div>
                  {this.state.showList?    
                    <div className="col-md-12">
                      {notas.map( postulant =>(
                        <div className="container" key={postulant.id}>
                          <div className="row row-cols-5">
                            <div className="col-3">
                                {postulant.name} 
                            </div>
                            <div className="col-3">
                                {postulant.auxiliary}                    
                            </div>
                            <div className="col-2 text-center">
                                {postulant.nota_merito}
                            </div>
                            <div className="col-2 text-center">
                                {postulant.nota_conocimiento}                    
                            </div>
                            <div className="col-2 text-center">
                                {postulant.nota_final}
                            </div>
                          </div>
                          <div className="my-1" style={{border:"0.3px solid silver", width: "100%"}}></div>
                        </div>
                      ))}
                    </div>
                  :null
                  }
                </div>
              </div>  
            </div>
        )
    }
}

export default Note_final_list