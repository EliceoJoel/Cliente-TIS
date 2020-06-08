import React, { Component } from 'react'
import Select from 'react-select'
import {getAnnouncement} from './UserFunctions'
import {getAverage} from './UserFunctions'

 var conv = []
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


    setup(e){
        console.log(e.id)
        getAverage(e.id).then(res =>{
          let a = res
          console.log(a)
          for(let i=0; i<a.length;i++){
            let object ={}
            object.auxiliary = a[i].auxiliary
            object.name = a[i].name
            object.nota_final = a[i].nota_final
            this.student[i] = object
        }
          console.log(this.student) 
        }).catch(err => {
          console.log(err)
      })
      }

      scores(){
        this.setState({students:this.student.map(student =>(
            <div key={student.id} className="row">
                <div className="col">{student.name}</div>
                <div className="col">{student.auxiliary}</div>
                <div className="col">{student.nota_final}</div>
            </div>
        ))})
      }


    render() {
        return(<div>
            <h3>calificacion de conocimientos final</h3>
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
                <div className="col text-info font-weight-bold">nombre</div>
                <div className="col text-info font-weight-bold">auxiliatura</div>
                <div className="col text-info font-weight-bold">nota promedio</div>
            </div>
            <div className="my-1" style={{border:"0.5px solid silver", width: "100%"}}></div>
            <div>
                {this.state.students}
            </div>  
        </div>)
    }
}

export default final_notes