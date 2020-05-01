import React, { Component } from 'react'
import {getPostulant} from './UserFunctions'

var allPostulants = []
var postulantions=[]
var postulation

class PostulantRegister extends Component {
    constructor() {
        var fecha = new Date()
        super()
        this.state = {
            sis_code:"",
            sis_code_error:"",
            documents:"",
            documents_error:"",
            date:fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()+" - "+fecha.getHours()+":"+fecha.getMinutes(),
            date_error:"",
            showList:false,
            showDocuments:false,
            showSubmit:false,
            notFoundPostulant:""

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    //fill postulants
    componentDidMount() {
        getPostulant().then(res => {
            allPostulants = res
            console.log(allPostulants)
        })
    }

    validSis(){
        if(this.state.sis_code === ''){
            this.setState({sis_code_error:'Campo vacio'})
        }
        else if(this.state.sis_code.length > 9 || this.state.sis_code.length < 8 || isNaN(this.state.sis_code)){
            this.setState({sis_code_error:'Código sis incorrecto'})
        } 
        else{
            return true
        }
    }

    isPotulant(){
       var res = false
        for(var i=0; i<allPostulants.length; i++){
           if(allPostulants[i].sis_code === this.state.sis_code){
               postulantions.push(allPostulants[i])
               res = true
           }else{
               this.setState({notFoundPostulant:"No se encontró ninguna postulación"})
           }
        }
        console.log(postulantions)
        return res
    }


    validDoc(){
        if(this.state.documents === ''){
            this.setState({documents_error:'Campo vacio'})
        }
        else if(this.state.documents.length > 2 || this.state.documents < 0 || isNaN(this.state.documents)){
            this.setState({documents_error:'Numero de documentos incorrecto o demasiado grande'})
        }
        else if(this.state.date === ''){
                this.setState({date_error:'Campo vacio'})
        }
        else{
            return true
        }
    }

    onSubmit(e){
        e.preventDefault()
        if(this.validDoc()){
            console.log("enviado")
        }
    }

    onChange(e){
        if(e.target.name === 'sis_code'){
           this.setState({showList:false, showData:false, showSubmit:false})
        }
        this.setState({ [e.target.name]: e.target.value })
        this.setState({
            sis_code_error: '', 
            documents_error: '',
            date_error: '',
            notFoundPostulant:''
        })
    }

    search(){
        postulantions=[]
        if(this.validSis()){
            if(this.isPotulant()){
               this.setState({showList:true, notFoundPostulant:""})
            }
        }
    }

    generar(pos){
       this.setState({showData:true})
       this.setState({showSubmit:true})
       postulation = pos

    }

    render() {
        return (
            <div className="justify-content-center">
                <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white">
                   Registro de postulante
                </h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                                Búsqueda de postulaciones 
                        </h3>
                        <div className="form-group col-md-8">
                            <input 
                              type="text" 
                              name="sis_code"
                              className="form-control"
                              placeholder="Introduzca el código sis del postulante"
                              value={this.state.sis_code}
                              onChange={this.onChange}
                            />
                            <p style={{color:"red"}}>{this.state.sis_code_error}</p>
                        </div>
                        <div className="col-md-4">
                           <button type="button" className="col btn btn-info mb-2" onClick={()=>this.search()}>Buscar</button>
                        </div>
                        <p className="col-md-12 text-center" style={{color:"red"}}>{this.state.notFoundPostulant}</p>
                        {this.state.showList?  
                            <div className="form-row col-md-12">
                                {postulantions.map( postulation =>( 
                                <div className="col-md-4">
                                   <button type="button" className="col btn btn-outline-info mb-2" onClick={()=>this.generar(postulation)}>{postulation.announcement}</button>
                                </div>
                                ))}
                            </div>
                        :null
                        }

                        {this.state.showData?        
                            <div className="form-row col-md-12">
                                <div className="form-row col-md-12">
                                    <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                                        Datos del postulante 
                                    </h3>
                                    <div className="form-group col-md-3">
                                        <b>Nombres:</b> 
                                        <p>{postulation.names}</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <b>Apellido Paterno:</b> 
                                        <p>{postulation.first_surname}</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <b>Apellido Materno:</b> 
                                        <p>{postulation.second_surname}</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <b>Email:</b> 
                                        <p>{postulation.email}</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <b>Dirección:</b> 
                                        <p>{postulation.direction}</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <b>Celular:</b> 
                                        <p>{postulation.phone}</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <b>Cedula de identidad:</b> 
                                        <p>{postulation.ci}</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <b>Código sis:</b> 
                                        <p>{postulation.sis_code}</p>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <b>Convocatoria:</b> 
                                        <p>{postulation.announcement}</p>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <b>Auxiliatura(s):</b> 
                                        <p>{postulation.auxiliary}</p>
                                    </div>
                                </div>
                                <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                                        Documentos del postulante 
                                </h3>
                                <div className="form-group col-md-6">
                                    <label htmlFor="documents">N° de Documentos</label>
                                    <input 
                                      type="text" 
                                      name="documents"
                                      className="form-control"
                                      placeholder="Introduzca el número de documentos entregados"
                                      value={this.state.documents}
                                      onChange={this.onChange}
                                    />
                                    <p style={{color:"red"}}>{this.state.documents_error}</p>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Fecha y hora de entrega</label>
                                    <input 
                                      type="text" 
                                      name="date"
                                      placeholder="ejemplo: 21/05/2020 - 12:45"
                                      className="form-control"
                                      value={this.state.date}
                                      onChange={this.onChange}
                                    />
                                    <p style={{color:"red"}}>{this.state.date_error}</p>
                                </div>
                            </div>
                        :null
                        }
                    </div>
                    {this.state.showSubmit?    
                        <button type="submit" className="col btn btn-lg btn-info mt-2">Confirmar registro</button>
                    :null
                    }
                </form>    
            </div>                   
        )
    }
}

export default PostulantRegister