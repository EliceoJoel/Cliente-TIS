import React, {Component} from 'react';
import {getAnnouncement} from './UserFunctions'
import Select from 'react-select'
import {getStudentData} from './UserFunctions' 
import {percentageData} from './UserFunctions' 
//import {getStudents} from './UserFunctions' 

var conv =[]
class Laboratory_scores extends Component{

    constructor() {
        super()
        this.state = {
            selectedConv:null,
            selectedAux:null,
            show:"true",
            auxiliaturas:[],
            postulantes:[],
            tematics:[],
            warningMesage:"",
        }
    }
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
        var aux =[]
        getAnnouncement().then(conv =>{
            for(var i=0;i<conv.length;i++){
                if(conv[i].id === this.state.selectedConv.id){
                    var auxi = JSON.parse(conv[i].auxiliary)
                    for(var j=0;j<auxi.length;j++){
                        var object = {}
                        object.label = auxi[j].name
                        aux[j]=object
                    }
                }
            }
        })
        this.setState({auxiliaturas:aux})
    }

    getStudents(){
        const data =  {
            "announcement":'1',
            "auxiliary": 'fisicoquimica'
        }
        getStudentData(data).then(postulant => {
            this.setState({postulantes:postulant})
            console.log(postulant)

        })

        percentageData(data).then(course => {
            this.setState({tematics:course})
        })
    }

    render(){
      return(
        <div className="justify-content-center">
            <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white">
               Lista de puntos
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
        </div>
        )
    }
  }
  export default Laboratory_scores;