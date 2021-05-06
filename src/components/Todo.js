import React, {Component} from "react";
import {Button} from "@material-ui/core";
import {ButtonToolbar} from "react-bootstrap";
import {EditTodoModal} from "./EditTodoModal";


export class Todo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddModal: false,
            showEditModal: false
        }
    }


    deleteTodo(todoId) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'tasks/' + todoId, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    doneTodo(todoId) {
        fetch(process.env.REACT_APP_API + 'tasks/' + todoId, {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    render() {
        const {todoId, todoTitle, todoDesc, todoState} = this.state;
        let editTodoModal = () => this.setState({showEditModal: false});
        return (

            <div>
                {this.props.todos.map(t =>
                    <div className="card">
                        <div className="card-body">
                            <h4>{t.title}</h4>
                            <p>{t.description}</p>
                            <p><h5>Létrehozva ekkor: </h5>{t.createdAt}</p>
                            <ButtonToolbar>

                                <div className="buttons">
                                    <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                showEditModal: true,
                                                todoId: t.id,
                                                todoTitle: t.title,
                                                todoDesc: t.description,
                                                todoState: t.state
                                            })}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-pen-fill"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                        </svg>
                                    </Button>
                                    <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteTodo(t.id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-trash-fill"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </Button>

                                    <Button onClick={() => this.doneTodo(t.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-check-circle-fill"
                                             viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                    </Button>
                                </div>

                                <EditTodoModal show={this.state.showEditModal}
                                               onHide={editTodoModal}
                                               todoId={todoId}
                                               todoTitle={todoTitle}
                                               todoDesc={todoDesc}
                                               todoState={todoState}
                                />

                            </ButtonToolbar>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Todo;
