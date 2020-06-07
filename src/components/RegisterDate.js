import React, { Component } from 'react'
import axios from 'axios'
export class RegisterDate extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             date:'',
             event:'',
             description:'',
             date_error:'',
             event_error:'',
             description_error:'',
             valid_data:''
        }
    }
    onChange =  (e) =>{
        this.setState({[e.target.name]: e.target.value })
    }

    handleUpload(e ){
        e.preventDefault()
              this.setState({
           date_error: '', 
           event_error: '',
           description_error:'',
           date:'',
           event:'',
           description:'',
           valid_data:'REGISTRO REALIZADO CON EXITO'
         
        
   })
       if(this.valid()){       
        let date = this.state.date
        let event = this.state.event
        let description = this.state.description
        let send = new FormData()
            
            send.append('date', date)
            send.append('event', event )
            send.append('description', description)
            
            axios({
               method: 'post',
               url: 'api/importantDate',
               data: send,
               headers: {'Content-Type': 'multipart/form-data' }
               }).then(response =>{
                console.log(response)
            }) 
            .catch(error => {
                console.log(error)
            })
           }

    }
          
    valid(){        
        if(this.state.date === ''){
            this.setState({date_error:'Introduce una fecha'})
        }
        else if(this.state.date.length > 30){
            this.setState({date_error: 'fecha incorrecta'})
        }
        else if(this.state.event === ''){
            this.setState({event_error:'Introduzca un evento'})
        }
        else if(this.state.event.length > 30){
            this.setState({event_error:'Nombre de Evento demasiado largo'})
        }
     
        else if(this.state.description === ''){
            this.setState({description_error:'llene una descripcion'})
        }
        else if(this.state.description > 240){
            this.setState({description_error:'excedio el limite de descripcion'})
        }
        else{
            return true;
        }
    }
    render() {
       
        return (
            
                 <div className="row">
                        <div className="col-md-12 my-3 p-3 bg-info text-white">
                            <h1 className="h3 font-weight-normal text-center rounded">
                                Registro de Fechas Importantes
                            </h1>
                        </div>
                        <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                                Datos de la Fecha
                        </h3>
                        <div className="form-group col-md-6">
                            <label htmlFor="date">Fecha</label>
                            <input
                                type="text"
                                className="form-control"
                                name="date"
                                placeholder="DD/MM/AA"
                                value={this.state.date}
                                onChange={this.onChange}
                            />
                            <p style={{color:"red"}}>{this.state.date_error}</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="event">Evento</label>
                            <input
                                type="text"
                                className="form-control"
                                name="event"
                                placeholder="Ingrese el Evento"
                                value={this.state.event}
                                onChange={this.onChange}
                            />
                            <p style={{color:"red"}}>{this.state.event_error}</p>
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="Description">Descripcion</label>
                            <textarea
                                type="text"
                                className="form-control"
                                name="description"
                                placeholder="Ingrese su descripcion"
                                value={this.state.description}
                                onChange={this.onChange}
                            />
                            <p style={{color:"red"}}>{this.state.description_error}</p>
                        </div>
                        <div className="form-group col-md-12 ">    
                      <button className="btn btn-outline-info" variant="warning" onClick ={(e) => this.handleUpload(e)} >Registrar</button>
                      <p style={{color:"green"}}>{this.state.valid_data}</p>
                      </div>
            </div>
        )
    }
}

export default RegisterDate
