import React, { Component } from 'react'
import Select from 'react-select'
import { getAnnouncement } from './UserFunctions'
import axios from 'axios'
var conv = []
var auxSelect = []
var themeSelect = []

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
            selectedOptionTheme: null

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
    selectThemeSelectChange = selectedThemeOption => {

        this.setState({ selectedOptionTheme: selectedThemeOption })

    }
    componentDidMount() {
        getAnnouncement().then(res => {
            for (var i = 0; i < res.length; i++) {
                var object = {}
                object.value = res[i].id
                object.label = res[i].name
                conv[i] = object
            }
        })
    }

    handleSearchAnnouncement() {
        this.setState({
            selectedConvOption_error: '',

        })
        if (this.validAnnouncement()) {

             this.setState({auxiliarylist:false})
            this.setState({ addpercentage: false })
            this.setState({ announcementlab: false })
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

            //      axios.get('/api/percentageAuxiliary')
            //      .then(response => {
            //         this.setState({tabla : response.data});
            //         console.log(this.state.tabla);
            //         this.state.tabla.sort(function (a, b) {
            //            if (a.auxiliary > b.auxiliary) {
            //              return 1;
            //            }
            //            if (a.auxiliary < b.auxiliary) {
            //              return -1;
            //            }
            //            return 0;
            //          });

            //          console.log(this.state.tabla);
            //          this.setState({tablaOrdenada : this.state.tabla});
            //     })
            //        .catch(e => {
            //          console.log(e);
            //  })
        }




    }
    handleKnowledge(e) {
        this.setState({
            selectedOptionAux: null,
            selectedOptionTheme: null,
            porcentage: ''

        })
        this.setState({ addpercentage: true })
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

            // this.found = response.data
            this.setState({ themeaux: res.data })
            console.log(this.state.themeaux)
            for (var i = 0; i < this.state.themeaux.length; i++) {
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
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {

            // this.found = response.data
            this.setState({ aux: response.data })
            console.log(this.state.aux)
            for (var i = 0; i < this.state.aux.length; i++) {
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
    handleAddPorcentage() {
        this.setState({
            selectedAuxOption_error: '',
            selectedThemeOption_error: '',
            percentage_error: '' ,
            

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
                }
            })
                .catch(error => {
                    console.log(error)
                    
                })
            // axios.get('/api/percentageAuxiliary')
            //     .then(response => {
            //         this.setState({ tabla: response.data });
            //         console.log(this.state.tabla);
            //         this.state.tabla.sort(function (a, b) {
            //             if (a.auxiliary > b.auxiliary) {
            //                 return 1;
            //             }
            //             if (a.auxiliary < b.auxiliary) {
            //                 return -1;
            //             }
            //             return 0;
            //         });

            //         console.log(this.state.tabla);
            //         this.setState({ tablaOrdenada: this.state.tabla });
            //     })
            //     .catch(e => {
            //         console.log(e);
            //     })
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
    handleMeritScore() {
        return (
            <div>
                <h1>Hoal prueba</h1>
                <h1>Hoal prueba</h1>
                <h1>Hoal prueba</h1>
                <h1>Hoal prueba</h1>
                <label>dsgafd</label>
            </div>
        )
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
        else if (this.state.porcentage.length > 2 || isNaN(this.state.porcentage)) {
            this.setState({ percentage_error: 'Porcentaje Incorrecto' })
        }
        else {
            return true;
        }

    }
    handleRemoveElement(e){
        
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
        const { selectedOptionConv, selectedOptionAux, selectedOptionTheme, porcentage } = this.state
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
                        {/* <button className="btn btn-outline-info" variant="warning" onClick ={(AuxEvent) => this.handleMeritScore(AuxEvent)} >CONFIGURAR MERITO</button> */}

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
                                    <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleAddPorcentage(e)} >Agregar</button>

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
