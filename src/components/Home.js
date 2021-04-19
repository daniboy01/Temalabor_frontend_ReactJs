import React, {Component} from "react";
import Column from "./Column";
import NavBar from "./NavBar";



export class Home extends Component{

    render(){
        return(
            <div>
                <NavBar/>
                <Column/>
            </div>
        )
    }
}

export default Home;
