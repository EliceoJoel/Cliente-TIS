/* eslint-disable eqeqeq */
import React, {Component} from 'react';
import Select from 'react-select'
import {getAllUsers} from './UserFunctions'
import {getRol} from './UserFunctions'
import {getAnnouncement} from './UserFunctions'
import {getAux} from './UserFunctions'
import {getTheme} from './UserFunctions'

let users =[]
let rol =[]
let conv =[]

class configure_user extends Component{
  
  constructor(props) {
      super(props);

      this.aux = []
      this.theme = []
      this.convocatorias=[]
      this.auxiliary=[]
      this.themes=[]
      this.state = {
        user:null,
        rol:{id:-1,label:null},
        temp_conv:"",
        temp_aux:"",
        temp_theme:"",
        convsList:(<div></div>),
        auxList:(<div></div>),
        themeList:(<div></div>),
      };

      this.fillAux = this.fillAux.bind(this);
    }
    componentDidMount() {
      getAllUsers().then(res => {
        let user = {};
        for(let i=0; i<res.length; i++){
          user.id = res[i].id
          user.label = res[i].fullname
          users[i]= user
        }
      })

      getRol().then(roles => {
        for (var i=0; i < roles.length; i++) {
            var object = {}
            object.id = roles[i].id
            object.label = roles[i].rol
            rol[i] = object
        }
      })

      getAnnouncement().then(res => {
        for (var i=0; i < res.length; i++) {
            var object = {}
            object.id = res[i].id
            object.label = res[i].name
            conv[i] = object
        }
      })
    }

    render(){
      return(
            <div> 
                <h1 className="h3 mb-3 font-weight-normal text-center">
                        Configuracion de usuarios
                </h1>

                <label htmlFor="Nombre">Selecciona un usuario</label>
                <Select
                name="user"
                options={users}
                onChange={(e) => this.setState({user:e})}
                placeholder=""
                className="basic-select"
                classNamePrefix="select"
                />
                

                <label htmlFor="Nombre">Selecciona un rol</label>
                <Select
                name="rol"
                options={rol}
                onChange={(e) => this.setState({rol:e})}
                placeholder=""
                className="basic-select"
                classNamePrefix="select"
                />
                <br/>
                {this.visualizar()}
            </div>
        )
    }

    fillAux(e){
      let announcement = e;
      this.aux =[]
      this.setState({temp_conv : announcement})
      getAux(announcement.id).then(res =>{
        let a = res.data
        for(let i=0; i<a.length;i++){
          let object ={}
          object.id = a[i].id
          object.label = a[i].name
          object.conv = a[i].id_announcement
          this.aux[i] = object
        }
        console.log(this.aux)
      }).catch(err => {
        console.log(err)
    })
    }

    fillTheme(e){
      this.setState({temp_aux : e})
      let data = {auxiliary:e.label}
      getTheme(data).then(res =>{
        console.log(res)
        let a = res.data
        for(let i=0; i<a.length;i++){
          let object ={}
          object.id = a[i].id
          object.label = a[i].theme
          object.aux = a[i].auxiliary
          object.conv = a[i].id_announcement
          this.theme[i] = object
        }
      }).catch(err => {
        console.log(err)
    })
    }

    visualizar(){
      if(this.state.rol.label == "comision conocimintos laboratorio"){
        return(
          <div>
          <label htmlFor="Nombre">Selecciona una convocatoria</label>
          <Select
                name="conv"
                options={conv}
                onChange={(e) => this.fillAux(e)}
                placeholder=""
                className="basic-select"
                classNamePrefix="select"
          />
          <br/>
          <br/>
          <label htmlFor="Nombre">Selecciona una auxiliatura</label>
          <Select
                name="auxiliary"
                options={this.aux}
                onChange={(e) => this.fillTheme(e)}
                placeholder= ""
                className="basic-select"
                classNamePrefix="select"
          />
          <br/>
          <br/>
          <label htmlFor="Nombre">Selecciona un tema</label>
          <Select
                name="theme"
                options={this.theme}
                onChange={(e) => this.setState({temp_theme:e})}
                placeholder=""
                className="basic-select"
                classNamePrefix="select"
          />
          <div> {this.state.themeList} </div>
          <button  type="button" className="col btn btn-info mt-2" onClick ={() => this.addTheme()}> agregar </button>
          <br/>
          <br/>
          <button  type="button" className="col btn btn-info mt-2"> guardar </button>
        </div>)


      }
      if(this.state.rol.label == "comision meritos"){
        return(
          <div>
            <label htmlFor="Nombre">Selecciona una convocatoria</label>
            <Select
                  name="conv"
                  options={conv}
                  onChange={(e) => this.fillAux(e)}
                  placeholder=""
                  className="basic-select"
                  classNamePrefix="select"
            />
            <div> {this.state.convsList} </div>
            <button  type="button" className="col btn btn-info mt-2" onClick ={() => this.addAnnouncement()}> agregar convocatoria </button>
            <br/>
            <button  type="button" className="col btn btn-info mt-2"> guardar </button>
          </div>
          )
      }
      if(this.state.rol.label == "comision conocimientos" ){
        return(
          <div>
            <label htmlFor="Nombre">Selecciona una convocatoria</label>
            <Select
                  name="conv"
                  options={conv}
                  onChange={(e) => this.fillAux(e)}
                  placeholder=""
                  className="basic-select"
                  classNamePrefix="select"
            />
            <br/>
            <br/>
            <label htmlFor="Nombre">Selecciona una auxiliatura</label>
            <Select
                  name="auxiliary"
                  options={this.aux}
                  onChange={(e) => this.fillTheme(e)}
                  placeholder= ""
                  className="basic-select"
                  classNamePrefix="select"
            />
            <div> {this.state.auxList} </div>
            <button  type="button" className="col btn btn-info mt-2" onClick ={() => this.addAuxiliary()}> agregar </button>
            <br/>
            <button  type="button" className="col btn btn-info mt-2"> guardar </button>
        </div>)
      }
      else if(this.state.rol.label != null) 
      return(
        <button  type="button" className="col btn btn-info mt-2"> guardar </button>
      )
    }

    addAnnouncement(){
      this.convocatorias[this.convocatorias.length] = this.state.temp_conv
      this.setState({convsList:this.convocatorias.map(conv =>(
        <h6 className="mb-3 font-weight-normal text-center">{conv.label}</h6>
      ))})
    }

    addAuxiliary(){
      this.auxiliary[this.auxiliary.length] = this.state.temp_aux
      console.log(this.state.temp_aux)
      this.setState({auxList:this.auxiliary.map(aux =>(
        <h6 className="mb-3 font-weight-normal text-center">{aux.label}</h6>
      ))})
    }

    addTheme(){
      this.themes[this.themes.length] = this.state.temp_theme
      this.setState({themeList:this.themes.map(theme =>(
        <h6 className="mb-3 font-weight-normal text-center">{theme.label}</h6>
      ))})
    }

  }
  export default configure_user;