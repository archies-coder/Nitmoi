import React, { Component } from 'react'
import Modal from 'react-modal';


export default class AddAttendance extends Component {
    constructor(){
        super();
        this.state = {
            students: []
        }
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <h4>Add Today's Attendance</h4>
                    <i class="fas fa-plus"></i>
                </div>
            </React.Fragment>
        )
    }
}
