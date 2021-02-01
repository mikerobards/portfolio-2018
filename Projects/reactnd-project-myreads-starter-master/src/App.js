import React from 'react';
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import MainPage from './MainPage';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

componentDidMount() {
  BooksAPI.getAll().then((books) => {
    this.setState({ books })
  });
}

placeShelf = (book, shelf) => {
  BooksAPI.update(book, shelf);

  BooksAPI.getAll().then((books) => {
    this.setState({ books })
  });
}

render() {
  console.log(this.state.books);

  return (
    <div className="app">
    <Route exact path="/" render={() => (
      <MainPage
        books={this.state.books}
        placeShelf={this.placeShelf}
      />
    )} />
    <Route path="/search" render={() => (
      <SearchPage
        books={this.state.books}
        placeShelf={this.placeShelf}
      />
    )} />
    </div>
  )
}
}

export default BooksApp;
