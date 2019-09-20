import React, {useContext, useState} from 'react'
import {AuthContext} from '../../context';
import Modal from 'react-modal';
import MyCalendar from '../reusables/Calendar';
import MyLoader from '../reusables/MyLoader';
import {Link} from 'react-router-dom';

const customStyles = {
    content : {
        top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -5%)'
    }
};

const EditStudent = (props)=> {
    const studentContext = useContext(AuthContext);
    const {fName,mName,lName,Std,Addr,School,brd, phy,eng,maths,sex,fees} = studentContext.state.selectedForEdit;
    const [modalJoinIsOpen, setModalJoinIsOpen] = useState(false)
    const [modalDOBIsOpen, setModalDOBIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(new Date())
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    
    const openJoiningModal = () =>{
        setModalJoinIsOpen(true)
    }
    const openDOBModal = () =>{
        setModalDOBIsOpen(true)
    }
    
    const closeModal=()=>{
        setModalJoinIsOpen(false)
        setModalDOBIsOpen(false)
    }
    
    const onChange=(date)=>{
        setDate(date)
        closeModal()
    }
    const onDOBChange=(date)=>{
        setDateOfBirth(date)
        closeModal()
    }
    
    const redirectHome = (e)=>{
        e.preventDefault();
        props.history.push('/list')
    }
    
    const firstNameEl = React.createRef(); const middleNameEl = React.createRef();const lastNameEl = React.createRef();
    const addressEl = React.createRef();const standardEl = React.createRef();
    const boardEl = React.createRef();
    const schoolEl = React.createRef();
    const physicsEl = React.createRef();
    const englishEl = React.createRef();const mathsEl = React.createRef();
    const sexEl = React.createRef();const feesEl = React.createRef();
    
    const handleUpdateSubmit=(e)=>{
        e.preventDefault();
        console.log(date.toLocaleDateString())
        setLoading(true)
        const fName = firstNameEl.current.value; const mName = middleNameEl.current.value;const lName = lastNameEl.current.value;
        const std = standardEl.current.value;const addr = addressEl.current.value;
        const brd = boardEl.current.value;
        const schl = schoolEl.current.value;
        const dateOfJoining = date;
        const phy = physicsEl.current.value;
        const eng = englishEl.current.value;const maths = mathsEl.current.value;
        const sex = sexEl.current.value;const fees = feesEl.current.value;
        
        const updateStudentData = {
            "firstName":fName,"middleName": mName, "lastName":lName,
            "dateOfBirth": dateOfBirth,
            "Address":addr,"standard":std,
            "Board":brd,"school": schl,
            "joinedOn": dateOfJoining,
            "lastYearmarks":{
                "physics":phy, "english":eng,"maths":maths
            },
            "sex":sex,"fees":{"total": fees}
        }
        fetch(`/api/student/?id=${studentContext.state.selectedForEdit.id}`,{
            method: 'PUT',
            mode:'cors',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateStudentData)
        }).then(res=>{
            if (res.status !== 200 && res.status !== 201) {
                if(res.status === 401){
                    setLoading(false)
                    props.history.push('/login')
                }
                throw new Error(res.status)
            }
            return res.json();
        })
        .then(resData=>{
            setLoading(false)
            props.history.push('/list')
        }).catch(err=>{
            setLoading(false)
            throw new Error(err)            
        })
    }
    return (loading) ? <MyLoader loading={loading} /> :
    <React.Fragment>
            <div>
                <Link to='/list'>
                    <button className='btn btn-link float-left mx-3 my-3' title='back to list'>
                        <i className="fas fa-arrow-left" style={{fontSize:'18px',marginRight:'10px'}}></i>Back To List
                    </button>
                </Link>
            </div>
            <div className="container text-align-center p-3">
                <div className="container w-75 text-align-center">
                    <div className="container" style={{ textAlign: 'center', fontSize: '25px' }}>Add New Student</div>
                    <form className="py-3" onSubmit={handleUpdateSubmit}>
                        <hr />
                        <div className="row py-3">
                            <div className="col">
                                <input type="text" ref={firstNameEl} defaultValue={fName} className="form-control form-control-sm" placeholder="First name" required />
                            </div>
                            <div className="col">
                                <input type="text" ref={middleNameEl} defaultValue={mName} className="form-control form-control-sm" placeholder="Middle name" />
                            </div>
                            <div className="col">
                                <input type="text" ref={lastNameEl} defaultValue={lName} className="form-control form-control-sm" placeholder="Last name" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" ref={addressEl} defaultValue={Addr} className="form-control form-control-sm" id="InputAddress" placeholder="Address" required />
                            <div className="input-group w-25">
                                <label htmlFor="dateOfBirth">Date Of Birth </label>
                                <div className="w-100"></div>
                                <input type="text" className='form-control form-control-sm' value={dateOfBirth.toLocaleString('en-IN').split(',')[0]} name="dateOfBirth" readOnly />
                                <div className="input-group-append">
                                    <span className="input-group-text" title='Date Of Joining' id="basic-addon1" onClick={openDOBModal}>
                                        <i className="far fa-calendar-alt" id="date" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="form-group col">
                                <label htmlFor="Inputstandard">Standard</label>
                                <select className="form-control form-control-sm" id="Inputstandard" ref={standardEl} defaultValue={Std}>
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
                                <select className="form-control form-control-sm" id="InputBoard" ref={boardEl} defaultValue={brd}>
                                    <option>MH</option>
                                    <option>MH Semi-Eng</option>
                                    <option>ICSE</option>
                                    <option>CBSE</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-group w-25">
                            <label htmlFor="dateOfJoining">Date Of Joining </label>
                            <div className="w-100"></div>
                            <input type="text" className='form-control form-control-sm' value={date.toLocaleString('en-IN').split(',')[0]} name="dateOfJoining" readOnly />
                            <div className="input-group-append">
                                <span className="input-group-text" title='Date Of Joining' id="basic-addon1" onClick={openJoiningModal}>
                                    <i className="far fa-calendar-alt" id="date" />
                                </span>
                            </div>
                        </div>
                        <label htmlFor="InputSchool">School</label>
                        <input type="text" ref={schoolEl} defaultValue={School} className="form-control form-control-sm" id="InputSchool" placeholder="School" required />
                        <hr />
                        <div>
                            <h5>Last Year Marks / Grades</h5>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-4">
                                <input type="text" className="form-control form-control-sm" ref={physicsEl} defaultValue={phy} id="InputPhysics" placeholder="Physics" required />
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control form-control-sm" ref={englishEl} defaultValue={eng} id="InputEnglish" placeholder="English" required />
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control form-control-sm" ref={mathsEl} defaultValue={maths} id="InputMaths" placeholder="Maths" required />
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="form-group col">
                                <label htmlFor="InputSex">Gender</label>
                                <select className="form-control form-control-sm" id="InputSex" ref={sexEl} defaultValue={sex}>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div className="form-group col">
                                <label htmlFor="InputFees">Total Fees</label>
                                <input type="number" className="form-control form-control-sm" ref={feesEl} defaultValue={fees} id="InputFees" placeholder="Total Fees" />
                            </div>
                        </div>
                        <hr />
                        <button type="button" onClick={redirectHome} className="btn btn-light float-right ml-3">Cancel</button>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>

                <Modal
                    isOpen={modalJoinIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Date Picker Modal"
                    ariaHideApp={false}
                >
                    <MyCalendar
                        onChange={onChange}
                        value={date}
                    />
                </Modal>
                <Modal
                    isOpen={modalDOBIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Date Picker Modal"
                    ariaHideApp={false}
                >
                    <MyCalendar
                        onChange={onDOBChange}
                        value={dateOfBirth}
                    />
                </Modal>
            </div>
        </React.Fragment>
}

export default EditStudent;
