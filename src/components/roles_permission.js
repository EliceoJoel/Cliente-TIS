import React, { Component } from 'react'
import {getPermissions} from './UserFunctions'

var permisions=[]

class Roles_permission extends Component {
    constructor() {
        super()
        this.state = {
            rolName:"",
            rolNameError:"",
            showBody:false,
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        getPermissions(1).then(permission =>{
          permisions = permission
        })
      }

    validFields(){

    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value })
        this.setState({showBody:true})
        if(e.target.value === ''){
            this.setState({showBody:false})
        }
    }

    onSubmit(e){
        e.preventDefault()
        if(this.validFields()){

        }
    }

    render(){
        return(
            <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-12 my-3 p-3 bg-info text-white">
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
                                             <input type="checkbox"/>
                                          </td>
                                          <td className="col-md-11">{permission.permission}</td>
                                        </tr>
                                      ))}
                                      </tbody>
                                    </table>
                                    <button type="submit" className="btn btn-info mt-2 mb-5">
                                       Registrar rol
                                    </button>
                                </div>
                            :null
                            }
                        </div>
                    </div>
                </form>
        )
    }

}

export default Roles_permission