import React, {Component} from "react";
import Todo from "./Todo";


export class Column extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            showAddModal: false
        }
    }

    refrectList() {
        fetch(process.env.REACT_APP_API + 'columns')
            .then(response => response.json())
            .then(data => {
                this.setState({columns: data})
            })
        console.log(this.state);
    }

    componentDidMount() {
        this.refrectList();
    }

    componentDidUpdate() {
        this.refrectList();
    }

    render() {
        const {columns} = this.state;
        return (
            <div className="home">
                <div className="row">
                    {columns.map(col =>
                        <div className="col" align="center">
                            <h2>{col.state}</h2>
                            <Todo todos={col.tasks}/>
                        </div>
                    )}
                </div>
            </div>

        )
    }
}

export default Column;
