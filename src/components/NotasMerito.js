import React, { Component } from 'react'
import Select from 'react-select'
import {getProfile , getUserAnnouncements} from './UserFunctions'
import {getNotasMerito} from './UserFunctions'

var notas = []

class NotasMerito extends Component {
    constructor() {
        super()
        this.state = {
            selectConv:null,
            selectConvError:"",
            showList:false,
            conv:[],
        }

        this.selectConvChange = this.selectConvChange.bind(this)
    }

    //fill announcement
    async componentDidMount() {
        let user = await getProfile()
        console.log(user.user.id)
        let announcements = await getUserAnnouncements(user.user.id)
        let announcement = []
        for (var i = 0; i < announcements.length; i++) {
            var object = {}
            object.value = announcements[i].id
            object.label = announcements[i].name
            announcement[i] = object
        }
        this.setState({conv:announcement})    
    }


    selectConvChange = selectConv =>{
        this.setState({selectConvError:"", showList:false})
        this.setState({selectConv}, ()=>this.fillPostulant())
    }


    fillPostulant(){
        var array = []
        notas = array
        getNotasMerito().then(res => {
            console.log(res)
            for (var i=0; i < res.length; i++) {
                if(res[i].announcement === this.state.selectConv.label){
                    var object = {}
                    object.id = res[i].id
                    object.name = res[i].name
                    object.auxiliary = res[i].auxiliary
                    object.nota_merito = res[i].nota_merito
                    notas.push(object)
                }
                //ordenamos alfaveticamente
                notas.sort(function (a, b) {
                    if (a.name > b.name) {
                      return 1;
                    }
                    if (a.name < b.name) {
                      return -1;
                    }
                    return 0;
                  });
            }
        })
    }

    show(){
        if(this.state.selectConv){
           this.setState({showList:true})
        }else{
            this.setState({selectConvError:"No se ha seleccionado una convocatoria"})
        }
    }

    render() {
        const { selectConv } = this.state
        const { conv } = this.state

        return (
            <div className="justify-content-center">
                <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white rounded">
                   Lista de notas de mérito
                </h1>
                <div className="row">
                    <div className="form-group col-8 my-4">
                        <label htmlFor="Nombre">Selecciona una convocatoria</label>
                        <Select
                          name="conv"
                          value={selectConv}
                          options={conv}
                          onChange={this.selectConvChange}
                          placeholder=""
                          className="basic-select"
                          classNamePrefix="select"
                        />
                        <p style={{color:"red"}}>{this.state.selectConvError}</p>
                    </div>
                    <div className="form-group col-4 mt-5">
                        <button type="button" className="col btn btn-info mt-2" onClick={() => this.show()} >Generar lista</button>
                    </div>
                    <label className="col-md-4 text-info font-weight-bold" htmlFor="Nombre">Nombre del postulante</label>
                    <label className="col-md-4 text-info font-weight-bold" htmlFor="Nombre">Nombre de la auxiliatura</label>
                    <label className="col-md-4 text-info font-weight-bold text-center" htmlFor="Nombre">Nota de merito (/100)</label>
                    <div className="my-1" style={{border:"0.5px solid silver", width: "100%"}}></div>
                    {this.state.showList?    
                        <div className="col-md-12">
                        {notas.map( postulant =>(
                            <div className="container" key={postulant.id}>
                              <div className="row row-cols-3">
                                <div className="col">
                                    {postulant.name} 
                                </div>
                                <div className="col">
                                    {postulant.auxiliary}                    
                                </div>
                                <div className="col text-center">
                                    {postulant.nota_merito}
                                </div>
                              </div>
                              <div className="my-1" style={{border:"0.3px solid silver", width: "100%"}}></div>
                            </div>
                        ))}
                        </div>
                    :null
                    }
                </div>
            </div>        
        )
    }
}

export default NotasMerito