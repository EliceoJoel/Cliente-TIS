import React, { Component } from 'react'
import axios from 'axios'
//import { Button } from 'reactstrap';
import Select from 'react-select'
var op = [
    { value: 'board', label: 'board' },
    { value: 'subject', label: 'subject' }
    
  ]
 class Post extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
            file: null,
            namePdf :'' ,
            year: '' ,
            subject: '', 
            selectedOption: null
        //    ref: ''
            
         }
     }
     
    // state = {
    //     file: null,
    //     namePdf :''

    // }
    
    exchangeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value })
}
    selectChange = selectedOption =>{
    this.setState(
        {selectedOption},
        () => console.log(this.state.selectedOption)
    )
    
}
    
    getType(){
    var type
    for (var i=0; i < this.state.selectedOption.length; i++) {
        type= type + (JSON.stringify(this.state.selectedOption[i].value))+"\n"
      }
    type = type.replace(/["']/g, "")
    type = type.replace("undefined", "")
    return type;
    }
    handleFile(e){

        let file = e.target.files[0]
        // console.log(e.target.files, "$$$$");
        // console.log(e.target.files[0], "$$$$");
        this.setState({file: e})



    }
    handleUpload(e ){
        let file = this.state.file
        let namePdf = this.state.namePdf
        let year = this.state.year
        let subject = this.state.subject
        //let ref = this.state.subject
        let send = new FormData()
            //send.append('pdf', file)
            send.append('name', namePdf)
            send.append('year', year )
            send.append('subject', subject)
            send.append('type', this.getType())
            axios.post('api/announcement', send)
            .then(response =>{
                console.log(response)
            }) 
            .catch(error => {
                console.log(error)
            })

    }
    render() {
         const {namePdf ,year, subject } =this.state
         const { selectedOption } = this.state
        return (
            <div className="jumbotron mt-5">
                <h3> POST ANNOUNCEMENT</h3> 
                <p></p>
                <p></p>
                <h4>Select file</h4>
                <p></p>
                
                
                <div >
                   
                <input 
                        onChange={(e) => this.handleFile(e)}
                        type = "file" 
                        name = "file" 
                        accept = "application/pdf"
                       />
                        <p></p>
                        </div>
                        <h5>Name of the announcement</h5>
                        <input 
                        
                        type = "text"
                        name = "namePdf"
                        value = {namePdf}  
                         onChange = {this.exchangeHandler}                     
                        />
                        <h5>Year</h5>
                        <p></p>
                         <input 
                        
                        type = "text"
                        name = "year"
                        value = {year}  
                         onChange = {this.exchangeHandler}                     
                        />
                        <h5>Subject</h5>
                        <p></p>
                         <input 
                        
                        type = "text"
                        name = "subject"
                        value = {subject}  
                         onChange = {this.exchangeHandler}                     
                        />
                   <p></p>
                   <h5>Type</h5>
                   <div>
                   <Select
                                isMulti
                                name="aux"
                                options={op}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder=""
                                value={selectedOption}
                                onChange={this.selectChange}
                            />
      </div>
      <p></p>
      <p></p>
                  <div>
                      
                <button onClick ={(e) => this.handleUpload(e)}>UPLOAD</button>
                </div>  
            </div>
        )
    }
}

export default Post
