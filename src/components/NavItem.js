import React from "react";
import { Link } from "react-router-dom";

class NavItem extends React.Component {

    render() {
        return (
            <li className="nav-item">
                <Link to={this.props.link} className={"nav-link " + (this.props.isActive ? 'active' : '')} onClick={this.props.onClick} data-order={this.props.order}>
                    <i className="nav-icon"></i>
                    <p>
                        {this.props.text}
                    </p>
                </Link>
            </li>
        );
    }
}

export default NavItem;