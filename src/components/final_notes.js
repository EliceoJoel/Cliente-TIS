import React, { Component } from 'react'
import Select from 'react-select'
import {getAnnouncement} from './UserFunctions'
import {getAux} from './UserFunctions'
import {getFinalScores} from './UserFunctions'

 var conv = []
 var aux = []
class final_notes extends Component {
    constructor() {
        super()
        this.student = [];
        this.conv = null;
        this.state = {
            selectConv:null,
            selectConvError:"",
            showList:false,
            selectedAux:null,
            aux:[],
            students:(<div></div>),
        }

        this.selectConvChange = this.selectConvChange.bind(this)
    }

    //fill announcement
    componentDidMount() {
        this.conv = []
        getAnnouncement().then(res => {
            console.log(res)
            for (var i=0; i < res.length; i++) {
                var object = {}
                object.id = res[i].id
                object.label = res[i].name
                conv[i] = object
              }
              console.log(this.conv)
        })
    }



    selectConvChange = selectConv =>{
        this.setState({selectConvError:"", showList:false})
        this.setState({selectConv}, ()=>this.fillPostulant())
    }

    setup(e){
        this.student = [];
        let data = {"announcement":e.label}
        console.log(data)
        getFinalScores(data).then(res =>{
          let a = res.data
          console.log(a)
          for(let i=0; i<a.length;i++){
            let object ={}
            object.id = a[i].idPostulant
            object.name = a[i].name
            object.sum = a[i].sum
            this.student[i] = object
        }
          console.log(this.student) 
        }).catch(err => {
          console.log(err)
      })
      }

      scores(){
        this.setState({students:this.student.map(student =>(
            <div key={student.id.toString()} className="row">
                <div className="col text-center">{student.name}</div>
                <div className="col text-center">{student.id}</div>
                <div className="col text-center">{student.sum}</div>
            </div>
        ))})
      }


    render() {
        return(<div>
            <h3 className="h3 mb-3 font-weight-normal text-center" >calificacion de conocimientos final</h3>
            <div className="row">
                <div className="form-group col-8 my-4">
                    <label htmlFor="Nombre">Selecciona una convocatoria</label>
                    <Select
                      name="conv"
                      options={conv}
                      onChange={(e) => this.setup(e)}
                      placeholder=""
                      className="basic-select"
                      classNamePrefix="select"
                    />
                    <p style={{color:"red"}}>{this.state.selectConvError}</p>
                    
                </div>
                <div className="form-group col-3 mt-5">
                    <button type="button" class="col btn btn-info mt-2" onClick={() => this.scores()} >Generar lista</button>
                </div>
                <br/>
                <br/>        
            </div>
            <div className="row">
                <div className="h5 col mb-3 font-weight-normal text-center">NOMBRE</div>
                <div className="h5 col mb-3 font-weight-normal text-center">ID</div>
                <div className="h5 col mb-3 font-weight-normal text-center">NOTA PROMEDIO</div>
            </div>
            <div>
                {this.state.students}
            </div>  
        </div>)
    }
}

export default final_notes