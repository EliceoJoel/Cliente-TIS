/* eslint-disable eqeqeq */
import React, {Component} from 'react';
import Select from 'react-select'
import {getAllUsers} from './UserFunctions'
import {getRol} from './UserFunctions'
import {getAnnouncement} from './UserFunctions'
import {getAux} from './UserFunctions'
import {getTheme} from './UserFunctions'
import {saveAnnouncement} from './UserFunctions'
import axios from 'axios'



let conv =[]
class configure_user extends Component{
  
  constructor(props) {
      super(props);
      this.users =[]
      this.rol =[]
      this.aux = []
      this.theme = []
      this.items=[]
      this.state = {
        user:null,
        rol:{id:-1,label:null},
        temp_conv:"",
        temp_aux:"",
        temp_theme:"",
        convsList:(<div></div>),
        auxList:(<div></div>),
        themeList:(<div></div>),
        message:"",
      };

      this.fillAux = this.fillAux.bind(this);
    }
    async componentDidMount() {
      await getAllUsers().then(res => {
        for(let i=0; i<res.length; i++){
          let user = {};
          user.id = res[i].id
          user.label = res[i].fullname
          this.users[i]= user
        }
      })

      await getRol().then(roles => {
        for (var i=0; i < roles.length; i++) {
            var object = {}
            object.id = roles[i].id
            object.label = roles[i].rol
            this.rol[i] = object
        }
      })

      await getAnnouncement().then(res => {
        for (var i=0; i < res.length; i++) {
            var object = {}
            object.id = res[i].id
            object.label = res[i].name
            object.type = res[i].type
            object.idConv = res[i].id
            object.idAux = -1
            object.idTheme = -1
            conv[i] = object
        }
      })
    }

    changeUsr(e){
      this.setState({user:e})
      this.setState({message:'', itemsList:(<div></div>)})
      this.items =[]
    }

    render(){
      
      return(
            <div> 
                <h1 className="h3 mb-3 font-weight-normal text-center rounded">
                        Configuracion de usuarios
                </h1>

                <label htmlFor="Nombre">Selecciona un usuario</label>
                <Select
                name="user"
                options={this.users}
                onChange={(e) => this.changeUsr(e)}
                placeholder=""
                className="basic-select"
                classNamePrefix="select"
                />
                
                <br/>
                <label htmlFor="Nombre">Selecciona un rol</label>
                <Select
                name="rol"
                options={this.rol}
                onChange={(e) => this.change(e)}
                placeholder=""
                className="basic-select"
                classNamePrefix="select"
                />
                <br/>
                {this.visualizar()}
            </div>
        )
    }

    change(e){
      console.log(e)
      this.setState({rol:e,
                    itemsList:[]})
      this.items = []
      this.theme = []
      this.aux =[]
      this.conv = []
      this.setState({message:''})
    }

    async fillAux(e){
      let announcement = e;
      console.log(announcement)
      this.aux =[]
      this.setState({temp_conv : announcement})
      await getAux(announcement.id).then(res =>{
        let a = res
        console.log(a)
        for(let i=0; i<a.length;i++){
          let object ={}
          object.id = a[i].id
          object.label = a[i].name
          object.idConv = announcement.id
          object.idAux = a[i].id
          object.idTheme = -1
          this.aux[i] = object
        }
      }).catch(err => {
        console.log(err)
    })
    }

    async fillTheme(e){
      this.theme = [] 
      this.setState({temp_aux : e})
      let data = {auxiliary:e.label}
      await getTheme(data).then(res =>{
        let a = res.data
        for(let i=0; i<a.length;i++){
          let object ={}
          object.id = a[i].id
          object.label = a[i].theme
          object.aux = e.id
          object.idConv = e.idConv
          object.idAux = e.idAux
          object.idTheme = a[i].id
          this.theme[i] = object
        }
      }).catch(err => {
        console.log(err)
    })
    }

    visualizar(){
      if(this.state.rol.label == "Comisión de evaluación de conocimientos"){
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
          {this.generar()}
        </div>)
      }

      else {
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
            <div> {this.state.itemsList} </div>
            <br/>
            <button  type="button" className="btn btn-info md-2" onClick ={() => this.addAnnouncement()}> agregar </button>
            <div class="h-100 row align-items-center">
              <div style={{color:'green'}} className="mt-4">
                <p className= "col md-2 align-middle">{this.state.message}</p>
              </div>
            </div>
            <button  type="button" className="btn btn-info md-2" onClick ={() => this.save()}> guardar </button>
          </div>
          )
      }

    }

    addAnnouncement(){
      this.setState({message:''})
      this.items[this.items.length] = this.state.temp_conv
      console.log(this.items)
      this.items = this.items.filter(function(item, index, array) {
        return array.indexOf(item) === index;
      })
      this.setState({itemsList:this.items.map(conv =>(
        <h6 className="mb-3 font-weight-normal text-center">{conv.label}</h6>
      ))})
    }

    addAuxiliary(){
      this.setState({message:''})
      this.items = this.check(this.state.temp_aux, this.items)
      this.setState({itemsList:this.items.map(aux =>(
        <h6 className="mb-3 font-weight-normal text-center">{aux.label}</h6>
      ))})
    }

    addTheme(){
      this.setState({message:''})
      this.items = this.check(this.state.temp_theme, this.items)
      this.setState({itemsList:this.items.map(theme =>(
        <h6 className="mb-3 font-weight-normal text-center">{theme.label}</h6>
      ))})
    }

    check(a, list){
      for (let i=0; i<list.length;i++){
        if(list[i].id ===  a.id) {return list}
      }
      list[list.length] = a
      return list
    }

    save(){
      for(let i = 0; i<this.items.length;i++){
        let data = {
          "idAnnouncement": this.items[i].idConv,
          "idAuxiliary": this.items[i].idAux,
          "idTheme": this.items[i].idTheme,
          "idUser":this.state.user.id
          }
          console.log(data)
        saveAnnouncement(data)
      }
      console.log(this.state.user.id, this.state.rol.id)
      axios.get('api/updateRol/'+this.state.user.id+'/'+this.state.rol.id ,{
        headers: { 'Content-Type': 'application/json' }
      }).catch(err => {
          console.log(err)
      })
      this.setState({message:'se guardaron los datos'})
    }

    generar(){
      if(this.state.temp_conv.type == "Laboratorio")
      return(
        <div>
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
          <br/>
          <div> {this.state.itemsList} </div>
          <br/>
          <button  type="button" className="btn btn-info md-2" onClick ={() => this.addTheme()}> agregar </button>
          <div style={{color:'green'}} className="mt-4">
            <p className= "md-2">{this.state.message}</p>
          </div>
          <button  type="button" className="btn btn-info md-2" onClick ={() => this.save()}> guardar </button>
        </div>
      )
      if(this.state.temp_conv.type == "Docencia")
      return(
        <div>
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
          <div> {this.state.itemsList} </div>
          <br/>
          <button  type="button" className="btn btn-info md-2" onClick ={() => this.addAuxiliary()}> agregar </button>
          <div style={{color:'green'}} className="mt-4">
            <p className= "md-2">{this.state.message}</p>
          </div>
          <button  type="button" className="btn btn-info md-2" onClick ={() => this.save()}> guardar </button>
        </div>
      )
    }

  }
  export default configure_user;