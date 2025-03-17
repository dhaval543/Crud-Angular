import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrudLayoutComponent } from './crud-layout-component/crud-layout.component';

const routes: Routes = [
  {
    path: 'crud-layout',
    component: CrudLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudLayoutRoutingModule { }
