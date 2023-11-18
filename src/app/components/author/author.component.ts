import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditAuthorComponent } from '../add-edit-author/add-edit-author.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthorModel, Authors } from 'src/app/shared/Store/Author-store/Author.model';
import { Store } from '@ngrx/store';
import { getAuthors} from 'src/app/shared/Store/Author-store/Author.selectors';
import { AppStateModel } from 'src/app/shared/Store/Global/App.State.Model';
import { deleteAuthor, loadAuthors } from 'src/app/shared/Store/Author-store/Author.actions';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  authorsListTab!: AuthorModel[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'surname', 'name', 'middleName', 'birthday', 'add/edit'];
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
    this.store.dispatch(loadAuthors())
    this.store.select(getAuthors).subscribe(res => {
      this.authorsListTab = res;
      this.dataSource = new MatTableDataSource<AuthorModel>(this.authorsListTab);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  addAuthor() {
    this.openPopUpEditAuthor('0', 'Add author');
  }

  editAuthor(id: string) {
    this.openPopUpEditAuthor(id, 'Edit author', true);
  }

  removeAuthor(id: string) {
    if (confirm('Вы действительно хотите удалить автора?')) {
      this.store.dispatch(deleteAuthor({ id: id }))
      this.updateTable();
    }
  }

  openPopUpEditAuthor(id: string, operationName: any, isEdit = false) {
    this.dialog.open(AddEditAuthorComponent, {
      width: '40%',
      data: {
        id: id,
        operationName: operationName,
        isEdit: isEdit,
      }
    }).afterClosed().subscribe(() => this.updateTable());
  }
}