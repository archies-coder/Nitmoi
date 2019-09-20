import React, { useEffect, useState } from 'react'
import './fees.css'
import Modal from 'react-modal'
import MyCalendar from '../reusables/Calendar'
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

const Fee = (props) => {
    const [students, setStudents] = useState([])
    const [totalInstallments, setTotalInstallments] = useState(0)
    const [loading, setLoading] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState({})
    const [date, setDate] = useState(new Date())
    const [amount, setAmount] = useState(Number)
    const [remAmount, setRemAmount] = useState(0)
    const [dateModalOpen, setDateModalOpen] = useState(false)
    const [error, setError] = useState([])

    useEffect(() => getStudents(), [])

    const getStudents = () => {
        setLoading(true)
        fetch('/api/students', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    if (res.status === 401) {
                        setLoading(false)
                        props.history.push('/login')
                    }
                    if (res.status === 404) {
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
        const {installments} = obj.fees
        let temp = 0;
        installments.map(i => {
            return temp=temp+ i.amount
        })
        setTotalInstallments(temp)
        setSelectedStudent(obj)
    }

    const isEmpty = (obj) => {
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
        if(error && error.length!==0 && error.length > 0){
            error.map(err=>console.log(err))
            setLoading(false)
            return null
        }
        if(amount < 1){
            console.log('Too Small installment')
            setLoading(false)
            return null
        }
        if(remAmount-amount<0){
            console.log('Too Big installment')
            setLoading(false)
            return null
        }
        const body = {
            "date": date,
            "amount": amount
        }
        fetch('/api/fee/installment/' + selectedStudent._id, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    if (res.status === 401) {
                        setLoading(false)
                        props.history.push('/login')
                    }
                    if (res.status === 404) {
                        setLoading(false)
                        return <h4>Not Found !!</h4>
                    }
                    setLoading(false)
                    throw new Error(res.status)
                }
                return res.json();
            })
            .then(data => {
                setLoading(false)
                getStudents()
                setSelectedStudent(data)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const getRemFees=(installments)=> {
        let temp = selectedStudent.fees.total;
        installments.map(inst => {
            temp = temp - inst.amount
            return temp
        })
        return setRemAmount(temp)
    }

    const remainingFees = () => {
        const { total, installments } = selectedStudent.fees;
        let temp = total;
        installments.map(inst => {
            temp = temp - inst.amount
            return temp
        })
        return <h6>{temp}</h6>
    }

    const installmentInputHandler = e => {
        setError()
        const {total, installments} = selectedStudent.fees
        getRemFees(installments)
        
        if (totalInstallments + parseInt(e.target.value) > total || parseInt(e.target.value) > remAmount) {
            setError(['Invalid installment'])
        }
        setAmount(e.target.value)
    }

    const { fees } = selectedStudent;

    return (loading) ?
        <MyLoader loading={loading} /> :
        <div className="container">
            <h1 className='main-heading'>Fees</h1>
            <div className="row">
                <div className="col-md-4">
                    <table className="table table-dark">
                        <thead onClick={e => setSelectedStudent({})}>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Student</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.sort((a, b) => { return a.standard - b.standard }).map((stud, i) => (
                                    <tr key={i} onClick={e => selectStudent(stud, e)}>
                                        <th scope='row'>{i+1}</th>
                                        <td>{stud.firstName.toLowerCase()} {stud.lastName.toLowerCase()}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                {!isEmpty(selectedStudent) && <div className="col bg-dark text-white pt-3 fees">
                    <div className="col-md total">
                        <h5>Total Fees</h5>
                        <hr className='border' />
                        {!isEmpty(selectedStudent) && <h6>{fees.total}</h6>}
                    </div>
                    <div className="col rem">
                        <h5>Remaining Fees</h5>
                        <hr className='border' />
                        {!isEmpty(selectedStudent) && <span>{remainingFees()}</span>}
                    </div>
                </div>}
                <div className="h-100 border"></div>
                {!isEmpty(selectedStudent) && <div className="col-md bg-dark text-white pt-3 fees">
                    <div className="col paid">
                        <h5>Installments Paid</h5>
                        <hr className='border' />
                        {!isEmpty(selectedStudent) && <h6>{fees.installments
                            .map((inst, i) => <div key={i}>{inst.amount} &nbsp;&nbsp;  - &nbsp;&nbsp; {new Date(inst.date).toLocaleString('en-IN').split(',')[0]}</div>)}</h6>}
                    </div>

                    <div className="col new">
                        <h5>Add Installment</h5>
                        <hr className='border' />
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="installment">Amount</label>
                                <div className="row">
                                
                                </div>
                                <div className="input-group mb-3 w-75">
                                    <input type="tel" onChange={installmentInputHandler} className='form-control form-control-sm' name="installment" required />
                                    <div className="input-group-append">
                                        <span className="input-group-text" title='Date Of Installment' id="basic-addon1">
                                            <i className="far fa-calendar-alt" id="date" onClick={openModal}></i>
                                        </span>
                                    </div>
                                </div>
                                <p>Selected Date:- {date.toLocaleString('en-IN').split(',')[0]}</p>
                            </div>
                            <input type="submit" className='btn btn-sm btn-light' value="Add" />
                        </form>
                    </div>
                </div>}
            </div>

            <Modal
                isOpen={dateModalOpen}
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
        </div>
}

export default Fee;