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
      transform             : 'translate(-50%, -50%)',
      width                 :'500px'
    }
  };

export default class Student extends Component {
    constructor(props){
        super(props);
        this.state={
            modalDetailsIsOpen: false,
            modalEditIsOpen: false,
            modalDeleteIsOpen: false,
        }
    }

    openModal = ()=> {
        this.setState({modalDetailsIsOpen: true});
    }

    openEditModal = ()=> {
        this.setState({modalEditIsOpen: true});
    }

    openDeleteModal = ()=> {
        this.setState({modalDeleteIsOpen: true});
    }

    closeModal= ()=> {
        this.setState({modalDetailsIsOpen: false, modalEditIsOpen: false, modalDeleteIsOpen: false});
    }

    render(){
        const {fName,lName,Std,Addr,brd,phy,eng,maths,sex,fees}= this.props;
        return (
            <div className="card stud-card">
                <h2 className="card-title pt-3"><b style={{color:"aliceblue",}}>{fName.toUpperCase()} {lName.toUpperCase()}</b></h2>
                <h2 className="card-text">Standard {Std}</h2>
                <button className='btn border-0 bg-dark text-monospace text-white view-details-link mt-3' onClick={this.openModal}>
                    Details
                </button>
                <div>
                    <i className="fas fa-user-edit float-right mb-2 mr-2 edit-btn" onClick={this.openEditModal}/>
                    <i className="fas fa-trash-alt float-right mb-2 mr-3 delete-btn" onClick={this.openDeleteModal}/>
                </div>
                <Modal
                    isOpen={this.state.modalDetailsIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Details Modal"
                >
                    <div className="container">
                        <header>
                            <span style={{font:'bold 25px/150% Helvetica',letterSpacing:'2px',textAlign:'center',color:'#8989dc'}}>DETAILS</span>    
                            <span className="float-right close-btn" onClick={this.closeModal}>x</span>
                        </header>
                        <hr/>
                        <h4>Address : {Addr}</h4>
                        <h4>Sex : {sex}</h4>
                        <h4>Board : {brd}</h4>
                        <h4>Physics Marks : {phy}</h4>
                        <h4>English Marks : {eng}</h4>
                        <h4>Maths Marks : {maths}</h4>
                        <h4>Fees Paid : {fees}</h4>
                    </div>
                </Modal>
            </div>
    )
    }
}
