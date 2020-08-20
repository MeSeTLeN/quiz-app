import React, { Component } from "react";
import { QuizData } from "../Data/QuizData";

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
    const { currentQuestion } = this.state;

    this.setState(() => {
      return {
        question: QuizData[currentQuestion].question,
        options: QuizData[currentQuestion].options,
        answer: QuizData[currentQuestion].answer,
      };
    });
  };

  nextQuestionHandler = () => {
    const { userAnswer, answer, score } = this.state;

    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      userAnswer: null,
    });
  };

  componentDidMount() {
    this.loadQuiz();
  }

  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disableBtn: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentQuestion } = this.state;
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          question: QuizData[currentQuestion].question,
          options: QuizData[currentQuestion].options,
          answer: QuizData[currentQuestion].answer,
        };
      });
    }
  }

  //   fnc to finish quiz by press btn and also inc score instead of nextBtn
  finishHandler = () => {
    const { userAnswer, answer, score } = this.state;
    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }
    if (this.state.currentQuestion === QuizData.length - 1) {
      this.setState({
        quizEnd: true,
      });
    }
  };

  render() {
    const {
      question,
      options,
      currentQuestion,
      userAnswer,
      quizEnd,
      score,
    } = this.state;
    return (
      <div>
        <h2>Your score is: {score}</h2>
        <h2>{question}</h2>
        <span>{`Question ${currentQuestion + 1} of ${QuizData.length}`}</span>
        {options.map((option) => (
          <p
            key={option.id}
            className={`options ${userAnswer === option ? "selected" : null}`}
            onClick={() => this.checkAnswer(option)}
          >
            {option}{" "}
          </p>
        ))}

        {/* display nextBtn if currentQuestion < then data.length -1 because from 0 starts*/}
        {/* apply style disableBtn if disable */}
        {currentQuestion < QuizData.length - 1 && (
          <button
            disableBtn={this.state.disableBtn}
            onClick={this.state.nextQuestionHandler}
          >
            Next Question
          </button>
        )}
        {/* if currentQuestion last will display finish btn and apply style to it by disableBtn */}
        {currentQuestion === QuizData.length - 1 && (
          <button
            onClick={this.finishHandler}
            disableBtn={this.state.disableBtn}
          >
            {" "}
            Finish
          </button>
        )}
      </div>
    );
  }
}

export default Quiz;
