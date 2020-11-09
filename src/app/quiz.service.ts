import { normalizeGenFileSuffix } from '@angular/compiler/src/aot/util';
import * as data from '../assets/quiz.json';


export class QuestionLoader{

    getQuestions(): QuizQuestion[]{
        let qs = data.questions;
        
        let questions: QuizQuestion[] = new Array(qs.length);
        
        for(let i = 0; i < qs.length; i++){
            let newQuestion = new QuizQuestion(qs[i].question, qs[i].answers);
            questions[i] = newQuestion;
        }
        
        return questions;
    }
}

export class QuizQuestion {
    question: string;
    answers: string[];

    constructor(q: string, a: string[]) {
        this.question = q;
        this.answers = a;
    }

    getQuestion(): string {
        return this.question;
    }

    getAnswers(): string[] {
        let shuffledAnswers = new Array();
        for(let i = 0; i < this.answers.length; i++){
            shuffledAnswers[i] = this.answers[i];
        }
        shuffledAnswers.sort(() => Math.random() - 0.5);
        return shuffledAnswers;
    }

    getCorrectAnswer(): string {
        return this.answers[0];
    }

    isCorrectAnswer(a: string): boolean {
        if (a === this.answers[0]) {
            return true;
        } else {
            return false;
        }
    }
}