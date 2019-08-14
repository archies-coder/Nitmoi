import React, { Component } from 'react';
import Calendar from 'react-calendar';
// import Calendar from 'react-calendar/dist/entry.nostyle';

export default class MyCalendar extends Component {

  render() {
    return (
      <div style={{boxShadow: "3px 3px 15px", display:"inline-block",margin:'15px auto'}}>
        <Calendar
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </div>
    );
  }
}