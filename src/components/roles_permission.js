class Register extends Component {


    constructor() {
        super()
        this.state = {
            rolName:"",
            rolNameError:""
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    render(){
        return(
            <form noValidate onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-12 my-3 p-3 bg-info text-white">
                            <h1 className="h3 font-weight-normal text-center">
                                Registro de nuevo rol
                            </h1>
                        </div>
                        <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                                Datos del nuevo rol y sus permisos
                        </h3>
                        <div className="form-group col-md-4">
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
                        </div>
    
                        <button type="submit" className="col btn btn-lg btn-info mt-2 mb-5">
                            Registrar rol
                        </button>
                    </div>
                </form>
        )
    }

}