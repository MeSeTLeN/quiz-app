import React, { Component } from "react";
import QuizData from "../Data/QuizData";

export class Quiz extends Component {

  // Initializing local state by assigning an object to this.state. by using constructor

  constructor(props) {
    super(props);

    this.state = {
      userAnswer: null,
      currentQuestion: 0,
      options: [],
      quizEnd: false, //true if last question
      score: 0,
      disableBtn: true, //disable btn after press
    };
  }

  render() {
    return <div></div>;
  }
}

export default Quiz;
