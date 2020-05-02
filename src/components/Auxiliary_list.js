import React, { Component } from 'react'
import Select from 'react-select'
import {getAnnouncement} from './UserFunctions'
import {getPostulantsEnabled} from './UserFunctions'

var aux = []
var conv = []
var postulants = []
class Auxiliary_list extends Component{
  constructor() {
    super()
    this.state = {
        selectConv:null,
        selectConvError:"",
        selectAuxError:"",
        showList:false,
        selectAux:null,
    }

    this.selectConvChange = this.selectConvChange.bind(this)
}

//fill announcement
componentDidMount() {
    getAnnouncement().then(res => {
        for (var i=0; i < res.length; i++) {
            var object = {}
            object.label = res[i].name
            conv[i] = object
          }
    })
}


selectConvChange = selectConv =>{
    this.setState({selectConvError:"", showList:false})
    this.setState({selectConv})
}

selectAuxChange =selectAux => {
  this.setState({selectAuxError:"", showList:false})
  this.setState({selectAux}, ()=>this.fillPostulant())
}

fillAux(){
    console.log(this.selectConv)
    getAnnouncement().then(res => {
        if(res != null){
            for (var i=0; i < res.length; i++) {
                if(res[i].announcement === this.state.selectConv.label){
                    var auxi = JSON.parse(res[i].auxiliary);
                    console.log(auxi)    
                    for (var j=0; j < auxi.length; j++) {
                        var object = {}
                        object.label = auxi[j].name
                        aux.push(object)
                    }
                    console.log(aux)
                }
            }
        }
    })
}

fillPostulant(){
    var array = []
    postulants = array
    getPostulantsEnabled().then(res => {
      if(res != null){
        for (var i=0; i < res.length; i++) {
            if(res[i].announcement === this.state.selectConv.label && res[i].auxiliary === this.state.selectAux.label && res[i].enable){
                var object = {}
                object.sis_code = res[i].sis_code
                object.reason = res[i].reason
                postulants.push(object)
            }
        }
    }
  })
}

showConv(){
    if(this.state.selectConv){
       this.setState({showList:true})
    }else{
        this.setState({selectConvError:"No se ha seleccionado una convocatoria"})
    }
}

showAux(){
  if(this.state.selectConv){
     this.setState({showList:true})
  }else{
      this.setState({selectAuxError:"No se ha seleccionado una auxiliatura"})
  }
}
render() {
    const { selectConv, selectAux } = this.state

    return (
        <div className="justify-content-center">
            <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white">
               Lista de postulantes
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

                <div className="form-group col-3 mt-5">
                    <button type="button" class="col btn btn-info mt-2" onClick={() => this.fillAux()} >seleccionar convocatoria</button>
                </div>

                <div className="form-group col-8 my-4">
                    <label htmlFor="Nombre">Selecciona una auxiliatura</label>
                    <Select
                      name="conv"
                      value={selectAux}
                      options={aux}
                      onChange={this.selectAuxChange}
                      placeholder=""
                      className="basic-select"
                      classNamePrefix="select"
                    />
                    <p style={{color:"red"}}>{this.state.selectAuxError}</p>
                </div>

                <div className="form-group col-3 mt-5">
                    <button type="button" class="col btn btn-info mt-2" onClick={() => this.showAux()} >Generar lista</button>
                </div>



                

            </div>
        </div>        
    )
}
}

export default Auxiliary_list