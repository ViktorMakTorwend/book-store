import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid'
import { Observable, of } from 'rxjs';
import { AuthorModel } from '../shared/Store/Author-store/Author.model';
import { BookModel } from '../shared/Store/Book-store/Book.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getAuthorsNode(): Observable<AuthorModel[]> {
    let authors: AuthorModel[] = [];
    let authorsLocal: any = localStorage.getItem('authors');
    if (authorsLocal !== null) {
      authors = JSON.parse(authorsLocal);
    }
    return of(authors);
  }

  saveAuthor(author: AuthorModel): Observable<AuthorModel> {
    let savedAuthor = { ...author };
    savedAuthor.id = uuidv4();
    this.getAuthorsNode().subscribe(res => {
      res.push(savedAuthor);
      localStorage.setItem('authors', JSON.stringify(res))
    })
    return of(savedAuthor);
  }

  findAuthorById(id: string): Observable<AuthorModel> {
    let author: any;
    this.getAuthorsNode().subscribe(res => {
      author = res.find((author: AuthorModel) => author.id == id)
    })
    return of(author);
  }

  updateAuthor(editAuthor: AuthorModel) {
    this.getAuthorsNode().subscribe(res => {
      let updatedAuthors = [...res.filter((author) => author.id != editAuthor.id), editAuthor];
      localStorage.setItem('authors', JSON.stringify(updatedAuthors));
    })
    return of(editAuthor);
  }

  deleteAuthor(id: string) {
    this.getAuthorsNode().subscribe(res => {
      let deletedAuthors = res.filter((author) => author.id != id);
      localStorage.setItem('authors', JSON.stringify(deletedAuthors));
    })
    return of(id)
  }

  getAuthorsFIO() {
    let authors: string[] = []
    this.getAuthorsNode().subscribe(res => {
      authors = res.map((author) => {
        let midleNameShort = String(author.middleName.split('').shift()).toUpperCase();
        let nameShort = String(author.name.split('').shift()).toUpperCase();
        return (author.surname + ' ' + midleNameShort + '.' + nameShort + '.');
      })
    })
    return authors;
  }

  verifySimularData(authorChecked: AuthorModel): boolean {
    let coincidence: boolean = false;
    let compareAuthors: AuthorModel[] = [];
    this.getAuthorsNode().subscribe(res => {
      compareAuthors = res.filter((author: AuthorModel) => {
        return author.surname == authorChecked.surname &&
          author.name === authorChecked.name &&
          author.middleName === authorChecked.middleName &&
          author.birthday === authorChecked.birthday
      });
    })
    if (compareAuthors.length !== 0) {
      coincidence = true;
    }
    return coincidence;
  }

  getBooksNode(): Observable<BookModel[]> {
    let books: BookModel[] = [];
    let booksLocal: any = localStorage.getItem('books');
    if (booksLocal !== null) {
      books = JSON.parse(booksLocal);
    }
    return of(books);
  }

  saveBook(book: BookModel) {
    let savedBook = { ...book }
    savedBook.id = uuidv4();
    this.getBooksNode().subscribe(res => {
      res.push(savedBook);
      localStorage.setItem('books', JSON.stringify(res))
    })
    return of(savedBook);
  }

  findBookById(id: string): Observable<BookModel> {
    let book: any;
    this.getBooksNode().subscribe(res => {
      book = res.find((book: BookModel) => book.id == id)
    })
    return of(book);
  }

  updateBook(editBook: BookModel) {
    this.getBooksNode().subscribe(res => {
      let updatedBooks = [...res.filter((book) => book.id != editBook.id), editBook];
      localStorage.setItem('books', JSON.stringify(updatedBooks));
    })
    return of(editBook);
  }

  deleteBook(id: string) {
    this.getBooksNode().subscribe(res => {
      let deletedBooks = res.filter((book) => book.id != id);
      localStorage.setItem('books', JSON.stringify(deletedBooks));
    })
    return of(id)
  }

}
