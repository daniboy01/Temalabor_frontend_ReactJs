import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Dropdown} from 'react-bootstrap';

export class EditTodoModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedState: this.props.state
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'tasks',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id: this.props.todoId,
                title:event.target.TodoTitle.value,
                description:event.target.TodoDescription.value,
                state: this.state.selectedState
            })
        })
        window.location.reload(false)
    }


    render(){
        const defState = this.props.state;
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
                            Edit todo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="TodoTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" name="TodoTitle" required
                                                      placeholder="Title"
                                                      defaultValue={this.props.todoTitle}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="TodoDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="TodoDescription" required
                                                      placeholder="Description"
                                                      defaultValue = {this.props.todoDesc}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="TodoState">
                                        <Form.Label>State</Form.Label>

                                        <div>
                                            <select
                                                value={this.state.selectedState}
                                                onChange={(e) => this.setState({selectedState: e.target.value})}>
                                            >
                                                <option value="FÜGGŐBEN">FÜGGŐBEN</option>
                                                <option value="ELHALASZTVA">ELHALASZTVA</option>
                                                <option value="FOLYAMATBAN">FOLYAMATBAN</option>
                                            </select>
                                        </div>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                                            Update todo
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
