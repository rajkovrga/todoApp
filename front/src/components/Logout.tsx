import {Component, MouseEvent } from "react";
import { Link } from "react-router-dom";

class Logout extends Component {

    handleClick(event: MouseEvent) {
        event.preventDefault();
      }

    render(){
        return (
            <Link onClick={this.handleClick} to="#">Logout</Link>
        );

    }
}

export default Logout;