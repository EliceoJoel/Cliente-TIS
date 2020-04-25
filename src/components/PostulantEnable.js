import React, { Component } from 'react'
import {getAnnouncement} from './UserFunctions'
import Select from 'react-select'
import axios from 'axios'
//import {getAnnouncementID} from './UserFunctions'
var conv  = [] 
//var postulantenable = []
export class PostulantEnable extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             codSis:'' ,
             conv: ''
        }
    }
    
    onChange =  (e) =>{
        this.setState({[e.target.name]: e.target.value })
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

    
    selectConvChange = selectedConvOption =>{
       
        this.setState({selectedOptionConv:selectedConvOption})
        //this.setState({[selectedop.target.name]: e.target.value })
       // this.setState ({[selectedConvOption.name]: selectedConvOption.value })
       
    }
    // getPostulantEnable() {
    //     axios.get('/api/postulantenable')
    //     .then(response => {
    //         this.setState({postulantenable : response.data});
    //     })
    //     .catch(e => {
    //         console.log(e);
    //     })
    //   }

      handleSearch(e ){
        e.preventDefault()
        let codSis = this.state.codSis
        let conv =  this.state.selectedOptionConv.label
        let send = new FormData()
            
            send.append('codSis', codSis)
            send.append('conv', conv )
            axios({
               method: 'post',
               url: 'api/postulantEnableSearch',
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
        const {codSis} = this.state
        const { selectedOptionConv } = this.state
        //this.getPostulantEnable()
        return (
            <div className="justify-content-center">
           
            <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white">
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
 
                        </div>
                        <div>
                        <button className="btn btn-outline-info mt-4" variant="warning" onClick ={(e) => this.handleSearch(e)} >Buscar Postulante</button>

                        </div>
                        {/* <div>
                              {postulantenable.map(enable =>
                                <div key = {enable.id}>
                                     <label htmlFor="cod_sys">cod_sys : {enable.sys_code},</label>
                                     <label htmlFor="auxiliary">auxiliatura : {enable.auxiliary}</label>
                                 </div>   )}
                        </div> */}
                      </div>

                </div>
                   
        )
    }
}

export default PostulantEnable
