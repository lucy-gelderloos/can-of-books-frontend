import React from 'react';
import axios from 'axios';
import './App.css'

import Carousel from 'react-bootstrap/Carousel';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
    // this.server = process.env.REACT_APP_SERVER
    this.server = 'https://can-of-books-backend123.herokuapp.com'
    // this.server = 'http://localhost:3002'
  }

componentDidMount () {
 const getBooks = () => {
    const bookQuery = `${this.server}/books`;
    axios.get(bookQuery)

    .then(response => {
        this.setState({books:response.data});
        console.log('this.state.books',this.state.books)
    })
    .catch(err => {
        console.log('error in getBooks',err);
        this.setState({error:`Error! (${err.code}: ${err.message})`});
    })
}

getBooks();

}

  render() {

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <div id="carouselDiv">
          <Carousel id='bookCarousel'>
            {this.state.books.map(el => 
            // per TA Justin: don't try moving <Carousel.Item> to its own component, because it won't work
              <Carousel.Item key={this.state.books.indexOf(el)} className='displayBook'>
                <img src="https://place-hold.it/200x200/888" alt="book" />
                <Carousel.Caption><h2>{el.title}</h2>{el.description}</Carousel.Caption>
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
