import React, { Component } from 'react'
import Select from 'react-select'
import {getAnnouncement} from './UserFunctions'

var conv = []

class Enabled_list extends Component {
    constructor() {
        super()
        this.state = {
            selectConv:null,
            postulants:[],
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

    //fill postulant
    /*componentDidMount() {
        axios.get('/api/enabled_list')
        .then(response => {
            this.setState({postulants : response.data});
        })
        .catch(e => {
            console.log(e);
        })
      }*/

    selectConvChange = selectedConv =>{
        this.setState({selectConv:selectedConv}, this.fillPostulant(selectedConv))
    }

    fillPostulant(selectedConv){
        console.log(selectedConv.label)
    }

    render() {
        const { selectConv } = this.state

        return (
            <div className="justify-content-center">
                <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white">
                   Publicacion de convocatorias 
                </h1>
                <div className="row">
                    <div className="form-group col-md-12 my-4">
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
                        <p style={{color:"red"}}>{this.state.name_error}</p>
                    </div>
                    <label className="col-md-3 text-info font-weight-bold" htmlFor="Nombre">Código Sis del postulante</label>
                    <label className="col-md-3 text-info font-weight-bold" htmlFor="Nombre">Nombre de auxiliatura</label>
                    <label className="col-md-3 text-info font-weight-bold" htmlFor="Nombre">Habilitado</label>
                    <label className="col-md-3 text-info font-weight-bold" htmlFor="Nombre">Motivo de inhabilitación</label>
                    <div className="my-1" style={{border:"0.5px solid silver", width: "100%"}}></div>
                    {this.state.postulants.map( postulant =>(
                        <div className="container">
                          <div className="row row-cols-4">
                            <div className="col">
                                {postulant.sis_code} 
                            </div>
                            <div className="col">
                                {postulant.auxiliary}                    
                            </div>
                            <div className="col">
                                {postulant.enabled}
                            </div>
                            <div className="col">
                                {postulant.reason}
                            </div>
                          </div>
                        </div>
                    ))}
                </div>
            </div>        
        )
    }
}

export default Enabled_list