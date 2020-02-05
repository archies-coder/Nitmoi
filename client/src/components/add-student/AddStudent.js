import React, { Component } from 'react'
import Modal from 'react-modal';
import MyCalendar from '../reusables/Calendar'
import { AuthContext } from '../../context'
import MyLoader from '../reusables/MyLoader'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
//TODO make this app better
export default class AddStudent extends Component {
    constructor() {
        super()
        this.firstNameEl = React.createRef(); 
        this.middleNameEl = React.createRef(); 
        this.lastNameEl = React.createRef();
        this.addressEl = React.createRef(); 
        this.standardEl = React.createRef();
        this.boardEl = React.createRef(); 
        this.schoolEl = React.createRef();
        this.physicsEl = React.createRef();
        this.englishEl = React.createRef(); 
        this.mathsEl = React.createRef();
        this.chemEl = React.createRef();
        this.bioEl = React.createRef();
        this.sexEl = React.createRef(); 
        this.feesEl = React.createRef();
        this.state = {
            modalJoinIsOpen: false, modalDOBIsOpen: false,
            date: new Date(),
            loading: false,loggedIn: false,
            dateOfJoining: 'pick a date',dateOfBirth: new Date(),
            age:'Age'
        }
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        fetch('/auth', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                this.setState({ loggedIn: true, loading: false })
            } else {
                this.setState({ loggedIn: false, loading: false })
            }
        }).catch(err => {
            this.setState({ loggedIn: false, loading: false })
            throw new Error(err)
        })
    }

    onChange = date => {
        this.setState({ dateOfJoining: date })
        this.closeModal()
    }

    onDOBChange = date => {
        const age = new Date().getFullYear() - date.getFullYear()
        this.setState({ dateOfBirth: date, age })
        this.closeModal()
    }

    openJoiningModal = () => {
        this.setState({ modalJoinIsOpen: true });
    }

    openDOBModal = () => {
        this.setState({ modalDOBIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalJoinIsOpen: false, modalDOBIsOpen: false });
    }

    redirectHome = (e) => {
        e.preventDefault();
        this.props.history.push('/')
    }
    redirectLogin = (e) => {
        e.preventDefault();
        this.props.history.push('/login')
    }

    handleAddForm = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        const fName = this.firstNameEl.current.value; 
        const mName = this.firstNameEl.current.value;
        const lName = this.lastNameEl.current.value; 
        const std = this.standardEl.current.value;
        const addr = this.addressEl.current.value; 
        const brd = this.boardEl.current.value;
        const schl = this.schoolEl.current.value;
        const phy = this.physicsEl.current.value; 
        const eng = this.englishEl.current.value;
        const maths = this.mathsEl.current.value; 
        const chem = this.chemEl.current.value; 
        const bio = this.bioEl.current.value; 
        const sex = this.sexEl.current.value; 
        const fees = this.feesEl.current.value;

        const addStudentRequest = {
            "firstName": fName, 
            "middleName": mName, 
            "lastName": lName,
            "dateOfBirth": this.state.dateOfBirth,
            "joinedOn": this.state.dateOfJoining,
            "Address": addr, 
            "standard": std, 
            "Board": brd,
            "school": schl,
            "lastYearmarks": { 
                "physics": phy, 
                "english": eng, 
                "maths": maths ,
                "chemistry": chem ,
                "biology": bio ,
            },
            "sex": sex, 
            "fees": { 
                "total": fees 
            }
        }
        fetch('/api/student', {
            method: 'POST', mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, body: JSON.stringify(addStudentRequest)
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    if (res.status === 401) {
                        this.setState({ loading: false })
                        this.props.history.push('/login')
                    } else {
                        this.setState({ loading: false })
                    }
                }
                this.setState({ loading: false })
                return res.json();
            })
            .then(resData => {
                this.setState({ loading: false })
                this.props.history.push('/list')
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    render() {
        return (this.state.loading) ? <MyLoader loading={this.state.loading} /> :
            this.state.loggedIn ? <AuthContext.Consumer>
                {context => (
                    <div className="container text-align-center p-3">
                        <div className="container w-75 text-align-center">
                            <div className="container" style={{ textAlign: 'center', fontSize: '25px' }}>Add New Student</div>
                            <form className="py-3" onSubmit={this.handleAddForm}>
                                <hr />
                                <div className="row py-3">
                                    <div className="col">
                                        <label htmlFor="FirstName">First Name</label>
                                        <input type="text" ref={this.firstNameEl} id="FirstName" className="form-control form-control-sm" placeholder="First name" required />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="MiddleName">Middle Name</label>
                                        <input type="text" ref={this.middleNameEl} id="MiddleName" className="form-control form-control-sm" placeholder="Middle name" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="LastName">Last Name</label>
                                        <input type="text" ref={this.lastNameEl} id='LastName' className="form-control form-control-sm" placeholder="Last name" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label htmlFor="InputAddress">Address</label>
                                        <input type="text" ref={this.addressEl} className="form-control form-control-sm" id="InputAddress" placeholder="Address" required />
                                    </div>
                                    <div className="form-group col-4">
                                        <div className="input-group">
                                            <label htmlFor="dateOfBirth">Date Of Birth </label>
                                            <div className="w-100"></div>
                                            <input type="text" className='form-control form-control-sm' value={this.state.dateOfBirth.toLocaleString('en-IN').split(',')[0]} name="dateOfBirth" readOnly />
                                            <div className="input-group-append">
                                                <span className="input-group-text" title='Date Of Joining' id="basic-addon1" onClick={this.openDOBModal}>
                                                    <i className="far fa-calendar-alt" id="date" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="input-group">
                                            <label htmlFor="Age">Age</label>
                                            <div className="w-100"></div>
                                            <input type="text" className='form-control form-control-sm' name="Age" value={this.state.age} readOnly/>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="form-group col">
                                        <label htmlFor="Inputstandard">Standard</label>
                                        <select className="form-control form-control-sm" id="Inputstandard" ref={this.standardEl}>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                        </select>
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="InputBoard">Board</label>
                                        <select className="form-control form-control-sm" id="InputBoard" ref={this.boardEl}>
                                            <option>MH</option>
                                            <option>MH Semi-Eng</option>
                                            <option>ICSE</option>
                                            <option>CBSE</option>
                                        </select>
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="dateOfJoining">Date Of Joining </label>
                                        <div className="input-group">
                                            <input type="text" className='form-control form-control-sm' value={this.state.dateOfJoining.toLocaleString('en-IN').split(',')[0]} name="dateOfJoining" readOnly />
                                            <div className="input-group-append">
                                                <span className="input-group-text" title='Date Of Joining' id="basic-addon1" onClick={this.openJoiningModal}>
                                                    <i className="far fa-calendar-alt" id="date" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    <label htmlFor="InputSchool">School</label>
                                    <input type="text" ref={this.schoolEl} className="form-control form-control-sm" id="InputSchool" placeholder="School" required />
                                <hr/>
                                <div className="form-group row">
                                    <div className="col-md-4">
                                        <label htmlFor="Physics">Physics</label>
                                        <input type="text" className="form-control form-control-sm" id='Physics' ref={this.physicsEl} id="InputPhysics" placeholder="Physics" required />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="English">English</label>
                                        <input type="text" className="form-control form-control-sm" id='English' ref={this.englishEl} id="InputEnglish" placeholder="English" required />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="Maths">Maths</label>
                                        <input type="text" className="form-control form-control-sm" id= 'Maths' ref={this.mathsEl} id="InputMaths" placeholder="Maths" required />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-4">
                                        <label htmlFor="Chemistry">Chemistry</label>
                                        <input type="text" 
                                        className="form-control form-control-sm" 
                                        id='Chemistry' ref={this.chemEl}
                                         placeholder="Chemistry" required />
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="Biology">Biology</label>
                                        <input type="text" 
                                        className="form-control form-control-sm" 
                                        id='Biology' ref={this.bioEl} 
                                        placeholder="Biology" required />
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="form-group col">
                                        <label htmlFor="InputSex">Gender</label>
                                        <select className="form-control form-control-sm" id="InputSex" ref={this.sexEl}>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group col">
                                        <label htmlFor="InputFees">Total Fees</label>
                                        <input type="number" className="form-control form-control-sm" ref={this.feesEl} id="InputFees" placeholder="Total Fees" />
                                    </div>
                                </div>
                                <hr />
                                <button type="button" onClick={this.redirectHome} className="btn btn-light float-right ml-3">Cancel</button>
                                <button type="submit" className="btn btn-primary float-right">Submit</button>
                            </form>
                        </div>

                        <Modal
                            isOpen={this.state.modalJoinIsOpen}
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
                        <Modal
                            isOpen={this.state.modalDOBIsOpen}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Date Picker Modal"
                            ariaHideApp={false}
                        >
                            <MyCalendar
                                onChange={this.onDOBChange}
                                value={this.state.date}
                            />
                        </Modal>
                    </div>
                )}
            </AuthContext.Consumer> : <div className='container p-5'>
                    <h3>OOPS !! <br /> Not Logged In</h3>
                    <a href="/login" onClick={this.redirectLogin}>Login</a>
                </div>
    }
}
