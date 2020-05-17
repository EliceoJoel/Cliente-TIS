import React, { Component } from 'react'
import Select from 'react-select'
import {getAnnouncement} from './UserFunctions'
import axios from 'axios'
var conv  = [] 
var auxSelect = []
var themeSelect = []

export class ScoreSetup extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            found:[],
            announcementlab: false,
            themeaux:[],
            aux:[],
            porcentage:'',
            tabla: [] ,
            addpercentage: false ,
            tablaOrdenada: [],
            auxiliarylist: false
             
        }
    }
    onChange =  (e) =>{
        this.setState({[e.target.name]: e.target.value })
    }
    selectConvChange = selectedConvOption =>{
       
        this.setState({selectedOptionConv:selectedConvOption})
       
    }
    selectAuxSelectChange = selectedAuxOption =>{
       
        this.setState({selectedOptionAux:selectedAuxOption})
       
    }
    selectThemeSelectChange = selectedThemeOption =>{
       
        this.setState({selectedOptionTheme:selectedThemeOption})
       
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

    handleSearchAnnouncement (){
        this.setState({auxiliarylist:false})
        this.setState({addpercentage: false})
        this.setState({announcementlab: false})
        let conv =  this.state.selectedOptionConv.label
        console.log(conv);
        let send = new FormData()
        send.append('conv', conv )
        axios({
            method: 'post',
            url: 'api/announcementSearch',
            data: send,
            headers: {'Content-Type': 'multipart/form-data' }
            }).then(response =>{

            // this.found = response.data
             this.setState({found: response.data})
             console.log(this.state.found)
             if (this.state.found[0].type === 'Laboratorio'){
                this.setState({announcementlab: true})
             }
            
           
         }) 
         .catch(error => {
             console.log(error)
            
         })
       
        

    }
    handleKnowledge(e){
        this.setState({addpercentage: true})
        e.preventDefault()
        let send = new FormData()
        let send2 = new FormData()
        send.append('id_announcement', this.state.found[0].id)
        send2.append('id_announcement', this.state.found[0].id)
        axios({
            method: 'post',
            url: 'api/auxiliarySearch',
            data: send2,
            headers: {'Content-Type': 'multipart/form-data' }
            }).then(res =>{

            // this.found = response.data
             this.setState({themeaux: res.data})
             console.log(this.state.themeaux)    
             for (var i=0; i < this.state.themeaux.length; i++) {
                var object = {}
                object.value = this.state.themeaux[i].id
                object.label = this.state.themeaux[i].name
                auxSelect[i] = object
              }           
           
         }) 
         .catch(error => {
             console.log(error)
            
         })
        axios({
            method: 'post',
            url: 'api/themeAuxiliarySearch',
            data: send,
            headers: {'Content-Type': 'multipart/form-data' }
            }).then(response =>{

            // this.found = response.data
             this.setState({aux: response.data})
             console.log(this.state.aux) 
             for (var i=0; i < this.state.aux.length; i++) {
                var object = {}
                object.value = this.state.aux[i].id
                object.label = this.state.aux[i].name
                themeSelect[i] = object
              }     
                                 
           
         }) 
         .catch(error => {
             console.log(error)
            
         })
     
    }
    handleAddPorcentage(){
        this.setState({auxiliarylist:true})
        let aux =  this.state.selectedOptionAux.label
        let theme = this.state.selectedOptionTheme.label
        let porcentage = this.state.porcentage
        let send = new FormData()
        send.append('id_announcement', this.state.found[0].id)
        send.append ('auxiliary', aux)
        send.append ('theme', theme)
        send.append ('percentage' , porcentage)
        axios({
            method: 'post',
            url: 'api/percentageAuxiliary',
            data: send,
            headers: {'Content-Type': 'multipart/form-data' }
            }).then(response =>{
             console.log('a',response)
         }) 
         .catch(error => {
             console.log(error)
         })
         axios.get('/api/percentageAuxiliary')
          .then(response => {
             this.setState({tabla : response.data});
             console.log(this.state.tabla);
             this.state.tabla.sort(function (a, b) {
                if (a.auxiliary > b.auxiliary) {
                  return 1;
                }
                if (a.auxiliary < b.auxiliary) {
                  return -1;
                }
                return 0;
              });
             
              console.log(this.state.tabla);
              this.setState({tablaOrdenada : this.state.tabla});
         })
            .catch(e => {
              console.log(e);
      })

    }
    handleMeritScore(){
        return(
            <div>
            <h1>Hoal prueba</h1>
            <h1>Hoal prueba</h1>
            <h1>Hoal prueba</h1>
            <h1>Hoal prueba</h1>
            <label>dsgafd</label>
            </div>
        )
    }

  
    render() {
        const { selectedOptionConv , selectedOptionAux , selectedOptionTheme, porcentage} = this.state
        return (
           
             <div className="justify-content-center">
           
                  <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white">
                     Configuracion de Notas </h1>    
                 
                   <div className="row">
                    <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                            Datos de Convocatoria</h3>
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
                             <p style={{color:"red"}}>{this.state.selectedConvOption_error}</p>
                         </div>
                         <div className="form-group col-4 mt-3">
                           <button type="button" class="col btn btn-info mt-3" variant="warning" onClick={(e) => this.handleSearchAnnouncement(e)} >Buscar Convocatoria</button>
                        </div>
                        <div  className="col-md-12">
                              {this.state.found.map(enable =>
                                <div key = {enable.id}>                         
                                    <label htmlFor="nombre"><b>Nombre:</b> {enable.name}</label>
                                    <br></br>
                                    <label htmlFor="nombre"><b>Gestion:</b> {enable.year}</label>
                                    <br></br>
                                    <label htmlFor="nombre"><b>Tipo:</b> {enable.type}</label>
                                    <br></br>
                                    <label htmlFor="nombre"><b>Departamento:</b> {enable.departament}</label>
                                    <br></br>
                                  
                                </div>
                                )}
                        </div>
                        <div  className="col-md-12">
                        {/* <button className="btn btn-outline-info" variant="warning" onClick ={(AuxEvent) => this.handleMeritScore(AuxEvent)} >CONFIGURAR MERITO</button> */}
                      
                        {this.state.announcementlab?
                        <button   className="btn btn-outline-info mx-3" variant="warning"onClick ={(AuxEvent) => this.handleKnowledge(AuxEvent)} >CONFIGURAR CONOCIMIENTO</button>
                         :null}
                         <br></br>
                         {this.state.addpercentage? 


                        
                                  <div className="row">
                                       <br></br>
                                            <div className="form-group col-md-4">
                                       <br></br>
                                                 <label htmlFor="aux">Selecciona una auxiliatura</label>
                                                        <Select
                                                          name="aux"
                                                          options={auxSelect}
                                                          className="basic-multi-select "
                                                          classNamePrefix="select"
                                                          placeholder=""
                                                          value={selectedOptionAux}
                                                          onChange={this.selectAuxSelectChange}
                                                          />
                            
                                               </div>
                                               <div className="form-group col-md-4">
                                      <br></br>
                                                  <label htmlFor="theme">Selecciona una Tematica</label>
                                                      <Select
                                                         name="theme"
                                                        options={themeSelect}
                                                          className="basic-multi-select "
                                                          classNamePrefix="select"
                                                           placeholder=""
                                                               value={selectedOptionTheme}
                                                            onChange={this.selectThemeSelectChange}
                                                      />
                           
                                               </div> 
                                               <div className="form-group col-md-3">
                                       <br></br>
                                                 <label htmlFor="porcentaje">porcentaje</label>
                       
                                                          <input    
                                                         className="form-control"   
                                                         placeholder="Porcentaje"                   
                                                          type = "text"
                                                           name = "porcentage"
                                                          value = {porcentage}  
                                                           onChange = {this.onChange}                     
                                                         />
                        
                                              </div>                    
                     
                                                  <div className="form-group col-md-12 ">    
                                                          <button className="btn btn-outline-info" variant="warning" onClick ={(e) => this.handleAddPorcentage(e)} >Agregar</button>
                 
                                                  </div>
                         </div>
                         
                        :null}
                       {this.state.auxiliarylist?     
                      <div>
                          
                      <div className="col-md-12">
                        <br></br>
                            <label className="col-md-4 text-info font-weight-bold" htmlFor="Nombre">AUXILIATURA</label>
                            <label className="col-md-4 text-info font-weight-bold text-center" htmlFor="Nombre">TEMATICA</label>
                            <label className="col-md-2 text-info font-weight-bold text-center" htmlFor="Nombre">PORCENTAJE</label>
                          
                              <div className="my-1" style={{border:"0.5px solid silver", width: "100%"}}></div>     
                        </div>  
                        
                              <div className="col-md-12">
                        
                              {this.state.tablaOrdenada.map(data =>
                                <div key = {data.id}>
                                     <div className="container">
                                         <div className="row row-cols-4">
                                             <div className="col-md-4">                         
                                               {data.auxiliary} 
                                             </div>
                                              <div className="col-md-4 text-center">
                                                 {data.theme}
                                                
                                              </div>
                                              <div className="col-md-2 text-center">
                                                 {data.percentage}
                                                
                                              </div>
                                              <br></br>
                                             </div>
                                             <div className="my-1" style={{border:"0.3px solid silver", width: "100%"}}></div>
                                         </div>
                                </div>
                                )}

                                </div>
                             
                            </div> :null}
                      </div>
                    </div>

               </div>

         
          
        )
    }
}

export default ScoreSetup
