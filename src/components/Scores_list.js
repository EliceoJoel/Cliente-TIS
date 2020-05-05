import React, { Component } from 'react'
import Select from 'react-select'
import {getAnnouncement} from './UserFunctions'
import {getStudents} from './UserFunctions' 
import {updateScore} from './UserFunctions'

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
getStudents(){
    var postulants = []
    var scores =[]
    getStudents().then(postulant => {
        for(var i=0; i<postulant.length;i++){
            if(postulant[i].auxiliary === this.state.selectedAux && postulant[i].announcement === this.state.selectedConv.label){
                var object = {}
                var score = {}
                object.id = postulant[i].id_book
                object.name = postulant[i].name
                object.auxiliary = postulant[i].auxiliary
                object.score = postulant[i].score
                object.score_oral = postulant[i].score_oral
                score.score = postulant[i].score
                score.score_oral = postulant[i].score_oral
                score.id = postulant[i].id_book
                scores.push(score)
                postulants.push(object)
            }
        }
        this.setState({postulantes:postulants, score:scores})
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
            <div >
            </div>     
            <br/>
            <br/>  
            <div className="row">
                    <div class="col">nombre</div>
                    <div class="col">auxiliatura</div>
                    <div class="col">nota</div>
                    <div class="col">nota Oral</div>
                    <div class="col"></div>
                    <div class="col"></div>
                    <div class="col"></div>
            </div>
            <form>
                {this.renderTableData()}
                <button type="button" class="col btn btn-info " onClick={() =>this.update()} >subir notas</button>
            </form>
        </div>        
    )
}




renderTableData() {
    return this.state.postulantes.map(postulant =>(
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
    ))
 }
update(){
    var post = this.state.score
    console.log(post)
    for(var i=0;i<this.state.postulantes.length;i++){
        console.log(this.state.score[i])
        updateScore(this.state.score[i])
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