import React, { Component } from 'react'
import Select from 'react-select'
import {getAnnouncement} from './UserFunctions'
import {getAux} from './UserFunctions'


class final_notes extends Component {
    constructor() {
        super()
        this.conv = [];
        this.aux =[];
        this.state = {
            selectConv:null,
            selectConvError:"",
            showList:false,
            selectedAux:null,
        }

        this.selectConvChange = this.selectConvChange.bind(this)
    }

    //fill announcement
    componentDidMount() {
        this.conv = []
        getAnnouncement().then(res => {
            for (var i=0; i < res.length; i++) {
                var object = {}
                object.value = res[i].id
                object.label = res[i].name
                this.conv[i] = object
              }
        })
    }

    fillAux(){
        this.aux =[]
        getAux(this.state.selectConv.id).then(res =>{
          let a = res.data
          for(let i=0; i<a.length;i++){
            let object ={}
            object.id = a[i].id
            object.label = a[i].name
            object.conv = a[i].id_announcement
            this.aux[i] = object
          }
          console.log(this.aux)
        }).catch(err => {
          console.log(err)
      })
      }


    selectConvChange = selectConv =>{
        this.setState({selectConvError:"", showList:false})
        this.setState({selectConv}, ()=>this.fillPostulant())
    }


    render() {

        return(<div>
            <h3>calificacion de conocimientos final</h3>
            <div className="row">
                <div className="form-group col-8 my-4">
                    <label htmlFor="Nombre">Selecciona una convocatoria</label>
                    <Select
                      name="conv"
                      options={this.conv}
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
                      options={this.aux}
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
        </div>)
    }
}

export default final_notes