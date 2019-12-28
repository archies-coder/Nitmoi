import React, {Component} from 'react';
import './Student.css';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 :'500px'
    }
  };

const customStylesDelete = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 :'500px',
      height                :'200px',
    }
  };

export default class Student extends Component {
    constructor(props){
        super(props);
        this.state={
            modalDetailsIsOpen: false,
            modalDeleteIsOpen: false,
        }
    }

    openModal = () => {
        this.setState({modalDetailsIsOpen: true});
    }

    openDeleteModal = ()=> {
        this.setState({modalDeleteIsOpen: true});
    }

    closeModal= ()=> {
        this.setState({modalDetailsIsOpen: false, modalDeleteIsOpen: false});
    }

    render(){
        const {id,fName,mName,lName,DOB,Std,Addr,brd,School,joinedOn,phy,eng,maths,chem,bio,sex,fees}= this.props;
        return (
            <AuthContext.Consumer>
                {context=>
                    <div className="card stud-card">
                        <h4 className="card-title pt-2"><b style={{color:"aliceblue",}}>{fName.toUpperCase()} {lName.toUpperCase()}</b></h4>
                        <h5 className="card-text">Standard {Std}</h5>
                        <button className='btn border-0 bg-dark text-monospace text-white view-details-link' title='Details' onClick={this.openModal}>
                            Details
                        </button>
                        <div className='mt-2'>
                            <Link to='/edit'>
                                <i className="fas fa-user-edit float-right mb-1 mr-1 edit-btn" title='Edit' onClick={e=>context.studentEdit(this.props)}/>
                            </Link>
                            <i className="fas fa-trash-alt float-right mb-1 mr-3 delete-btn" title='Delete' onClick={this.openDeleteModal}/>
                        </div>

                        <Modal
                            isOpen={this.state.modalDetailsIsOpen}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Details Modal"
                            ariaHideApp={false}
                        >
                            <div className="container">
                                <header>
                                    <span style={{
                                        font:'bold 20px/150% Helvetica',
                                        letterSpacing:'2px',
                                        textAlign:'center',
                                        color:'#8989dc'
                                        }}>{fName} {mName} {lName}</span>
                                    <span className="float-right close-btn" onClick={this.closeModal}>x</span>
                                </header>
                                <hr/>
                                <h5>Date of birth : {DOB}</h5>
                                <h5>Sex : {sex}</h5>
                                <h5>Address : {Addr}</h5>   
                                <h5>Board : {brd}</h5>
                                <h5>School : {School}</h5>
                                <h5>Date Of Joining : {joinedOn}</h5>
                                <h5>Physics Marks : {phy}</h5>
                                <h5>English Marks : {eng}</h5>
                                <h5>Maths Marks : {maths}</h5>
                                <h5>Chemistry Marks : {chem}</h5>
                                <h5>Biology Marks : {bio}</h5>
                                <h5>Total Fee : {fees}</h5>
                            </div>
                        </Modal>

                        {/* Delete modal */}
                        <Modal
                            isOpen={this.state.modalDeleteIsOpen}
                            onRequestClose={this.closeModal}
                            style={customStylesDelete}
                            contentLabel="Edit Modal"
                            ariaHideApp={false}
                        >
                            <div className="panel panel-danger">
                                <div className="panel-heading"><b>Alert!</b><span className="float-right" style={{cursor:'pointer'}} onClick={this.closeModal}>X</span></div>
                                <hr/>
                                <div className="panel-body">Are You Sure You Want To Delete?</div>
                                <hr/>
                                <div className="panel-footer align-items-right">
                                    <div className="btn btn-light float-right ml-3" onClick={this.closeModal}>Cancel</div>
                                    <div className="btn btn-danger float-right" onClick={e=>this.props.deleteStudent(id, e)}>Confirm</div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                }
            </AuthContext.Consumer>
    )
    }
}
