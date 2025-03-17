import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material-module/material.module';

import { ConfirmDialogComponent } from './confirm-dialog-component/confirm-dialog.component';
import { ClicableSpanComponent } from './clicable-span-component/clicable-span.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ClicableSpanComponent
  ],
  exports: [
    ConfirmDialogComponent,
    ClicableSpanComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
