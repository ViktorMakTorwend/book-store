import { createReducer, on } from "@ngrx/store";
import { initialState } from "./Author.state";
import { addAuthorsSucces, deleteAuthorSuccess, loadAuthors, loadAuthorsSucces, updateAuthorSuccess } from "./Author.actions";
import { AuthorModel } from "./Author.model";

const _authorReducer = createReducer(
  initialState,
  on(loadAuthorsSucces, (state, action) => {
    return {
      ...state,
      authorsList: [...action.authorList],
    }
  }),
  on(addAuthorsSucces, (state, action) => {
    const _author = { ...action.authorInput }
    return {
      ...state,
      authorsList: [...state.authorsList, _author]
    }
  }),
  on(updateAuthorSuccess, (state, action) => {
    const _author = { ...action.authorInput }
    const _authorList = [...state.authorsList.filter((author: AuthorModel) => author.id != _author.id), _author]
    return {
      ...state,
      authorsList: _authorList
    }
  }),
  on(deleteAuthorSuccess, (state, action) => {
    const _authorList = [...state.authorsList.filter((author: AuthorModel) => author.id != action.id)]
    return {
      ...state,
      authorsList: _authorList
    }
  })
)

export function authorReducer(state: any, action: any) {
  return _authorReducer(state, action);
}