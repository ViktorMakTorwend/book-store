import { Authors, Books } from "../Author-store/Author.model";

export interface AppStateModel {
  authors: Authors;
  books: Books
}