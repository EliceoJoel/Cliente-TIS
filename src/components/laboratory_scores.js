import React, {Component} from 'react';
import {getAnnouncement} from './UserFunctions'
import Select from 'react-select'
import {getStudentData} from './UserFunctions' 
import { getProfile } from './UserFunctions'
import {percentageData} from './UserFunctions' 
import {getUserAnnouncements} from './UserFunctions'

//import {getStudents} from './UserFunctions' 
import axios from 'axios'


var conv =[]
var notas = []
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
            notas:[],
        }
    }
    componentDidMount() {
        getProfile().then(user => {
            console.log(user.user.id)
            getUserAnnouncements(user.user.id).then(res => {
                for (var i=0; i < res.length; i++) {
                    var object = {}
                    object.id = res[i].id
                    object.label = res[i].name
                    conv[i] = object
                }
            })
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
            "announcement": this.state.selectedConv.id,
            "auxiliary": this.state.selectedAux
        }
        getStudentData(data).then(postulant => {
            this.setState({postulantes:postulant})
        })
        percentageData(data).then(course => {
            this.setState({tematics:course});
        })
        this.fillMatrix()
    }

    fillMatrix(){
        console.log(this.state.postulantes.length)
        for(var i=0; i<this.state.postulantes.length; i++) {
            notas[i] = [];
            for(var j=0; j<this.state.tematics.length; j++) {
                notas[i][j] = {
                    id:this.state.postulantes[i].id,
                    theme:this.state.tematics[j].id,
                    score:0
                };
                console.log(notas[i][j])
            }
        }
        console.log(notas)
    }

    changeScore(e,fila,col){
        if(notas.length <= 0){
            this.fillMatrix()
        }
        notas[col][fila].score = e.target.value
        console.log(notas[col][fila])
    }

    uploadScore(){
        for(var i=0; i<this.state.postulantes.length; i++) {
            for(var j=0; j<this.state.tematics.length; j++) {
                let score = new FormData()
                score.append('idPostulant', notas[i][j].id)
                score.append('idtTheme', notas[i][j].theme)
                score.append('score', notas[i][j].score)
                console.log(score)
                axios({
                    method: 'post',
                    url: 'api/labScore',
                    data: score,
                    headers: {'Content-Type': 'multipart/form-data' }
                    }).then(response =>{
                }) 
                .catch(error => {
                     console.log(error)
                })
            }
        }
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
                    <button type="button" class="col btn btn-info mt-2" onClick={() => this.getStudents()} >seleccionar convocatoria</button>
                </div>            
            </div>
            <div className = "row">
                <div className = "col"> 
                    <label className="h2 font-weight-normal text-center p-1  text-primary">postulante</label> 
                    <div > {this.state.postulantes.map(postulant => (
                        <div > {postulant.name} <br/> </div> 
                    ))} 
                    </div>
                </div>
                {this.state.tematics.map((temas,tema) => (
                    <div className = "col"> 
                        <label className="h2 font-weight-normal text-center p-1 text-primary">{temas.theme} </label>
                        <div > {this.state.postulantes.map((postulants,postulant) => (
                            <div > 
                                <input 
                                type = "number"
                                name = "score"
                                min="0"
                                max="100"
                                onChange={e => this.changeScore(e,tema,postulant)}                
                                /> <br/> 
                            </div> 
                            ))} 
                        </div>
                    </div>
                ))}
            </div>

            <button type="button" className="col btn btn-info mt-2" onClick ={(e) => this.uploadScore()}>
                subir notas 
            </button>
        </div>
        )
    }
  }
  export default Laboratory_scores;