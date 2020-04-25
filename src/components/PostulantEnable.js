import React, { Component } from 'react'
import {getAnnouncement} from './UserFunctions'
import Select from 'react-select'
var conv  = [] 
export class PostulantEnable extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             codSis:''
        }
    }
    
    onChange =  (e) =>{
        this.setState({[e.target.name]: e.target.value })
    }
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
    selectConvChange = selectedConvOption =>{
        //this.setState({selectedConvOption_error:''})
        //this.setState({selectedConvOption},()=>this.fillAuxiliary())
        this.setState({selectedOptionConv:selectedConvOption})
        //this.setState({showAux:true})
        //this.setState({selectedOptionAux:null})
        //delete auxiliary array data
        //var array = []
        //aux = array
    }

    render() {
        const {codSis} = this.state
        const { selectedOptionConv } = this.state
        return (
            <div className="justify-content-center">
           
            <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white">
                 Habilitacion de Postulante </h1>
                 <div className="row">
                    <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                            Datos del Postulante</h3>
                        
                        <div className="form-group col-md-4">
                          <label htmlFor="Nombre">Cod-Sis</label>
                             <input    
                                  className="form-control"   
                                  placeholder="Ingrese un Cod-Sis"                 
                                  type = "text"
                                  name = "codSis"
                                  value = {codSis}  
                                  onChange = {this.onChange}                     
                        />
                          </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="conv">Selecciona una convocatoria</label>
                                 <Select
                                      name="conv"
                                      options={conv}
                                      className="basic-multi-select "
                                      classNamePrefix="select"
                                      placeholder=""
                                      value={selectedOptionConv}
                                      onChange={this.selectConvChange}
                         />
 
                        </div>
                        <div>
                        <button className="btn btn-outline-info mt-4" variant="warning" onClick ={(AuxEvent) => this.handleAux(AuxEvent)} >Buscar Postulante</button>

                        </div>
                      </div>

                </div>
                   
        )
    }
}

export default PostulantEnable
