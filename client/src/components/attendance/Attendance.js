import React, { Component } from 'react'
import Modal from 'react-modal';
import MyCalendar from '../reusables/Calendar';
import './attendance.css'

const customStylesContainer = {
    'font-size'        : '18px',
    'border'           : '1px solid black',
    'textAlign'        : 'left',
    'height'           : 'auto',
    'width'            : '50%',
    'top'              : '50%',
    'margin'           : '100px auto 0 auto',
    'padding'          : '20px',
    'background-color' : 'white'
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


export default class AddAttendance extends Component {
    constructor(){
        super();
        this.state = {
            students: [],
            date: new Date(),
            checked: false,
            present: [],
            viewVisible: false,
            addVisible: false
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
            "date": this.state.date,
            "present": this.state.present
        }
        fetch('/api/attendance',{
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(attendanceRequest)
        }).then(res=>res.json()).then(data=>console.log(data)).catch(err=>console.log(err)
        )
    }

    onChange = date => {
        this.setState({ date })
        this.closeModal()
  }

    openModal = ()=> {
        this.setState({modalIsOpen: true});
    };

    closeModal= ()=> {
        this.setState({modalIsOpen: false});
    };

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

    render() {
      const listItem = this.state.students.map(stud => (
            <div >
                <Checkbox key={stud._id} stud={stud} handleChange={this.handleCheckboxChange} clearList={this.clearListItem}/>
            </div>
      ))
        return (
            <div style={customStylesContainer}>
                <button type="submit" className="btn btn-info mb-3" onClick={this.toggleView}>View Attendance</button><br/>
                <button type="submit" className="btn btn-info" onClick={this.toggleAdd}>Mark Attendance</button>
                {this.state.addVisible &&<form onSubmit={this.handleFormSubmit}>
                    <div class="form-group">
                        <label htmlFor="InputDate"><h4>Pick Date</h4></label>
                        <i className="far fa-calendar-alt ml-2 mb-2 btn-lg date-picker" id="InputDate"onClick={this.openModal}/>
                        <h4 className='selected-date'>{this.state.date.toDateString()}</h4>
                        <div>
                            <ul style={{listStyle: 'none'}}><li>{listItem}</li></ul>
                        </div>
                        <button type='submit' className="btn btn-success">Save</button>
                    </div>
                </form>}
                {this.state.viewVisible && <div>Hello</div>}
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
        console.log(bool)
        if(bool){
            handleChange(stud)
        } else {
            clearList(stud)
        }
    }

    render(){
        const text = this.state.checked ? <h3 style={{color: 'green'}}>{this.props.stud.firstName}</h3> : <h3 style={{color:'red'}}>{this.props.stud.firstName}</h3>;
        return (
            <label class="checkbox-container">
                <input onChange={this.handleClick} checked={this.state.checked} value={text} type="checkbox"/>{text}
                <span class="checkmark"></span>
            </label>
        )
    }
}