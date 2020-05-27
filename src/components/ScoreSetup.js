import React, { Component } from 'react'
import Select from 'react-select'
import {  getProfile , getUserAnnouncements } from './UserFunctions'
//getAnnouncement ,
import axios from 'axios'
//var conv = []
//var auxSelect = []
//var themeSelect = []

export class ScoreSetup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            found: [],
            announcementlab: false,
            themeaux: [],
            aux: [],
            porcentage: '',
            tabla: [],
            addpercentage: false,
            tablaOrdenada: [],
            auxiliarylist: false,
            selectedConvOption_error: '',
            selectedOptionConv: null,
            selectedAuxOption_error: '',
            selectedThemeOption_error: '',
            percentage_error: '',
            selectedOptionAux: null,
            selectedOptionTheme: null ,
            idUser: '' ,
            conv: [] ,
            auxSelect: [] , 
            themeSelect: [] , 
            deleteWarning:'' ,
            modifyWarning: '' ,
            meritSelect: [] , 
            type:'Porcentaje' ,
            number:'' ,
            selectedOptionMerit: null ,
            announcementFound:false

        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    selectConvChange = selectedConvOption => {

        this.setState({ selectedOptionConv: selectedConvOption })

    }
    selectAuxSelectChange = selectedAuxOption => {

        this.setState({ selectedOptionAux: selectedAuxOption })

    }
    selectMeritSelectChange = selectedMeritOption => {

        this.setState({ selectedOptionMerit: selectedMeritOption })

    }
    selectThemeSelectChange = selectedThemeOption => {

        this.setState({ selectedOptionTheme: selectedThemeOption })

    }
    componentDidMount() {
    
        getProfile().then(res => {
            console.log(res);
            
            this.setState({
                idUser: res.user.id
               
                
            }) 
            console.log(this.state.idUser);
            getUserAnnouncements(this.state.idUser).then(res=>{
                console.log(res);
                let announcement = []
                for (var i = 0; i < res.length; i++) {
                    var object = {}
                    object.value = res[i].id
                    object.label = res[i].name
                    announcement[i] = object
                }
                this.setState({conv :announcement})
            })

        })
       
      
    }

    handleSearchAnnouncement() {
        this.setState({
            selectedConvOption_error: '',
            deleteWarning: ''

        })
        if (this.validAnnouncement()) {

             this.setState({auxiliarylist:false})
            this.setState({ addpercentage: false })
            this.setState({ announcementlab: false })
            this.setState({addMeritPercentage:false}) 
            let conv = this.state.selectedOptionConv.label
            console.log(conv);
            let send = new FormData()
            send.append('conv', conv)
            axios({
                method: 'post',
                url: 'api/announcementSearch',
                data: send,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(response => {
                this.setState({announcementFound:true}) 
                  this.setState({announcementFound:true}) 
                // this.found = response.data
                this.setState({ found: response.data })
                console.log(this.state.found)
                if (this.state.found[0].type === 'Laboratorio') {
                    this.setState({ announcementlab: true })
                    this.setState({ auxiliarylist: true })
                }


            })
                .catch(error => {
                    console.log(error)

                })

            let idconv = this.state.selectedOptionConv.value
            let sendIdAnnouncement = new FormData()
            sendIdAnnouncement.append('id_announcement', idconv)
            axios({
                method: 'post',
                url: 'api/percentageAuxiliaryAnnouncement',
                data: sendIdAnnouncement,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(response => {
                this.setState({ tabla: response.data });
                //console.log(this.state.tabla);
                this.state.tabla.sort(function (a, b) {
                    if (a.auxiliary > b.auxiliary) {
                        return 1;
                    }
                    if (a.auxiliary < b.auxiliary) {
                        return -1;
                    }
                    return 0;
                });

                //console.log(this.state.tabla);
                this.setState({ tablaOrdenada: this.state.tabla });


            })
                .catch(error => {
                    console.log(error)

                })

        
        }




    }
    handleKnowledge(e) {
        this.setState({
            selectedOptionAux: null,
            selectedOptionTheme: null,
            porcentage: '',
            deleteWarning: '' ,
            modifyWarning:''


        })
        this.setState({ addpercentage: true })
        this.setState({addMeritPercentage: false })
        e.preventDefault()
        let send = new FormData()
        let send2 = new FormData()
        send.append('id_announcement', this.state.found[0].id)
        send2.append('id_announcement', this.state.found[0].id)
        axios({
            method: 'post',
            url: 'api/auxiliarySearch',
            data: send2,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            let AuxArray = []
            // this.found = response.data
            this.setState({ themeaux: res.data })
            console.log(this.state.themeaux)
            for (var i = 0; i < this.state.themeaux.length; i++) {
                var object = {}
                object.value = this.state.themeaux[i].id
                object.label = this.state.themeaux[i].name
                AuxArray[i] = object
            }
            this.setState({ auxSelect:AuxArray})
        })
            .catch(error => {
                console.log(error)

            })
        axios({
            method: 'post',
            url: 'api/themeAuxiliarySearch',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            let ThemeArray =  []
            // this.found = response.data
            this.setState({ aux: response.data })
            console.log(this.state.aux)
            for (var i = 0; i < this.state.aux.length; i++) {
                var object = {}
                object.value = this.state.aux[i].id
                object.label = this.state.aux[i].name
                ThemeArray[i] = object
            }
            this.setState({ themeSelect:ThemeArray})

        })
            .catch(error => {
                console.log(error)

            })

    }
    handleAddPorcentage() {
        this.setState({
            selectedAuxOption_error: '',
            selectedThemeOption_error: '',
            percentage_error: '' ,
            modifyWarning:'' ,
            deleteWarning:'' ,
            //porcentage: ''
            

        })
        if (this.validPercentage()) {
            this.setState({ auxiliarylist: true })
            let aux = this.state.selectedOptionAux.label
            let theme = this.state.selectedOptionTheme.label
            let porcentage = this.state.porcentage
            let send = new FormData()
            send.append('id_announcement', this.state.found[0].id)
            send.append('auxiliary', aux)
            send.append('theme', theme)
            send.append('percentage', porcentage)
            axios({
                method: 'post',
                url: 'api/percentageAuxiliary',
                data: send,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(response => {
                console.log('a', response)
                if (response.data === false) {
                    this.setState({ percentage_error: 'el digito excede el porcentaje' })
                } else { 
                    this.setState({ modifyWarning: 'Elemento Modificado con exito' })
                    this.setState({ porcentage: '' })
                
                }
            })
                .catch(error => {
                    console.log(error)
                 
                })
       
            let idconv = this.state.selectedOptionConv.value
            let sendIdAnnouncement = new FormData()
            sendIdAnnouncement.append('id_announcement', idconv)
                axios({
                    method: 'post',
                    url: 'api/percentageAuxiliaryAnnouncement',
                    data: sendIdAnnouncement,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(response => {
                    this.setState({ tabla: response.data });
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
                    this.setState({ tablaOrdenada: this.state.tabla });
    
    
                })
                    .catch(error => {
                        console.log(error)
    
                    })

        }

    }
    handleMeritScore(e) {
        this.setState({ addpercentage: false })
        this.setState({addMeritPercentage: true })
        e.preventDefault()
        let send = new FormData()
        send.append('id_announcement', this.state.found[0].id)
        axios({
            method: 'post',
            url: 'api/meritSearch',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            let meritArray = []
            
            this.setState({ merit: res.data })
            console.log(this.state.merit)
            for (var i = 0; i < this.state.merit.length; i++) {
                var object = {}
                object.value = this.state.merit[i].id
                object.label = this.state.merit[i].name
                meritArray[i] = object
            }
            this.setState({ meritSelect:meritArray})
        })
            .catch(error => {
                console.log(error)

            })
    }
    handleAddMeritPercentage(){
        this.setState({
          })
       
          
            let merit = this.state.selectedOptionMerit.label
            let type = this.state.type
            let number = this.state.number
            let send = new FormData()
            send.append('id_announcement', this.state.found[0].id)
            send.append('name_announcement', this.state.found[0].name)
            send.append('name', merit)
            send.append('type', type)
            send.append('number', number)
        
            axios({
                method: 'post',
                url: 'api/meritUpdate',
                data: send,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(response => {
                console.log(response)
            })
                .catch(error => {
                    console.log(error)
                 
                })
       
         
    }
    validAnnouncement() {

        if (this.state.selectedOptionConv === null) {
            this.setState({ selectedConvOption_error: 'Seleccione una convocatoria' })
        }
        else {
            return true;
        }

    }
    validPercentage() {
        if (this.state.selectedOptionAux === null) {
            this.setState({ selectedAuxOption_error: 'Seleccione una auxiliatura' })
        }
        else if (this.state.selectedOptionTheme === null) {
            this.setState({ selectedThemeOption_error: 'Seleccione una tematica' })
        }
        else if (this.state.porcentage === '') {
            this.setState({ percentage_error: 'Campo Vacio' })
        }
        else if (this.state.porcentage.length > 2 || isNaN(this.state.porcentage )|| this.state.porcentage<1) {
            this.setState({ percentage_error: 'Porcentaje Incorrecto' })
        }
        else {
            return true;
        }

    }
    handleRemoveElement(e){
        this.setState({
            deleteWarning: '',
            modifyWarning:''

        })
        
        console.log(e.id);
         
        let idpercentage = e.id 
        let send = new FormData()
        send.append('id_percentage', idpercentage)
        axios({
            method: 'post',
            url: 'api/percentageAuxiliaryDelete',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            console.log(res);
           
        })
            .catch(error => {
                console.log(error)
          
            })
             this.setState({deleteWarning:'se elimino el elemento con exito' })
            let idconv = this.state.selectedOptionConv.value
            let sendIdAnnouncement = new FormData()
            sendIdAnnouncement.append('id_announcement', idconv)
                axios({
                    method: 'post',
                    url: 'api/percentageAuxiliaryAnnouncement',
                    data: sendIdAnnouncement,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(response => {
                    this.setState({ tabla: response.data });
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
                    this.setState({ tablaOrdenada: this.state.tabla });
    
    
                })
                    .catch(error => {
                        console.log(error)
    
                    })

          
        
    }
    render() {
        const { selectedOptionConv, selectedOptionAux, selectedOptionTheme, porcentage ,conv , auxSelect ,
             themeSelect , meritSelect , selectedOptionMerit ,type, number} = this.state
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
                        <p style={{ color: "red" }}>{this.state.selectedConvOption_error}</p>
                    </div>
                    <div className="form-group col-4 mt-3">
                        <button type="button" class="col btn btn-info mt-3" variant="warning" onClick={(e) => this.handleSearchAnnouncement(e)} >Buscar Convocatoria</button>
                    </div>
                    <div className="col-md-12">
                        {this.state.found.map(enable =>
                            <div key={enable.id}>
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
                    <div className="col-md-12">
                    {this.state.announcementFound ?
                        <button className="btn btn-outline-info" variant="warning" onClick ={(AuxEvent) => this.handleMeritScore(AuxEvent)} >CONFIGURAR MERITO</button>
                        : null}
                        {this.state.announcementlab ?
                            <button className="btn btn-outline-info mx-3" variant="warning" onClick={(AuxEvent) => this.handleKnowledge(AuxEvent)} >CONFIGURAR CONOCIMIENTO</button>
                            : null}
                        <br></br>
                        {this.state.addpercentage ?



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
                                    <p style={{ color: "red" }}>{this.state.selectedAuxOption_error}</p>
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
                                    <p style={{ color: "red" }}>{this.state.selectedThemeOption_error}</p>
                                </div>
                                <div className="form-group col-md-3">
                                    <br></br>
                                    <label htmlFor="porcentaje">Porcentaje</label>

                                    <input
                                        className="form-control"
                                        placeholder="Ejemplo:1-100"
                                        type="number"
                                        name="porcentage"
                                        value={porcentage}
                                        onChange={this.onChange}
                                    />
                                    
                                    <p style={{ color: "red" }}>{this.state.percentage_error}</p>
                                </div>

                                <div className="form-group col-md-12 ">
                                    <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleAddPorcentage(e)} >Agregar Cambio</button>
                                    <p style={{ color: "red" }}>{this.state.deleteWarning}</p>
                                      <p style={{ color: "green" }}>{this.state.modifyWarning}</p>
                                </div>
                            </div>

                            : null}

{this.state.addMeritPercentage ?



<div className="row">
    <br></br>
    <div className="form-group col-md-6">
        <br></br>
        <label htmlFor="aux">Seleccione un Merito</label>
        <Select
            name="merit"
            options={meritSelect}
            className="basic-multi-select "
            classNamePrefix="select"
            placeholder=""
            value={selectedOptionMerit}
            onChange={this.selectMeritSelectChange}
        />
        <p style={{ color: "red" }}>{this.state.selectedAuxOption_error}</p>
    </div>
    <div className="form-group col-md-3">
        <br></br>
                        <label htmlFor="Tipo">Tipo</label>
                        
                        <select  
                                className="form-control" 
                                
                                name="type" 
                               // placeholder=""
                                 value={type}
                                 onChange = {this.onChange}>
                            <option>Porcentaje</option>
                            <option>Nro Max</option>
                           


                        </select>
                        </div>
    <div className="form-group col-md-3">
        <br></br>
        <label htmlFor="porcentaje">Valor</label>

        <input
            className="form-control"
            placeholder="Ejemplo:1-100"
            type="number"
            name="number"
            value={number}
            onChange={this.onChange}
        />
        
        <p style={{ color: "red" }}>{this.state.percentage_error}</p>
    </div>

    <div className="form-group col-md-12 ">
        <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleAddMeritPercentage(e)} >Agregar Cambio</button>
        <p style={{ color: "red" }}>{this.state.deleteWarning}</p>
          <p style={{ color: "green" }}>{this.state.modifyWarning}</p>
    </div>
</div>

: null}
                        {this.state.auxiliarylist ?
                            <div>

                                <div className="col-md-12">
                                    <br></br>
                                    <label className="col-md-4 text-info font-weight-bold" htmlFor="Nombre">AUXILIATURA</label>
                                    <label className="col-md-4 text-info font-weight-bold text-center" htmlFor="Nombre">TEMATICA</label>
                                    <label className="col-md-2 text-info font-weight-bold text-center" htmlFor="Nombre">PORCENTAJE</label>

                                    <div className="my-1" style={{ border: "0.5px solid silver", width: "100%" }}></div>
                                </div>

                                <div className="col-md-12">

                                    {this.state.tablaOrdenada.map(data =>
                                        <div key={data.id}>
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
                                                    
                             
                                <div className="col-md-2 text-center">
                                    <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleRemoveElement(data)
                                    } >Eliminar</button>


                                </div>
                                                    <br></br>
                                                </div>
                                                <div className="my-1" style={{ border: "0.3px solid silver", width: "100%" }}></div>
                                            </div>
                                        </div>
                                    )}

                                </div>

                            </div> : null}
                    </div>
                </div>
                <div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>

            </div>



        )
    }
}

export default ScoreSetup
