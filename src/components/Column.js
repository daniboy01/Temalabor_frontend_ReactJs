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
        this.getData().then( data => this.setState({columns:data}))

    }
    async getData(){
        let res = await fetch(process.env.REACT_APP_API + 'columns');

        if(res.ok){
            let json = await res.json();
            return json;
        }

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
