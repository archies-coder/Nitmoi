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
        fetch('/api/students',{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                return <h4>Not Authenticated</h4>
              }
              return res.json()
        }).then(resdata => {         
            this.setState({students:resdata})
        }).catch(err => console.log(err)
        )
    }
    
    render() {
       return <div>
           {
            //    (localStorage.token) ? (
                   <div style={gridStyle} onLoad={this.getStudents}>
                {localStorage.token && this.state.students.sort((a,b)=>{
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
            //    ) :
            //    (
            //        <h1>Not Authorized</h1>
            //    )
           }
       </div>;
    }
}
