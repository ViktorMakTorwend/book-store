import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEditAuthorComponent } from './components/add-edit-author/add-edit-author.component';
import { AddEditBookComponent } from './components/add-edit-book/add-edit-book.component';
import { AuthorComponent } from './components/author/author.component';
import { BookComponent } from './components/book/book.component';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authorReducer } from './shared/Store/Author-store/Author.reducers';
import { AppState } from './shared/Store/Global/App.state';
import { AuthorEffects } from './shared/Store/Author-store/Author.effects';
import { BookEffects } from './shared/Store/Book-store/Book.effects';

@NgModule({
  declarations: [
    AppComponent,
    AddEditAuthorComponent,
    AddEditBookComponent,
    AuthorComponent,
    BookComponent,
    MenuHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(AppState),
    EffectsModule.forRoot([AuthorEffects, BookEffects]),
    StoreDevtoolsModule.instrument({maxAge: false, logOnly: !isDevMode}),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
