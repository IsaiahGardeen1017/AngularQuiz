import { Component, OnInit } from '@angular/core';
import { QuizQuestion, QuestionLoader } from 'src/app/quiz.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})


export class QuizComponent implements OnInit {


  outputText: string;
  correctScore: number;
  isFormDisabled: boolean;
  quizQuestions: QuizQuestion[];
  currentQuestion: number;
  questionText: string;
  answers: string[];

  form = new FormGroup({
    answer: new FormControl('', Validators.required)
  })


  constructor() { }

  ngOnInit(): void {
    this.currentQuestion = -1;
    this.correctScore = 0;

    let ql = new QuestionLoader();
    this.quizQuestions = ql.getQuestions();
    this.loadNextQuestion();
  }

  loadNextQuestion(): void {
    this.currentQuestion = this.currentQuestion + 1;
    this.questionText = this.quizQuestions[this.currentQuestion].getQuestion();
    this.answers = this.quizQuestions[this.currentQuestion].getAnswers();
  }

  get f() {
    return this.form.controls;
  }

  submit(): void {
    let selectedAnswer = this.form.value.answer;
    if (this.quizQuestions[this.currentQuestion].isCorrectAnswer(selectedAnswer)) {
      this.outputText = "Correct!"
      this.correctScore++;
    } else {
      this.outputText = "WRONG!"
    }
     
    this.isFormDisabled = true;
    //this.form.disable();

    console.log("Input: " + this.form.value.answer);
  }

  next(): void {
    if(this.currentQuestion == this.quizQuestions.length - 1){
      this.outputText = "Quiz is over, you answered " + this.correctScore + "/" + this.quizQuestions.length + " correctly.";
    }else{
      this.outputText = "";
      this.form.controls["answer"].reset();
      this.loadNextQuestion();
      this.isFormDisabled = false;
    }
  }

}
