import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppStateModel } from 'src/app/shared/Store/Global/App.State.Model';
import { Store } from '@ngrx/store';
import { getBookById } from 'src/app/shared/Store/Book-store/Book.selectors';
import { BookModel } from 'src/app/shared/Store/Author-store/Author.model';
import { addBook, updateBook } from 'src/app/shared/Store/Book-store/Book.actions';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit{

  pageTitle = '';
  editBookId = '0';
  editBook!: BookModel;
  allAuthors: string [] = [];

  constructor(
    private dialogRef: MatDialogRef<AddEditBookComponent>,
    private builder: FormBuilder,
    private localStorageService: LocalStorageService,
    private store: Store<AppStateModel>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
      this.allAuthors = this.localStorageService.getAuthorsFIO();
      this.pageTitle = this.data.operationName;
      if (this.data.isEdit) {
        this.editBookId = this.data.id;
        this.store.select(getBookById(this.editBookId)).subscribe(_data => {
          this.editBook = _data;
          this.bookForm.setValue({
            id: this.editBook.id,
            author: this.editBook.author,
            title: this.editBook.title,
            publisher: this.editBook.publisher,
            publishYear: this.editBook.publishYear,
          })
        });
      }
    }

  bookForm = this.builder.group({
    id: this.builder.control('0'),
    author: this.builder.control('0', Validators.required),
    title: this.builder.control('', Validators.required),
    publisher: this.builder.control('', Validators.required),
    publishYear: this.builder.control('', Validators.required),
  })

  closePopUpEditBook() {
    this.dialogRef.close();
  }

  saveBookModal() {
    if (this.bookForm.valid) {
      const _bookInput: BookModel = {
        id: '',
        author: this.bookForm.value.author as string,
        title: this.bookForm.value.title as string,
        publisher: this.bookForm.value.publisher as string,
        publishYear: this.bookForm.value.publishYear as string,
      }
      if(this.data.isEdit) {
        _bookInput.id = this.bookForm.value.id as string;
        this.store.dispatch(updateBook({bookInput: _bookInput}))
      } else {
        this.store.dispatch(addBook({bookInput: _bookInput}))
      }
      this.closePopUpEditBook();
    }
  }
}