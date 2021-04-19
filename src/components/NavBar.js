import React, {Component} from "react";
import {Button} from "@material-ui/core";
import {AddTodoModal} from "./AddTodoModal";
import {ButtonToolbar} from "react-bootstrap";

export class NavBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showAddModal: false
        }
    }

    render() {
        let addTodoModal = () => this.setState({showAddModal: false});
        return(
        <nav className="navbar navbar-dark bg-dark">
            <div class="container-fluid">
                <p class="navbar-brand">MyKanban</p>
                <ButtonToolbar>
                    <Button variant='primary'
                            onClick={() => this.setState({showAddModal: true})}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                        </svg>
                    </Button>

                    <AddTodoModal show={this.state.showAddModal} onHide={addTodoModal}/>
                </ButtonToolbar>
            </div>
        </nav>
    )
    }


}

export default NavBar;




