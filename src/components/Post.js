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
            selectedOption_error:''
          //  gfg
            
       
        //    ref: ''
        
         }
         //this.onChange = this.onChange.bind(this)
         //this.onSubmit = this.onSubmit.bind(this)
     }
     
    //  handleSelect = (evento) =>{
    //     this.setState({[evento.target.name]: evento.target.value })

    //  }
    
    onChange =  (e) =>{
        this.setState({[e.target.name]: e.target.value })
    }
    onChangeAux =  (e) =>{
        this.setState({[e.target.name]: e.target.value })
    }
    // selectChange = selectedOption =>{
    // this.setState(
    //     {selectedOption},
    //     () => console.log(this.state.selectedOption)
    // )
    
    //}
    handleAux(AuxEvent){
       AuxEvent.preventDefault()
        var arreglo = {}
     //   gfg = this.gfg
     // var  arreglo = {}
     // var hoal = []
      // var posicion = 0
     
            //console.log(this.state.item,this.state.auxiliary)
           arreglo.item = this.state.item
           arreglo.name = this.state.auxiliary
        
              capturar();
          
             var Arreglo = JSON.stringify(ArrayAuxi); 
           
           function capturar(){
               ArrayAuxi.push(arreglo);
              // ArrayAuxi.
               // hoal[posicion] = arreglo
               // posicion++
               // console.log(ArrayAuxi)
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
        else{
            return true;
        }

    }
    
    // getAux(){
    // var aux
    // for (var i=0; i < this.state.selectedOption.length; i++) {
    //     aux= aux + (JSON.stringify(this.state.selectedOption[i].value))+"\n"
    //   }
    // aux = aux.replace(/["']/g, "")
    // aux = aux.replace("undefined", "")
    // return aux;
    // }
 
    handleFile = (event) =>{ this.setState({file: event.target.files[0]})}
      
     handleUpload(e ){
         e.preventDefault()
               this.setState({
            name_error: '', 
            year_error: '',
            selectedOption_error:'',
            file_error:''
         
        })
        if(this.valid()){  
         //let file = this.state.file
        
         let name = this.state.name
         let year = this.state.year
         let type = this.state.type
        let departament = this.state.departament
        //et gfg = this.state.gfg
         let send = new FormData()
             
             send.append('name', name)
             send.append('year', year )
             send.append('type', type)
             send.append('departament', departament)
             //send.append('auxiliary', this.getAux())
             send.append('auxiliary',JSON.stringify(ArrayAuxi))
            
             send.append('filepdf', this.state.file, this.state.file.name)
             send.append('file' , this.state.file.name)
             //axios.post('api/announcement', send)
             axios({
                method: 'post',
                url: 'api/announcement',
                data: send,
                //headers: { 'Content-Type': 'application/json' }
                headers: {'Content-Type': 'multipart/form-data' }
                }).then(response =>{
                 console.log(response)
             }) 
             .catch(error => {
                 console.log(error)
             })
            }

     }
    
     
    // onSubmit (e) {
    //     e.preventDefault()

    //     //clear error state
    //     this.setState({
    //         name_error: '', 
    //         year_error: '',
    //         selectedOption_error:'',
    //         file_error:''
         
    //     })

    //     if(this.valid()){  
            
    //         const newAnnouncement = {
    //             name: this.state.name,
    //             year: this.state.year,
    //             type: this.state.type,
    //             departament: this.state.departament,
    //             auxiliary:this.getAux(),
    //             file: this.state.file
    //         }
    //         console.log(newAnnouncement);

    //         registerAnnouncement (newAnnouncement).then(res => {
    //            this.props.history.push(`/`)
    //         })
    //     }
    // }


    render() {
         const {name ,year, type, departament,item,auxiliary } =this.state
     //    const { selectedOption } = this.state
         

        
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

                       
                         
                
{/*                    
                   <div className="form-group col-md-12">
                       <label htmlFor="Auxiliatura">Auxiliatura</label>
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
                    </div> */}
      <p></p>
           
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
                      
                     
                      <div className="form-group col-md-10 ">    
                      <button variant="warning" onClick ={(AuxEvent) => this.handleAux(AuxEvent)} >Agregar</button>
                     <button  variant="warning"onClick ={(AuxEvent) => this.handleRemove(AuxEvent)} >Remover Ultimo Ingresado</button>
                    </div>
                  <p></p>
                 
                        {/* <div>
                            <ul>
                                {auxlist}
                            </ul>
                        </div> */}

                    <div className="form-group col-md-10 ">
                           <label htmlFor="Archivo">Archivo</label>
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
