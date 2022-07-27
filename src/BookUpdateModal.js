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
    this.server = process.env.REACT_APP_SERVER
    this.books = this.props.books;
    this.thisBookID = this.props.thisBookID;
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

    defaultValues = (id) => {
        let thisBook = this.books.filter(el => el._id === id);
        this.setState({title:thisBook.title,description:thisBook.description,status:thisBook.status});
    }

    handleSubmit = (event) => {
        // needs to be fat arrow function so state will work????
        event.preventDefault();
        this.props.closeModal();

        let newBook = {
        title: this.state.title,
        description: this.state.description,
        status: this.state.status
        }

        axios.put(`${this.server}/books/${this.props.thisBook}`, newBook)
          .then(response => {
            console.log('post response.data',response.data);
        });
    }

    closeModal = () => {
        console.log('modal has closed')
        this.setState({showModal:false});
      }

    render() {
        console.log('UpdateModal render this.state.showUpdateModal',this.state.showModal);
        return (
            <Modal show={this.state.showModal} onHide={this.closeModal}>
                <Modal.Header closeButton></Modal.Header>
                <Form>
                <Form.Group>
                  <Form.Label>Update a book</Form.Label>
                  <Form.Control type="text" name="title" defaultValue={this.state.title} onChange={this.handleTitleChange.bind(this)} />
                  <Form.Control type="text" name="description" defaultValue={this.state.description} onChange={this.handleDescChange.bind(this)} />
                  <Form.Select name="status" onChange={this.handleStatusChange.bind(this)} >      
                    <option value="true">true</option>
                    <option value="false">false</option>
                    </Form.Select>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>Update</Button>
                </Form.Group>
              </Form>
            </Modal>
        )}
}

export default BookUpdateModal;
