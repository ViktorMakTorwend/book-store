import { createAction, props } from "@ngrx/store";
import { AuthorModel } from "./Author.model";

export const LOAD_AUTHOR = '[Author] load list of authors';
export const LOAD_AUTHOR_SUCCESS = '[Author] load list of authors success';
export const ADD_AUTHOR = '[Author] add author';
export const ADD_AUTHOR_SUCCESS = '[Author] add author success';
export const UPDATE_AUTHOR = '[Author] update author';
export const UPDETE_AUTHOR_SUCCESS = '[Author] update author success';
export const DELETE_AUTHOR = '[Author] delete author';
export const DELETE_AUTHOR_SUCCESS = '[Author] delete author success';

export const loadAuthors = createAction(LOAD_AUTHOR);

export const loadAuthorsSucces = createAction(LOAD_AUTHOR_SUCCESS, props<{authorList: AuthorModel []}>());

export const addAuthor = createAction(ADD_AUTHOR, props<{authorInput: AuthorModel}>());

export const addAuthorsSucces = createAction(ADD_AUTHOR_SUCCESS, props<{authorInput: AuthorModel}>());

export const updateAuthor = createAction(UPDATE_AUTHOR, props<{authorInput: AuthorModel}>());

export const updateAuthorSuccess = createAction(UPDETE_AUTHOR_SUCCESS, props<{authorInput: AuthorModel}>());

export const deleteAuthor = createAction(DELETE_AUTHOR, props<{id:string}>());

export const deleteAuthorSuccess = createAction(DELETE_AUTHOR_SUCCESS, props<{id:string}>());