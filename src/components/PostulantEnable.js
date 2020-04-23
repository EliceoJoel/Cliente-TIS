import React, { Component } from 'react'

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
    render() {
        const {codSis} = this.state
        return (
            <div className="justify-content-center">
           
            <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white">
                 Habilitacion de Postulante </h1>
                 <div className="row">
                <div >
                    </div>
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

                    </div>
                    </div>
        )
    }
}

export default PostulantEnable
