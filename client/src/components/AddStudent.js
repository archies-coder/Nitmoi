import React, { Component } from 'react'
import './AddStudent.css'
import {Redirect, Link} from 'react-router-dom';


export default class AddStudent extends Component {
    constructor(){
        super()
        this.firstNameEl = React.createRef();
        this.lastNameEl = React.createRef();
        this.addressEl = React.createRef();
        this.standardEl = React.createRef();
        this.boardEl = React.createRef();
        this.physicsEl = React.createRef();
        this.englishEl = React.createRef();
        this.mathsEl = React.createRef();
        this.sexEl = React.createRef();
        this.feesEl = React.createRef();
    }
    handleLogin = (e) => {
        e.preventDefault();
        const fName = this.firstNameEl.current.value;
        const lName = this.lastNameEl.current.value;
        const std = this.standardEl.current.value;
        const addr = this.addressEl.current.value;
        const brd = this.boardEl.current.value;
        const phy = this.physicsEl.current.value;
        const eng = this.englishEl.current.value;
        const maths = this.mathsEl.current.value;
        const sex = this.sexEl.current.value;
        const fees = this.feesEl.current.value;
        const addStudentRequest = {
            "firstName":fName,
            "lastName":lName,
            "Address":addr,
            "standard":std,
            "Board":brd,
            "lastYearmarks":{
                "physics":phy,
                "english":eng,
                "maths":maths
            },
            "sex":sex,
            "feesPaid":fees
        }
        fetch('http://localhost:5000/student',{
            method:'POST',
            mode:'cors',
            headers:{
                'Content-Type':'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(addStudentRequest)
        }).then(res=>{
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Post Failed!");
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
        })
        // const xhr= new XMLHttpRequest();
        // xhr.open('POST','http://localhost:5000/student',true)
        // xhr.setRequestHeader("Content-type", "application/json");
        // xhr.send(addStudentRequest)
    }

    handleSubmit = (e)=> {
        e.preventDefault();
        return <div>Added SuccesFully</div>
    }

    render() {
        return (
            <div className="d-lg-flex border justify-content-center p-3 hello">
                <form onSubmit={this.handleLogin}>
                    <div class="row py-3">
                        <div class="col">
                        <input type="text" ref={this.firstNameEl} class="form-control" placeholder="First name" required/>
                        </div>
                        <div class="col">
                        <input type="text" ref={this.lastNameEl} class="form-control" placeholder="Last name" required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputAddress">Address</label>
                        <input type="text" ref={this.addressEl} className="form-control" id="InputAddress" placeholder="Address" required/>
                    </div>
                    <div class="form-group">
                        <label for="Inputstandard">Standard</label>
                        <select class="form-control form-control-sm" id="Inputstandard" ref={this.standardEl}>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="InputBoard">Board</label>
                        <select class="form-control form-control-sm" id="InputBoard" ref={this.boardEl}>
                            <option>MH</option>
                            <option>ICSC</option>
                            <option>CBSE</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputPhysics">Physics</label>
                        <input type="text" className="form-control" ref={this.physicsEl} id="InputPhysics" placeholder="Physics" required/>
                        <label htmlFor="InputEnglish">English</label>
                        <input type="text" className="form-control" ref={this.englishEl} id="InputEnglish" placeholder="English" required/>
                        <label htmlFor="InputMaths">Maths</label>
                        <input type="text" className="form-control" ref={this.mathsEl} id="InputMaths" placeholder="Maths" required/>
                    </div>
                    <div class="form-group">
                        <label for="InputSex">Sex</label>
                        <select class="form-control form-control-sm" id="InputSex" ref={this.sexEl}>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputFees">Fees Paid</label>
                        <input type="text" className="form-control" ref={this.feesEl} id="InputFees" placeholder="Amout Of Fees Paid"/>
                    </div>
                    <button type="submit" class="btn btn-primary" onSubmit={this.handleSubmit}>
                        Submit</button>
                    
                    
                </form>
            </div>
        )
    }
}
