import React, { Component } from 'react'
import Student from './Student';
import MyLoader from '../reusables/MyLoader';
import './list.css'

export default class StudentList extends Component {
    constructor(){
        super()
        this.state = {
            students : [],
            loading: false
        }
    }

    getStudents=()=>{
        this.setState({loading: true})
        fetch('/api/students',{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status === 401){
                this.props.history.push('/login')
            }
            if(res.status === 404){
                return <h4>Not Found !!</h4>
            }
              return res.json()
        }).then(resdata => {         
            this.setState({loading: false})
            this.setState({students:resdata})
        }).catch(err =>{
            this.setState({loading: false})
            throw new Error(err)
        })
    }

    componentDidMount = () => {
        this.setState({loading: true})
        fetch('/api/students',{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                if(res.status === 401){
                    this.setState({loading: false})
                    this.props.history.push('/login')
                }
                if(res.status === 404){
                    this.setState({loading: false})
                    return <h4>Not Found !!</h4>
                }
            }
              return res.json()
        }).then(resdata => {         
            this.setState({students:resdata, loading: false})
        })
    }

    deleteStudent=(id, e)=>{
        e.preventDefault();
        this.setState({loading: true})
        fetch(`/api/student?id=${id}`,{
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        }).then(res=>{
            this.setState({loading:false})
        }).catch(err=>{
            this.setState({loading: false})
            throw new Error(err)
        })
        this.getStudents()
    }
    
    render() {
       return (this.state.loading) ? 
                <MyLoader loading={this.state.loading} />
                 : 
                 <div className="container">
                     <div className='row w-100 justify-content-left justify-content-sm-center'>
                        {this.state.students.length === 0 ? <div>No Students To Display</div>
                        :this.state.students.sort((a,b)=>{
                            return a.standard - b.standard;
                        }).map(stud => {
                        return <div className='col col-md-auto col-sm-auto'>
                            <Student className=''
                                    key={stud._id} 
                                    id={stud._id}
                                    fName={stud.firstName} 
                                    lName={stud.lastName} 
                                    Std={stud.standard}
                                    Addr={stud.Address}
                                    brd={stud.Board}
                                    phy={stud.lastYearmarks.physics}
                                    eng={stud.lastYearmarks.english}
                                    maths={stud.lastYearmarks.maths}
                                    sex={stud.sex}
                                    fees={stud.fees.total}
                                    deleteStudent={this.deleteStudent}
                                    />
                        </div> 
                })}
       </div>
                 </div>
            ;
    }
}
