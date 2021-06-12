import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';


import "react-datepicker/dist/react-datepicker.css";

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} />
);

const Error = ({ message }) => (
  <div className="alert alert-danger" role="alert">
    OOPS! {message}
  </div>
)

class AddInterview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      startTime: '',
      endTime: '',
      participants: [],
      checkedItems: new Map(),
      error: false,
      errorMsg: "",
      decription: "",
      duration: ""
    }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/participants')
      .then((res) => {
        console.log("res => ", res);
        this.setState({
          participants: res.data,
        })

        console.log("Updated STATE : ", this.state.participants);
      })
      .catch((error) => {
        console.log("Error : ", error);
      })
  }

  componentDidUpdate() {
    console.log("State Updated: ", this.state);
  }

  handleFormSubmit(event) {
    event.preventDefault();

    let lisOfparticipants = this.state.participants.filter(one => this.state.checkedItems.get(one.email))
    console.log("lisOfparticipants : ", lisOfparticipants);

    const newInterview = {
      date: this.state.date,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      participants: lisOfparticipants,
      duration: this.state.duration,
      description: this.state.description
    }

    console.log("New Exercise => ", newInterview);

    // making POST REQUEST to backend  
    axios.post('http://localhost:5000/interviews', newInterview)
      .then((res) => {
        console.log("res => ", res);
        console.log(res.data);
        window.location = '/';
      })
      .catch((error) => {
        let errorMsg = error.response.data.message;
        this.setState({
          error: true,
          errorMsg: errorMsg
        })
      })
  }

  handleDateChange(newDate) {
    this.setState({
      date: newDate,
    })
  }

  handleCheckBoxChange(e) {
    console.log("caleld");
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  handleStartTimeChange(event) {
    this.setState({
      startTime: event.target.value
    });
    setTimeout(() => {
      this.updateDuration();
       }, 1000);
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    })
  }

  handleDurationChange(event) {
    this.setState({
      duration: event.target.value
    })
  }
  handleEndTimeChange(event) {
    this.setState({
      endTime: event.target.value
    });
    setTimeout(() => {
      this.updateDuration();
       }, 1000);
    
  }
  updateDuration()
  {
     let start_time = this.state.startTime;
     let end_time = this.state.endTime;
     if(end_time!=""&&start_time!="")
     {
       let start_hr = parseInt(start_time.substr(0,start_time.indexOf(':')));
       let start_min = parseInt(start_time.substr(start_time.indexOf(':')+1));
       let end_hr = parseInt(end_time.substr(0,end_time.indexOf(':')));
       let end_min = parseInt(end_time.substr(end_time.indexOf(':')+1));
      //  alert(start_hr+" "+start_min+" "+end_hr+" "+end_min);
      if(end_hr<start_hr)
      {
        end_hr+=24;
      }
      else if(end_hr===start_hr)
      {
        if(start_min>end_min)
        {
          end_hr+=24;
        }
      }
      let diff_hr=end_hr-start_hr;
      let diff_min=end_min-start_min;
      if(diff_min<0)
      {
        diff_hr-=1;
        diff_min+=60;
      }
      if(diff_hr<10)
      {
        diff_hr="0"+diff_hr;
      }
      if(diff_min<10)
      {
        diff_min="0"+diff_min;
      }
      // alert(diff_hr+":"+diff_min);
      this.setState({
        duration: diff_hr+":"+diff_min
      });
     }
     
  }

  render() {
    return (
      <div className="bg-light">
        <h3 style={{ textAlign: "center" }}> Create Interview</h3>
      
        {this.state.error ?
          (<Error message={this.state.errorMsg} />) : (<></>)
        }

        <form onSubmit={this.handleFormSubmit}>
        <div className="row" style={{marginLeft:12}}>
          <div className="form-group" >
            <label>Select Participants : </label>

            {
              this.state.participants.map(user => (
                <div>
                  <label key={user.id}>
                    {user.name + "(" + user.email + ")"}
                    <Checkbox name={user.email} checked={this.state.checkedItems.get(user.email)} onChange={this.handleCheckBoxChange} />
                    <br></br>
                  </label>
                </div>
              ))
            }
          </div>
          </div>

            <div className="row" style={{marginLeft:12, marginTop:20}}>
              <div className="form-group col-3">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.handleDateChange}
              />
            </div>
            </div>
            <div className="form-group col-3 ">
              <label>Duration: </label>
              <div>
                <input className="duration" type="text" disabled value={this.state.duration} ></input>
              </div>
            </div>
            </div>
          <div className ="row" style={{marginLeft:12, marginTop:20}}>
            <div className="form-group col-4 ">
              <label>Description</label>
              <textarea className="form-control" id="description" value={this.state.description} onChange={this.handleDescriptionChange}/>
            </div>
          </div>
          <div className="row " style={{marginLeft:12, marginTop:20}}>
            <div className="form-group col-3 ">
              <label>Start Time</label>
              <div>
              <input type="time"  id="start_time" value={this.state.startTime}
                onChange={this.handleStartTimeChange} />
                </div>

            </div>
            <div className="form-group col-3">
              <label >End Time</label>
              <div>
              <input type="time"  id="end_time" value={this.state.endTime}
                onChange={this.handleEndTimeChange} />
                </div>
            </div>
          </div>
          <div className="row" style={{marginLeft:12, marginTop:20}}>
          <div className="form-group">
            <input type="submit" value="Save Details" className="btn btn-primary" />
          </div>
          </div>
        </form>
      
      </div>
    )
  }
}

export default AddInterview;
