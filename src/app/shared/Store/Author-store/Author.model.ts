export interface AuthorModel {
  id: string
  surname: string;
  name: string;
  middleName: string;
  birthday: string;
}

export interface Authors {
  authorsList: AuthorModel [];
}

export interface BookModel {
  id: string;
  author: string;
  title: string;
  publisher: string;
  publishYear: string;
}

export interface Books {
  booksList: BookModel [];
}