import React, { Component } from 'react'

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
            showSubmit:false

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    validSis(){
        if(this.state.sis_code === ''){
            this.setState({sis_code_error:'Campo vacio'})
        }
        else if(this.state.sis_code.length > 9  || isNaN(this.state.sis_code)){
            this.setState({sis_code_error:'Código sis incorrecto'})
        } 
        else{
            return true
        }
    }

    validDoc(){
        if(this.state.documents === ''){
            this.setState({documents_error:'Campo vacio'})
        }
        else if(this.state.documents > 2 || isNaN(this.state.documents)){
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
            date_error: ''
        })
    }

    search(){
        if(this.validSis()){
           this.setState({showList:true})
        }
    }

    generar(){
       this.setState({showData:true})
       this.setState({showSubmit:true})
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
                        {this.state.showList?    
                            <div className="form-row col-md-12">
                                <div className="col-md-4">
                                   <button type="button" className="col btn btn-outline-info mb-2" onClick={()=>this.generar()}>pos1</button>
                                </div>
                                <div className="col-md-4">
                                   <button type="button" className="col btn btn-outline-info mb-2" onClick={()=>this.generar()}>pos2</button>
                                </div>
                                <div className="col-md-4">
                                   <button type="button" className="col btn btn-outline-info mb-2" onClick={()=>this.generar()}>pos3</button>
                                </div>
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
                                        <p>Eliceo</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <b>Apellido Paterno:</b> 
                                        <p>Eliceo</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <b>Apellido Materno:</b> 
                                        <p>Eliceo</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <b>Email:</b> 
                                        <p>Eliceo</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <b>Dirección:</b> 
                                        <p>Eliceo</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <b>Celular:</b> 
                                        <p>Eliceo</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <b>Cedula de identidad:</b> 
                                        <p>Eliceo</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <b>Código sis:</b> 
                                        <p>Eliceo</p>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <b>Convocatoria:</b> 
                                        <p>Eliceo</p>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <b>Auxiliatura(s):</b> 
                                        <p>Eliceo</p>
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