import React, { Component } from 'react'
import * as jsPDF from 'jspdf'
import Select from 'react-select'
//import axios from 'axios'
import {registerP} from './UserFunctions'
import {getAnnouncement} from './UserFunctions'
//import {getAnnouncementID} from './UserFunctions'
import {getAnnouncementIDGenerateRotulate} from './UserFunctions'

//format of valid email
var validMail = /\w+@\w+\.+[a-z]/;
var aux = []
var conv = []

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
            sis_code: '',
            sis_code_error: '',
            selectedConvOption: null,
            selectedConvOption_error: '',
            selectedAuxOption: null,
            selectedAuxOption_error: '',
            showAux: false,
            selectedOptionAux:null,
            selectedOptionConv:null,
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
        this.setState({
            names_error: '', 
            first_surname_error: '',
            second_surname_error: '',
            direction_error: '',
            email_error: '',
            phone_error:'',
            selectedOption_error:'',
            ci_error:'',
            sis_code_error:'',
        })
    }
    
    selectAuxChange = selectedAuxOption =>{
        this.setState({selectedAuxOption_error:''})
        this.setState({selectedAuxOption})
        this.setState({selectedOptionAux:selectedAuxOption})
    }

    selectConvChange = selectedConvOption =>{
        this.setState({selectedConvOption_error:''})
        this.setState({selectedConvOption},()=>this.fillAuxiliary())
        this.setState({selectedOptionConv:selectedConvOption})
        this.setState({showAux:true})
        this.setState({selectedOptionAux:null})
        //delete auxiliary array data
        console.log(aux)
        var array = []
        aux = array
    }
    // fillAuxiliary(){
        
    //     getAnnouncementID(this.state.selectedConvOption.value).then(res => {
    //         var auxiliary = JSON.parse(res.auxiliary)
    //         for(var i=0 ; i<auxiliary.length ; i++){
    //             var object = {}
    //             object.value = auxiliary[i].item
    //             object.label = auxiliary[i].name
    //             aux[i] = object
    //         }
    //     })
    // }
    fillAuxiliary(){
        
        getAnnouncementIDGenerateRotulate(this.state.selectedConvOption.value).then(res => {
            console.log(res);
              var auxiliary = res
           // var auxiliary = JSON.parse(res)
            for(var i=0 ; i<auxiliary.length ; i++){
                var object = {}
                object.value = auxiliary[i].item
                object.label = auxiliary[i].name
                aux[i] = object
            }
        })
    }

    //field validation function
    valid(){        
        if(this.state.names === ''){
            this.setState({names_error:'Campo vacio'})
        }
        else if(this.state.names.length > 60){
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
        else if(this.state.sis_code === ''){
            this.setState({sis_code_error:'Campo vacio'})
        }
        else if(this.state.sis_code.length > 9 || this.state.sis_code.length < 8 || isNaN(this.state.sis_code)){
            this.setState({sis_code_error:'codigo sis incorrecto'})
        }
        else if(this.state.selectedConvOption === null){
            this.setState({selectedConvOption_error:'Seleccione una convocatoria'})
        }
        else if(this.state.selectedAuxOption === null){
            this.setState({selectedAuxOption_error:'Seleccione una auxiliatura'})
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
            ci_error:'',
            sis_code_error:'',
            selectedAuxOption_error:'',
            selectedConvOption_error:''
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
                sis_code: this.state.sis_code,
                announcement: this.state.selectedConvOption.label,
                auxiliary:this.getAuxs()
            }

            registerP(newPostulant).then(res => {
               this.props.history.push(`/Generar.rotulado`)
            })

            //clear selected
            this.setState({
                selectedOptionAux:null,
                selectedOptionConv:null
            })

        }

    }


    getAuxs(){
        var auxs
        for (var i=0; i < this.state.selectedAuxOption.length; i++) {
            auxs= auxs + (JSON.stringify(this.state.selectedAuxOption[i].label))+"\n"
          }
        auxs = auxs.replace(/["']/g, "")
        auxs = auxs.replace("undefined", "")
        return auxs;
    }
    
    //method for generate pdf
    generatePDF(){
        var doc = new jsPDF('p', 'mm', 'letter')
        doc.setFontSize(25)
        doc.line(15, 10, 200, 10) //horizontal top line
        doc.line(200, 10, 200, 115+(10*this.state.selectedAuxOption.length)) //vertical left line
        doc.line(15, 10, 15, 115+(10*this.state.selectedAuxOption.length)) //vertical rigth line
        doc.line(15, 115+(10*this.state.selectedAuxOption.length), 200, 115+(10*this.state.selectedAuxOption.length)) //horizontal button line
        doc.text('Nombre(s) = ' + this.state.names,20,20)
        doc.text('Apellido paterno = ' + this.state.first_surname,20,30)
        doc.text('Apellido Materno = ' + this.state.second_surname,20,40)
        doc.text('Dirección = ' + this.state.direction,20,50)
        doc.text('Email = ' + this.state.email,20,60)
        doc.text('Celular = ' + this.state.phone,20,70)
        doc.text('Ci = ' + this.state.ci,20,80)
        doc.text('Codigo sis = ' + this.state.sis_code,20,90)
        doc.text('Convocatoria = ' + this.state.selectedConvOption.label,20,100)
        doc.text('Auxiliatura(s) = ',20,110)
        doc.setFontSize(15)
        for(var i=0; i<this.state.selectedAuxOption.length; i++){
        doc.text(this.state.selectedAuxOption[i].value + ' ' + this.state.selectedAuxOption[i].label, 20, 120+(i*10))
        }
        doc.save('Mi_rotulado.pdf')
    }


    render () {
        const { selectedOptionAux } = this.state
        const { selectedOptionConv } = this.state
        return (
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-12 my-3 p-3 bg-info text-white rounded">
                            <h1 className="h3 font-weight-normal text-center">
                                Generado de rotulado
                            </h1>
                        </div>
                        <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                                Datos del postulante
                        </h3>
                        <div className="form-group col-md-4">
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
                        <div className="form-group col-md-4">
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
                        <div className="form-group col-md-4">
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
                        <div className="form-group col-md-4">
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
                        <div className="form-group col-md-4">
                            <label htmlFor="email">Email</label>
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
                        <div className="form-group col-md-4">
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
                        <div className="form-group col-md-4">
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
                        <div className="form-group col-md-4">
                            <label htmlFor="sis_code">Codigo sis</label>
                            <input
                                type="text"
                                className="form-control"
                                name="sis_code"
                                placeholder="Ingrese su codigo sis"
                                value={this.state.sis_code}
                                onChange={this.onChange}
                            />
                            <p style={{color:"red"}}>{this.state.sis_code_error}</p>
                        </div>
                        <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                                Datos de Auxiliatura
                        </h3>
                        <div className="form-group col-md-6">
                            <label htmlFor="conv">Selecciona una convocatoria</label>
                            <Select
                                name="conv"
                                options={conv}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder=""
                                value={selectedOptionConv}
                                onChange={this.selectConvChange}
                            />
                            <p style={{color:"red"}}>{this.state.selectedConvOption_error}</p>
                        </div>
                        {this.state.showAux?
                        <div className="form-group col-md-6">
                            <label htmlFor="aux">Selecciona una auxiliatura</label>
                            <Select
                                isMulti
                                name="aux"
                                options={aux}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder=""
                                value={selectedOptionAux}
                                onChange={this.selectAuxChange}
                            />
                            <p style={{color:"red"}}>{this.state.selectedAuxOption_error}</p>
                        </div>
                        :null
                        }
                        <div style={{color:'red'}} className=" h5 col-md-12 mt-4">
                            <p>¡Antes de confirmar verifica tus datos!</p>
                        </div>

                        {/* <div className = "col md 4">   </div>  
                        <div  className = "col md 4">
                        <button type="submit" className=" btn btn-info mt-2 mb-5">
                            Confirmar registro e imprimir Rotulado
                        </button>
                        </div>
                        <div className = "col md 4">   </div>   */}
  <button type="submit" className=" btn btn-info mt-2 mb-5">
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
