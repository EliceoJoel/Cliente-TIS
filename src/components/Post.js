import React, { Component } from 'react'
import axios from 'axios'

var ArrayAuxi = []

 class Post extends Component {
     constructor() {
         super()
     
         this.state = { 
            file: null,
            file_error: '',
            name :'' ,
            name_error: '',
            year: '' ,
            year_error: '',
            type: 'Docencia', 
            departament: 'Sistemas',
            selectedOption: null,
            selectedOption_error:'',
            array_error:''      
         }
     }

    onChange =  (e) =>{
        this.setState({[e.target.name]: e.target.value })
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
        var arreglo = {}
        arreglo.item = this.state.item
        arreglo.name = this.state.auxiliary
        capturar();
        var Arreglo = JSON.stringify(ArrayAuxi); 
        
        function capturar(){
        ArrayAuxi.push(arreglo);
        console.log(ArrayAuxi)
        }
        
        return Arreglo
    }


    valid(){        
        if(this.state.name === ''){
            this.setState({name_error:'Campo vacio'})
        }
        else if(this.state.name.length > 30){
            this.setState({name_error:'Dato ingresado demasiado largo'})
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
        else if(ArrayAuxi.length === 0){
            this.setState({array_error:'Seleccione al menos una auxiliatura'})
        }
        else{
            return true;
        }
    }

 
    handleFile = (event) =>{ this.setState({file: event.target.files[0]})}
      
    handleUpload(e ){
         e.preventDefault()
               this.setState({
            name_error: '', 
            year_error: '',
            selectedOption_error:'',
            file_error:'',
            array_error:''
         
    })
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
             send.append('auxiliary',JSON.stringify(ArrayAuxi))
            
             send.append('filepdf', this.state.file, this.state.file.name)
             send.append('file' , this.state.file.name)
             axios({
                method: 'post',
                url: 'api/announcement',
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
    


    render() {
         const {name ,year, type, departament,item,auxiliary } =this.state
         

        
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
                            <option>Sistemas</option>
                            <option>Informatica</option>
                            <option>Biologia</option>


                        </select>
                        </div>
                        <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                            Datos de Auxiliatura</h3>
                      <div className="form-group col-md-6">
                        <label htmlFor="Nombre">Item</label>
               
                       <input    
                           className="form-control"                    
                             type = "text"
                          name = "item"
                          value = {item}  
                           onChange = {this.onChangeAux}                     
                       />
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="Nombre">Auxiliatura</label>
                          <input    
                           className="form-control"                    
                            type = "text"
                            name = "auxiliary"
                            value = {auxiliary}  
                            onChange = {this.onChangeAux}                     
                      />
                      </div>
                      
                     
                      <div className="form-group col-md-12 ">    
                      <button className="btn btn-outline-info" variant="warning" onClick ={(AuxEvent) => this.handleAux(AuxEvent)} >Agregar</button>
                     <button   className="btn btn-outline-info mx-3" variant="warning"onClick ={(AuxEvent) => this.handleRemove(AuxEvent)} >Remover Ultimo Ingresado</button>
                     <p style={{color:"red"}}>{this.state.array_error}</p>
                    </div>
                    <p></p>
                    <div className="ml-4">
                            {ArrayAuxi.map(arreglo =>
                                <div key = {arreglo.item}>
                                     <label htmlFor="item">item : {arreglo.item},</label>
                                     <label htmlFor="auxiliary">auxiliatura : {arreglo.name}</label>
                                 </div>   )}
                    </div>
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
                        />
                        <p style={{color:"red"}}>{this.state.file_error}</p>
                       </div>
                     </div>  
                  <div>
                     
                <button className="col btn btn-lg btn-info mt-10 "onClick ={(e) => this.handleUpload(e)} >UPLOAD</button>
                
               
                </div>
            </div>
            </form>
        )
    }
}
// onClick ={(e) => this.handleUpload(e)}
export default Post
