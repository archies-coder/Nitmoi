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
      transform             : 'translate(-50%, -50%)'
    }
  };

const EditStudent = (props)=> {
    const studentContext = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(new Date())

    const openModal = () =>{
        setModalOpen(true)
    }

    const closeModal=()=>{
        setModalOpen(false)
    }

    const onChangeDate=(date)=>{
        setDate(date)
        closeModal()
    }

    const firstNameEl = React.createRef();const lastNameEl = React.createRef();
    const addressEl = React.createRef();const standardEl = React.createRef();
    const boardEl = React.createRef();const physicsEl = React.createRef();
    const englishEl = React.createRef();const mathsEl = React.createRef();
    const sexEl = React.createRef();const feesEl = React.createRef();

    const handleUpdateSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)
        const fName = firstNameEl.current.value;const lName = lastNameEl.current.value;
        const std = standardEl.current.value;const addr = addressEl.current.value;
        const brd = boardEl.current.value;const phy = physicsEl.current.value;
        const eng = englishEl.current.value;const maths = mathsEl.current.value;
        const sex = sexEl.current.value;const fees = feesEl.current.value;

        const updateStudentData = {
            "firstName":fName, "lastName":lName,
            "Address":addr,"standard":std,
            "Board":brd,
            "lastYearmarks":{
                "physics":phy, "english":eng,"maths":maths
            },
            "sex":sex,"feesPaid":fees
        }
        fetch(`/api/student/?id=${studentContext.state.selectedForEdit.id}`,{
            method: 'PUT',
            mode:'cors',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateStudentData)
        }).then(res=>res.json())
        .then(resData=>{
            setLoading(false)
            props.history.push('/list')
        }).catch(err=>{
            setLoading(false)
            throw new Error(err)            
        })
    }
    const {fName,lName,Std,Addr,brd,phy,eng,maths,sex,fees} = studentContext.state.selectedForEdit;
    return (loading) ? <MyLoader loading={loading} /> :
        <React.Fragment>
            <div>
                <Link to='/list'>
                    <button className='btn btn-link float-left mx-3 my-3' title='back to list'>
                        <i className="fas fa-arrow-left" style={{fontSize:'18px',marginRight:'10px'}}></i>Back To List
                    </button>
                </Link>
            </div>
            <div className="d-lg-flex justify-content-center p-3">
                <form onSubmit={handleUpdateSubmit}>
                    <div className="row py-3">
                        <div className="col">
                        <input type="text" ref={firstNameEl} defaultValue ={fName} className="form-control" placeholder="First name" required/>
                        </div>
                        <div className="col">
                        <input type="text" ref={lastNameEl} defaultValue ={lName} className="form-control" placeholder="Last name" required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputAddress">Address</label>
                        <input type="text" ref={addressEl} defaultValue ={Addr} className="form-control" id="InputAddress" placeholder="Address" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Inputstandard">Standard</label>
                        <select className="form-control form-control-sm" id="Inputstandard" defaultValue ={Std} ref={standardEl}>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputBoard">Board</label>
                        <select className="form-control form-control-sm" id="InputBoard" defaultValue ={brd} ref={boardEl}>
                            <option>MH</option>
                            <option>ICSC</option>
                            <option>CBSE</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputDate">Date Of Joining </label>
                        {/* <input type="button" className="btn btn-primary btn-sm"><i class="far fa-calendar-alt"></i></input> */}
                        <i className="far fa-calendar-alt ml-2 mb-2 btn-lg" id="InputDate" onClick={openModal}></i>
                        <br/>
                        <p>Selected Date:- {date.toLocaleDateString()}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputPhysics">Physics Marks</label>
                        <input type="text" className="form-control" ref={physicsEl} defaultValue ={phy} id="InputPhysics" placeholder="Physics" required/>
                        <label htmlFor="InputEnglish">English Marks</label>
                        <input type="text" className="form-control" ref={englishEl} defaultValue ={eng} id="InputEnglish" placeholder="English" required/>
                        <label htmlFor="InputMaths">Maths Marks</label>
                        <input type="text" className="form-control" ref={mathsEl} defaultValue ={maths} id="InputMaths" placeholder="Maths" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputSex">Sex</label>
                        <select className="form-control form-control-sm" id="InputSex" defaultValue ={sex} ref={sexEl}>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputFees">Fees Paid</label>
                        <input type="text" className="form-control" ref={feesEl} defaultValue ={fees} id="InputFees" placeholder="Amout Of Fees Paid"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {/* calendar modal */}
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Date Picker Modal"
                >
                    <MyCalendar
                        onChange={onChangeDate}
                        value={date}
                    />
                </Modal>
            </div>
        </React.Fragment>
}

export default EditStudent;
