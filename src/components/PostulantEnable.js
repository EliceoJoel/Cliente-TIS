import React, { Component } from 'react'
import {getProfile , getUserAnnouncements} from './UserFunctions'
import Select from 'react-select'
import axios from 'axios'
//import {getAnnouncementID} from './UserFunctions'
//var conv  = [] 
// var auxst = []
//var liatura = []
//var postulantenable = []
export class PostulantEnable extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             codSis:'' ,
             conv: '' ,
             postulant: [] ,
             found:[] , 
             req:[] ,
             auxs: [] ,
             reason: '' ,
             showList: false,
             auxst:[],
             auxilisturaSeleccionada:'',
             allRequirementsCheckList:[],
             enableButton:false,
             disableReasonInput:false,
             enableMessageState:'INHABILITADO',
             CorrectlySendChanges:'' ,
             //manejo de errores
            
             //selectedConvOption: null,
             selectedOptionConv: null,
             selectedConvOption_error:'',
             codSis_error:'',
             notfound_error:'' ,
             //conv: [] , 
            //  reason :''
            
             showData:false
             
        }
    }
    
    onChange =  (e) =>{
        this.setState({[e.target.name]: e.target.value })
    }
    onChangeReason =  (e) =>{
        this.setState({[e.target.name]: e.target.value })
    }
    // componentDidMount() {
    //     // getAnnouncement().then(res => {
    //     //     for (var i=0; i < res.length; i++) {
    //     //         var object = {}
    //     //         object.value = res[i].id
    //     //         object.label = res[i].name
    //     //         conv[i] = object
    //     //       }
    //     // })
    //     getProfile().then(res => {
    //         console.log(res);
            
    //         this.setState({
    //             idUser: res.user.id
               
                
    //         }) 
    //         console.log(this.state.idUser);
    //         getUserAnnouncements(this.state.idUser).then(res=>{

    //             let announcementArray = []
    //             console.log(res);
    //             for (var i = 0; i < res.length; i++) {
    //                 var object = {}
    //                 object.value = res[i].id
    //                 object.label = res[i].name
    //                 announcementArray[i] = object
    //             } this.setState({conv: announcementArray})
    //         })

    //     })
        
        
    // }
    async componentDidMount() {
        let user = await getProfile()
        console.log(user.user.id)
        let announcements = await getUserAnnouncements(user.user.id)
        let announcementArray = []
        for (var i = 0; i < announcements.length; i++) {
            var object = {}
            object.value = announcements[i].id
            object.label = announcements[i].name
            announcementArray[i] = object
        }
        this.setState({conv:announcementArray})    
    }
    splitArray(){
        let a = this.state.found[0]
       console.log("a",a);
        
       //this.setState({auxs: a})
      // this.auxs = "Hola Como estas"
         let auxs = a.auxiliary.split("\n")
        for(var i=0 ; i<auxs.length ; i++){
            var Componentes = {}
            Componentes.axiliatura = auxs[i]
           
            auxs[i] = Componentes
            console.log(Componentes)
        }

        console.log(auxs)
        this.setState({auxst:auxs})
    
        
    }
    
    selectConvChange = selectedConvOption =>{
       
        this.setState({selectedOptionConv:selectedConvOption})
       
    }
   

       handleSearch(e ){
        e.preventDefault()
        this.setState({
            selectedConvOption_error:'',
            codSis_error:'',
            notfound_error:'' ,
            CorrectlySendChanges:''
        })
        if(this.valid()){  
        let codSis = this.state.codSis
        let conv =  this.state.selectedOptionConv.label
        let send = new FormData()
        //let found = []
            
            send.append('codSis', codSis)
            send.append('conv', conv )
          // send.append('conv', 'Conv-Aux' )
            axios({
               method: 'post',
               url: 'api/registerBookEnable',
               data: send,
               headers: {'Content-Type': 'multipart/form-data' }
               }).then(response =>{

               // this.found = response.data
                this.setState({found: response.data ,  showData:true})
                console.log(this.state.found)
                this.splitArray()
                console.log(this.state.auxst)
               
            }) 
            .catch(error => {
                console.log(error)
                this.setState({notfound_error:"No existe ese postulante en esa convocatoria"})
                this.setState({showList:false})
                this.setState({showData:false})
            })
        }
           
        
    }
    
    handleReq(e ){
     
        this.setState({req:[]})
        this.setState({reason:''})
        this.setState({CorrectlySendChanges:''})
        this.setState({reason_error:''})
        
              
        this.setState({ enableMessageState:'INHABILITADO'})
        //this.listaDeChecks()
       // this.gil(true)
        this.setState({allRequirementsCheckList:[]})
        this.setState({enableButton:false})
        this.setState({disableReasonInput:false})
        console.log(e.axiliatura);
        this.setState({auxilisturaSeleccionada:e.axiliatura})
        let a = this.state.found[0].announcement
        console.log("gil", a);
        
        
      //e.preventDefault()
      
      //this.setState({nombreauxiliatura: e.target.value })
      //console.log(this.state.nombreauxiliatura)
      this.setState({showList:true})
      let conv =  this.state.selectedOptionConv.label
      let send = new FormData()
   
          send.append('conv', conv )
          axios({
             method: 'post',
             url: 'api/requirementList',
             data: send,
             headers: {'Content-Type': 'multipart/form-data' }
             }).then(response =>{


               
                
                 this.setState({req: response.data})
                

                // this.setState({isRequirementEmpty:false})
             // console.log(this.state.req)
          }) 
          .catch(error => {
              
              console.log(error)
          }) 
          

    }
    valid(){        
        if(this.state.codSis.length > 9 || this.state.codSis.length < 8 || isNaN(this.state.codSis)){
            this.setState({codSis_error:'codigo sis incorrecto'})
        }
        else if(this.state.selectedOptionConv === null){
            this.setState({selectedConvOption_error:'Seleccione una convocatoria'})
        }
        else if(this.state.found.length < 0){
            this.setState({notfound_error:'No existe ese postulante en esa convocatoria'})
        }
        else{
            return true;
        }
//
    }
    validEnable(){        
        if(this.state.reason === ''){
            this.setState({reason_error:'Por Favor Ingrese un Motivo de Inhabilitacion'})
        }
        else{
        
            return true;
        }
//
    }
    handleEnable(e){
        e.preventDefault()
        if (this.validEnable()){

                 this.setState({showList:false})
                 this.setState({CorrectlySendChanges: "Se guardaron los cambios en la auxliatura: " + this.state.auxilisturaSeleccionada})
                // this.setState({allRequirementsCheckList:[]})
                // this.setState({enableButton:false})
                 console.log("probando",this.state.req.length)
                 let idRegisterBook = this.state.found[0].id
                 let name =  this.state.found[0].names +" "+ this.state.found[0].first_surname +" " + this.state.found[0].second_surname
                 let auxiliary =  this.state.auxilisturaSeleccionada
                 let announcement =  this.state.found[0].announcement
                 let enable = this.state.enableButton
                 let reason = this.state.reason
                 let send = new FormData()
                     send.append('id_book', idRegisterBook)
                     send.append('name', name )
                     send.append('auxiliary', auxiliary )
                     send.append('announcement', announcement )
                     send.append('enable', enable )
                     send.append('reason', reason )
                     axios({
                        method: 'post',
                        url: 'api/postulantenable',
                        data: send,
                        headers: {'Content-Type': 'multipart/form-data' }
                        }).then(response =>{
                            console.log(response.data)
                            let score = new FormData()
                            score.append('id_postulant', response.data.id)
                            score.append('score', -1)
                            score.append('score_oral', -1)
                            axios({
                                method: 'post',
                                url: 'api/add',
                                data: score,
                                headers: {'Content-Type': 'multipart/form-data' }
                                }).then(response =>{
                            }) 
                            .catch(error => {
                                console.log(error)
                            })
                     }) 
                     .catch(error => {
                         console.log(error)
                     })  
                    
                    
                    }

    }

    handleChange(evt, requirement) {
        let value =
          evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
          console.log(value)

        let checkList = this.state.allRequirementsCheckList
        if(value){
            checkList.push(requirement)
            this.setState({allRequirementsCheckList: checkList})
        }else{
            const index = checkList.indexOf(requirement);
            if (index > -1) {
              checkList.splice(index, 1);
            }
            this.setState({allRequirementsCheckList: checkList})
            this.setState({enableButton:false})
            this.setState({disableReasonInput:false})
            this.setState({enableMessageState:'INHABILITADO'})
            this.setState({reason:' '})

        }
        console.log("the list", this.state.allRequirementsCheckList);
        

        let totalList = this.state.req.length
        let count = 0

        console.log("totallist", totalList);
        
        // eslint-disable-next-line no-unused-vars
        for(let item in this.state.allRequirementsCheckList){
            count++
        }
        if(count === totalList){
            this.setState({enableButton:true})
            this.setState({disableReasonInput:true})
            this.setState({enableMessageState:'HABILITADO'})
            this.setState({reason:' '})
           // this.setState({enableButton:true})
        //console.log("isButtonEdddddddddddddnabled" , this.state.enableButton);
            
        }

        console.log("isButtonEnabled" , this.state.enableButton);
        
       
      }


  

    render() {
        const {codSis, reason, disableReasonInput ,conv} = this.state
       // const {codSis, reason, disableReasonInput} = this.state
        const { selectedOptionConv } = this.state
        //this.getPostulantEnable()

        //let lista = this.state.postulant.auxiliary
        //let found = this.state.found
       // let newlista = lista
       // console.log(newlista);   
        return (
           
            <div className="justify-content-center">
           
            <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white rounded">
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
                         <p style={{color:"red"}}>{this.state.codSis_error}</p>
                         <p style={{color:"red"}}>{this.state.notfound_error}</p>
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
                             <p style={{color:"red"}}>{this.state.selectedConvOption_error}</p>
                        </div>
                        <div className="form-group col-4 mt-3">
                           <button type="button" class="col btn btn-info mt-3" variant="warning" onClick={(e) => this.handleSearch(e)} >Buscar Postulante</button>
                        </div>
                        {/* {this.showData? */}
                     
                          <div  className="col-md-12">
                              {this.state.found.map(enable =>
                                <div key = {enable.id}>                         
                                    <label htmlFor="nombre"><b>Nombre:</b> {enable.names} {enable.first_surname} {enable.second_surname}</label>
                                    <br></br>
                                    <label htmlFor="cod_sys"><b>Codigo Sis:</b> {enable.sis_code}</label>
                                    <br></br>
                                    <label htmlFor="auxiliary"><b>Convocatoria:</b> {enable.announcement}</label>
                                    <br></br>
                                    <label htmlFor="auxiliary"><b>Auxiliatura:</b> {this.state.auxilisturaSeleccionada}</label>
                                    <br></br>
                                    {/* <button className="btn btn-outline-info mt-4" variant="warning" onClick ={(e) => this.handleReq(e)}htmlFor="cod_sys">Auxiliatura</button> */}
                                </div>
                                )}
                                  {this.state.showData?
                                  <div className="form-row col-md-12">
                                {this.state.auxst.map(enable =>
                                  
                                        <button className="col-md-2 btn btn-outline-info mt-4 mx-3" variant="warning" value={enable.axiliatura} onClick ={(e) => this.handleReq(enable)}htmlFor="cod_sys">{enable.axiliatura}</button>
                                   
                                 )}</div> :null} 
                                  <p style={{color:"green"}} className="my-4"><b>{this.state.CorrectlySendChanges}</b></p>
                                  
                        </div>
                      
                       
                      
                        
                        <br></br>
                        
                        {this.state.showList?
                                
                      
                        <div className="col-md-12">  
                        
                        <div className="col-md-12">
                        <br></br>
                            <label className="col-md-8 text-info font-weight-bold" htmlFor="Nombre">DOCUMENTOS</label>
                            <label className="col-md-2 text-info font-weight-bold text-center" htmlFor="Nombre">CUMPLE</label>
                          
                              <div className="my-1" style={{border:"0.5px solid silver", width: "100%"}}></div>     
                        </div>  
                               <div className="col-md-12">
                           
                           {this.state.req.map(enable =>
                             <div key = {enable.id}>
                                  <div className="container">
                                      <div className="row row-cols-4">
                                          <div className="col-md-8">                         
                                            {enable.requirement} 
                                          </div>
                                           <div className="col-md-2 text-center">
                                               <input type="checkbox"  onChange={(event)=>this.handleChange(event,enable)}></input>
                                             
                                           </div>
                                          </div>
                                          <div className="my-1" style={{border:"0.3px solid silver", width: "100%"}}></div>
                                      </div>
                                    
                              </div>)}
                           </div>                               
                             
                      
                      <br></br>
                      <div className="form-group col-md-12">
                          <label htmlFor="Estado">Estado:</label>
                          <p style={{color:"blue"}}>{this.state.enableMessageState}</p>
                        
                         </div>  
                      
                      <div className="form-group col-md-12">
                          <label htmlFor="Motivo">Motivo de Inhabilitacion:</label>
                             <input    
                                  className="form-control"   
                                  placeholder="Ingrese un Motivo"                 
                                  type = "text"
                                  name = "reason"
                                  value = {reason}  
                                  disabled = {disableReasonInput}
                                 
                                  onChange = {this.onChangeReason}                     
                                />
                        <p style={{color:"red"}}>{this.state.reason_error}</p>
                         </div>  
                         <div className="col-md-12">
                         <button  className=" btn btn-info mt-2 mb-5" onClick ={(AuxEvent) => this.handleEnable(AuxEvent)} >Guardar Cambios</button>
                            </div>
                       </div>             
                        :null}
                    </div>  
                    <div>
                    <br></br>
                    <br></br>
                  
                </div>
              </div>
              
                
                   
        )
    }
}

export default PostulantEnable
