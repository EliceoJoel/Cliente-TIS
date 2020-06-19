import React, { Component } from 'react'
import Select from 'react-select'
import {getProfile , getUserAnnouncements} from './UserFunctions'
import {getAux} from './UserFunctions'
import {getAuxThemes} from './UserFunctions'
import {getPostEnableAux} from './UserFunctions'
import {getLabScores} from './UserFunctions'
import {getStudents} from './UserFunctions'

//
class final_notes extends Component {
    constructor() {
        super()
        this.scores =[];
        this.student = [];
        this.state = {
            selectConv:null,
            selectConvError:"",
            showList:false,
            selectedAux:null,
            aux:[],
            conv:[],
            list:(<div></div>),
            notasLab:(<div></div>),

        }

    }

    //fill announcement
    componentDidMount() {
        let conv = []
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
                this.setState({conv:conv})  
            })
        })
    }


    fillAuxi(){
        let aux = []
        getAux(this.state.selectedConv.id).then(res =>{
            console.log(res)
            for (var i=0; i < res.length; i++) {
                var object = {}
                object.id = res[i].id
                object.label = res[i].name
                aux[i] = object
            }
            this.setState({auxiliaturas:aux})
        }
        )
    }

    async renderTableData(){
        let list =  (<div></div>)
        if(this.state.selectedConv.type === 'Docencia') list = await this.docencia()
        else list = await this.laboratorio()
        this.setState({list:list})
    }

    async docencia(){
        let postulant = []
        postulant = await this.Students()
        console.log(postulant)
        return (
            <div>
                <div className="row">
                        <div class="col text-info font-weight-bold">nombre</div>
                        <div class="col text-info font-weight-bold">nota</div>
                        <div class="col text-info font-weight-bold">nota Oral</div>
                </div>
                <div className="my-1" style={{border:"0.5px solid silver", width: "100%"}}></div>
                {postulant.map(post=>(
                    <div className="row">
                        <div className="col">{post.name}</div>
                        <div className="col">{post.score}</div>
                        <div className="col">{post.score_oral}</div>
                    </div>
                ))}
            </div>
            )
    }

    async Students(){
        let postulants = []
        await getStudents().then(postulant => {
            for(let i=0; i<postulant.length;i++){
                if(postulant[i].auxiliary === this.state.selectedAux.label && postulant[i].announcement === this.state.selectedConv.label){
                    let pos ={}
                    pos.name = postulant[i].name
                    pos.score = postulant[i].score
                    pos.score_oral = postulant[i].score_oral
                    postulants.push(pos)
                }
            }
        })
        console.log(postulants)
        return postulants 
    }

    async laboratorio(){
        const id = this.state.selectedAux.id
        let title = [];
        let postulant = [];
        let score = [];
        score = await getLabScores(id)
        postulant = await getPostEnableAux(id)
        console.log(postulant)
        title = await getAuxThemes(id)
        return (
            <div>
                <div className="row">
                <div class="col text-info font-weight-bold">postulante</div>
                    {title.map(item => (<div class="col text-info font-weight-bold">{item.theme}</div>))}
                </div>
                <div>
                    {postulant.map(post => (
                        <div className="row">
                            <div className="col">{post.name}</div>
                            {this.llenarNotasLab(post.id,score)}
                        </div>
                    ))}
                </div>
                <div className="my-1" style={{border:"0.5px solid silver", width: "100%"}}></div>

            </div>
            )
        
        
    }

    llenarNotasLab(id,scores){
        console.log(id)
        let html = (<div></div>)
        let StudentScores = [];
        let j = 0;
        for(let i=0; i<scores.length; i++){
            if(scores[i].idPostulant === id){
                StudentScores[j] = scores[i].score
                j++
            }
        }
        console.log(StudentScores)
        html = (StudentScores.map(score =>(
            <div className="col">{score}</div>
        )))
        return html

    }

    render() {
        return(
        <div className="justify-content-center">
        <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white rounded">
            Lista de notas de conocimiento
        </h1>
        <div className="row">
            <div className="form-group col-8 my-4">
                <label htmlFor="Nombre">Selecciona una convocatoria</label>
                <Select
                  name="conv"
                  options={this.state.conv}
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
                  onChange={(e) => this.setState({selectedAux:e})}
                  placeholder=""
                  className="basic-select"
                  classNamePrefix="select"
                />
                <p style={{color:"red"}}>{this.state.selectAuxError}</p>
            </div>

            <div className="form-group col-3 mt-5">
                <button type="button" class="col btn btn-info mt-2" onClick={() => this.renderTableData()} >Generar lista</button>
            </div>            
        </div>
        <div >
        </div>     
        <br/>
        <br/>  
        {this.state.list}
    </div> 
        )
    }
}

export default final_notes