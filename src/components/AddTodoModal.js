import React, {Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddTodoModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state = {
            date: this.props.date
        }
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'tasks',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Title:event.target.TodoTitle.value,
                Description:event.target.TodoDescription.value,
                DeadLine: this.state.date
            })
        })
        window.location.reload(false)
    }

    render(){
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="TodoTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" name="TodoTitle" required
                                                      placeholder="Title"/>
                                    </Form.Group>

                                    <Form.Group controlId="TodoDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="TodoDescription" required
                                                      placeholder="Description"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                            Add todo
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}
