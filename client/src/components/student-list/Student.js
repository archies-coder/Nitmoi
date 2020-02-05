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
                    <div className="card stud-card bg-primary">
                        <h5 className="card-title">{fName} {lName}</h5>
                        <h6 className="card-subtitle mb-2">Standard {Std}</h6>
                        <button className='btn btn-secondary view-details-link' title='Details' onClick={this.openModal}>
                            Details
                        </button>
                        <div className='mt-2'>
                            <Link to='/edit'>
                                <i className="fas fa-user-edit float-right mb-1 mr-1 text-secondary" title='Edit' onClick={e=>context.studentEdit(this.props)}/>
                            </Link>
                            <i style={{cursor: "pointer"}} className="fas fa-trash-alt float-right mb-1 mr-3 text-secondary" title='Delete' onClick={this.openDeleteModal}/>
                        </div>

                        <Modal
                            isOpen={this.state.modalDetailsIsOpen}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Details Modal"
                            ariaHideApp={false}
                        >
                            <div className="panel-heading">
                                <span className="text-primary" style={{
                                    font:'bold 20px/150% Helvetica',
                                    letterSpacing:'2px',
                                    textAlign:'center',
                                    }}>{fName} {mName} {lName}</span>
                                <span className="float-right close-btn text-primary" onClick={this.closeModal}>x</span>
                                <hr/>
                            </div>
                            <div className="panel-body text-secondary">
                                <table className="table table-borderless text-secondary">
                                    <tbody>
                                        <tr><td>Date of birth</td><td>{DOB.split('T')[0]}</td></tr>
                                        <tr><td>Sex</td><td>{sex}</td></tr>
                                        <tr><td>Address</td><td>{Addr}</td></tr>
                                        <tr><td>Board</td><td>{brd}</td></tr>
                                        <tr><td>School</td><td>{School}</td></tr>
                                        <tr><td>Date of Joining</td><td>{joinedOn.split('T')[0]}</td></tr>
                                        <tr><td>Physics</td><td>{phy}</td></tr>
                                        <tr><td>English</td><td>{eng}</td></tr>
                                        <tr><td>Maths</td><td>{maths}</td></tr>
                                        <tr><td>Chemistry</td><td>{chem}</td></tr>
                                        <tr><td>Biology</td><td>{bio}</td></tr>
                                        <tr><td>Total fees</td><td>{fees}</td></tr>
                                    </tbody>
                                </table>
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
                            <div className="panel panel-danger text-secondary">
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
