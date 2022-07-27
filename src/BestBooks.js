import React from 'react';
import axios from 'axios';
import './App.css'

import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error:''
    }
    // this.server = process.env.REACT_APP_SERVER
    this.server = 'https://can-of-books-backend123.herokuapp.com'
    // this.server = 'http://localhost:3002'
  }

getBooks = () => {
     const bookQuery = `${this.server}/books`;
     axios.get(bookQuery)
 
     .then(response => {
        let booksArr = [...response.data];
         this.setState({books:booksArr});
         console.log('this.state.books',this.state.books)
     })
     .catch(err => {
         console.log('error in getBooks',err);
         this.setState({error:`Error! (${err.code}: ${err.message})`});
     })
 }

componentDidMount = () => {
  this.getBooks();
}

deleteBook = (e) => {
  const deleteQuery = `https://can-of-books-backend123.herokuapp.com/books/${e.target.id}`;
  console.log(`deleteQuery`,deleteQuery);
  axios.delete(deleteQuery)
  .then(response => {
    console.log('delete response',response);
    this.getBooks();
    this.render();
})
.catch(err => {
    console.log('error in deleteBook',err);
    this.setState({error:`Error! (${err.code}: ${err.message})`});
})
}

handleAddSubmit = (event) => {
  // needs to be fat arrow function so state will work????
  event.preventDefault();
  this.props.closeModal();

  let newBook = {
  title: this.state.title,
  description: this.state.description,
  status: this.state.status
  }

  axios.post(`${this.server}/books`, newBook)
    .then(response => {
      console.log('post response.data',response.data);
  });
}

  render() {

    return (
      <>
        <h2>Our Essential Lifelong Learning &amp; Formation Shelf</h2>
        {this.state.books.length ? (
          <div id="carouselDiv">
          <Carousel id='bookCarousel'>
            {this.state.books.map(el => 
            // per TA Justin: don't try moving <Carousel.Item> to its own component, because it won't work
              <Carousel.Item key={el._id} className='displayBook'>
                <img src="https://place-hold.it/200x200/888" alt="book" />
                <Carousel.Caption><h2>{el.title}</h2>{el.description}</Carousel.Caption>
                <Button id={el._id} onClick={this.deleteBook}>Remove from library</Button>
              </Carousel.Item>
            )}
          </Carousel>
          </div>

        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
