import React, { Component } from 'react'
import Select from 'react-select'

var conv = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }]

class Enabled_list extends Component {
    constructor() {
        super()
        this.state = {
            selectConv:null,
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    selectConvChange = selectedConv =>{
        this.setState({selectConv:selectedConv})
    }

    onSubmit(e) {
       
    }

    render() {
        const { selectConv } = this.state

        return (
            <div className="justify-content-center">
                <h1 className="h3 font-weight-normal text-center mt-3 p-3 bg-info text-white">
                   Publicacion de convocatorias 
                </h1>
                <div className="row">
                    <h3 className="h5 col-md-12 my-4 font-weight-normal text-center">
                        Datos de la Convocatoria
                    </h3>   
                    <div className="form-group col-md-6">
                        <label htmlFor="Nombre">Nombre</label>
                        <Select
                          name="conv"
                          value={selectConv}
                          options={conv}
                          onChange={this.selectConvChange}
                          className="basic-select"
                          classNamePrefix="select"
                        />
                        <p style={{color:"red"}}>{this.state.name_error}</p>
                    </div>
                </div>
            </div>        
        )
    }
}

export default Enabled_list