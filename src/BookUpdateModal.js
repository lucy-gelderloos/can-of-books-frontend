import React from 'react';
import axios from 'axios';
import './App.css'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class BookUpdateModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title:'',
        description:'',
        status:false,
        showModal:this.props.showModal
      };
    this.server = process.env.REACT_APP_SERVER;
    this.selectedBook = this.props.selectedBook;
    // this.books = this.props.books;
    // this.thisBookID = this.props.thisBookID;
    }

    handleTitleChange(e){
        this.setState({title: e.target.value });
        console.log('handleTitleChange this.state',this.state)
    }

    handleDescChange(e){
        this.setState({description: e.target.value});
    }

    handleStatusChange(e){
        this.setState({status: e.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.closeModal();
        let title;
        let description;

        if(this.state.title){
            title = this.state.title;
        }
        else{
            title = this.props.selectedBook[0].title;
        }

        if(this.state.description){
            description = this.state.description;
        }
        else{
            description = this.props.selectedBook[0].description;
        }

        let newBook = {
        title: title,
        description: description
        }

        axios.put(`${this.server}/books/${this.props.selectedBook[0]._id}`, newBook)
          .then(response => {
            console.log('post response.data',response.data);
        });

        // this.props.getBooks();
    }

    closeModal = () => {
        console.log('modal has closed')
        this.setState({showModal:false});
      }

    render() {
        // console.log('UpdateModal render this.props.selectedBook[0]',this.props.selectedBook[0]._id);
        return (
            <div>
            {this.selectedBook.length ? (
            <Modal show={this.state.showModal} onHide={this.closeModal}>
                <Modal.Header closeButton></Modal.Header>
                <Form>
                <Form.Group>
                  <Form.Label>Update a book</Form.Label>
                  <Form.Control type="text" name="title" defaultValue={this.props.selectedBook[0].title} onChange={this.handleTitleChange.bind(this)} />
                  <Form.Control type="text" name="description" defaultValue={this.props.selectedBook[0].description} onChange={this.handleDescChange.bind(this)} />
                  <Form.Select name="status" onChange={this.handleStatusChange.bind(this)} >      
                    <option value="true">true</option>
                    <option value="false">false</option>
                    </Form.Select>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>Update</Button>
                </Form.Group>
              </Form>
            </Modal>) : ''
            }
            </div>
        )}
}

export default BookUpdateModal;
