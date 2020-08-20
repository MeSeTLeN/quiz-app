import React, { Component } from "react";
import QuizData from "../Data/QuizData";

export class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAnswer: null,
      currentQuestion: 0,
      options: [],
      quizEnd: false,
      score: 0,
      disableBtn: true,
    };
  }

  loadQuiz = () => {
    const { currentIndex } = this.state;

    this.setState(() => {
      return {
        question: QuizData[currentIndex].question,
        options: QuizData[currentIndex].options,
        answer: QuizData[currentIndex].answer,
      };
    });
  };

  //   new func it do increment currentIndex and if userAnswer correct increment score
  nextQuestionHandler = () => {
    // retrive value of those things
    const { userAnswer, answer, score } = this.state;

    // check correct answer and increase score if correct
    if (userAnswer=== answer){
        this.setState({
            score: score + 1
        })
    }

    // increse currentIndex by 1 and reset user answer
    this.setState({
        currentIndex: this.state.currentIndex + 1
        userAnswer: null
    })
  };
  render() {
    return <div></div>;
  }
}

export default Quiz;
