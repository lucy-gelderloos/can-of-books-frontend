import React from 'react';
import axios from 'axios';
import './App.css'

import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

import BookUpdateModal from './BookUpdateModal';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error:'',
      showUpdateModal:false,
      thisBookID:''
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
    const remainingBooks = this.state.books.filter(book => book._id !== e.target.id);
    this.setState({books:remainingBooks});
  })
  .catch(err => {
      console.log('error in deleteBook',err);
      this.setState({error:`Error! (${err.code}: ${err.message})`});
  })
}

// updateBook = (id,title,description,status) => {
//   this.closeModal();

//   let newBook = {
//   title: this.state.title,
//   description: this.state.description,
//   status: this.state.status
//   }

//   axios.post(`${this.server}/books`, newBook)
//     .then(response => {
//       console.log('post response.data',response.data);
//   });
// }

handleUpdateButtonClick = (e) => {
  e.preventDefault();
  // show the modal
  this.setState({showUpdateModal:true,thisBookID:e.target.id});
  console.log('handleUpdateButtonClick this.state.showUpdateModal',this.state.showUpdateModal);
  // send the id of the clicked item down to BookUpdateModal
}


// so the handle update function should filter this.state.books on the provided ID, then pull up the form with the default values set to the title, description, & status of the targeted book, then send the updated info as a put request & separately(?) update this.state.books with the new info

// handleUpdateButtonClick = (e) => {
//   e.preventDefault();
//   let thisBookID = this.state.books.filter(el => el._id === e.target.id);
//   console.log('thisBookID',thisBookID);
// }

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
                <Button id={el._id} onClick={this.handleUpdateButtonClick}>Update book details</Button>
                <Button id={el._id} onClick={this.deleteBook}>Remove book from library</Button>
                <img src="https://place-hold.it/200x200/888" alt="book" />
                <Carousel.Caption><h2>{el.title}</h2>{el.description}</Carousel.Caption>
              </Carousel.Item>
            )}
          </Carousel>
          <BookUpdateModal showModal={this.state.showUpdateModal} books={this.state.books} thisBookID={this.state.thisBookID}/>
          </div>

        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
