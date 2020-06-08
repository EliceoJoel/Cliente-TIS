import React, {Component} from 'react';
import {getUserAnnouncementsLab} from './UserFunctions'
import Select from 'react-select'
import {getStudentData} from './UserFunctions' 
import { getProfile } from './UserFunctions'
import {getUserTheme} from './UserFunctions' 
import {getUserAuxiliary} from './UserFunctions'
import {getLabScore} from './UserFunctions'
import {finalTheoryScore} from './UserFunctions'
//import {getAnnouncementIDGenerateRotulate} from './UserFunctions'
//import {getStudents} from './UserFunctions' 
import axios from 'axios'


var conv = []
class Laboratory_scores extends Component{

    constructor() {
        super()
        this.notas = []
        this.state = {
            selectedConv:null,
            selectedAux:null,
            show:"true",
            auxiliaturas:[],
            postulantes:[],
            tematics:[],
            warningMesage:"",
            notas:[],
            idUser:-1,
        }
    }
    componentDidMount() {
        this.notas[0] = null 
        getProfile().then(res => {
            this.setState({
                idUser: res.user.id        
            }) 
            getUserAnnouncementsLab(res.user.id).then(res => {
                for (var i=0; i < res.length; i++) {
                    var object = {}
                    object.id = res[i].id
                    object.label = res[i].name
                    conv[i] = object
                }
            })
        })
    }

    // fillAuxi(){
    //     var aux =[]
    //     getAnnouncement().then(conv =>{
    //         for(var i=0;i<conv.length;i++){
    //             if(conv[i].id === this.state.selectedConv.id){
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
        let aux = []
        getUserAuxiliary(this.state.idUser,this.state.selectedConv.id).then(auxi =>{
            for(var i=0; i<auxi.length;i++){
                var object = {}
                object.id = auxi[i].id
                object.label = auxi[i].name
                aux[i] = object
            }
            this.setState({auxiliaturas:aux})
        })
        
        // getAnnouncementIDGenerateRotulate(this.state.selectedConv.id).then(res => {
        //     console.log(res);
        //       var auxiliary = res
          
        //             for(var j=0;j<auxiliary.length;j++){
        //                 var object = {}
        //                 object.label = auxiliary[j].name
        //                 aux[j]=object
        //             }
        // })
                
            
        
        // this.setState({auxiliaturas:aux})
    }

    getStudents(){
        const data =  {
            "announcement": this.state.selectedConv.label,
            "auxiliary": this.state.selectedAux.label
        }
        getStudentData(data).then(postulant => {
            this.setState({postulantes:postulant})
        })

        getUserTheme(this.state.idUser,this.state.selectedConv.id,this.state.selectedAux.id).then(course => {
            this.setState({tematics:course});
        })
        this.fillMatrix()
    }

    fillMatrix(){
        for(var i=0; i<this.state.postulantes.length; i++) {
            this.notas[i] = [];
            for(var j=0; j<this.state.tematics.length; j++) {
                this.notas[i][j] = {
                    id:this.state.postulantes[i].id,
                    theme:this.state.tematics[j].id,
                    score:0
                };
            }
        }
    }

    changeScore(e,col,fila){
        if(this.notas[0] == null){
            this.fillMatrix()
        }
        this.notas[fila][col].score = e.target.value
    }

    uploadScore(e){
        for(var i=0; i<this.state.postulantes.length; i++) {
            let message = {}
            for(var j=0; j<this.state.tematics.length; j++) {
                let score = new FormData()
                score.append('idPostulant', this.notas[i][j].id)
                score.append('idtTheme', this.notas[i][j].theme)
                score.append('score', this.notas[i][j].score)
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
            // eslint-disable-next-line no-loop-func
            getLabScore(this.notas[i][0].id).then(data =>{
                message.notaConocimiento = parseFloat(data[0].sum)
                message.idPostulant = data[0].idPostulant
                message.announcement = this.state.selectedConv.label
                finalTheoryScore(message)
                console.log(message)
            })
        }
    }

    render(){
      return(
        <div className="justify-content-center">
        <form onSubmit={(e) => this.uploadScore(e)}>
            <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white rounded">
               Registrar notas laboratorio
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
                      onChange={(e) => this.setState({selectedAux:e})}
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
                    <label className="col-md-4 text-info font-weight-bold">postulante</label>
                </div>
                {this.state.tematics.map(theme => (
                    <div className = "col"> 
                        <label className="col-md-4 text-info font-weight-bold">{theme.theme}</label>
                    </div>
                ))}
                <div className="my-1" style={{border:"0.5px solid silver", width: "100%"}}></div>

            </div> 
            <div> {this.state.postulantes.map((postulant,postulante) => (
                <div>
                    <div className ="row">
                        <div className ="col"> {postulant.name}</div> 
                        {this.state.tematics.map((temas,tema) => (
                        <div className = "col">
                                <input 
                                type = "number"
                                name = "score"
                                min="0"
                                max="100"
                                onChange={e => this.changeScore(e,tema,postulante)}                
                                />
                        </div>
                        ))} 
                    </div>
                    <div className="my-1" style={{border:"0.5px solid silver", width: "100%"}}></div>
                </div>
                ))}
            </div>

            <input type="submit" className="col btn btn-info mt-2" value="subir notas "/>
            </form>  
        </div>
        )  
    }
    
  }
  export default Laboratory_scores;