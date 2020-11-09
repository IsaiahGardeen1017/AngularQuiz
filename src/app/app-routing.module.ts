import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  {path: 'start-screen-component', component: StartScreenComponent},
  {path: 'quiz-component', component: QuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
