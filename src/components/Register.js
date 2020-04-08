import React, { Component } from 'react'
import * as jsPDF from 'jspdf'
import Select from 'react-select'
//import axios from 'axios'
import {register} from './UserFunctions'

//format of valid email
var validMail = /\w+@\w+\.+[a-z]/;
var op = [
    { value: 'aux1', label: 'aux1' },
    { value: 'aux2', label: 'aux2' },
    { value: 'aux3', label: 'aux3' }
  ]

class Register extends Component {


    constructor() {
        super()
        this.state = {
            names: '',
            names_error: '',
            first_surname: '',
            first_surname_error: '',
            second_surname: '',
            second_surname_error: '',
            direction: '',
            direction_error: '',
            email: '',
            email_error: '',
            phone: '',
            phone_error: '',
            ci: '',
            ci_error: '',
            selectedOption: null,
            selectedOption_error: '',
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    selectChange = selectedOption =>{
        this.setState(
            {selectedOption},
            () => console.log(this.state.selectedOption)
        )
        
    }
    //field validation function
    valid(){        
        if(this.state.names === ''){
            this.setState({names_error:'Campo vacio'})
        }
        else if(this.state.names.length > 30){
            this.setState({names_error:'Dato ingresado demasiado largo'})
        }
        else if(this.state.first_surname === ''){
            this.setState({first_surname_error:'Campo vacio'})
        }
        else if(this.state.first_surname.length > 30){
            this.setState({first_surname_error:'Dato ingresado demasiado largo'})
        }
        else if(this.state.second_surname === ''){
            this.setState({second_surname_error:'Campo vacio'})
        }
        else if(this.state.second_surname.length > 30){
            this.setState({second_surname_error:'Dato ingresado demasiado largo'})
        }
        else if(this.state.direction === ''){
            this.setState({direction_error:'Campo vacio'})
        }
        else if(this.state.direction.length > 100){
            this.setState({direction_error:'Dato ingresado demasiado largo'})
        }
        else if(this.state.email === ''){
            this.setState({email_error:'Campo vacio'})
        }
        else if(this.state.email.length > 100){
            this.setState({email_error:'Datos ingresado demasiado largo'})
        }
        else if(!validMail.test(this.state.email)){
            this.setState({email_error:'Email incorrecto'})
        }
        else if(this.state.phone === ''){
            this.setState({phone_error:'Campo vacio'})
        }
        else if(this.state.phone.length > 8 || this.state.phone.length < 7 || isNaN(this.state.phone)){
            this.setState({phone_error:'Numero de celular incorrecto'})
        }
        else if(this.state.ci === ''){
            this.setState({ci_error:'Campo vacio'})
        }
        else if(this.state.ci.length > 8 || this.state.ci.length < 7 || isNaN(this.state.ci)){
            this.setState({ci_error:'ci incorrecto'})
        }
        else if(this.state.selectedOption === null){
            this.setState({selectedOption_error:'Seleccione una auxiliatura'})
        }
        else{
            return true;
        }

    }

    
    onSubmit (e) {
        e.preventDefault()

        //clear error state
        this.setState({
            names_error: '', 
            first_surname_error: '',
            second_surname_error: '',
            direction_error: '',
            email_error: '',
            phone_error:'',
            selectedOption_error:'',
            ci_error:''
        })

        if(this.valid()){  
            this.generatePDF()
            
            const newPostulant = {
                names: this.state.names,
                first_surname: this.state.first_surname,
                second_surname: this.state.second_surname,
                direction: this.state.direction,
                email: this.state.email,
                phone: this.state.phone,
                ci: this.state.ci,
                auxiliary:this.getAuxs()
            }
            console.log(newPostulant);

            register(newPostulant).then(res => {
               this.props.history.push(`/`)
            })
        }
    }


    getAuxs(){
        var auxs
        for (var i=0; i < this.state.selectedOption.length; i++) {
            auxs= auxs + (JSON.stringify(this.state.selectedOption[i].value))+"\n"
          }
        auxs = auxs.replace(/["']/g, "")
        auxs = auxs.replace("undefined", "")
        return auxs;
    }
    
    //method for generate pdf
    generatePDF(){
        var doc = new jsPDF()
        doc.setFontSize(25)
        doc.line(15, 10, 200, 10) //horizontal top line
        doc.line(200, 10, 200, 95+(10*this.state.selectedOption.length)) //vertical left line
        doc.line(15, 10, 15, 95+(10*this.state.selectedOption.length)) //vertical rigth line
        doc.line(15, 95+(10*this.state.selectedOption.length), 200, 95+(10*this.state.selectedOption.length)) //horizontal button line
        doc.text('Nombre(s) = ' + this.state.names,20,20)
        doc.text('Apellido paterno = ' + this.state.first_surname,20,30)
        doc.text('Apellido Materno = ' + this.state.second_surname,20,40)
        doc.text('Dirección = ' + this.state.direction,20,50)
        doc.text('Email = ' + this.state.email,20,60)
        doc.text('Celular = ' + this.state.phone,20,70)
        doc.text('Auxiliatura(s) = ',20,80)
        doc.text(this.getAuxs(),20,90)
        doc.text('Ci = '+this.state.ci,20,90+(10*this.state.selectedOption.length))
        doc.save('Mi_rotulado.pdf')
    }

    render () {
        const { selectedOption } = this.state
        return (
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-12 my-3 p-3 bg-info text-white">
                            <h1 className="h3 font-weight-normal text-center">
                                Registro de postulante
                            </h1>
                        </div>
                        <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                                Datos del postulante
                        </h3>
                        <div className="form-group col-md-12">
                            <label htmlFor="names">Nombres</label>
                            <input
                                type="text"
                                className="form-control"
                                name="names"
                                placeholder="Ingrese su nombre o sus nombres"
                                value={this.state.names}
                                onChange={this.onChange}
                            />
                            <p style={{color:"red"}}>{this.state.names_error}</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="first_surname">Apellido paterno</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_surname"
                                placeholder="Ingrese su apellido paterno"
                                value={this.state.first_surname}
                                onChange={this.onChange}
                            />
                            <p style={{color:"red"}}>{this.state.first_surname_error}</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="second_surname">Apellido materno</label>
                            <input
                                type="text"
                                className="form-control"
                                name="second_surname"
                                placeholder="Ingrese su apellido materno"
                                value={this.state.second_surname}
                                onChange={this.onChange}
                            />
                            <p style={{color:"red"}}>{this.state.second_surname_error}</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="direction">Dirección</label>
                            <input
                                type="text"
                                className="form-control"
                                name="direction"
                                placeholder="Ingrese su dirección ej: Sacaba Av. bolivar #2343"
                                value={this.state.direction}
                                onChange={this.onChange}
                            />
                            <p style={{color:"red"}}>{this.state.direction_error}</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Ingrese su email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                            <p style={{color:"red"}}>{this.state.email_error}</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="phone">Numero de celular</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                placeholder="Ingrese su numero de celular"
                                value={this.state.phone}
                                onChange={this.onChange}
                            />
                            <p style={{color:"red"}}>{this.state.phone_error}</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="ci">Numero de ci</label>
                            <input
                                type="text"
                                className="form-control"
                                name="ci"
                                placeholder="Ingrese su numero de ci"
                                value={this.state.ci}
                                onChange={this.onChange}
                            />
                            <p style={{color:"red"}}>{this.state.ci_error}</p>
                        </div>
                        <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                                Datos de Auxiliatura
                        </h3>
                        <div className="form-group col-md-12">
                            <label htmlFor="aux">Selecciona una auxiliatura</label>
                            <Select
                                isMulti
                                name="aux"
                                options={op}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder=""
                                value={selectedOption}
                                onChange={this.selectChange}
                            />
                            <p style={{color:"red"}}>{this.state.selectedOption_error}</p>
                        </div>
                        <div style={{color:'red'}} className=" h5 col-md-12 mt-4 text-center">
                            <p>¡Antes de confirmar verifica tus datos!</p>
                        </div>
                        <button type="submit" className="col btn btn-lg btn-info mt-2">
                            Confirmar registro e imprimir Rotulado
                        </button>
                    </div>
                </form>
        )
    }
}

/*<button type="submit" className="px-5 btn btn-lg btn-info">
                                Confirmar registro 
                            </button>*/

export default Register