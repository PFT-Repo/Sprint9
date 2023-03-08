import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private router: Router) { }

  openAlertWithButton(message: string, url: string) {
    Swal.fire({
      title: '¿ Desea ver el proyecto ?',
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Ir a la página',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        window.open(url, '_blank');
      }
    });
  }
}



/*import { Component, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog, private router: Router) { }

  openAlertWithButton(message: string, url: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: message,
      url: url
    };

    this.dialog.open(AlertDialogComponent, dialogConfig);
  }
}

@Component({
  selector: 'app-alert-dialog',
  template: `
    <h1 mat-dialog-title>Colisión detectada</h1>
    <div mat-dialog-content>
      {{ data.message }}
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close="true" (click)="goToPage(data.url)">Ir a la página</button>
    </div>
  `,
})
export class AlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {}

  goToPage(url: string) {
    window.open(url, '_blank');
  }
}
*/