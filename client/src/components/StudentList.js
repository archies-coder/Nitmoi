import React, { Component } from 'react'
import Student from './Student';

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridGap: "10px",
    width: "100%",
    textAlign: "center",
    padding: "10px"
  };

export default class StudentList extends Component {
    constructor(){
        super()
        this.state = {
            students : [],
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:5000/students',{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
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
    render() {
        return (
            <div style={gridStyle} onLoad={this.getStudents}>
                {
                    this.state.students.sort((a,b)=>{
                        return a.standard - b.standard;
                    }).map(stud => {
                    return <Student key={stud._id} 
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
                    />
                })}
            </div>
        )
    }
}
