import React, { Component } from 'react'
import axios from 'axios'
export class FilePrueba extends Component {
    state = {
        selectedFile: null
    }

    fileSelectedHandler = event =>{
        this.setState({selectedFile: event.target.files[0]})
    }
    fileUploadHandler = () =>{
            const fd = new FormData();
            fd.append('name', "prueba")
            fd.append('year', "prueba")
            fd.append('type', "prueba")
            fd.append('departament', "prueba")
            fd.append('auxiliary', "prueba")
            fd.append('file', this.state.selectedFile, this.state.selectedFile.name)
            axios({
                method: 'post',    
            url: 'api/announcement',
            data: fd,
            headers: {'Content-Type': 'multipart/form-data' }
                })
            .then(res =>{
                console.log(res);
            });
           
    }
    render() {
        return (
            <div>
                 <input 
                      
                      onChange ={this.fileSelectedHandler}
                      type = "file" 
                      name = "file" 
                      accept = "application/pdf"

                     /> 
                    <button onClick = {this.fileUploadHandler}> UPLOAD </button>
            </div>
        )
    }
}

export default FilePrueba
