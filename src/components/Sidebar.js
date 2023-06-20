import React from "react";
import NavItem from "./NavItem";
import Constants from '../Constants';
import ActivatedNavItemContext from "../contexts/ActivatedNavItemContext";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
    static contextType = ActivatedNavItemContext;

    handleOnNavItemClick = (e) => {
        let order = e.currentTarget.attributes.getNamedItem('data-order').value;
        this.context.setActivatedItem(order);
    }

    handleOnLogoClick = () => {
        this.context.setActivatedItem(0);
    }

    render() {
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link to="/" className="brand-link" style={{ height: '77px' }} onClick={this.handleOnLogoClick}>
                    <div style={{ display: 'inline' }}>
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
                            style={{ opacity: '0.8', marginTop: '11px' }} />
                    </div>
                    <div style={{ float: 'right' }}>
                        <span className="brand-text font-weight-light">Fresher <br />management system</span>
                    </div>
                </Link>

                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">Alexander Pierce</a>
                        </div>
                    </div>

                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar"
                                type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {
                                Constants.Routes.map((route, index) => {
                                    return (
                                        <NavItem
                                            text={route.text}
                                            link={route.link}
                                            isActive={index == this.props.activatedItem}
                                            onClick={this.handleOnNavItemClick}
                                            order={index} />
                                    )
                                })
                            }
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}

export default Sidebar;
