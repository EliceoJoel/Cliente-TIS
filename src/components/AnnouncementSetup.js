import React, { Component } from 'react'
import Select from 'react-select'
import {getAnnouncement} from './UserFunctions'
import axios from 'axios'
//import {getAnnouncementIDGenerateRotulate} from './UserFunctions'
var conv  = [] 

export class AnnouncementSetup extends Component {
  
    constructor(props) {
        super(props)
    
        this.state = {
            found:[] ,
            requirement:'',
            item:'',
            auxiliary:'',
            tematica:'',
            showData:false  ,
            nameMerit:'',
            descriptionMerit:'' ,
            showAuxiliary:false,
            showRequirement:false,
            showMerit:false,
            showTheme:false ,
            typeAnnouncement:'merito',
            porcentageAnnouncement:'' ,
            tablePercentageAnnouncement:[],
            tablePercentageAnnouncementOrder:[] ,
            tableRequirement:[],
            tableRequirementOrder:[],
            tableMerit:[],
            tableMeritOrder:[],
            tableAuxiliary:[],
            tableAuxiliaryOrder:[],
            tableTheme:[],
            tableThemeOrder:[] ,
            requirement_error:'' ,
            themeAction: false
        }
    }
    onChangeAux =  (e) =>{
        this.setState({[e.target.name]: e.target.value })
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    selectConvChange = selectedConvOption =>{
       
        this.setState({selectedOptionConv:selectedConvOption})
       
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
        this.setState({
            showAuxiliary:false ,
             showRequirement:false,
             showMerit:false,
             showTheme:false,
             showPercentage: false,
            themeAction: false
          } )
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
             this.setState({showData: true})
            if(  this.state.found[0].type === 'Laboratorio' ) {
                this.setState({ themeAction: true })
            }
           
           
         }) 
         .catch(error => {
             console.log(error)
            
         })
        

    }
    handleReq(e){
        e.preventDefault()
        this.setState({
           requirement_error:'',
            modifyRequirementWarning: '' ,
            deleteRequirementWarning:'' ,
            
        })
        console.log(this.state.requirement);
        
        if (this.validAnnouncementRequirement()){
           
        let req= this.state.requirement
            let send = new FormData()
            send.append('name_announcement', this.state.found[0].name)
            send.append('requirement',req)
            axios({
                method: 'post',
                url: 'api/requirement',
                data: send,
                headers: {'Content-Type': 'multipart/form-data' }
                }).then(response =>{
                 console.log(response)
             }) 
             .catch(error => {
                 console.log(error)
             })
         this.handleTableRequirement()
        }
        
    }
    handleAux(e){
        e.preventDefault()
        this.setState({item:'', auxiliary:''})
        let item= this.state.item
        let auxiliary= this.state.auxiliary
            let send = new FormData()
            send.append('id_announcement', this.state.found[0].id)
            send.append('item',item)
            send.append('name',auxiliary)
            axios({
                method: 'post',
                url: 'api/auxiliary',
                data: send,
                headers: {'Content-Type': 'multipart/form-data' }
                }).then(response =>{
                 console.log(response)
             }) 
             .catch(error => {
                 console.log(error)
             })
             let conv = this.state.found[0].id
             let sendIdAnnouncement = new FormData()
             sendIdAnnouncement.append('id_announcement', conv)
             axios({
                 method: 'post',
                 url: 'api/auxiliarySearch',
                 data: sendIdAnnouncement,
                 headers: { 'Content-Type': 'multipart/form-data' }
             }).then(response => {
                 this.setState({ tableAuxiliary: response.data });
                 console.log(this.state.tableAuxiliary);
                 this.state.tableAuxiliary.sort(function (a, b) {
                     if (a.item > b.item) {
                         return 1;
                     }
                     if (a.item < b.item) {
                         return -1;
                     }
                     return 0;
                 });
     
                 console.log(this.state.tableAuxiliary);
                 this.setState({ tableAuxiliaryOrder: this.state.tableAuxiliary });
     
     
             })
                 .catch(error => {
                     console.log(error)
     
                 })
    }
    handleTheme(e){
        e.preventDefault()
        this.setState({tematica:''})
        let tematica= this.state.tematica
            let send = new FormData()
            send.append('id_announcement', this.state.found[0].id)
            send.append('name',tematica)
            axios({
                method: 'post',
                url: 'api/themeAuxiliary',
                data: send,
                headers: {'Content-Type': 'multipart/form-data' }
                }).then(response =>{
                 console.log(response)
             }) 
             .catch(error => {
                 console.log(error)
             })
             let conv = this.state.found[0].id
             console.log(conv);
             
             let sendIdAnnouncement = new FormData()
             sendIdAnnouncement.append('id_announcement', conv)
             axios({
                 method: 'post',
                 url: 'api/themeAuxiliarySearch',
                 data: sendIdAnnouncement,
                 headers: { 'Content-Type': 'multipart/form-data' }
             }).then(response => {
                 this.setState({ tableTheme: response.data });
                 console.log(this.state.tableTheme);
                 this.state.tableTheme.sort(function (a, b) {
                     if (a.name > b.name) {
                         return 1;
                     }
                     if (a.name < b.name) {
                         return -1;
                     }
                     return 0;
                 });
     
                 console.log(this.state.tableTheme);
                 this.setState({ tableThemeOrder: this.state.tableTheme });
     
     
             })
                 .catch(error => {
                     console.log(error)
     
                 })
    }
    handleMerit(e){
        e.preventDefault()
        this.setState({nameMerit:'', descriptionMerit:''})
        let name= this.state.nameMerit
        let description= this.state.descriptionMerit
            let send = new FormData()
            send.append('id_announcement', this.state.found[0].id)
            send.append('name_announcement', this.state.found[0].name)
            send.append('name',name)
            send.append('description',description)
            send.append('number', 0)
            axios({
                method: 'post',
                url: 'api/merit',
                data: send,
                headers: {'Content-Type': 'multipart/form-data' }
                }).then(response =>{
                 console.log(response)
             }) 
             .catch(error => {
                 console.log(error)
             })
              
          let conv = this.state.found[0].id
          console.log(conv);
          
          let sendIdAnnouncement = new FormData()
          sendIdAnnouncement.append('id_announcement', conv)
          axios({
              method: 'post',
              url: 'api/meritByAnnouncementConfig',
              data: sendIdAnnouncement,
              headers: { 'Content-Type': 'multipart/form-data' }
          }).then(response => {
              this.setState({ tableMerit: response.data });
              console.log(this.state.tableMerit);
              this.state.tableMerit.sort(function (a, b) {
                  if (a.name > b.name) {
                      return 1;
                  }
                  if (a.name < b.name) {
                      return -1;
                  }
                  return 0;
              });
  
              console.log(this.state.tableMerit);
              this.setState({ tableMeritOrder: this.state.tableMerit });
  
  
          })
              .catch(error => {
                  console.log(error)
  
              })
    }
    handleRequirementConfiguration(e){
        e.preventDefault()
        this.setState({
           showAuxiliary:false ,
            showRequirement:true,
            showMerit:false,
            showTheme:false,
            showPercentage: false,
            requirement_error:''
         } )
     this.handleTableRequirement()

    }
    handleAuxConfiguration(e){
        e.preventDefault()
        this.setState({
            showAuxiliary:true ,
             showRequirement:false,
             showMerit:false,
             showTheme:false,
             showPercentage: false
 
          } )
          let conv = this.state.found[0].id
          let sendIdAnnouncement = new FormData()
          sendIdAnnouncement.append('id_announcement', conv)
          axios({
              method: 'post',
              url: 'api/auxiliarySearch',
              data: sendIdAnnouncement,
              headers: { 'Content-Type': 'multipart/form-data' }
          }).then(response => {
              this.setState({ tableAuxiliary: response.data });
              console.log(this.state.tableAuxiliary);
              this.state.tableAuxiliary.sort(function (a, b) {
                  if (a.item > b.item) {
                      return 1;
                  }
                  if (a.item < b.item) {
                      return -1;
                  }
                  return 0;
              });
  
              console.log(this.state.tableAuxiliary);
              this.setState({ tableAuxiliaryOrder: this.state.tableAuxiliary });
  
  
          })
              .catch(error => {
                  console.log(error)
  
              })
          
      
    }
    handleMeritConfiguration(e){
        e.preventDefault()
        this.setState({
            showAuxiliary:false ,
             showRequirement:false,
             showMerit:true,
             showTheme:false,
             showPercentage: false
             
          } )
        
          let conv = this.state.found[0].id
          console.log(conv);
          
          let sendIdAnnouncement = new FormData()
          sendIdAnnouncement.append('id_announcement', conv)
          axios({
              method: 'post',
              url: 'api/meritByAnnouncementConfig',
              data: sendIdAnnouncement,
              headers: { 'Content-Type': 'multipart/form-data' }
          }).then(response => {
              this.setState({ tableMerit: response.data });
              console.log(this.state.tableMerit);
              this.state.tableMerit.sort(function (a, b) {
                  if (a.name > b.name) {
                      return 1;
                  }
                  if (a.name < b.name) {
                      return -1;
                  }
                  return 0;
              });
  
              console.log(this.state.tableMerit);
              this.setState({ tableMeritOrder: this.state.tableMerit });
  
  
          })
              .catch(error => {
                  console.log(error)
  
              })
    }
    handleThemeConfiguration(e){
        e.preventDefault()
        this.setState({
            showAuxiliary:false ,
             showRequirement:false,
             showMerit:false,
             showTheme:true,
             showPercentage: false
 
          } )
          let conv = this.state.found[0].id
          console.log(conv);
          
          let sendIdAnnouncement = new FormData()
          sendIdAnnouncement.append('id_announcement', conv)
          axios({
              method: 'post',
              url: 'api/themeAuxiliarySearch',
              data: sendIdAnnouncement,
              headers: { 'Content-Type': 'multipart/form-data' }
          }).then(response => {
              this.setState({ tableTheme: response.data });
              console.log(this.state.tableTheme);
              this.state.tableTheme.sort(function (a, b) {
                  if (a.name > b.name) {
                      return 1;
                  }
                  if (a.name < b.name) {
                      return -1;
                  }
                  return 0;
              });
  
              console.log(this.state.tableTheme);
              this.setState({ tableThemeOrder: this.state.tableTheme });
  
  
          })
              .catch(error => {
                  console.log(error)
  
              })
    }
  
    handlePercentageAnnouncement(e) { 
        e.preventDefault()
            this.setState({
            showAuxiliary:false ,
             showRequirement:false,
             showMerit:false,
             showTheme:false,
            showPercentage: true,
            percentageKnowledgeDoc_error:'',
            modifyWarning: '' ,
            deleteWarning:'' ,
 
          } )
    
        this.handleTablePercentage()
    }
    handleAddPorcentageAnnouncement() {
        this.setState({
            percentageKnowledgeDoc_error:'',
            modifyWarning: '' ,
            deleteWarning:'' ,
            
        })
         if (this.validAnnouncementPercentage()) {

        let type = this.state.typeAnnouncement

        let porcentage = this.state.porcentageAnnouncement
        let send = new FormData()
        send.append('id_announcement', this.state.found[0].id)
        send.append('type', type)
        send.append('percentage', porcentage)
        axios({
            method: 'post',
            url: 'api/percentageAnnouncement',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            console.log('a', response)
            if (response.data === false) {
                this.setState({ percentageKnowledgeDoc_error: 'el digito excede el porcentaje' })
            } else {
                this.setState({ modifyWarning: 'Elemento Modificado con exito' })
                this.setState({ percentageKnowledgeDoc_error: '' })

            }
        })
            .catch(error => {
                console.log(error)

            })

            this.handleTablePercentage()
        }
    }
    validAnnouncementPercentage(){
        if (this.state.porcentageAnnouncement === '') {
            this.setState({ percentageKnowledgeDoc_error: 'Campo Vacio' })
        }
        else if (this.state.porcentageAnnouncement.length > 2 || isNaN(this.state.porcentageAnnouncement) || this.state.porcentageAnnouncement < 1) {
            this.setState({ percentageKnowledgeDoc_error: 'Porcentaje Incorrecto' })
        }
        else {
            return true; 
        }
    }
    validAnnouncementRequirement(){
        if (this.state.requirement === '') {
            console.log('a' ,this.state.requirement);
            
            this.setState({ requirement_error: 'Campo Vacio' })
        }
        else if (this.state.requirement.length > 250) {
            this.setState({ requirement_error: 'Requisito Demasiado Largo' })
        }
        else {
            return true; 
        }
    }

    handleRemoveElementAnnouncement(e) {
        this.setState({
            deleteWarning: '',
            modifyWarning: ''

        })
        console.log(e.id);
        let idpercentage = e.id
        let send = new FormData()
        send.append('id_percentage', idpercentage)
        axios({
            method: 'post',
            url: 'api/percentageAnnouncementDelete',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            console.log(res);
 this.setState({ deleteWarning: 'se elimino el elemento con exito' })
        })
            .catch(error => {
                console.log(error)

            })
     
            this.handleTablePercentage()
    }
    handleTablePercentage(){
        let idconvocato = this.state.selectedOptionConv.value
        let sendIdAnnouncement = new FormData()
        sendIdAnnouncement.append('id_announcement', idconvocato)
        axios({
            method: 'post',
            url: 'api/percentageAnnouncementByAnnouncement',
            data: sendIdAnnouncement,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            this.setState({ tablePercentageAnnouncement: response.data });
            console.log(this.state.tablePercentageAnnouncement);
            this.state.tablePercentageAnnouncement.sort(function (a, b) {
                if (a.type > b.type) {return 1;}
                if (a.type < b.type) {return -1;}
                return 0;
            });
            console.log(this.state.tablePercentageAnnouncement);
            this.setState({ tablePercentageAnnouncementOrder: this.state.tablePercentageAnnouncement });
        })
            .catch(error => {
                console.log(error)
            })

    }
    handleTableRequirement(){
        let conv = this.state.found[0].name
        let sendIdAnnouncement = new FormData()
        sendIdAnnouncement.append('conv', conv)
        axios({
            method: 'post',
            url: 'api/requirementList',
            data: sendIdAnnouncement,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            this.setState({ tableRequirement: response.data });
            console.log(this.state.tableRequirement);
            this.state.tableRequirement.sort(function (a, b) {
                if (a.requirement > b.requirement) {
                    return 1;
                }
                if (a.requirement < b.requirement) {
                    return -1;
                }
                return 0;
            });

            console.log(this.state.tableRequirement);
            this.setState({ tableRequirementOrder: this.state.tableRequirement });


        })
            .catch(error => {
                console.log(error)

            })
    }
    handleRemoveRequirement(e){
        let idRequirement = e.id
        let send = new FormData()
        send.append('id_requirement', idRequirement)
        axios({
            method: 'post',
            url: 'api/requirementDelete',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            console.log(res);
 this.setState({ deleteWarning: 'se elimino el elemento con exito' })
        })
            .catch(error => {
                console.log(error)

            })
       this.handleTableRequirement()
    }
    handleRemoveAuxiliary(e){
        let idAuxiliary = e.id
        let send = new FormData()
        send.append('id_auxiliary', idAuxiliary)
        axios({
            method: 'post',
            url: 'api/auxiliaryDelete',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            console.log(res);
 this.setState({ deleteWarning: 'se elimino el elemento con exito' })
        })
            .catch(error => {
                console.log(error)

            })
        let conv = this.state.found[0].id
        let sendIdAnnouncement = new FormData()
        sendIdAnnouncement.append('id_announcement', conv)
        axios({
            method: 'post',
            url: 'api/auxiliarySearch',
            data: sendIdAnnouncement,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            this.setState({ tableAuxiliary: response.data });
            console.log(this.state.tableAuxiliary);
            this.state.tableAuxiliary.sort(function (a, b) {
                if (a.item > b.item) {
                    return 1;
                }
                if (a.item < b.item) {
                    return -1;
                }
                return 0;
            });

            console.log(this.state.tableAuxiliary);
            this.setState({ tableAuxiliaryOrder: this.state.tableAuxiliary });


        })
            .catch(error => {
                console.log(error)

            })
        
    }
    handleRemoveMerit(e){
        
        let idMerit = e.id
        let send = new FormData()
        send.append('id_merit', idMerit)
        axios({
            method: 'post',
            url: 'api/deleteMeritConfig',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            console.log(res);
 this.setState({ deleteWarning: 'se elimino el elemento con exito' })
        })
            .catch(error => {
                console.log(error)

            })
        let conv = this.state.found[0].id
        console.log(conv);
        
        let sendIdAnnouncement = new FormData()
        sendIdAnnouncement.append('id_announcement', conv)
        axios({
            method: 'post',
            url: 'api/meritByAnnouncementConfig',
            data: sendIdAnnouncement,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            this.setState({ tableMerit: response.data });
            console.log(this.state.tableMerit);
            this.state.tableMerit.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });

            console.log(this.state.tableMerit);
            this.setState({ tableMeritOrder: this.state.tableMerit });


        })
            .catch(error => {
                console.log(error)

            })

    }
    handleRemoveTheme(e){
         
        let idTheme = e.id
        let send = new FormData()
        send.append('id_theme', idTheme)
        axios({
            method: 'post',
            url: 'api/deleteTheme',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            console.log(res);
 this.setState({ deleteWarning: 'se elimino el elemento con exito' })
        })
            .catch(error => {
                console.log(error)

            })
 let conv = this.state.found[0].id
          console.log(conv);
          
          let sendIdAnnouncement = new FormData()
          sendIdAnnouncement.append('id_announcement', conv)
          axios({
              method: 'post',
              url: 'api/themeAuxiliarySearch',
              data: sendIdAnnouncement,
              headers: { 'Content-Type': 'multipart/form-data' }
          }).then(response => {
              this.setState({ tableTheme: response.data });
              console.log(this.state.tableTheme);
              this.state.tableTheme.sort(function (a, b) {
                  if (a.name > b.name) {
                      return 1;
                  }
                  if (a.name < b.name) {
                      return -1;
                  }
                  return 0;
              });
  
              console.log(this.state.tableTheme);
              this.setState({ tableThemeOrder: this.state.tableTheme });
  
  
          })
              .catch(error => {
                  console.log(error)
  
              })
    }
    render() {
        const { selectedOptionConv,requirement,item,auxiliary,tematica , nameMerit , descriptionMerit ,typeAnnouncement ,porcentageAnnouncement} = this.state
        return (
           
             <div className="justify-content-center">
           
                  <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white rounded">
                     Configuracion de Convocatoria </h1>    
                 
                   <div className="row">
                    <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                            Datos de Convocatoria</h3>
                            <div className="form-group col-md-8">
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
                           <button type="button" className="col btn btn-info mt-3" variant="warning" onClick={(e) => this.handleSearchAnnouncement(e)} >Buscar Convocatoria</button>
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

                  
                          {this.state.showData?
                       
                         <div>
                         <button className="btn btn-outline-info  mx-2" variant="warning" onClick={(e) => this.handlePercentageAnnouncement(e)} >PORCENTAJE</button>
                          <button className="btn btn-outline-info  mx" variant="warning" onClick={(e) => this.handleRequirementConfiguration(e)} >DOCUMENTOS A PRESENTAR</button>
                        
                          
                              
                          <button className="btn btn-outline-info  mx-2" variant="warning" onClick={(e) => this.handleAuxConfiguration(e)} >AUXILIATURAS</button>
                        
                          <button className="btn btn-outline-info  mx-2" variant="warning" onClick={(e) => this.handleMeritConfiguration(e)} >MERITOS</button>
                       
                        
                     
                         </div>
                          :null}
                             {this.state.themeAction?
                            <button className="btn btn-outline-info  mx-2" variant="warning" onClick={(e) => this.handleThemeConfiguration(e)} >TEMATICAS</button>
                            :null}
                            {this.state.showRequirement?
                            <div className="col-md-12">
                            <div className="row">
                        <div  className="col-md-12">
                        <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                            Documentos a presentar en esta convocatoria</h3>
                      <div className="form-group col-md-12">
                        <label htmlFor="Nombre">Requisito</label>
               
                       <textarea    
                           className="form-control"   
                           placeholder="Ingrese un requisito"                   
                             type = "text"
                          name = "requirement"
                          value = {requirement}  
                           onChange = {this.onChangeAux}                     
                       />
                         <p style={{ color: "red" }}>{this.state.requirement_error}</p>
                         </div>
                         <div className="form-group col-md-12 ">  
                         <button className="btn btn-outline-info" variant="warning" onClick ={(reqevent) => this.handleReq(reqevent)} >Agregar</button>
                         </div>
                         </div>
                         <div className="col-md-12">
                                 <br></br>
                            

                                 <label className="col-md-4 text-info font-weight-bold text-center" htmlFor="Nombre">REQUISITOS</label>

                                 <div className="my-1" style={{ border: "0.5px solid silver", width: "100%" }}></div>
                             </div>
                         <div>
                         {this.state.tableRequirementOrder.map(data =>
                                 <div key={data.id}>
                                     <div className="container">
                                     <div className="row row-cols-12">
                                             <div className="col-md-8">
                                                 {data.requirement}
                                             </div>
                                             <br></br>
  
                                             <div className="col-md-2 text-center">
                                                 <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleRemoveRequirement(data)
                                                 } >Eliminar</button>


                                             </div>
                                             <br></br>
                                         </div>
                                         <div className="my-1" style={{ border: "0.3px solid silver", width: "100%" }}></div>
                                     </div>
                                 </div>
                             )}
                         </div>
                         </div>
                         </div>
                         :null}
                           {this.state.showAuxiliary?
                          <div className="row">
                        <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                            Datos de Auxiliatura</h3>
                            
                      <div className="form-group col-md-4">
                        <label htmlFor="Nombre">Item</label>
               
                       <input    
                           className="form-control"   
                           placeholder="Ingrese un item"                   
                             type = "text"
                          name = "item"
                          value = {item}  
                           onChange = {this.onChangeAux}                     
                       />
                           <p style={{color:"red"}}>{this.state.item_error}</p>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="Nombre">Auxiliatura</label>
                          <input    
                           className="form-control" 
                           placeholder="Ingrese un nombre"                     
                            type = "text"
                            name = "auxiliary"
                            value = {auxiliary}  
                            onChange = {this.onChangeAux}                     
                      />
                         <p style={{color:"red"}}>{this.state.auxiliary_error}</p>
                      </div>
                      
                     
                      <div className="form-group col-md-12 ">    
                      <button className="btn btn-outline-info" variant="warning" onClick ={(AuxEvent) => this.handleAux(AuxEvent)} >Agregar</button>
                    
                     <p style={{color:"red"}}>{this.state.array_error}</p>
                    </div>
                    <div className="col-md-12">
                                 <br></br>
                            

                                 <label className="col-md-2 text-info font-weight-bold text-center" htmlFor="Nombre">ITEM</label>
                                 <label className="col-md-8 text-info font-weight-bold text-center" htmlFor="Nombre">NOMBRE</label>
                                 <div className="my-1" style={{ border: "0.5px solid silver", width: "100%" }}></div>
                                 {this.state.tableAuxiliaryOrder.map(data =>
                                 <div key={data.id}>
                                     <div className="container">
                                         <div className="row row-cols-4">
                                             <div className="col-md-4">
                                                 {data.item}
                                             </div>
                                             <div className="col-md-5">
                                                 {data.name}
                                             </div>
                                             <br></br>
  
                                             <div className="col-md-2 text-center">
                                                 <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleRemoveAuxiliary(data)
                                                 } >Eliminar</button>


                                             </div>
                                             <br></br>
                                         </div>
                                         <div className="my-1" style={{ border: "0.3px solid silver", width: "100%" }}></div>
                                     </div>
                                 </div>
                             )}
                             </div>
                  
                    </div>
                    
                    :null}
                    {this.state.showTheme?
                     <div className="col-md-12">
                     <div className="row">
                    <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                            Datos de Tematica</h3>
                      <div className="form-group col-md-12">
                        <label htmlFor="Nombre">Tematica</label>
               
                       <input    
                           className="form-control"   
                           placeholder="Ingrese una tematica"                   
                             type = "text"
                          name = "tematica"
                          value = {tematica}  
                           onChange = {this.onChangeAux}                     
                       />
                       
                        </div>                    
                     
                      <div className="form-group col-md-12 ">    
                      <button className="btn btn-outline-info" variant="warning" onClick ={(e) => this.handleTheme(e)} >Agregar</button>
                 
                    </div>
                    <div className="col-md-12">
                                 <br></br>
                            

                                
                                 <label className="col-md-8 text-info font-weight-bold text-center" htmlFor="Nombre">NOMBRE</label>
                                 <div className="my-1" style={{ border: "0.5px solid silver", width: "100%" }}></div>
                                 {this.state.tableThemeOrder.map(data =>
                                 <div key={data.id}>
                                     <div className="container">
                                         <div className="row row-cols-4">
                                            
                                             <div className="col-md-8">
                                                 {data.name}
                                             </div>
                                             <br></br>
  
                                             <div className="col-md-2 text-center">
                                                 <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleRemoveTheme(data)
                                                 } >Eliminar</button>


                                             </div>
                                             <br></br>
                                         </div>
                                         <div className="my-1" style={{ border: "0.3px solid silver", width: "100%" }}></div>
                                     </div>
                                 </div>
                             )}
                             </div>
                  
                    </div>
                     </div>
                    :null}
                    {this.state.showMerit?
                    <div className="row">
                    <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                            Datos de Merito</h3>
                            
                      <div className="form-group col-md-4">
                        <label htmlFor="Nombre">Nombre</label>
               
                       <input    
                           className="form-control"   
                           placeholder="Ingrese un nombre"                   
                             type = "text"
                          name = "nameMerit"
                          value = {nameMerit}  
                           onChange = {this.onChangeAux}                     
                       />
                           <p style={{color:"red"}}>{this.state.item_error}</p>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="Nombre">Descripcion</label>
                          <input    
                           className="form-control" 
                           placeholder="Ingrese un nombre"                     
                            type = "text"
                            name = "descriptionMerit"
                            value = {descriptionMerit}  
                            onChange = {this.onChangeAux}                     
                      />
                         <p style={{color:"red"}}>{this.state.auxiliary_error}</p>
                      </div>
                      
                     
                      <div className="form-group col-md-12 ">    
                      <button className="btn btn-outline-info" variant="warning" onClick ={(AuxEvent) => this.handleMerit(AuxEvent)} >Agregar</button>
                      {/* <button   className="btn btn-outline-info mx-3" variant="warning"onClick ={(AuxEvent) => this.handleRemove(AuxEvent)} >Remover Ultimo Ingresado</button> */}
                     <p style={{color:"red"}}>{this.state.array_error}</p>
                    </div>
                    <div className="col-md-12">
                                 <br></br>
                            

                                 <label className="col-md-4 text-info font-weight-bold text-center" htmlFor="Nombre">NOMBRE</label>
                                 <label className="col-md-5 text-info font-weight-bold text-center" htmlFor="Nombre">DESCRIPCION</label>
                                 <div className="my-1" style={{ border: "0.5px solid silver", width: "100%" }}></div>
                                 {this.state.tableMeritOrder.map(data =>
                                 <div key={data.id}>
                                     <div className="container">
                                         <div className="row row-cols-4">
                                             <div className="col-md-4">
                                                 {data.name}
                                             </div>
                                             <div className="col-md-5">
                                                 {data.description}
                                             </div>
                                             <br></br>
  
                                             <div className="col-md-2 text-center">
                                                 <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleRemoveMerit(data)
                                                 } >Eliminar</button>


                                             </div>
                                             <br></br>
                                         </div>
                                         <div className="my-1" style={{ border: "0.3px solid silver", width: "100%" }}></div>
                                     </div>
                                 </div>
                             )}
                             </div>
                    </div>
                        :null}    
                        {this.state.showPercentage?
                         <div>
                         <div className="row">
                             <br></br>
                             <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                            Datos de Porcentaje</h3>
                            <label className= "h5 col-md-12 my-4 font-weight-normal text-center" > 
                            Configurar los porcentajes de la convocatoria seleccionando un tipo y asignandole un porcentaje</label>
                             <div className="form-group col-md-6">
                                 <br></br>
                                 <label htmlFor="theme">Seleccione un Tipo</label>
                                 <select
                                     className="form-control"

                                     name="typeAnnouncement"
                                     // placeholder=""
                                     value={typeAnnouncement}
                                     onChange={this.onChange}>
                                     <option>merito </option>
                                     <option>conocimiento</option>



                                 </select>
                                 <p style={{ color: "red" }}>{this.state.selectedThemeOption_error}</p>
                             </div>
                             <div className="form-group col-md-4">
                                 <br></br>
                                 <label htmlFor="porcentaje">Porcentaje</label>

                                 <input
                                     className="form-control"
                                     placeholder="Ejemplo:1-100"
                                     type="number"
                                     name="porcentageAnnouncement"
                                     value={porcentageAnnouncement}
                                     onChange={this.onChange}
                                 />

                                 <p style={{ color: "red" }}>{this.state.percentageKnowledgeDoc_error}</p>
                             </div>

                             <div className="form-group col-md-12 ">
                                 <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleAddPorcentageAnnouncement(e)} >Agregar Cambio</button>
                                 <p style={{ color: "red" }}>{this.state.deleteWarning}</p>
                                 <p style={{ color: "green" }}>{this.state.modifyWarning}</p>
                             </div>
                         </div>
                         <div>

                             <div className="col-md-12">
                                 <br></br>
                                 <label className="col-md-4 text-info font-weight-bold" htmlFor="Nombre">TIPO DE EXAMEN</label>

                                 <label className="col-md-4 text-info font-weight-bold text-center" htmlFor="Nombre">PORCENTAJE</label>

                                 <div className="my-1" style={{ border: "0.5px solid silver", width: "100%" }}></div>
                             </div>



                             {this.state.tablePercentageAnnouncementOrder.map(data =>
                                 <div key={data.id}>
                                     <div className="container">
                                         <div className="row row-cols-4">
                                             <div className="col-md-4">
                                                 {data.type}
                                             </div>
                                             <br></br>
                                             <div className="col-md-4 text-center">
                                                 {data.percentage}

                                             </div>


                                             <div className="col-md-2 text-center">
                                                 <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleRemoveElementAnnouncement(data)
                                                 } >Eliminar</button>


                                             </div>
                                             <br></br>
                                         </div>
                                         <div className="my-1" style={{ border: "0.3px solid silver", width: "100%" }}></div>
                                     </div>
                                 </div>
                             )}
                                 <br></br>
                                      {/* <button className="btn btn-outline-info mx-3" variant="warning" onClick={(AuxEvent) => this.handleEndConfigurationAnnouncement(AuxEvent)} >TERMINAR CONFIGURACION DOC</button>
                                      <p style={{ color: "red" }}>{this.state.knowledgeDocWarningFinish}</p> */}
                           
                         </div>
                     </div> 
                    
                    :null}
                      
                   </div>
                          <br></br>
                        <br></br>
                        <br></br>
                       
                   </div>

             
          
        )
    }
}


export default AnnouncementSetup