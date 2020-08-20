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

  render() {
    const {
      question,
      options,
      currentQuestion,
      userAnswer,
      quizEnd,
    } = this.state;
    return (
      <div>
        <h2>{question}</h2>
        <span>{`Question ${currentQuestion + 1} of ${QuizData.length}`}</span>
        {/* we need to display list of items like options use .map */}

        {/* for each of the option make a new <p> */}

        {/* then if user presed btn change class to selected */}
        {/* if userAnswer === option then apply selected class else null */}

        {/* then onClick run fnc to run fnc with option to checkAnswer */}
        {options.map((option) => (
          <p
            key={option.id}
            className={`options ${userAnswer === option ? "selected" : null}`}
            onClick={() => this.checkAnswer(option)}
          >
            {option}{" "}
          </p>
        ))}
      </div>
    );
  }
}

export default Quiz;
