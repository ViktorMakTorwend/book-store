import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Store } from '@ngrx/store';
import { AppStateModel } from 'src/app/shared/Store/Global/App.State.Model';
import { addAuthor, updateAuthor } from 'src/app/shared/Store/Author-store/Author.actions';
import { AuthorModel } from 'src/app/shared/Store/Author-store/Author.model';
import { getAuthorById } from 'src/app/shared/Store/Author-store/Author.selectors';

@Component({
  selector: 'app-add-edit-author',
  templateUrl: './add-edit-author.component.html',
  styleUrls: ['./add-edit-author.component.css']
})
export class AddEditAuthorComponent implements OnInit {

  pageTitle = '';
  editAuthorId = '';
  editAuthor!: AuthorModel;

  constructor(
    private dialogRef: MatDialogRef<AddEditAuthorComponent>,
    private builder: FormBuilder,
    private localStorageService: LocalStorageService,
    private store: Store<AppStateModel>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.pageTitle = this.data.operationName;
    if (this.data.isEdit) {
      this.editAuthorId = this.data.id;
      this.store.select(getAuthorById(this.editAuthorId)).subscribe(_data => {
        this.editAuthor = _data;
        this.authorForm.setValue({
              id: this.editAuthor.id,
              surname: this.editAuthor.surname,
              name: this.editAuthor.name,
              middleName: this.editAuthor.middleName,
              birthday: this.editAuthor.birthday,
            })
      })
    }
  }

  authorForm = this.builder.group({
    id: this.builder.control(''),
    surname: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    middleName: this.builder.control('', Validators.required),
    birthday: this.builder.control('', Validators.required),
  })

  closePopUpEditAuthor() {
    this.dialogRef.close();
  }

  saveAuthorModal() {
    if (this.authorForm.valid) {
      const _authorInput: AuthorModel = {
        id: '',
        surname: this.authorForm.value.surname as string,
        name: this.authorForm.value.name as string,
        middleName: this.authorForm.value.middleName as string,
        birthday: this.authorForm.value.birthday as string,
      }
      if (!this.localStorageService.verifySimularData(_authorInput)) {
        if (this.data.isEdit) {
          _authorInput.id = this.authorForm.value.id as string;
          this.store.dispatch(updateAuthor({authorInput: _authorInput}))
        } else {
          this.store.dispatch(addAuthor({authorInput: _authorInput}))
        }
        this.closePopUpEditAuthor();
      } else {
        confirm('Автор с такими данными уже есть в базе, пожалуйста измените данные');
      }
    }
  }
}
