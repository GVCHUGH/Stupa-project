import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() totalproducts: any;

  @Output() pageChange = new EventEmitter<{ page: number; pageSize: number }>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pageNumbers: number[] = [];
  pageSize = 10;
  currentPage = 1;
  lastPage = 6;

  totalPage: any = [];

  constructor() {}

  ngOnChanges() {
    this.getVisiblePage();
  }

  getVisiblePage() {
    this.totalPage.length = Math.ceil(this.totalproducts / this.pageSize);
    this.lastPage = Math.ceil(this.totalproducts / this.pageSize);
  }
  onPageChange(page: number) {
    if (page > 0 && page <= this.totalPage.length) {
      this.currentPage = page;
      this.pageChange.emit({ page: page, pageSize: this.pageSize });
      this.getVisiblePage();
    }
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.pageSizeChange.emit(pageSize);
    this.getVisiblePage();
  }

  getStartPage() {
    const pageSize = this.pageSize;
    const currentPage = this.currentPage;
    const data = pageSize * currentPage - pageSize + 1;
    return data;
  }

  totalRecordCount: any;
  getLastPage() {
    const pageSize = this.pageSize;
    const currentPage = this.currentPage;
    const showValue = pageSize * currentPage;
    if (showValue < this.totalproducts) {
      return showValue;
    } else {
      return this.totalproducts;
    }
  }
  getTotalRecord() {
    const totalCount = this.totalproducts;
    return totalCount;
  }
}
