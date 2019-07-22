import React, { Component } from 'react';
import Calendar from 'react-calendar';
// import Calendar from 'react-calendar/dist/entry.nostyle';

export default class MyCalendar extends Component {
  constructor(props){
      super(props)
  }

  render() {
    return (
      <div style={{boxShadow: "5px 5px 25px", display:"inline-block"}}>
        <Calendar
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </div>
    );
  }
}