import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {SERVER_URL} from '../constants.js'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'

class AddAssignment extends Component {

  constructor(props) {
      super(props);
      this.state = {
          assignmentName: '',
          courseName: '',
          dueDate: ''
      };
  }

  assignmentChangeHandler = (event) => {
      this.setState({assignmentName: event.target.value});
  }

  dueDateChangeHandler = (event) => {
      this.setState({dueDate: event.target.value});
  }

  courseNameChangeHandler = (event) => {
      this.setState({courseName: event.target.value});
  }


  mySubmitHandler = (event) => {
      event.preventDefault();
      const token = Cookies.get('XSRF-TOKEN');

      var assignmentName = this.state.assignmentName;
      var dueDate = this.state.dueDate;
      var courseName = this.state.courseName
    
      console.log(assignmentName)
      console.log(dueDate)
      console.log(courseName)

      
    fetch(`${SERVER_URL}/gradebook/addAssignment`,
      {
        method: 'POST',
        headers: { 'X-XSRF-TOKEN': token },
        body: JSON.stringify({name: assignmentName, dueDate:dueDate, course:courseName})
      })
    .then(res => {
      if (res.ok) {
        toast.success("Assignment Added!", {
            position: toast.POSITION.BOTTOM_LEFT
        });
      } else {
        toast.error("Error!", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error('Error Status =' + res.status);
      }})
    .catch(err => {
      toast.error("Error!", {
            position: toast.POSITION.BOTTOM_LEFT
      });
      console.error(err);
      })
    }

  render() {
       return (
          <div>
            <div className="App">
              <form onSubmit={this.mySubmitHandler} >
                <p>Assignment Name</p>
                <input name='assignmentName' onChange={this.assignmentChangeHandler} />
                <p>Course ID</p>
                <input variant="outlined" type="number" name='courseName' onChange={this.courseNameChangeHandler}/>
                <p>Due Date</p>
                <input type="date" name='dueDate' onChange={this.dueDateChangeHandler}  />
                <br></br>
                <br></br>
                <input type="submit"/>
              </form>
            </div>
          </div>
       )
   }
}
export default AddAssignment;