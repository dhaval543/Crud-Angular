import { NgModule } from '@angular/core';

import { CrudLayoutComponent } from './crud-layout-component/crud-layout.component';

import { MaterialModule } from '../material-module/material.module';
import { CrudLayoutRoutingModule } from './crud-layout-routing.module';

@NgModule({
  declarations: [
    CrudLayoutComponent
  ],
  exports: [
    CrudLayoutComponent
  ],
  imports: [
    MaterialModule,
    CrudLayoutRoutingModule
  ]
})
export class CrudLayoutModule { }
