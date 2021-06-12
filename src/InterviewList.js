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

    let count=0;
    return (
      <div className="bg-light" style={{
        minHeight: "100vh"
      }}>
        <h4 className="my-2" style={{ textAlign: "center" }}>Upcoming Interviews</h4>
        <div className="container">
        <div class="accordion" id="accordionExample">
          
          {finalScehule.map((itr) => {
            count++;
            return (
          
  <div class="accordion-item">
    <h2 class="accordion-header" id={"heading"+count}>
      <button class={count==1?"accordion-button":"accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+count} aria-expanded={count==1?"true":"false"} aria-controls={"collapse"+count}>
        <h2>{itr.description}</h2>
      </button>
    </h2>
    <div id={"collapse"+count} class={count==1?"accordion-collapse collapse show":"accordion-collapse collapse"} aria-labelledby={"heading"+count} data-bs-parent="#accordionExample">
      <div class="accordion-body">
         <div className="card" style={{ marginBottom: 10, marginTop: 10, padding: 10 }}>
                <h1>{itr.description}</h1>
                <h4>{itr.date} </h4>
                <p><b>From</b> {itr.startTime} <b>to</b> {itr.endTime}</p>
                <p> <b>Duration:</b> {itr.duration}</p>
                <h3>Participants:</h3>
                <ul className="list-group">
                  {itr.participants.map((oneP) => (
                    <li className="list-group-item">{participantMap.get(oneP)}</li>
                  ))}
                </ul>
                <div className="row mt-4">
                  <div className="col-6">
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
                   <div className="col-6 d-flex flex-row-reverse">
                   <button className="btn btn-danger" 
                   onClick={() => {this.cancelInterview(itr.id)}}>
                   Cancel Interview</button>
                   </div>
                   </div>
              </div>
      </div>
    </div>
  </div>
             
            )

          })}
          </div>
        </div>
      </div >
    )
  }
}

export default InterviewList;
