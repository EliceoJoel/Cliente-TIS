import React, { Component } from 'react'
import Select from 'react-select'
import {getProfile , getUserAnnouncements} from './UserFunctions'
import {getPostulantsEnabled} from './UserFunctions' 
import {getAnnouncementIDGenerateRotulate} from './UserFunctions'

var conv = []
class Auxiliary_list extends Component{
  constructor() {
    super()
    this.state = {
        selectedConv:null,
        selectedAux:null,
        show:"true",
        auxiliaturas:[],
        postulantes:[],
    }
}
componentDidMount() {

    getProfile().then(res => {
        this.setState({
            idUser: res.user.id        
        }) 
        getUserAnnouncements(this.state.idUser).then(res=>{
            console.log(res)
            for (var i=0; i < res.length; i++) {
                var object = {}
                object.id = res[i].id
                object.label = res[i].name
                conv[i] = object
            }
        })
    })
  }
getStudents(){
    var postulants = []
    console.log()
    getPostulantsEnabled().then(postulant => {
        for(var i=0; i<postulant.length;i++){
            if(postulant[i].auxiliary === this.state.selectedAux && postulant[i].announcement === this.state.selectedConv.label){
                postulants.push(postulant[i])
            }
        }
        this.setState({postulantes:postulants})
    })
}

// fillAuxi(){
//     var aux =[]
//     getAnnouncement().then(conv =>{
//         for(var i=0;i<conv.length;i++){
//             if(conv[i].id === this.state.selectedConv.id && conv[i].auxiliary != null){
//                 var auxi = JSON.parse(conv[i].auxiliary)
//                 for(var j=0;j<auxi.length;j++){
//                     var object = {}
//                     object.label = auxi[j].name
//                     aux[j]=object
//                 }
//             }
//         }
//     })
//     this.setState({auxiliaturas:aux})
// }
fillAuxi(){
    var aux =[]
    getAnnouncementIDGenerateRotulate(this.state.selectedConv.id).then(res => {
        console.log(res);
          var auxiliary = res
      
                for(var j=0;j<auxiliary.length;j++){
                    var object = {}
                    object.label = auxiliary[j].name
                    aux[j]=object
                }
    })
            
        
    
    this.setState({auxiliaturas:aux})
}


render() {

    return (
        <div className="justify-content-center">
            <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white rounded">
               Lista por auxiliatura
            </h1>
            <div className="row">
                <div className="form-group col-8 my-4">
                    <label htmlFor="Nombre">Selecciona una convocatoria</label>
                    <Select
                      name="conv"
                      options={conv}
                      onChange={(e) => this.setState({selectedConv:e})}
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
                      options={this.state.auxiliaturas}
                      onChange={(e) => this.setState({selectedAux:e.label})}
                      placeholder=""
                      className="basic-select"
                      classNamePrefix="select"
                    />
                    <p style={{color:"red"}}>{this.state.selectAuxError}</p>
                </div>

                <div className="form-group col-3 mt-5">
                    <button type="button" class="col btn btn-info mt-2" onClick={() => this.getStudents()} >Generar lista</button>
                </div>            
            </div>
            <div className="row">
                    <div class="col">nombre</div>
                    <div class="col">habilitado</div>
                    <div class="col">auxiliatura</div>
            </div>
                {this.renderTableData()}
        </div>        
    )
}




renderTableData() {
    return this.state.postulantes.map(postulant =>(
        <div className="row">
                <div class="col">{postulant.name}</div>
                <div class="col">{this.checkEnable(this.enable)}</div>
                <div class="col">{postulant.auxiliary}</div>
        </div>
    ))
 }

 checkEnable(enable){
    if(!enable){
        return "si"
    }
    else return "no"
 }

}

export default Auxiliary_list