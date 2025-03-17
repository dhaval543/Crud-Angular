import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Person, PersonService } from 'src/app/api-module/person-service/person.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog-component/confirm-dialog.component';
import { NotificationService } from 'src/app/shared-module/notification-service/notification.service';
import { OperationType, PersonCreateUpdateComponent } from '../person-create-update/person-create-update.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  showProgressBar = false;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dateOfBirth', 'actions'];
  dataSource: Person[] = [];

  constructor(private dialog: MatDialog,
    private personService: PersonService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons() {
    this.showProgressBar = true;
    this.personService.getAllPersons()
      .pipe(
        finalize(() => {
          this.showProgressBar = false;
        })
      )
      .subscribe(response => {
        this.dataSource = response;
      }, error => {
        console.error(error);
        this.notificationService.error(error.message);
      });
  }

  onRowClick(person: Person) {
    const dialogRef = this.dialog.open(PersonCreateUpdateComponent, {
      data: {
        operationType: OperationType.UPDATE,
        person: person
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPersons();
      }
    });
  }

  onAddClick() {
    const dialogRef = this.dialog.open(PersonCreateUpdateComponent, {
      data: {
        operationType: OperationType.CREATE
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadPersons();
      }
    });
  }

  onDeleteClick(item: Person) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete from Persons?',
        message: `Person ${item.firstName} will be permanently deleted`,
        confirmLabel: 'Delete'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.personService.deletePersonById(item.id)
          .subscribe(response => {
            this.loadPersons();
          },
            error => this.notificationService.error(error));
      }
    });
  }

}
