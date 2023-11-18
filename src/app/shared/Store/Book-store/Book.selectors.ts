import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookModel, Books } from "./Book.model";

const getBooksState = createFeatureSelector<Books>('books');

export const getBooks = createSelector(getBooksState, (state) => {
  return state.booksList
});

export const getBookById = (BookId: string) => createSelector(getBooksState, (state) => {
  return state.booksList.find((Book: BookModel) => Book.id == BookId) as BookModel;
});