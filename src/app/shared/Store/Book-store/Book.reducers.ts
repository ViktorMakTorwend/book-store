import { createReducer, on } from "@ngrx/store";
import { initialState } from "./Book.state";
import { addBooksSucces, deleteBookSuccess, loadBooks, loadBooksSucces, updateBookSuccess } from "./Book.actions";
import { BookModel } from "./Book.model";

const _BookReducer = createReducer(
  initialState,
  on(loadBooksSucces, (state, action) => {
    return {
      ...state,
      booksList: [...action.bookList],
    }
  }),
  on(addBooksSucces, (state, action) => {
    const _book = { ...action.bookInput }
    return {
      ...state,
      booksList: [...state.booksList, _book]
    }
  }),
  on(updateBookSuccess, (state, action) => {
    const _book = { ...action.bookInput }
    const _bookList = [...state.booksList.filter((book: BookModel) => book.id != _book.id), _book]
    return {
      ...state,
      booksList: _bookList
    }
  }),
  on(deleteBookSuccess, (state, action) => {
    const _bookList = [...state.booksList.filter((book: BookModel) => book.id != action.id)]
    return {
      ...state,
      booksList: _bookList
    }
  })
)

export function BookReducer(state: any, action: any) {
  return _BookReducer(state, action);
}