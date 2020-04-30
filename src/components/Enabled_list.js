import React, { Component } from 'react'
import Select from 'react-select'
import {getAnnouncement} from './UserFunctions'
import {getPostulantsEnabled} from './UserFunctions'

var conv = []
var postulants = []

class Enabled_list extends Component {
    constructor() {
        super()
        this.state = {
            selectConv:null,
            selectConvError:"",
            showList:false,
        }

        this.selectConvChange = this.selectConvChange.bind(this)
    }

    //fill announcement
    componentDidMount() {
        getAnnouncement().then(res => {
            for (var i=0; i < res.length; i++) {
                var object = {}
                object.value = res[i].id
                object.label = res[i].name
                conv[i] = object
              }
        })
    }


    selectConvChange = selectConv =>{
        this.setState({selectConvError:"", showList:false})
        this.setState({selectConv}, ()=>this.fillPostulant())
    }


    fillPostulant(){
        var array = []
        postulants = array
        getPostulantsEnabled().then(res => {
            for (var i=0; i < res.length; i++) {
                if(res[i].announcement === this.state.selectConv.label){
                    var object = {}
                    object.name = res[i].name
                    object.auxiliary = res[i].auxiliary
                    if(res[i].enable === true){
                        object.enable = "Si"
                    }else{
                        object.enable = "No"
                    }
                    object.reason = res[i].reason
                    postulants.push(object)
                }
                //ordenamos alfaveticamente
                postulants.sort(function (a, b) {
                    if (a.name > b.name) {
                      return 1;
                    }
                    if (a.name < b.name) {
                      return -1;
                    }
                    return 0;
                  });
            }
        })
    }

    show(){
        if(this.state.selectConv){
           this.setState({showList:true})
        }else{
            this.setState({selectConvError:"No se ha seleccionado una convocatoria"})
        }
    }

    render() {
        const { selectConv } = this.state

        return (
            <div className="justify-content-center">
                <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white">
                   Lista de habilitados/inhabilitados
                </h1>
                <div className="row">
                    <div className="form-group col-8 my-4">
                        <label htmlFor="Nombre">Selecciona una convocatoria</label>
                        <Select
                          name="conv"
                          value={selectConv}
                          options={conv}
                          onChange={this.selectConvChange}
                          placeholder=""
                          className="basic-select"
                          classNamePrefix="select"
                        />
                        <p style={{color:"red"}}>{this.state.selectConvError}</p>
                    </div>
                    <div className="form-group col-4 mt-5">
                        <button type="button" class="col btn btn-info mt-2" onClick={() => this.show()} >Generar lista</button>
                    </div>
                    <label className="col-md-3 text-info font-weight-bold" htmlFor="Nombre">Código Sis del postulante</label>
                    <label className="col-md-3 text-info font-weight-bold" htmlFor="Nombre">Nombre de auxiliatura</label>
                    <label className="col-md-3 text-info font-weight-bold text-center" htmlFor="Nombre">Habilitado</label>
                    <label className="col-md-3 text-info font-weight-bold" htmlFor="Nombre">Motivo de inhabilitación</label>
                    <div className="my-1" style={{border:"0.5px solid silver", width: "100%"}}></div>
                    {this.state.showList?    
                        <div className="col-md-12">
                        {postulants.map( postulant =>(
                            <div className="container">
                              <div className="row row-cols-4">
                                <div className="col">
                                    {postulant.name} 
                                </div>
                                <div className="col">
                                    {postulant.auxiliary}                    
                                </div>
                                <div className="col text-center">
                                    {postulant.enable}
                                </div>
                                <div className="col">
                                    {postulant.reason}
                                </div>
                              </div>
                              <div className="my-1" style={{border:"0.3px solid silver", width: "100%"}}></div>
                            </div>
                        ))}
                        </div>
                    :null
                    }
                </div>
            </div>        
        )
    }
}

export default Enabled_list