import React, { Component } from 'react'
import Modal from 'react-modal';
import MyCalendar from '../reusables/Calendar';
import './attendance.css'
import Student from '../student-list/Student';


const customStylesContainer = {
    'fontSize'        : '18px',
    'border'           : '1px solid black',
    'textAlign'        : 'left',
    'height'           : 'auto',
    'width'            : '50%',
    'top'              : '50%',
    'margin'           : '100px auto 0 auto',
    'padding'          : '20px',
    'backgroundColor' : 'white'
}

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  const alertModalStyles = {
      content:{
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '500px'
      }
  }


export default class AddAttendance extends Component {
    constructor(){
        super();
        this.state = {
            students: [],
            date: new Date(),
            viewDate: new Date(),
            checked: false,
            present: [],
            viewVisible: false,
            addVisible: false,
            presentStuds: [],
            errors: [],
            modalIsOpen: false,
            alertModalIsOpen: false
        }
    }

    componentWillMount = () => {
        fetch('/api/students',{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept'      : 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed!");
              }
              return res.json()
        }).then(resdata => {         
            this.setState({students:resdata})
        }).catch(err => console.log(err)
        )
    }

    handleCheckboxChange = (student) => {
        if(this.state.present.indexOf(student) === -1){
            this.setState({present: [...this.state.present, student]})
        }
    } 

    clearListItem =(stud)=>{
        let arr = this.state.present.filter(item=> item!==stud)
        this.setState({present: arr})
    }

    handleFormSubmit=e=>{
        e.preventDefault();
        const attendanceRequest = {
            "date": this.state.date.toLocaleDateString(),
            "present": this.state.present
        }
        fetch('/api/attendance',{
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(attendanceRequest)
        }).then(res=>res.json()).then(data=>console.log(data)).catch(err=>console.log(err))
    }

    onChange = date => {
        this.setState({ date })
        this.closeModal()
    }
    onChangeView = date => {
        this.setState({ viewDate: date })
        this.closeModal()
  }

    openModal = ()=> {
        this.setState({modalIsOpen: true});
    };

    closeModal= ()=> {
        this.setState({modalIsOpen: false, alertModalIsOpen: false});
    };

    openAlertModal=()=>{
        this.setState({alertModalIsOpen:true})
    }

    toggleView=()=>{
        this.setState({viewVisible: !this.state.viewVisible})
        if(this.state.addVisible){
            this.setState({addVisible: false})
        }
    }

    toggleAdd=()=>{
        this.setState({addVisible: !this.state.addVisible})
        if(this.state.viewVisible){
            this.setState({viewVisible: false})
        }
    }

    getAttendanceByDate=(e)=>{
        e.preventDefault();
        const date= this.state.viewDate.toLocaleDateString()
        fetch(`/api/attendance/?date="${date}"`,{
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then(res=> res.json()).then(data=>{
            this.setState({
                presentStuds: data.present
            })
        })
        .catch(err=>{this.setState({errors: [...this.state.errors,err]})
        console.log(err)
        this.openAlertModal()    
    })
    }

    render() {
        const listItem = this.state.students.map(stud => (
                    <Checkbox key={stud._id} stud={stud} handleChange={this.handleCheckboxChange} clearList={this.clearListItem}/>
        ))
        return (
            <div style={customStylesContainer}>
                <button type="submit" className="btn btn-info mb-3" onClick={this.toggleView}>View Attendance</button><br/>
                <button type="submit" className="btn btn-info mb-3" onClick={this.toggleAdd}>Mark Attendance</button>
                {/* Add Attendance */}
                {this.state.addVisible && <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="InputDate"><h5>Pick Date</h5></label>
                        <i className="far fa-calendar-alt ml-2 mb-2 date-picker" id="InputDate"onClick={this.openModal}/>
                        <h4 className='selected-date'>{this.state.date.toDateString()}</h4>
                        <div>
                            <ul style={{listStyle: 'none'}}><li>{listItem}</li></ul>
                        </div>
                        <button type='submit' className="btn btn-success">Save</button>
                    </div>
                </form>}
                {/* View Attendance */}
                {this.state.viewVisible && 
                    (<div style={{textAlign:'center'}}>
                        <MyCalendar
                            className='calendar'
                            onChange={this.onChangeView}
                            value={this.state.viewDate}
                        />
                        <br/>
                        <h4 className='selected-date'>Selected Date {this.state.viewDate.toDateString()}</h4>
                        <button type="submit" className="btn btn-primary" onClick={this.getAttendanceByDate}>GET</button>
                        {this.state.errors.length===0 ? this.state.presentStuds.map(stud=><Student key={stud._id} 
                                    fName={stud.firstName} 
                                    lName={stud.lastName} 
                                    Std={stud.standard}
                                    Addr={stud.Address}
                                    brd={stud.Board}
                                    phy={stud.lastYearmarks.physics}
                                    eng={stud.lastYearmarks.english}
                                    maths={stud.lastYearmarks.maths}
                                    sex={stud.sex}
                                    fees={stud.feesPaid}
                                    />): this.openAlertModal}
                    </div>)
                }
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Date Picker Modal"
                >
                  <MyCalendar
                    onChange={this.onChange}
                    value={this.state.date}
                    />
                </Modal>
                <Modal
                    isOpen={this.state.alertModalIsOpen}
                    onRequestClose={this.closeModal}
                    style={alertModalStyles}
                    contentLabel="Alert Modal"
                    ariaHideApp={false}
                >
                  {this.state.errors!==0 &&
                    <div className="panel panel-danger">
                        <div className='panel-heading'>
                            Error
                            <span className="float-right" style={{cursor:'pointer'}} onClick={this.closeModal}>X</span>
                        </div><hr/>
                        <div className="panel-body"><p>Something Went Wrong!!</p></div><hr/>
                        <div className="panel-footer"><span className='float-right mr-2 text-danger'>{this.state.errors.length} Errors</span></div>
                    </div>
                    }
                </Modal>
            </div>
        )
    }
}

class Checkbox extends Component {
    constructor(props){
        super(props);
        this.state = {
            checked: false 
        }
    }
    
    handleClick = (e) => {
        const {handleChange, stud, clearList} = this.props;
        const bool = !this.state.checked;
        this.setState({checked: bool});
        if(bool){
            handleChange(stud)
        } else {
            clearList(stud)
        }
    }

    render(){
        const text = this.state.checked ? <h3 style={{color: 'green'}} className='list-names'>{this.props.stud.firstName}</h3> : <h3 style={{color:'red'}} className='list-names'>{this.props.stud.firstName}</h3>;
        return (
            <label className="checkbox-container">
                <input onChange={this.handleClick} checked={this.state.checked} value={text} type="checkbox"/><h5 className='list-names'>{text}</h5>
                <span className="checkmark"></span>
            </label>
        )
    }
}