import React, {useEffect, useState} from 'react'
import './fees.css'
import Modal from 'react-modal'
import MyCalendar from '../reusables/Calendar'
import MyLoader from '../reusables/MyLoader'

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

const Fee = (props) => {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState({})
    const [date, setDate] = useState(new Date())
    const [amount, setAmount] = useState(Number)
    const [dateModalOpen, setDateModalOpen] = useState(false)
    
    useEffect(()=> getStudents(),[])

    const getStudents= ()=>{
        setLoading(true)
        fetch('/api/students',{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                if(res.status === 401){
                    setLoading(false)
                    props.history.push('/login')
                }
                if(res.status === 404){
                    setLoading(false)
                    return <h4>Not Found !!</h4>
                }
                setLoading(false)
                throw new Error(res.status)
            }
              return res.json()
        })
        .then(resdata => {  
            setLoading(false)       
            setStudents(resdata)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    const selectStudent = (obj, e) => {
        e.preventDefault();
        setSelectedStudent(obj)
    }

    const isEmpty = (obj) =>  {
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false
        }
        return true
    }

    const openModal = e => {
        e.preventDefault();
        setDateModalOpen(true)
    }
    const closeModal = () => {
        setDateModalOpen(false)
    }
    const onChange = date => {
        setDate(date)
        closeModal()
    }

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true)
        const body = {
            "date": date,
            "amount": amount
        }
        fetch('/api/fee/installment/'+ selectedStudent._id,{
            method: 'PUT' ,
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res=>{
            if (res.status !== 200 && res.status !== 201) {
                if(res.status === 401){
                    setLoading(false)
                    props.history.push('/login')
                }
                if(res.status === 404){
                    setLoading(false)
                    return <h4>Not Found !!</h4>
                }
                setLoading(false)
                throw new Error(res.status)
            }
            return res.json();
        })
        .then(data=>{
            setLoading(false)
            getStudents()
            setSelectedStudent(data)
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
        })
    }
    
    const remainingFees = ()=>{
        const {total, installments} = selectedStudent.fees;
        let temp = total;
        installments.map(inst => (temp = temp - inst.amount))
        return <h6>{temp}</h6>
    }
    
    const {fees} = selectedStudent;

    return (loading) ?<div className='container spinner-container'>
            <MyLoader loading={loading} />
        </div>:
        <div className="container">
            <h1 className='main-heading'>Fees</h1>
            <div className="row">
                <div className="col-4">
                    <table className="table table-dark">
                        <thead onClick={e=> setSelectedStudent({})}>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Student</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            students.sort((a,b)=> {return a.standard-b.standard}).map((stud, i)=>(
                                <tr key={i} onClick={e=>selectStudent(stud,e)}>
                                    <th scope='row'>{i}</th>
                                    <td>{stud.firstName} {stud.lastName}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                {!isEmpty(selectedStudent) && <div className="col bg-dark text-white pt-3 fees">
                    <div className="col total">
                        <h5>Total Fees</h5>
                        <hr className='border'/>                    
                        {!isEmpty(selectedStudent) && <h6>{fees.total}</h6>}
                    </div>
                    <div className="col rem">
                        <h5>Remaining Fees</h5>
                        <hr className='border'/>                                        
                        {!isEmpty(selectedStudent) && <h5>{remainingFees()}</h5>}
                    </div>
                </div>}
                <div className="h-100 border"></div>
                {!isEmpty(selectedStudent) && <div className="col bg-dark text-white pt-3 fees">
                    <div className="col paid">
                        <h5>Installments Paid</h5>
                        <hr className='border'/>                    
                        {!isEmpty(selectedStudent) && <h6>{fees.installments
                            .map((inst,i)=> <div key={i}>{inst.amount}</div>)}</h6>}
                    </div>

                    <div className="col new">
                        <h5>Add Installment</h5>
                        <hr className='border'/>                    
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="installment">Amount</label>
                                <input type="tel" onChange={e=> setAmount(e.target.value)} className='form-control form-control-sm' name="installment" required/>
                                <label htmlFor="date">Date</label>
                                <i className="far fa-calendar-alt btn-lg" id="date" onClick={openModal}></i>
                                <p>Selected Date:- {date.toLocaleDateString()}</p>
                            </div>
                            <input type="submit" className='btn btn-sm btn-light mt-3' value="Add Installment"/>
                        </form>
                    </div>
                </div>}
            </div>

            <Modal
                isOpen={dateModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Date Picker Modal"
            >
                <MyCalendar
                    onChange={onChange}
                    value={date}
                />
            </Modal>
        </div>
}

export default Fee;