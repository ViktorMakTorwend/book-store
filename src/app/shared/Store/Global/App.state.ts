import { authorReducer } from "../Author-store/Author.reducers";
import { BookReducer } from "../Book-store/Book.reducers";

export const AppState = {
  authors: authorReducer,
  books: BookReducer,
}

