import { createAction, props } from "@ngrx/store";
import { BookModel } from "./Book.model";

export const LOAD_BOOK = '[Book] load list of Books';
export const LOAD_BOOK_SUCCESS = '[Book] load list of Books success';
export const ADD_BOOK = '[Book] add Book';
export const ADD_BOOK_SUCCESS = '[Book] add Book success';
export const UPDATE_BOOK = '[Book] update Book';
export const UPDETE_BOOK_SUCCESS = '[Book] update Book success';
export const DELETE_BOOK = '[Book] delete Book';
export const DELETE_BOOK_SUCCESS = '[Book] delete Book success';

export const loadBooks = createAction(LOAD_BOOK);

export const loadBooksSucces = createAction(LOAD_BOOK_SUCCESS, props<{bookList: BookModel []}>());

export const addBook = createAction(ADD_BOOK, props<{bookInput: BookModel}>());

export const addBooksSucces = createAction(ADD_BOOK_SUCCESS, props<{bookInput: BookModel}>());

export const updateBook = createAction(UPDATE_BOOK, props<{bookInput: BookModel}>());

export const updateBookSuccess = createAction(UPDETE_BOOK_SUCCESS, props<{bookInput: BookModel}>());

export const deleteBook = createAction(DELETE_BOOK, props<{id:string}>());

export const deleteBookSuccess = createAction(DELETE_BOOK_SUCCESS, props<{id:string}>());