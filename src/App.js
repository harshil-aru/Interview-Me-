import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from "./Navbar";
import InterviewList from "./InterviewList";
import AddInterview from "./AddInterview";
import EditInterview from './EditInterview';


function App() {
  return (
    <div style={{
      backgroundColor: "#f8f9fa", minHeight: "100vh"
    }}>
      <Router>
          <Navbar />
          <Route path="/" exact component={InterviewList} />
          <Route path="/add" component={AddInterview} />
          <Route path="/edit" component={EditInterview} />

      </Router >
    </div >
  );
}

export default App;

