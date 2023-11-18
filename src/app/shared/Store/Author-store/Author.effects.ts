import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { addAuthor, addAuthorsSucces, deleteAuthor, deleteAuthorSuccess, loadAuthors, loadAuthorsSucces, updateAuthor, updateAuthorSuccess } from "./Author.actions";
import { exhaustMap, map, of } from "rxjs";

@Injectable()
export class AuthorEffects {

  constructor(private action$: Actions, private localStorageService: LocalStorageService) { }

  _author = createEffect(() =>
    this.action$.pipe(
      ofType(loadAuthors),
      exhaustMap(() => {
        return this.localStorageService.getAuthorsNode().pipe(
          map((data) => {
            return loadAuthorsSucces({ authorList: data })
          })
        )
      })
    )
  )

  _addAuthor = createEffect(() =>
    this.action$.pipe(
      ofType(addAuthor),
      exhaustMap((action) => {
        return this.localStorageService.saveAuthor(action.authorInput).pipe(
          map(() => {
            return addAuthorsSucces({ authorInput: action.authorInput })
          })
        )
      })
    )
  )

  _updateAuthor = createEffect(() =>
    this.action$.pipe(
      ofType(updateAuthor),
      exhaustMap((action) => {
        return this.localStorageService.updateAuthor(action.authorInput).pipe(
          map(() => {
            return updateAuthorSuccess({ authorInput: action.authorInput})
          })
        )
      })
    )
  )

  _deleteAuthor = createEffect(() =>
    this.action$.pipe(
      ofType(deleteAuthor),
      exhaustMap((action) => {
        return this.localStorageService.deleteAuthor(action.id).pipe(
          map(() => {
            return deleteAuthorSuccess({id: action.id })
          })
        )
      })
    )
  )

}