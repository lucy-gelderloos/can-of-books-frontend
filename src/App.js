import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import BookFormModal from './BookFormModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import axios from 'axios';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal:false,
      books:[]
    }
  }

  handleAddButtonClick = (e) => {
    e.preventDefault();
    this.setState({showAddModal:true});
  }

  closeModal = () => {
    this.setState({showAddModal:false});
  }


  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks books={this.state.books} />}
            >
            </Route>
            <Route 
              exact path="/about"
              element={<About />}
            >
            </Route>
          </Routes>
          <Button id="addButton" onClick={this.handleAddButtonClick}>Add a book to the library!</Button>
          <BookFormModal showModal={this.state.showAddModal} closeModal={this.closeModal} />
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
