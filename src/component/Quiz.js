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

    // if quizEnd true so render question and correct answer by map them
    if (quizEnd) {
      return (
        <div>
          <h1>Game Over. Final score is {this.state.score} points</h1>
          <p>The correct Answers for the quiz are</p>
          <div>
            {QuizData.map((objIndex) => (
              <div className="options" key={objIndex}>
                <div>question: {objIndex.question}</div>
                <div>answer: {objIndex.answer}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

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
        {currentQuestion < QuizData.length - 1 && (
          <button
            disableBtn={this.state.disableBtn}
            onClick={this.nextQuestionHandler}
          >
            Next Question
          </button>
        )}
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
