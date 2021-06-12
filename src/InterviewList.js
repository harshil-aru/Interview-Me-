import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class InterviewList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      interviews: [],
      participants: [],
      distinctSchedules: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/distinctschedules')
      .then((res) => {
        console.log("res => ", res);
        this.setState({
          distinctSchedules: res.data,
        })

        console.log("Updated STATE : ", this.state.participants);
      })
      .catch((error) => {
        console.log("Error : ", error);
      })


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


    axios.get('http://localhost:5000/interviews')
      .then((res) => {
        console.log("res => ", res);
        this.setState({
          interviews: res.data,
        })
      })
      .catch((error) => {
        console.log("Error : ", error);
      })
  }
 
  cancelInterview(event)
  {
    const interviewInfo = {
      id: event
    }
    // console.log(interviewInfo);
    // alert(interviewInfo);
    axios.post('http://localhost:5000/cancelInterview', interviewInfo)
    .then((res) => {
       window.location = '/';
    })
    .catch((error) => {
      console.log("Error : ", error);
    })
  }
  render() {

    // Create Particpant Map
    let participantMap = new Map();
    let participantmailMap = new Map();
    if (this.state.participants) {
      this.state.participants.forEach((part) => {
        participantMap.set(part.id, `${part.name}(${part.email})`);
        participantmailMap.set(part.id, `${part.email}`);
      })
      // for (let [key, value] of participantMap) {
      //   console.log(key + ' =>  ' + value)
      // }
    }

    // console.log("distinctSchedules -> ", this.state.distinctSchedules);
    // console.log("interviews -> ", this.state.interviews);

    let finalScehule = this.state.distinctSchedules.map((ds) => {
      let tempRes = this.state.interviews.filter(itr => (
        (ds.date == itr.date) &&
        (ds.startTime == itr.startTime) &&
        (ds.endTime == itr.endTime)));

      let midResult = tempRes.map((tr) => tr.participantId);
      let multipleIds = tempRes.map((tr) => tr.id);
      let participantemail = tempRes.map((tr) => participantmailMap.get(tr.participantId));
      let checkedItemsMap = new Map();
      participantemail.forEach((part) => {
        checkedItemsMap.set(part, true);
      })
      return {
        date: ds.date,
        startTime: ds.startTime,
        endTime: ds.endTime,
        participants: midResult,
        duration: ds.duration,
        description: ds.description,
        id: multipleIds,
        checkedItems: checkedItemsMap
      }
    })

    console.log("finalScehule : ", finalScehule);


    return (
      <div className="bg-light" style={{
        minHeight: "100vh"
      }}>
        <h1 style={{ textAlign: "center", padding: '20px' }} >Upcoming Interviews</h1>
        <div className="container">
          {finalScehule.map((itr) => {

            return (
              <div className="card " style={{ marginBottom: 4, marginTop: 4, padding: 20, backgroundColor:"#bddba8"}}>
                <h1 style={{textAlign: 'center', padding: '10px'}}>{itr.description}</h1>
                <h4 style={{padding:'5px'}}>Date: {itr.date} </h4>
                <h4 style={{padding:'5px'}}>From: {itr.startTime} to {itr.endTime}</h4>
                <h4 style={{padding:'5px'}}> Duration: {itr.duration}</h4>
                <h4 style={{padding:'5px'}}>Participants: </h4>
                <ul className="list-group" style={{padding: "10px"}}>
                  {itr.participants.map((oneP) => (
                    <li className="list-group-item">{participantMap.get(oneP)}</li>
                  ))}
                </ul>
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-2">
                <Link 
                  to={{
                    pathname: '/edit',
                    state: {
                      pid: itr.id,
                      pdate: itr.date,
                      pstarttime: itr.startTime,
                      pendtime: itr.endTime,
                      checkedItems: itr.checkedItems,
                      duration: itr.duration,
                      description: itr.description
                    }
                  }}>
                    <button className="btn btn-primary">
                   Edit Interview
                   </button></Link>
                   </div>
                   <div className="col-2"></div>
                   <div className="col-2"></div>
                   <div className="col-2">
                   <button className="btn btn-danger"
                   onClick={() => {this.cancelInterview(itr.id)}}>
                   Cancel Interview</button>
                   </div>
                   </div>
                   <div className="col-2"></div>
              </div>
            )

          })}
        </div>
      </div >
    )
  }
}

export default InterviewList;