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
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal:false,
      books:[]
    }
  }

  handleAddButtonClick = (e) => {
    e.preventDefault();
    this.setState({showModal:true});
  }

  closeModal = () => {
    this.setState({showModal:false});
  }

  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks update={this.state.update} books={this.state.books} />}
            >
            </Route>
            <Route 
              exact path="/about"
              element={<About />}
            >
            </Route>
          </Routes>
          <Button id="addButton" onClick={this.handleAddButtonClick}>Add a book to the library!</Button>
          <BookFormModal showModal={this.state.showModal} closeModal={this.closeModal} />
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
