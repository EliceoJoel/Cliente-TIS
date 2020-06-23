import React, { Component } from 'react'
import axios from 'axios'

var ArrayAuxi = []

 class Post extends Component {
     constructor() {
         super()
         //this.inputRef = React.createRef()

         this.state = { 
            file: null,
            file_error: '',
            name :'' ,
            name_error: '',
            year: '' ,
            year_error: '',
            type: 'Docencia', 
            departament: 'Departamento de Sistemas-Informatica',
            selectedOption: null,
            selectedOption_error:'',
            array_error:'' ,
            item:'',
            item_error:'',
            auxiliary:'',
            auxiliary_error:'',
            requirement:'',
            tematica:'' ,
            post_announcement_acomplish:'' , 
           
         }
     }

    onChange =  (e) =>{
        this.setState({[e.target.name]: e.target.value })
        this.setState({post_announcement_acomplish:''})
    }
    onChangeAux =  (e) =>{
        this.setState({[e.target.name]: e.target.value })
    }

    handleRemove(AuxEvent){
        AuxEvent.preventDefault()
        ArrayAuxi.pop()
        console.log(ArrayAuxi)
        
       
    }
    handleAux(AuxEvent){
        
       AuxEvent.preventDefault()
       this.setState({
        item_error: '', 
        auxiliary_error: '',
       })
       if(this.validAux()){  

        var arreglo = {}
      
       //  arreglo.item = item;
        // arreglo.name = auxiliary;
        arreglo.item = this.state.item
        arreglo.name = this.state.auxiliary
        //arreglo.item = item
        //arreglo.name = auxiliary
       
        capturar();
        var Arreglo = JSON.stringify(ArrayAuxi); 
        
        function capturar(){
         ArrayAuxi.push(arreglo);
         console.log(ArrayAuxi)
        }
        
        return Arreglo
        }
    }
    
    validAux(){        
        if(this.state.item === ''){
            this.setState({item_error:'Campo vacio'})
        }
        else if(this.state.item.length > 15){
            this.setState({item_error:'Dato ingresado demasiado largo'})
        }
        else if(this.state.auxiliary === ''){
            this.setState({auxiliary_error:'Campo vacio'})
        }
        else if(this.state.item.length > 40){
            this.setState({auxiliary_error:'Dato ingresado demasiado largo'})
        }
        else{

              return true;
        }
      
    }
     

    valid(){        
        if(this.state.name === ''){
            this.setState({name_error:'Campo vacio'})
        }
        else if(this.state.year === ''){
            this.setState({year_error:'Campo vacio'})
        }
        else if(this.state.year.length > 30){
            this.setState({year_error:'Dato ingresado demasiado largo'})
        }
     
        else if(this.state.file === null){
            this.setState({file_error:'Seleccione un documento .pdf'})
        }
        // else if(ArrayAuxi.length === 0){
        //     this.setState({array_error:'Seleccione al menos una auxiliatura'})
        // }
        else{
            return true;
        }
    }
    handleReq(reqevent ){
        reqevent.preventDefault()
        let name = this.state.name
        let requirement = this.state.requirement
        let reqconv = new FormData()
        reqconv.append ('name_announcement', name)
        reqconv.append ('requirement', requirement)
        axios({
            method: 'post',
            url: 'api/requirement',
            data: reqconv,
            headers: {'Content-Type': 'multipart/form-data' }
            }).then(response =>{
             console.log(response)
         }) 
         .catch(error => {
             console.log(error)
         })
    }
 
    handleFile = (event) =>{ 
        this.setState({file: event.target.files[0]}  )
        
    }
      
    handleUpload(e ){
         e.preventDefault()
        
               this.setState({
            name_error: '', 
            year_error: '',
            selectedOption_error:'',
            file_error:'',
            array_error:'' , 
         file:'' ,
     
        
    })
   console.log(this.inputRef);
   //this.inputRef.current.value = "" 
    
        if(this.valid()){       
         let name = this.state.name
         let year = this.state.year
         let type = this.state.type
         let departament = this.state.departament
         let send = new FormData()
             
             send.append('name', name)
             send.append('year', year )
             send.append('type', type)
             send.append('departament', departament)
             //send.append('auxiliary',JSON.stringify(ArrayAuxi))
             //send.append('filepdf', this.state.file, this.state.file.name)
             send.append('filepdf', this.state.file, this.state.file.name)
             console.log(this.state.file);
             console.log(this.state.file.name);
             
             send.append('file' , this.state.file.name)
             axios({
                method: 'post',
                url: 'api/announcement',
                data: send,
                headers: {'Content-Type': 'multipart/form-data' }
                }).then(response =>{
                   // this.setState({ file:null})
                    //this.inputRef.current.value = "" 
                 this.setState({post_announcement_acomplish:'Convocatoria Publicada con Exito'})
                 this.setState({name:''})
                 this.setState({year:''})
                 this.setState({type: 'Docencia'})
                 this.setState({ departament: 'Departamento de Sistemas-Informatica'})
              
                let dataAnnouncement = response.data
                let idAnnouncement = dataAnnouncement.id    
                let sendConfigMerit = new FormData()
                sendConfigMerit.append('id_announcement' , idAnnouncement)
                sendConfigMerit.append('type' , 'merit')
                sendConfigMerit.append('configuration' , 'false')
                axios({
                    method: 'post',
                    url: 'api/configAnnouncement',
                    data: sendConfigMerit,
                    headers: {'Content-Type': 'multipart/form-data' }
                    }).then(response =>{
                     console.log(response)
                 }) 
                 .catch(error => {
                     console.log(error)
                 })
                 let sendConfigKnnowledge = new FormData()
                sendConfigKnnowledge.append('id_announcement' , idAnnouncement)
                sendConfigKnnowledge.append('type' , 'knowledge')
                sendConfigKnnowledge.append('configuration' , 'false')
                axios({
                    method: 'post',
                    url: 'api/configAnnouncement',
                    data: sendConfigKnnowledge,
                    headers: {'Content-Type': 'multipart/form-data' }
                    }).then(response =>{
                     console.log(response)
                 }) 
                 .catch(error => {
                     console.log(error)
                 })

                console.log(idAnnouncement);
                
             }) 
             .catch(error => {
                 console.log(error)
             })
            }

     }
    
     handleTematica(e){
        e.preventDefault()
        let tematica= this.state.tematica
            let send = new FormData()
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

     }


    render() {
        //  const {name ,year, type, departament,item,auxiliary, requirement, tematica} =this.state
        const {name ,year, type, departament} =this.state

        
        return (
            <form noValidate onSubmit={this.onSubmit}>
               {/* enctype = 'multipart/FormData' */}
            <div className="justify-content-center">
           
            <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white">
                 Publicacion de convocatorias </h1>
                 <div className="row">
                <div >
          
                        <p></p>
                        </div>
                        <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                            Datos de la Convocatoria</h3>
                        
                        <div className="form-group col-md-6">
                        <label htmlFor="Nombre">Nombre</label>
                        <input    
                         className="form-control"   
                         placeholder="Ingrese un nombre"                 
                        type = "text"
                        name = "name"
                        value = {name}  
                         onChange = {this.onChange}                     
                        />
                         <p style={{color:"red"}}>{this.state.name_error}</p>
                        </div>

                        <div className="form-group col-md-6">
                        <label htmlFor="Gestion">Gestion</label>
                       
                         <input 
                         className="form-control"  
                         placeholder="1-2019"
                        type = "text"
                        name = "year"
                        value = {year}  
                         onChange = {this.onChange}                     
                        />
                         <p style={{color:"red"}}>{this.state.year_error}</p>
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="Tipo">Tipo</label>
                        <select  className="form-control" 
                                 name="type" 
                                 value={type}
                                 onChange = {this.onChange}>
                            <option>Docencia</option>
                            <option>Laboratorio</option>


                        </select>
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="Departamento">Departamento</label>
                        
                        <select  
                                className="form-control" 
                                name="departament" 
                                 value={departament}
                                 onChange = {this.onChange}>
                            <option>Departamento de Sistemas-Informatica</option>
                            <option>Departamento de Biologia</option>
                            <option>Departamento de Matematicas</option>
                            <option>Departamento de Fisica</option>
                            <option>Departamento de Quimica</option>
                        </select>
                        </div>
{/* 
                        <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                            Requisitos de Convocatoria</h3>
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
                        
                         </div>
                         <div className="form-group col-md-12 ">  
                         <button className="btn btn-outline-info" variant="warning" onClick ={(reqevent) => this.handleReq(reqevent)} >Agregar</button>
                         </div> */}
                        {/* <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                            Datos de Auxiliatura</h3>
                      <div className="form-group col-md-6">
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
                        </div> */}
                        {/* <div className="form-group col-md-6">
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
                      <button   className="btn btn-outline-info mx-3" variant="warning"onClick ={(AuxEvent) => this.handleRemove(AuxEvent)} >Remover Ultimo Ingresado</button>
                     <p style={{color:"red"}}>{this.state.array_error}</p>
                    </div>
                    <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                            Datos de Tematica</h3>
                      <div className="form-group col-md-6">
                        <label htmlFor="Nombre">Item</label>
               
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
                      <button className="btn btn-outline-info" variant="warning" onClick ={(e) => this.handleTematica(e)} >Agregar</button>
                 
                    </div>
                    <p></p>
                    <div className="ml-4">
                            {ArrayAuxi.map(arreglo =>
                                <div key = {arreglo.item}>
                                     <label htmlFor="item">item : {arreglo.item},</label>
                                     <label htmlFor="auxiliary">auxiliatura : {arreglo.name}</label>
                                 </div>   )}
                    </div> */}
                        <p></p>
                        <div className="form-group col-md-12 ">
                        <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                            Archivo Convocatoria</h3>
                       <p></p>
                       <p></p>
                        <input 
                            onChange={(event) => this.handleFile(event)}
                            type = "file" 
                            name = "file" 
                            accept = "application/pdf"
                            // ref = {this.inputRef}
                        />
                        
                        <p style={{color:"red"}}>{this.state.file_error}</p>
                       </div>
                     </div>  
                  <div>
                     
                <button className=" btn btn-info mt-2 mb-5"onClick ={(e) => this.handleUpload(e)} >Publicar Convocatoria</button>
                <div style={{color:'green'}} className=" h5 col-md-12 mt-4">
                <p>{this.state.post_announcement_acomplish}</p>
                        </div>
               
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
            </form>
        )
    }
}
// onClick ={(e) => this.handleUpload(e)}
export default Post
