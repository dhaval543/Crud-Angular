import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonModule } from '../person-module/person.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'persons'
  }
];

@NgModule({
  imports: [
    PersonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
