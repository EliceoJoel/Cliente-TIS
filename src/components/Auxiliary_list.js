import React, { Component } from 'react'
import Select from 'react-select'
import {getAnnouncement} from './UserFunctions'
//import {getPostulantsEnabled} from './UserFunctions'

var conv = []
var aux =[]
//var postulants = []
class Auxiliary_list extends Component{
  constructor() {
    super()
    this.state = {
        selectedConv:null,
        selectedAux:null,
        show:"true",
    }
}
//fill announcement
componentDidMount() {
    getAnnouncement().then(res => {
        for (var i=0; i < res.length; i++) {
            var object = {}
            object.id = res[i].id
            object.label = res[i].name
            conv[i] = object
          }
    })
}

fillAuxi(){
    this.auxClear()
    getAnnouncement().then(conv =>{
        for(var i=0;i<conv.length;i++){
            if(conv[i].id === this.state.selectedConv){
                var auxi = JSON.parse(conv[i].auxiliary)
                console.log(auxi)
                for(var j=0;j<auxi.length;j++){
                    var object = {}
                    object.label = auxi[j].name
                    aux[j]=object
                }
            }
        }
    })
    this.setState({show:"true"})
}


render() {

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
                      options={conv}
                      onChange={(e) => this.setState({selectedConv:e.id})}
                      placeholder=""
                      className="basic-select"
                      classNamePrefix="select"
                    />
                    <p style={{color:"red"}}>{this.state.selectConvError}</p>
                    
                </div>

                <div className="form-group col-3 mt-5">
                    <button type="button" class="col btn btn-info mt-2" onClick={() => this.fillAuxi()} >seleccionar convocatoria</button>
                </div>

                <div className="form-group col-8 my-4">
                    <label htmlFor="Nombre">Selecciona una auxiliatura</label>
                    <Select
                      name="conv"
                      options={aux}
                      onChange={(e) => this.setState({selectedAux:e.label})}
                      placeholder=""
                      className="basic-select"
                      classNamePrefix="select"
                    />
                    <p style={{color:"red"}}>{this.state.selectAuxError}</p>
                </div>

                <div className="form-group col-3 mt-5">
                    <button type="button" class="col btn btn-info mt-2" onClick={() => console.log(this.state.selectedAux)} >Generar lista</button>
                </div>            
            </div>
            <div className="row">
                    <div class="col">sis</div>
                    <div class="col">nombre</div>
                    <div class="col">auxiliatura</div>
                </div>
        </div>        
    )
}

auxClear(){
    for(var i=0;i<aux.length;i++){
        aux[i] = null;
    }
}

}

export default Auxiliary_list