import React, {Component} from 'react';
import './Student.css';
import Modal from 'react-modal';

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

export default class Student extends Component {
    constructor(props){
        super(props);
        this.state={
            modalIsOpen: false
        }
    }

    openModal = ()=> {
        this.setState({modalIsOpen: true});
    }

    closeModal= ()=> {
        this.setState({modalIsOpen: false});
    }

    render(){
        const {fName,lName,Std,Addr,brd,phy,eng,maths,sex,fees}= this.props;
        return (
            <div className="card">
                <h2>Name:- {fName} {lName}</h2>
                <h2>Standard:- {Std}</h2>
                <button className='btn-primary border-0 bg-dark text-monospace text-white view-details-link' onClick={this.openModal}>
                    View Details
                </button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Details Modal"
                >
                    <h2><b>Details</b></h2>
                    <h3>Address : {Addr}</h3>
                    <h3>Sex : {sex}</h3>
                    <h3>Board : {brd}</h3>
                    <h3>Physics Marks : {phy}</h3>
                    <h3>English Marks : {eng}</h3>
                    <h3>Maths Marks : {maths}</h3>
                    <h3>Fees Paid : {fees}</h3>
                </Modal>
            </div>
    )
    }
}
