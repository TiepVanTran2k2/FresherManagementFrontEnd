import React from "react";
import { Link } from "react-router-dom";
import ActivatedNavItemContext from "../../contexts/ActivatedNavItemContext";
import './card.css';

class Card extends React.Component {
    static contextType = ActivatedNavItemContext;

    handleCardItemClick = (e) => {
        let order = e.currentTarget.attributes.getNamedItem('data-order').value;
        this.context.setActivatedItem(order);
    }

    render() {
        return (
            <div className="col-lg-3 col-6">
                <Link to={this.props.linkTo} style={{ textDecoration: "none" }} data-order={this.props.order} onClick={this.handleCardItemClick}>
                    <div class="mini-stats-wid card">
                        <div class="card-body">
                            <div class="d-flex">
                                <div class="flex-grow-1">
                                    <p class="text-muted fw-medium">{this.props.shortText}</p>
                                    <h4 class="mb-0">{this.props.text}</h4>
                                </div>
                                <div class="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                    <span class="avatar-title">
                                        <i class="fa-solid fa-clipboard-list font-size-24" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Card;