import React, { Component } from 'react'
import Modal from 'react-modal';
import MyCalendar from '../reusables/Calendar';
import MyLoader from '../reusables/MyLoader';
import './attendance.css'
import Checkbox from './Checkbox'

// const customStylesContainer = {
//     'fontSize': '18px',
//     'border': '1px solid black',
//     'textAlign': 'left',
//     'height': 'auto',
//     'width': '50%',
//     'minWidth': '350px',
//     'top': '50%',
//     'margin': '100px auto 0 auto',
//     'padding': '20px',
//     'backgroundColor': 'white'
// }

const customStyles = {
    content: {
        width: '500px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
const alertModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px'
    }
}
const successModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px'
    }
}


export default class AddAttendance extends Component {
    constructor() {
        super();
        this.state = {
            students: [], date: new Date(),
            viewDate: new Date(), checked: false,
            present: [],  presentStuds: [],
            errors: [], modalIsOpen: false,
            alertModalIsOpen: false, successModalIsOpen: false,
            loading: false
        }
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        fetch('/api/students', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                if (res.status === 401) {
                    this.setState({ loading: false })
                    this.props.history.push('/login')
                }
                if (res.status === 404) {
                    this.setState({ loading: false })
                    return <h4>Not Found !!</h4>
                }
                throw new Error(res.status)
            }
            return res.json()
        }).then(resdata => {
            this.setState({ students: resdata, present:resdata, errors: [], loading: false },()=>{
                console.log(this.state.present)
            })
        }).catch(err => {
            console.log(err)
            this.setState({ loading: false })
        })
    }

    handleCheckboxChange = (student) => {
        let arr = this.state.present.filter(item => item !== student)
        this.setState({ present: arr })
    }

    clearListItem = (student) => {
        if (this.state.present.indexOf(student) === -1) {
            this.setState({ present: [...this.state.present, student] })
        }
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const attendanceRequest = {
            "date": this.state.date.toLocaleDateString(),
            "present": this.state.present
        }
        fetch('/api/attendance', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(attendanceRequest)
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                if (res.status === 401) {
                    this.setState({ loading: false })
                    this.props.history.push('/login')
                }
                this.setState({ loading: false })
                throw new Error(res.status)
            }
            this.setState({ loading: false })
            return res.json()
        })
            .then(data => this.openSuccessModal())
            .catch(err => {
                this.setState({ loading: false })
                console.log(err)
            })
    }

    onChange = date => {
        this.setState({ date })
        this.closeModal()
    }
    onChangeView = date => {
        this.setState({ viewDate: date })
        this.closeModal()
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false, alertModalIsOpen: false, successModalIsOpen: false });
    };

    openAlertModal = () => {
        this.setState({ alertModalIsOpen: true })
    }

    openSuccessModal = () => {
        this.setState({ successModalIsOpen: true })
    }


    getAttendanceByDate = (e) => {
        e.preventDefault();
        const date = this.state.viewDate.toLocaleDateString()
        fetch(`/api/attendance/?date="${date}"`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                if (res.status === 401) {
                    this.setState({ loading: false })
                    this.props.history.push('/login')
                }
                if (res.status === 404) {
                    throw new Error(res.status)

                }
                this.setState({ loading: true })
                throw new Error(res.status)
            }
            return res.json()
        }).then(data => {
            this.setState({
                presentStuds: data.present,
                errors: [],
                loading: false
            })
        })
            .catch(err => {
                this.setState({ loading: false, errors: [...this.state.errors, err] })
                console.log(err)
                this.openAlertModal()
            })
    }

    render() {
        const listItem = this.state.students.map(stud => (
            <Checkbox key={stud._id} stud={stud} checked={true} handleChange={this.handleCheckboxChange} clearList={this.clearListItem} />
        ))
        return (this.state.loading) ? <MyLoader loading={this.state.loading} /> :
            <div className="container bg-light mt-5">
                <div className="row">
                    <div className="col-md p-5">
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="InputDate" className=''><h5>Pick Date</h5></label>
                                <i className="far fa-calendar-alt ml-2 mb-2 date-picker" id="InputDate" onClick={this.openModal} />
                                <h4 className='selected-date'>{this.state.date.toDateString()}</h4>
                                <div>
                                    <ul style={{ listStyle: 'none' }}><li>{listItem}</li></ul>
                                </div>
                                <button type='submit' className="btn btn-success">Save</button>
                            </div>
                        </form>
                    </div>
                    <div className="h-100"></div>
                    <div className="col-md p-5">
                        <div style={{ textAlign: 'center' }}>
                            <MyCalendar
                                className='calendar'
                                onChange={this.onChangeView}
                                value={this.state.viewDate}
                            />
                            <br />
                            <h4 className='selected-date'>Selected Date {this.state.viewDate.toDateString()}</h4>
                            <button type="submit" className="btn btn-primary" onClick={this.getAttendanceByDate}>Find Attendance</button>
                            {this.state.errors.length === 0 && this.state.presentStuds.map((stud, i) => <div key={i} className='border' style={{ margin: '20px auto' }}>
                                <h4>{stud.firstName} {stud.lastName}</h4>
                            </div>)}
                        </div>
                    </div>
                </div>

                {/* Calendar Modal */}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Date Picker Modal"
                    ariaHideApp={false}
                >
                    <MyCalendar
                        onChange={this.onChange}
                        value={this.state.date}
                    />
                </Modal>
                {/* Alert Modal*/}
                <Modal
                    isOpen={this.state.alertModalIsOpen}
                    onRequestClose={this.closeModal}
                    style={alertModalStyles}
                    contentLabel="Alert Modal"
                    ariaHideApp={false}
                >
                    {this.state.errors !== 0 &&
                        <div className="panel panel-danger">
                            <div className='panel-heading'>
                                Error
                            <span className="float-right" style={{ cursor: 'pointer' }} onClick={this.closeModal}>X</span>
                            </div><hr />
                            <div className="panel-body"><p>Something Went Wrong!!</p></div><hr />
                            <div className="panel-footer"><span className='float-right mr-2 text-danger'>{this.state.errors.length} Errors</span></div>
                        </div>
                    }
                </Modal>
                {/* Modal Success */}
                <Modal
                    isOpen={this.state.successModalIsOpen}
                    onRequestClose={this.closeModal}
                    style={successModalStyles}
                    contentLabel="Success Modal"
                    ariaHideApp={false}
                >
                    <div className="panel panel-success">
                        <div className='panel-heading'>
                            Success
                            <span className="float-right" style={{ cursor: 'pointer' }} onClick={this.closeModal}>X</span>
                        </div><hr />
                        <div className="panel-body"><p>SuccessFully Marked Attendance!!</p></div><hr />
                        <div className="panel-footer"><button className="btn btn-success" onClick={this.closeModal}>Ok</button></div>
                    </div>
                </Modal>
            </div>
    }
}