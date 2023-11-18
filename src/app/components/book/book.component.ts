import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditBookComponent } from '../add-edit-book/add-edit-book.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { AppStateModel } from 'src/app/shared/Store/Global/App.State.Model';
import { deleteBook, loadBooks } from 'src/app/shared/Store/Book-store/Book.actions';
import { getBooks } from 'src/app/shared/Store/Book-store/Book.selectors';
import { BookModel } from 'src/app/shared/Store/Author-store/Author.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  booksListTab!: BookModel[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'author', 'title', 'publisher', 'publishYear', 'add/edit'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private store: Store<AppStateModel>) { }

  ngOnInit(): void {
    this.updateTable();
  }

  updateTable() {
    this.store.dispatch(loadBooks())
    this.store.select(getBooks).subscribe(res => {
      this.booksListTab = res;
      this.dataSource = new MatTableDataSource<BookModel>(this.booksListTab);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  addBook() {
    this.openPopUpEditBook('0', 'Add book');
  }

  editBook(id: string) {
    this.openPopUpEditBook(id, 'Edit book', true);
  }

  removeBook(id: string) {
    if (confirm('Вы действительно хотите удалить книгу?')) {
      this.store.dispatch(deleteBook({ id: id }))
      this.updateTable();
    }
  }

  openPopUpEditBook(id: string, operationName: any, isEdit = false) {
    this.dialog.open(AddEditBookComponent, {
      width: '40%',
      data: {
        id: id,
        operationName: operationName,
        isEdit: isEdit,
      }
    }).afterClosed().subscribe(() => this.updateTable());
  }
}