import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthorModel, Authors } from "./Author.model";

const getAuthorsState = createFeatureSelector<Authors>('authors');

export const getAuthors = createSelector(getAuthorsState, (state) => {
  return state.authorsList
});

export const getAuthorById = (authorId: string) => createSelector(getAuthorsState, (state) => {
  return state.authorsList.find((author: AuthorModel) => author.id == authorId) as AuthorModel;
});