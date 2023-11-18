import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { addBook, addBooksSucces, deleteBook, deleteBookSuccess, loadBooks, loadBooksSucces, updateBook, updateBookSuccess } from "./Book.actions";
import { exhaustMap, map, of } from "rxjs";

@Injectable()
export class BookEffects {

  constructor(private action$: Actions, private localStorageService: LocalStorageService) { }

  _author = createEffect(() =>
    this.action$.pipe(
      ofType(loadBooks),
      exhaustMap(() => {
        return this.localStorageService.getBooksNode().pipe(
          map((data) => {
            return loadBooksSucces({ bookList: data })
          })
        )
      })
    )
  )

  _addBook = createEffect(() =>
    this.action$.pipe(
      ofType(addBook),
      exhaustMap((action) => {
        return this.localStorageService.saveBook(action.bookInput).pipe(
          map(() => {
            return addBooksSucces({ bookInput: action.bookInput })
          })
        )
      })
    )
  )

  _updateBook = createEffect(() =>
    this.action$.pipe(
      ofType(updateBook),
      exhaustMap((action) => {
        return this.localStorageService.updateBook(action.bookInput).pipe(
          map(() => {
            return updateBookSuccess({ bookInput: action.bookInput})
          })
        )
      })
    )
  )

  _deleteBook = createEffect(() =>
    this.action$.pipe(
      ofType(deleteBook),
      exhaustMap((action) => {
        return this.localStorageService.deleteBook(action.id).pipe(
          map(() => {
            return deleteBookSuccess({id: action.id })
          })
        )
      })
    )
  )

}