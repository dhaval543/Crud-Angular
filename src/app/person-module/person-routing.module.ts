import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrudLayoutModule } from '../crud-layout-module/crud-layout.module';
import { CrudLayoutComponent } from '../crud-layout-module/crud-layout-component/crud-layout.component';

import { PersonListComponent } from './person-list-component/person-list.component';

const routes: Routes = [
  {
    path: 'persons',
    component: CrudLayoutComponent,
    children: [
      {
        path: '',
        component: PersonListComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CrudLayoutModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
