import React, { Component } from 'react'
import {getPermissions} from './UserFunctions'
import {registerRol} from './UserFunctions'
import {registerPermission} from './UserFunctions'
import {getRolName} from './UserFunctions'

var permisions=[]


class Roles_permission extends Component {
    constructor() {
        super()
        this.state = {
            rolName: "",
            rolNameError:"",
            withoutPermission: "",
            rolRegister:"",
            permisionsListChecked: [],
            showBody: false,
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        getPermissions(1).then(permission =>{
          permisions = permission
        })
      }

    validField(){
        if(this.state.rolName === ""){
            this.setState({rolNameError:"Rol sin nombre"})
        }else{
           return true
        }
    }


    cheked(event, permission){
        this.setState({withoutPermission:"", rolRegister:""})
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        let checkList = this.state.permisionsListChecked
        if(value){
            checkList.push(permission)
            this.setState({permisionsListChecked: checkList})
        }else{
            const index = checkList.indexOf(permission);
            if (index > -1) {
              checkList.splice(index, 1);
            }
            this.setState({permisionsListChecked: checkList})
        }
        console.log(this.state.permisionsListChecked);
    }

    async registerPermission(idR){
       for(var i=0 ; i<this.state.permisionsListChecked.length ; i++){
           const newPermission = {
               permission: this.state.permisionsListChecked[i].permission,
               idRol: idR,
               route: this.state.permisionsListChecked[i].route.replace(" ", ".")
           }
           await registerPermission(newPermission)
       }
    }


    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
        this.setState({
            showBody:true, 
            permisionsListChecked:[], 
            withoutPermission:"", 
            rolNameError:"",
            rolRegister:""
        })

    }

    onSubmit(e){
        e.preventDefault()
        if(this.validField()){
            if(this.state.permisionsListChecked.length === 0){
                this.setState({withoutPermission:"Rol sin permiso(s)"})
            }else{
                this.verifyexists()
            } 
        }        
    }

    async verifyexists(){
        let roles = await getRolName()
        let array = []
            for (let i = 0; i < roles.length; i++) {
                array.push(roles[i].rol)
            }
        if(array.indexOf(this.state.rolName) > -1){
           this.setState({rolNameError:"El nombre de rol ya existe, introduzca otro nombre de rol por favor", showBody:false})
        }else{
            this.register()
        }
    }

    async register(){
        const rol = await registerRol({rol:this.state.rolName})
        console.log(rol.id)
        for(var i=0 ; i<this.state.permisionsListChecked.length ; i++){
            const newPermission = {
                permission: this.state.permisionsListChecked[i].permission,
                idRol: rol.id,
                route: this.state.permisionsListChecked[i].route.replace(" ", ".")
            }
            await registerPermission(newPermission)
        }
        this.setState({rolRegister:"Rol y permiso(s) registrado(s) correctamente", showBody:false})

    }

    render(){
        return(
            <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-12 my-3 p-3 bg-info text-white rounded">
                            <h1 className="h3 font-weight-normal text-center">
                                Registro de rol
                            </h1>
                        </div>
                        <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                                Datos del nuevo rol y sus permisos
                        </h3>
                        <div className="form-group col-md-12">
                            <label htmlFor="rolName">Nombre del rol</label>
                            <input
                                type="text"
                                className="form-control"
                                name="rolName"
                                placeholder="Ingrese el nombre del rol"
                                value={this.state.rolName}
                                onChange={this.onChange}
                            />
                            <p style={{color:"red"}}>{this.state.rolNameError}</p>
                            {this.state.showBody?
                                <div> 
                                    <table className="table table-striped">
                                      <thead>
                                        <tr className="d-flex">
                                          <th className="col-md-1">Marcar</th>
                                          <th className="col-md-11">Permisos</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {permisions.map( permission =>(
                                        <tr className="d-flex" key={permission.id}>
                                          <td className="col-md-1 text-center">
                                             <input type="checkbox" onChange={(event)=>this.cheked(event,permission)}/>
                                          </td>
                                          <td className="col-md-11">{permission.permission}</td>
                                        </tr>
                                      ))}
                                      </tbody>
                                    </table>
                                    <p style={{color:"green"}}><b>{this.state.rolRegister}</b></p>
                                    <p style={{color:"red"}}>{this.state.withoutPermission}</p>
                                    <button type="submit" className="btn btn-info mt-2 mb-5">
                                       Registrar rol
                                    </button>
                                </div>
                            :null
                            }
                        <p style={{color:"green"}}><b>{this.state.rolRegister}</b></p>
                        </div>
                    </div>
                </form>
        )
    }

    
}

export default Roles_permission