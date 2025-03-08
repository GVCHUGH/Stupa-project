import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, PaginationComponent],
})
export class SharedModule {}
