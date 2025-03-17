import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../shared.module';

@Injectable({
  providedIn: SharedModule
})
export class NotificationService {

  private defaultOptions = {
    duration: 3000
  };

  constructor(private matSnackBar: MatSnackBar) { }

  public error(message: any) {
    this.matSnackBar.open(message, 'Close');
  }

  public success(message: string) {
    this.matSnackBar.open(message, '', this.defaultOptions);
  }

}
