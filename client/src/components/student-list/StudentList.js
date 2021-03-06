import React, { Component } from 'react'
import Student from './Student';
import MyLoader from '../reusables/MyLoader';
import './list.css'
import { AuthContext } from '../../context';


export default class StudentList extends Component {
    constructor() {
        super()
        this.state = {
            students: [],
            loading: false,
            loggedIn: true
        }
    }

    getStudents = () => {
        this.setState({ loading: true })
        fetch('/api/students', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 401) {
                this.setState({ loggedIn: false })
                this.props.history.push('/login')
            }
            if (res.status === 404) {
                return <h4>Not Found !!</h4>
            }
            return res.json()
        }).then(resdata => {
            this.setState({ loading: false })
            this.setState({ students: resdata })
        }).catch(err => {
            this.setState({ loading: false })
            throw new Error(err)
        })
    }

    componentDidMount = () => {
        this.setState({ loading: true })
        fetch('/api/students', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
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
            }
            return res.json()
        }).then(resdata => {
            this.setState({ students: resdata, loading: false })
        })
    }

    deleteStudent = (id, e) => {
        e.preventDefault();
        this.setState({ loading: true })
        fetch(`/api/student?id=${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            this.setState({ loading: false })
        }).catch(err => {
            this.setState({ loading: false })
            throw new Error(err)
        })
        this.getStudents()
    }

    render() {
        return <AuthContext.Consumer>
            {context => {
                return (this.state.loggedIn) ?
                    (this.state.loading) ?
                        <MyLoader loading={this.state.loading} />
                        :
                        <div className="container d-lg-flex">
                            <div className='row w-100 justify-content-left justify-content-sm-center'>
                                {this.state.students.length === 0 ? <div>No Students To Display</div>
                                    : this.state.students.sort((a, b) => {
                                        return a.standard - b.standard;
                                    }).map(stud => {
                                        console.log(stud)
                                        return <div key={stud._id} className='col col-md-auto col-sm-auto'>
                                            <Student className=''
                                                id={stud._id}
                                                fName={stud.firstName}
                                                mName={stud.middleName}
                                                lName={stud.lastName}
                                                DOB={stud.dateOfBirth}
                                                Std={stud.standard}
                                                Addr={stud.Address}
                                                School={stud.school}
                                                brd={stud.Board}
                                                joinedOn={stud.joinedOn}
                                                phy={stud.lastYearmarks.physics}
                                                eng={stud.lastYearmarks.english}
                                                maths={stud.lastYearmarks.maths}
                                                chem={stud.lastYearmarks.chemistry}
                                                bio={stud.lastYearmarks.biology}
                                                sex={stud.sex}
                                                fees={stud.fees.total}
                                                deleteStudent={this.deleteStudent}
                                            />
                                        </div>
                                    })}
                            </div>
                        </div>
                    :
                    context.authChange()
            }}
        </AuthContext.Consumer>
    }
}
