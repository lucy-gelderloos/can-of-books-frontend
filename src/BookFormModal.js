import React from 'react';
import axios from 'axios';
import './App.css'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class BookFormModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title:'',
        description:'',
        status:true
      };
    this.server = process.env.REACT_APP_SERVER
    this.showModal = this.props.showModal;
    this.closeModal = this.props.closeModal;
    this.books = this.props.books;
    }

    handleTitleChange(e, testParam){
        this.setState({title: e.target.value });
        testParam = 'I am a test parameter';
        console.log('handleTitleChange testParam',testParam);
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
            <Modal show={this.props.showModal} onHide={this.props.closeModal}>
                <Modal.Header closeButton>Add a book</Modal.Header>
                <Form>
                <Form.Group>
                  <Form.Label>Add a new book</Form.Label>
                  <Form.Control type="text" name="title" placeholder="Title" onChange={this.handleTitleChange.bind(this)} />
                  <Form.Control type="text" name="description" placeholder="Description" onChange={this.handleDescChange.bind(this)} />
                  <Form.Select name="status" onChange={this.handleStatusChange.bind(this)} >      
                    <option value="true">true</option>
                    <option value="false">false</option>
                    </Form.Select>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>Add</Button>
                </Form.Group>
              </Form>
            </Modal>
        )}
}

export default BookFormModal;
