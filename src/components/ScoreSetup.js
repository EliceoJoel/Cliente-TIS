import React, { Component } from 'react'
import Select from 'react-select'
import { getProfile, getUserAnnouncements } from './UserFunctions'
import axios from 'axios'
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
            addpercentagelab: false,
            addpercentagedoc: false,
            tablaOrdenada: [],
            auxiliarylist: false,
            selectedConvOption_error: '',
            selectedOptionConv: null,
            selectedAuxOption_error: '',
            selectedThemeOption_error: '',
            percentage_error: '',
            selectedOptionAux: null,
            selectedOptionTheme: null,
            idUser: '',
            conv: [],
            auxSelect: [],
            themeSelect: [],
            deleteWarning: '',
            modifyWarning: '',
            meritSelect: [],
            type: 'Porcentaje',
            number: '',
            selectedOptionMerit: null,
            announcementFound: false,

            announcementdoc: false,
            typeDoc: 'Examen Oral',
            porcentageDoc: '',
            tableKnowledgeDoc: [],
            tableKnowledgeDocOrder: [] ,
            tableMerit:[],
            tableMeritOrder:[] ,
            acomplishConfig:false ,
            KnowledgeDocWarningFinish:'',
            KnowledgeLabWarningFinish:''

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
            getUserAnnouncements(this.state.idUser).then(res => {
                console.log(res);
                let announcement = []
                for (var i = 0; i < res.length; i++) {
                    var object = {}
                    object.value = res[i].id
                    object.label = res[i].name
                    announcement[i] = object
                }
                this.setState({ conv: announcement })
            })
        })
    }

    handleSearchAnnouncement() {
        this.setState({
            selectedConvOption_error: '',
            deleteWarning: ''
        })
        if (this.validAnnouncement()) {
            this.setState({ auxiliarylist: false })
            this.setState({ addpercentagelab: false })
            this.setState({ addpercentagedoc: false })
            this.setState({ announcementlab: false })
            this.setState({ announcementdoc: false })
            this.setState({ addMeritPercentage: false })
            this.setState({ MeritConfigDone: false })
            this.setState({ knowledgeDocConfigDone: false })
            this.setState({ knowledgeLabConfigDone: false })
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
                this.setState({ announcementFound: true })
                this.setState({ announcementFound: true })
                // this.found = response.data
                this.setState({ found: response.data })
                console.log(this.state.found)
                if (this.state.found[0].type === 'Laboratorio') {
                    this.setState({ announcementlab: true })
                    this.setState({ auxiliarylist: true })
                } else {
                    this.setState({ announcementdoc: true })
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
                this.state.tabla.sort(function (a, b) {
                    if (a.auxiliary > b.auxiliary) {return 1; }
                    if (a.auxiliary < b.auxiliary) {  return -1;}
                    return 0;
                });      
                this.setState({ tablaOrdenada: this.state.tabla });
            })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    handleKnowledgelab(e) {
        this.setState({
            selectedOptionAux: null,
            selectedOptionTheme: null,
            porcentage: '',
            deleteWarning: '',
            modifyWarning: '' ,
                 acomplishConfig: false,
                 knowledgeLabWarningFinish: ''  
        })
        let idconv = this.state.selectedOptionConv.value
        let sendfalse = new FormData()
        sendfalse.append('id_announcement', idconv)
        axios({
            method: 'post',
            url: 'api/setKnowledgeConfiguratedFalse',
            data: sendfalse,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
          console.log(response);
          
        })
            .catch(error => {
                console.log(error)

            })
          
        this.setState({ MeritConfigDone: false })
        this.setState({ knowledgeLabConfigDone: false })
        this.setState({ addpercentagelab: true })
        this.setState({ addMeritPercentage: false })
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
            this.setState({ themeaux: res.data })
            console.log(this.state.themeaux)
            for (var i = 0; i < this.state.themeaux.length; i++) {
                var object = {}
                object.value = this.state.themeaux[i].id
                object.label = this.state.themeaux[i].name
                AuxArray[i] = object
            }
            this.setState({ auxSelect: AuxArray })
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
            let ThemeArray = []
            // this.found = response.data
            this.setState({ aux: response.data })
            console.log(this.state.aux)
            for (var i = 0; i < this.state.aux.length; i++) {
                var object = {}
                object.value = this.state.aux[i].id
                object.label = this.state.aux[i].name
                ThemeArray[i] = object
            }
            this.setState({ themeSelect: ThemeArray })
        })
            .catch(error => {
                console.log(error)
            })

    }
    handleAddPorcentagelab() {
        this.setState({
            selectedAuxOption_error: '',
            selectedThemeOption_error: '',
            percentage_error: '',
            modifyWarning: '',
            deleteWarning: '',
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
                    if (a.auxiliary > b.auxiliary) {  return 1;  }                         
                    if (a.auxiliary < b.auxiliary) {return -1;}
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
        let idconv = this.state.selectedOptionConv.value
        let sendfalse = new FormData()
        sendfalse.append('id_announcement', idconv)
        axios({
            method: 'post',
            url: 'api/setMeritConfiguratedFalse',
            data: sendfalse,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
          console.log(response);
          
        })
            .catch(error => {
                console.log(error)

            })
            this.setState({ deleteWarning: '' }) 
            this.setState({ percentageMerit_error: '' })   
            this.setState({ selectedMeritOption_error: '' })  
            this.setState({ selectedOptionMerit: null })  
            this.setState({ modifyWarning: '' })       
        this.setState({ MeritWarningFinish: '' })   
        this.setState({ acomplishConfig: false })   
        this.setState({ addpercentagelab: false })
        this.setState({ addpercentagedoc: false })
        this.setState({ addMeritPercentage: true })
        this.setState({ MeritConfigDone: false })
        this.setState({ knowledgeDocConfigDone: false })
        this.setState({ knowledgeLabConfigDone: false })
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
            this.setState({ meritSelect: meritArray })
        })
            .catch(error => {
                console.log(error)
            })
            let idconvocatoria = this.state.selectedOptionConv.value
            let sendIdAnnouncement = new FormData()
            sendIdAnnouncement.append('id_announcement', idconvocatoria)
            axios({
                method: 'post',
                url: 'api/meritByAnnouncement',
                data: sendIdAnnouncement,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(response => {
                this.setState({ tableMerit: response.data });
                console.log(this.state.tableMerit);
                this.state.tableMerit.sort(function (a, b) {
                    if (a.name > b.name) {  return 1;}
                    if (a.name < b.name) { return -1;}
                    return 0;
                });
                console.log(this.state.tableMerit);
                this.setState({ tableMeritOrder: this.state.tableMerit });
            })
                .catch(error => {
                    console.log(error)
                })

    }
    handleAddMeritPercentage() {
       
        this.setState({
            selectedMeritOption_error:'',
            percentageMerit_error:'',
            modifyWarning: '' ,
            deleteWarning:''
        })
        if(this.validPercentageMerit()){
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
            if (response.data === false) {
                // this.setState({ percentageKnowledgeDoc_error: 'el digito excede el porcentaje' })
                console.log('excede el 100');
                
            } else {
                // this.setState({ modifyWarning: 'Elemento Modificado con exito' })
                // this.setState({ porcentage: '' })
                console.log('funciono se hizo la insercion');               
            }
        })
            .catch(error => {
                console.log(error)
            })
            let idconvoca = this.state.selectedOptionConv.value
            let sendIdAnnouncement = new FormData()
            sendIdAnnouncement.append('id_announcement', idconvoca)
            axios({
                method: 'post',
                url: 'api/meritByAnnouncement',
                data: sendIdAnnouncement,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(response => {
                this.setState({ tableMerit: response.data });
                console.log(this.state.tableMerit);
                this.state.tableMerit.sort(function (a, b) {
                    if (a.name > b.name) { return 1;}
                    if (a.name < b.name) {return -1;}
                    return 0;
                });
                 console.log(this.state.tableMerit);
                this.setState({ tableMeritOrder: this.state.tableMerit });  
            })
                .catch(error => {
                    console.log(error)  
                })
            }

    }
    handleRemoveElementMerit(e){
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
            url: 'api/deleteMerit',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            console.log(res);
        })
            .catch(error => {
                console.log(error)
            })
        this.setState({ deleteWarning: 'se elimino el elemento con exito' })
        let idconv = this.state.selectedOptionConv.value
        let sendIdAnnouncement = new FormData()
        sendIdAnnouncement.append('id_announcement', idconv)
        axios({
            method: 'post',
            url: 'api/meritByAnnouncement',
            data: sendIdAnnouncement,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            this.setState({ tableMerit: response.data });
            console.log(this.state.tableMerit);
            this.state.tableMerit.sort(function (a, b) {
                if (a.name > b.name) {return 1;}
                if (a.name < b.name) {return -1; }
                return 0;
            });
            console.log(this.state.tableMerit);
            this.setState({ tableMeritOrder: this.state.tableMerit });
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
        else if (this.state.porcentage.length > 2 || isNaN(this.state.porcentage) || this.state.porcentage < 1) {
            this.setState({ percentage_error: 'Porcentaje Incorrecto' })
        }
        else {
            return true;
        }
        
    }
    validConocimientoDoc(){
        if (this.state.porcentageDoc === '') {
            this.setState({ percentageKnowledgeDoc_error: 'Campo Vacio' })
        }
        else if (this.state.porcentageDoc.length > 2 || isNaN(this.state.porcentageDoc) || this.state.porcentageDoc < 1) {
            this.setState({ percentageKnowledgeDoc_error: 'Porcentaje Incorrecto' })
        }
        else {
            return true; 
        }
    }
    validPercentageMerit() {
        if (this.state.selectedOptionMerit === null) {
            this.setState({ selectedMeritOption_error: 'Seleccione un merito' })
        }
        else if (this.state.number === '') {
            this.setState({ percentageMerit_error: 'Campo Vacio' })
        }
        else if (this.state.number.length > 2 || isNaN(this.state.number) || this.state.number < 1) {
            this.setState({ percentageMerit_error: 'Valor Incorrecto' })
        }
        else {
            return true;
        }
        
    }
    handleRemoveElement(e) {
        this.setState({
            deleteWarning: '',
            modifyWarning: ''

        })
        //console.log(e.id);
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
        this.setState({ deleteWarning: 'se elimino el elemento con exito' })
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
                if (a.auxiliary > b.auxiliary) {return 1;}
                if (a.auxiliary < b.auxiliary) { return -1;}
                return 0;
            });
            console.log(this.state.tabla);
            this.setState({ tablaOrdenada: this.state.tabla });
        })
            .catch(error => {
                console.log(error)
            })
    }
    handleKnowledgedoc(e) {
        this.setState({ knowledgeDocWarningFinish: '' })  
        let idconv = this.state.selectedOptionConv.value
        let send = new FormData()
        send.append('id_announcement', idconv)
        axios({
            method: 'post',
            url: 'api/setKnowledgeConfiguratedFalse',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
          console.log(response);
          
        })
            .catch(error => {
                console.log(error)

            })
            
            this.setState({ acomplishConfig: false })    
        this.setState({ knowledgeDocConfigDone: false })
        this.setState({ MeritConfigDone: false })
        this.setState({ addpercentagelab: false })
        this.setState({ addpercentagedoc: true })
        this.setState({ addMeritPercentage: false })
        let idconvocato = this.state.selectedOptionConv.value
        let sendIdAnnouncement = new FormData()
        sendIdAnnouncement.append('id_announcement', idconvocato)
        axios({
            method: 'post',
            url: 'api/percentageKnowledgeDocAnn',
            data: sendIdAnnouncement,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            this.setState({ tableKnowledgeDoc: response.data });
            console.log(this.state.tableKnowledgeDoc);
            this.state.tableKnowledgeDoc.sort(function (a, b) {
                if (a.type > b.type) {return 1;}
                if (a.type < b.type) {return -1;}
                return 0;
            });
            console.log(this.state.tableKnowledgeDoc);
            this.setState({ tableKnowledgeDocOrder: this.state.tableKnowledgeDoc });
        })
            .catch(error => {
                console.log(error)
            })
    }
    handleAddPorcentageDoc() {
        this.setState({
            percentageKnowledgeDoc_error:'',
            modifyWarning: '' ,
            deleteWarning:''
        })
         if (this.validConocimientoDoc()) {

        let type = this.state.typeDoc

        let porcentage = this.state.porcentageDoc
        let send = new FormData()
        send.append('id_announcement', this.state.found[0].id)
        send.append('type', type)

        send.append('percentage', porcentage)
        axios({
            method: 'post',
            url: 'api/percentageKnowledgeDoc',
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

        let idconv = this.state.selectedOptionConv.value
        let sendIdAnnouncement = new FormData()
        sendIdAnnouncement.append('id_announcement', idconv)
        axios({
            method: 'post',
            url: 'api/percentageKnowledgeDocAnn',
            data: sendIdAnnouncement,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            this.setState({ tableKnowledgeDoc: response.data });
            console.log(this.state.tableKnowledgeDoc);
            this.state.tableKnowledgeDoc.sort(function (a, b) {
                if (a.type > b.type) {return 1;}
                if (a.type < b.type) {return -1;}
                return 0;
            });
            console.log(this.state.tableKnowledgeDoc);
            this.setState({ tableKnowledgeDocOrder: this.state.tableKnowledgeDoc });
        })
            .catch(error => {
                console.log(error)
            })
        }
    }
    handleRemoveElementDoc(e) {
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
            url: 'api/percentageKnowledgeDocDelete',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            console.log(res);

        })
            .catch(error => {
                console.log(error)

            })
        this.setState({ deleteWarning: 'se elimino el elemento con exito' })
        let idconv = this.state.selectedOptionConv.value
        let sendIdAnnouncement = new FormData()
        sendIdAnnouncement.append('id_announcement', idconv)
        axios({
            method: 'post',
            url: 'api/percentageKnowledgeDocAnn',
            data: sendIdAnnouncement,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            this.setState({ tableKnowledgeDoc: response.data });
            console.log(this.state.tableKnowledgeDoc);
            this.state.tableKnowledgeDoc.sort(function (a, b) {
                if (a.type > b.type) {
                    return 1;
                }
                if (a.type < b.type) {
                    return -1;
                }
                return 0;
            });

            console.log(this.state.tableKnowledgeDoc);
            this.setState({ tableKnowledgeDocOrder: this.state.tableKnowledgeDoc });


        })
            .catch(error => {
                console.log(error)

            })



    }
    handleEndConfigurationDoc(){
        let idconv = this.state.selectedOptionConv.value
        let sendIdAnnouncement = new FormData()
        sendIdAnnouncement.append('id_announcement', idconv)
        axios({
            method: 'post',
            url: 'api/endConfigurationDoc',
            data: sendIdAnnouncement,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            if (response.data === true) {
                let idconv = this.state.selectedOptionConv.value
                let type = 'knowledge'
                let configuration = true
                let send = new FormData()
                send.append('id_announcement', idconv)
                send.append('type', type)
                send.append('configuration', configuration)
                axios({
                    method: 'post',
                    url: 'api/finishConfigurationKnowledge',
                    data: send,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(response => {
                   console.log(response);
                   this.setState({ addpercentagedoc: false })
                   this.setState({ acomplishConfig: true })
                })
                    .catch(error => {
                        console.log(error)
        
                    })

            } else {
               
                this.setState({ knowledgeDocWarningFinish: 'Podra terminar La configuracion una vez la suma de los porcentajes sea 100' })
            }
        })
            .catch(error => {
                console.log(error)

            })
    }
    handleEndConfigurationLab(){
        let idconv = this.state.selectedOptionConv.value
        let sendIdAnnouncement = new FormData()
        sendIdAnnouncement.append('id_announcement', idconv)
        axios({
            method: 'post',
            url: 'api/endConfigurationLab',
            data: sendIdAnnouncement,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            if (response.data === true) {
                let idconv = this.state.selectedOptionConv.value
                let type = 'knowledge'
                let configuration = true
                let send = new FormData()
                send.append('id_announcement', idconv)
                send.append('type', type)
                send.append('configuration', configuration)
                axios({
                    method: 'post',
                    url: 'api/finishConfigurationKnowledge',
                    data: send,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(response => {
                   console.log(response);
                   this.setState({ addpercentagelab: false })
                   this.setState({ acomplishConfig: true })
                })
                    .catch(error => {
                        console.log(error)
        
                    })

            } else {
               
                this.setState({ knowledgeLabWarningFinish: 'Podra terminar La configuracion una vez la suma de los porcentajes sea 100 por auxiliatura' })
            }
        })
            .catch(error => {
                console.log(error)

            })
    }
    handleEndConfigurationMerit(){
        let idconv = this.state.selectedOptionConv.value
        let sendIdAnnouncement = new FormData()
        sendIdAnnouncement.append('id_announcement', idconv)
        axios({
            method: 'post',
            url: 'api/endConfigurationMerit',
            data: sendIdAnnouncement,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            if (response.data === true) {
                let idconv = this.state.selectedOptionConv.value
                let type = 'merit'
                let configuration = true
                let send = new FormData()
                send.append('id_announcement', idconv)
                send.append('type', type)
                send.append('configuration', configuration)
                axios({
                    method: 'post',
                    url: 'api/finishConfigurationMerit',
                    data: send,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(response => {
                   console.log(response);
                   this.setState({ addMeritPercentage: false })
                   this.setState({ acomplishConfig: true })
                })
                    .catch(error => {
                        console.log(error)
        
                    })

            } else {
               
                this.setState({ MeritWarningFinish: 'Podra terminar La configuracion una vez la suma de los porcentajes sea 100' })
            }

        })
            .catch(error => {
                console.log(error)

            })
    }
    handleMeritConfiguration(e){
        this.setState({ acomplishConfig: false })   
        this.setState({ addpercentagelab: false })
        this.setState({ addpercentagedoc: false })
        this.setState({ addMeritPercentage: false })
        this.setState({ knowledgeDocConfigDone: false })
        this.setState({ knowledgeLabConfigDone: false })
        e.preventDefault()
        let idconv = this.state.selectedOptionConv.value
        let send = new FormData()
        send.append('id_announcement', idconv)
        axios({
            method: 'post',
            url: 'api/isMeritConfigurated',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
           console.log(response);
           if (response.data === true) {
            this.setState({ addMeritPercentage: false })
            this.setState({ MeritConfigDone: true })
          
           
           }else{
                 this.handleMeritScore(e)
           }
           
        })
            .catch(error => {
                console.log(error)

            })
       
    }
    handleKnowledgeDocConfiguration(e){
        this.setState({ acomplishConfig: false })   
        this.setState({ addpercentagelab: false })
        this.setState({ addpercentagedoc: false })
        this.setState({ addMeritPercentage: false })
      
        this.setState({ MeritConfigDone: false })
        e.preventDefault()
        let idconv = this.state.selectedOptionConv.value
        let send = new FormData()
        send.append('id_announcement', idconv)
        axios({
            method: 'post',
            url: 'api/isKnowledgeConfigurated',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
           console.log(response);
           if (response.data === true) {
            this.setState({ addpercentagedoc: false })
            this.setState({ knowledgeDocConfigDone: true })
          
           
           }else{
                 this.handleKnowledgedoc(e)
           }
           
        })
            .catch(error => {
                console.log(error)

            })
       
    }
    handleKnowledgeLabConfiguration(e){
        this.setState({ acomplishConfig: false })   
        this.setState({ addpercentagelab: false })
        this.setState({ addpercentagedoc: false })
        this.setState({ addMeritPercentage: false })
        
        this.setState({ MeritConfigDone: false })
        e.preventDefault()
        let idconv = this.state.selectedOptionConv.value
        let send = new FormData()
        send.append('id_announcement', idconv)
        axios({
            method: 'post',
            url: 'api/isKnowledgeConfigurated',
            data: send,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
           console.log(response);
           if (response.data === true) {
            this.setState({ addpercentagelab: false })
            this.setState({ knowledgeLabConfigDone: true })
           
           }else{
                 this.handleKnowledgelab(e)
           }
           
        })
            .catch(error => {
                console.log(error)

            })
       
    }

    render() {
        const { selectedOptionConv, selectedOptionAux, selectedOptionTheme, porcentage, conv, auxSelect,
            themeSelect, meritSelect, selectedOptionMerit, type, number, typeDoc, porcentageDoc } = this.state
        return (

            <div className="justify-content-center">

                <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white">
                    Configuracion de Notas </h1>

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
                            <button className="btn btn-outline-info" variant="warning" onClick={(AuxEvent) => this.handleMeritConfiguration(AuxEvent)} >CONFIGURAR MERITO</button>
                            : null}
                        {this.state.announcementlab ?
                            <button className="btn btn-outline-info mx-3" variant="warning" onClick={(AuxEvent) => this.handleKnowledgeLabConfiguration(AuxEvent)} >CONFIGURAR CONOCIMIENTO</button>
                            : null}
                        {this.state.announcementdoc ?
                            <button className="btn btn-outline-info mx-3" variant="warning" onClick={(AuxEvent) => this.handleKnowledgeDocConfiguration(AuxEvent)} >CONFIGURAR CONOCIMIENTO</button>
                            : null}

                        <br></br>
                        {this.state.addpercentagelab ?


                            <div>
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
                                    <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleAddPorcentagelab(e)} >Agregar Cambio</button>
                                    <p style={{ color: "red" }}>{this.state.deleteWarning}</p>
                                    <p style={{ color: "green" }}>{this.state.modifyWarning}</p>
                                </div>
                            </div>
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
                                    <br></br>
                                             <button className="btn btn-outline-info mx-3" variant="warning" onClick={(AuxEvent) => this.handleEndConfigurationLab(AuxEvent)} >TERMINAR CONFIGURACION LAB</button>
                                             <p style={{ color: "red" }}>{this.state.knowledgeLabWarningFinish}</p>
                                </div>

                            </div> 
                            </div>
                            : null}
                        {this.state.addpercentagedoc ?


                            <div>
                                <div className="row">
                                    <br></br>

                                    <div className="form-group col-md-4">
                                        <br></br>
                                        <label htmlFor="theme">Seleccione un Tipo</label>
                                        <select
                                            className="form-control"

                                            name="typeDoc"
                                            // placeholder=""
                                            value={typeDoc}
                                            onChange={this.onChange}>
                                            <option>Examen Oral</option>
                                            <option>Examen Escrito</option>



                                        </select>
                                        <p style={{ color: "red" }}>{this.state.selectedThemeOption_error}</p>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <br></br>
                                        <label htmlFor="porcentaje">Porcentaje</label>

                                        <input
                                            className="form-control"
                                            placeholder="Ejemplo:1-100"
                                            type="number"
                                            name="porcentageDoc"
                                            value={porcentageDoc}
                                            onChange={this.onChange}
                                        />

                                        <p style={{ color: "red" }}>{this.state.percentageKnowledgeDoc_error}</p>
                                    </div>

                                    <div className="form-group col-md-12 ">
                                        <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleAddPorcentageDoc(e)} >Agregar Cambio</button>
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



                                    {this.state.tableKnowledgeDocOrder.map(data =>
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
                                                        <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleRemoveElementDoc(data)
                                                        } >Eliminar</button>


                                                    </div>
                                                    <br></br>
                                                </div>
                                                <div className="my-1" style={{ border: "0.3px solid silver", width: "100%" }}></div>
                                            </div>
                                        </div>
                                    )}
                                        <br></br>
                                             <button className="btn btn-outline-info mx-3" variant="warning" onClick={(AuxEvent) => this.handleEndConfigurationDoc(AuxEvent)} >TERMINAR CONFIGURACION DOC</button>
                                             <p style={{ color: "red" }}>{this.state.knowledgeDocWarningFinish}</p>

                                </div>
                            </div> : null}



                        {this.state.addMeritPercentage ?

                            <div>
                          
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
                                    <p style={{ color: "red" }}>{this.state.selectedMeritOption_error}</p>
                                </div>
                                <div className="form-group col-md-3">
                                    <br></br>
                                    <label htmlFor="Tipo">Tipo</label>

                                    <select
                                        className="form-control"

                                        name="type"
                                        // placeholder=""
                                        value={type}
                                        onChange={this.onChange}>
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

                                    <p style={{ color: "red" }}>{this.state.percentageMerit_error}</p>
                                </div>

                                <div className="form-group col-md-12 ">
                                    <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleAddMeritPercentage(e)} >Agregar Cambio</button>
                                    <p style={{ color: "red" }}>{this.state.deleteWarning}</p>
                                    <p style={{ color: "green" }}>{this.state.modifyWarning}</p>
                                </div>
                            </div>
                             <div>

                             <div className="col-md-12">
                                 <br></br>
                                 <label className="col-md-4 text-info font-weight-bold" htmlFor="Nombre">NOMBRE MERITO</label>

                                 <label className="col-md-4 text-info font-weight-bold text-center" htmlFor="Nombre">TIPO</label>
                                 <label className="col-md-2 text-info font-weight-bold text-center" htmlFor="Nombre">PUNTAJE</label>
                                 <div className="my-1" style={{ border: "0.5px solid silver", width: "100%" }}></div>
                             </div>



                             {this.state.tableMeritOrder.map(data =>
                                 <div key={data.id}>
                                     <div className="container">
                                         <div className="row row-cols-4">
                                           
                                            
                                             <div className="col-md-4 text-center">
                                                 {data.name}
                                             </div>
                                             <div className="col-md-4 text-center">
                                                 {data.type}
                                             </div>
                                             <div className="col-md-2 text-center">
                                                 {data.number}
                                             </div>

                                             <div className="col-md-2 text-center">
                                                 <button className="btn btn-outline-info" variant="warning" onClick={(e) => this.handleRemoveElementMerit(data)
                                                 } >Eliminar</button>


                                             </div>
                                             <br></br>
                                         </div>
                                         <div className="my-1" style={{ border: "0.3px solid silver", width: "100%" }}></div>
                                     </div>
                                 </div>
                             )}
                                 <br></br>
                                  <button className="btn btn-outline-info mx-3" variant="warning" onClick={(AuxEvent) => this.handleEndConfigurationMerit(AuxEvent)} >TERMINAR CONFIGURACION MERITO</button>
                                  <p style={{ color: "red" }}>{this.state.MeritWarningFinish}</p>


                         </div>

                         </div>
                            : null}
                                 {this.state.acomplishConfig  ?             
                                  <div style={{color:'green'}} className=" h5 col-md-12 mt-4 text-center">
                                              <p>Configuracion Completada </p>
                                                   
                                              </div>:null}

                            {this.state.MeritConfigDone ?
                                    <div>
                                          <div style={{color:'red'}} className=" h5 col-md-12 mt-4 text-center">
                                              <p>Ya se realizo la configuracion de meritos, si desea editarla presione continuar </p>
                                                    <p> !Cualquier cambio realizado puede afectar la evaluacion de meritos!
                                              </p>
                                              </div>
                                              <button className="btn btn-outline-info mx-3" variant="warning" onClick={(AuxEvent) => this.handleMeritScore(AuxEvent)} >
                                                  CONTINUAR</button>
                                                  </div>
                                :null}
                                    {this.state.knowledgeDocConfigDone ?
                                    <div>
                                          <div style={{color:'red'}} className=" h5 col-md-12 mt-4 text-center">
                                              <p>Ya se realizo la Configuracion de Conocimiento,si desea editarla presione continuar</p>
                                                        <p>     !Cualquier cambio realizado puede afectar la evaluacion de conocimiento!   
                                              </p>
                                              </div>
                                              <button className="btn btn-outline-info mx-3" variant="warning" onClick={(AuxEvent) => this.handleKnowledgedoc(AuxEvent)} >
                                                  CONTINUAR</button>
                                                  </div>
                                :null}

                                    {this.state.knowledgeLabConfigDone ?
                                    <div>
                                          <div style={{color:'red'}} className=" h5 col-md-12 mt-4 text-center">
                                          <p>             Ya se realizo la Configuracion de Conocimiento,si desea editarla presione continuar  </p>
                                                         <p>    !Cualquier cambio realizado puede afectar la evaluacion de conocimiento!   </p>
                                            
                                              </div>
                                              <button className="btn btn-outline-info mx-3" variant="warning" onClick={(AuxEvent) => this.handleKnowledgelab(AuxEvent)} >
                                                  CONTINUAR</button>
                                                  </div>
                                :null}
                                

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
