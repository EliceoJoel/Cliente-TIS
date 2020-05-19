import React, { Component } from 'react'
import { getProfile } from './UserFunctions'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            fullname: '',
            user: '',
            idRol: null,
            idAnnouncement: null
        }
    }

    componentDidMount() {
        getProfile().then(res => {
            console.log(res);
            
            this.setState({
                fullname: res.user.fullname,
                user: res.user.user,
                idRol: res.user.idRol,
                idAnnouncement: res.user.idAnnouncement
            })
            console.log(res)
        })
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-4 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-4 mx-auto">
                        <tbody>
                            <tr>
                                <td>Nombres</td>
                                <td>{this.state.fullname}</td>
                            </tr>
                            <tr>
                                <td>Usuario</td>
                                <td>{this.state.user}</td>
                            </tr>
                            <tr>
                                <td>id rol</td>
                                <td>{this.state.idRol}</td>
                            </tr>
                            <tr>
                                <td>id convocatoria</td>
                                <td>{this.state.idAnnouncement}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile
