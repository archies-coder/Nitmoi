import React, { Component } from 'react'

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    handleClick = (e) => {
        console.log(this.props)
        const { handleChange, stud, clearList } = this.props;
        this.setState({ checked: !this.state.checked },()=>{
            if (this.state.checked) {
                handleChange(stud)
            } else {
                clearList(stud)
            }
        });
        
    }

    render() {
        const text = this.state.checked ? <h3 style={{ color: 'green' }} className='list-names'>{this.props.stud.firstName}</h3> : <h3 style={{ color: 'red' }} className='list-names'>{this.props.stud.firstName}</h3>;
        return (
            <label className="checkbox-container">
                <input onChange={this.handleClick} checked={this.state.checked} value={text} type="checkbox" />{text}
                <span className="checkmark"></span>
            </label>
        )
    }
}