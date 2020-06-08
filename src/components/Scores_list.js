/* eslint-disable eqeqeq */
import React, { Component } from 'react'
import Select from 'react-select'
import {getUserAnnouncements, getTheoryScore} from './UserFunctions'
import {getProfile} from './UserFunctions'
import {getStudents} from './UserFunctions' 
import {getUserAuxiliary} from './UserFunctions' 
import {updateScore} from './UserFunctions'
import {finalTheoryScore} from './UserFunctions'

var conv = []
class Scores_list extends Component{
  constructor() {
    super()
    this.state = {
        selectedConv:null,
        selectedAux:null,
        show:"true",
        auxiliaturas:[],
        postulantes:[],
        score:[],
        warningMesage:"",
        idUser:"",
    }
}
componentDidMount() {
    getProfile().then(res => {
        this.setState({
            idUser: res.user.id        
        }) 
        getUserAnnouncements(res.user.id).then(res => {
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
    var scores =[]
    getStudents().then(postulant => {
        for(var i=0; i<postulant.length;i++){
            if(postulant[i].auxiliary === this.state.selectedAux && postulant[i].announcement === this.state.selectedConv.label){
                var object = {}
                var score = {}
                object.id = postulant[i].id
                object.name = postulant[i].name
                object.auxiliary = postulant[i].auxiliary
                object.score = postulant[i].score
                object.score_oral = postulant[i].score_oral
                score.score = postulant[i].score
                score.score_oral = postulant[i].score_oral
                score.id = postulant[i].id
                scores.push(score)
                postulants.push(object)
            }
        }
        console.log(postulant)
        this.setState({postulantes:postulants, score:scores})
    })
}

fillAuxi(){
    let aux = []
    console.log(this.state.idUser,this.state.selectedConv.id)
    getUserAuxiliary(this.state.idUser,this.state.selectedConv.id).then(auxi =>{
        for(var i=0; i<auxi.length;i++){
            var object = {}
            object.id = auxi[i].id
            object.label = auxi[i].name
            aux[i] = object
        }
        console.log(aux)
        this.setState({auxiliaturas:aux})
    })
}


render() {

    return (
        <div className="justify-content-center">
            <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white rounded">
               Registrar notas docencia
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
                    <button type="button" className="col btn btn-info mt-2" onClick={() => this.fillAuxi()} >seleccionar convocatoria</button>
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
            <div >
            </div>     
            <br/>
            <br/>  
            <div className="row">
                    <div class="col text-info font-weight-bold">nombre</div>
                    <div class="col text-info font-weight-bold">auxiliatura</div>
                    <div class="col text-info font-weight-bold">nota</div>
                    <div class="col text-info font-weight-bold">nota Oral</div>
                    <div class="col"></div>
                    <div class="col"></div>
                    <div class="col"></div>
            </div>
            <div className="my-1" style={{border:"0.5px solid silver", width: "100%"}}></div>
            <form>
                {this.renderTableData()}
                <button type="button" class="col btn btn-info " onClick={() =>this.update()} >subir notas</button>
            </form>
        </div>        
    )
}




renderTableData() {
    return this.state.postulantes.map(postulant =>(
        <div>    
            <div className="row">
                    <div class="col">{postulant.name}</div>
                    <div class="col">{postulant.auxiliary}</div>
                    <div class="col">{this.fillScore(postulant.score)}</div>
                    <div class="col">{this.fillScore(postulant.score_oral)}</div>
                    <input 
                        type = "number"
                        id = {postulant.id} 
                        name = "score"
                        min="0"
                        max="100"
                        className="col"  
                        placeholder= "ingrese notas de conocimineto"
                        onChange = {this.onChange}                     
                    />

                    <input 
                        type = "number"
                        id = {postulant.id} 
                        name = "score"
                        min="0"
                        max="100"
                        className="col"  
                        placeholder= "ingrese notas de examen oral"
                        onChange = {this.onChangeOral}                     
                    />
                    <div class="col">{this.state.warningMesage}</div>
            </div>
            <div className="my-1" style={{border:"0.5px solid silver", width: "100%"}}></div>
        </div>
    ))
 }
update(){
    var post = this.state.score
    console.log(post)
    for(var i=0;i<this.state.postulantes.length;i++){
        let finalScore = 0
        console.log(this.state.score[i])
        updateScore(this.state.score[i])
        var id = this.state.score[i].id
        // eslint-disable-next-line no-loop-func
        getTheoryScore(this.state.selectedConv.id, this.state.score[i].id).then(data=>{
            let message = {}
            if(data[0].type == "Examen Escrito"){
                finalScore =  (data[0].percentage * data[0].score + data[1].percentage * data[1].score_oral)/100
            }
            else{
                finalScore = (data[0].percentage * data[0].score_oral + data[1].percentage * data[1].score)/100
            }
            message.notaConocimiento = finalScore
            message.idPostulant = id
            message.announcement = this.state.selectedConv.label
            finalTheoryScore(message)
        })
    }
    this.getStudents()

}

 onChangeOral = (event) => {
     if(event.target.value >100){ 
        this.setState({warningMesage:"numero no valido"})
        return
     }
     var scores = this.state.score
    for(var i=0;i<this.state.score.length;i++){
        this.setState({warningMesage:""})
        // eslint-disable-next-line eqeqeq
        if(event.target.id == scores[i].id && parseInt(event.target.value)< 101){
            scores[i].score_oral = event.target.value
        }
    }
    console.log(scores)
    this.setState({score:scores})
}

onChange = (event) => {
    if(event.target.value >100){ 
       this.setState({warningMesage:"numero no valido"})
       return
    }
    var scores = this.state.score
   for(var i=0;i<this.state.score.length;i++){
       this.setState({warningMesage:""})
       // eslint-disable-next-line eqeqeq
       if(event.target.id == scores[i].id && parseInt(event.target.value)< 101){
           scores[i].score = event.target.value
       }
   }
   this.setState({score:scores})
}

fillScore(score){
    // eslint-disable-next-line eqeqeq
    if(score == 0){
        return "abandono"
    } else return score
}
}
export default Scores_list