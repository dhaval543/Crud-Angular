import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { Person, PersonService, PersonToUpdate } from 'src/app/api-module/person-service/person.service';
import { NotificationService } from 'src/app/shared-module/notification-service/notification.service';

export enum OperationType {
  CREATE = "CREATE",
  UPDATE = "UPDATE"
}

export interface PersonCreateUpdateData {
  operationType: OperationType;
  person: Person;
}

@Component({
  selector: 'app-person-create-update',
  templateUrl: './person-create-update.component.html',
  styleUrls: ['./person-create-update.component.css']
})
export class PersonCreateUpdateComponent implements OnInit {

  showSpinner = false;
  isCreate = true;
  personForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required]
  });

  constructor(private dialogRef: MatDialogRef<PersonCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonCreateUpdateData,
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    if (this.data.operationType === OperationType.UPDATE) {
      this.isCreate = false;
      this.personForm = this.formBuilder.group({
        id: [{ value: this.data.person.id, disabled: true }],
        firstName: [this.data.person.firstName, Validators.required],
        lastName: [this.data.person.lastName, Validators.required],
        dateOfBirth: [{ value: this.data.person.dateOfBirth, disabled: true }]
      });
    }
  }

  onSubmit() {
    if (this.isCreate) {
      this.doCreate();
    } else {
      this.doUpdate();
    }
  }

  doCreate() {
    this.showSpinner = true;
    this.personService.createPerson(this.personForm.value)
      .pipe(
        finalize(() => {
          this.showSpinner = false;
        })
      )
      .subscribe((id: string) => {
        this.notificationService.success(`Person created with id = ${id}`);
        this.dialogRef.close(true);
      }, error => {
        console.error(error);
        this.notificationService.error(error.message);
      });
  }

  doUpdate() {
    const form = this.personForm.getRawValue();
    const id = form.id;
    const toUpdate = { firstName: form.firstName, lastName: form.lastName };
    
    this.showSpinner = true;
    this.personService.updatePerson(id, toUpdate)
      .pipe(
        finalize(() => {
          this.showSpinner = false;
        })
      )
      .subscribe(() => {
        this.notificationService.success(`Person id = ${id} updated`);
        this.dialogRef.close(true);
      }, error => {
        console.error(error);
        this.notificationService.error(error.message);
      });    
  }

}
