import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-read-description',
  templateUrl: './read-description.component.html',
  styleUrl: './read-description.component.scss',
})
export class ReadDescriptionComponent {
  constructor(
    private dialogRef: MatDialogRef<ReadDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }
  toClose() {
    this.dialogRef.close();
  }
}
