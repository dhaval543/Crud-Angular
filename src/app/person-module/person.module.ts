import { NgModule } from '@angular/core';

import { ApiModule } from '../api-module/api.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared-module/shared.module';
import { PersonRoutingModule } from './person-routing.module';

import { PersonListComponent } from './person-list-component/person-list.component';
import { PersonCreateUpdateComponent } from './person-create-update/person-create-update.component';

@NgModule({
  declarations: [
    PersonListComponent,
    PersonCreateUpdateComponent
  ],
  imports: [
    ApiModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    PersonRoutingModule
  ]
})
export class PersonModule { }
