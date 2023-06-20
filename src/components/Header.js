import React from "react";

import { Link } from "react-router-dom";
import ActivatedNavItemContext from "../contexts/ActivatedNavItemContext";

import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { configEnv } from "../configs/config";

class Header extends React.Component {

    static contextType = ActivatedNavItemContext;

    handleOnHomeNavClick = () => {
        this.context.setActivatedItem(0);
    }

    handleLogout = () => {
        localStorage.removeItem(configEnv.TOKEN_KEY);
        window.location = "/login";
    }

    render() {
        return (
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                            <i className="fas fa-bars" />
                        </a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to="/" className="nav-link" onClick={this.handleOnHomeNavClick}>Home</Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                            <i className="fas fa-search"></i>
                        </a>
                        <div className="navbar-search-block">
                            <form className="form-inline">
                                <div className="input-group input-group-sm">
                                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                    <div className="input-group-append">
                                        <button className="btn btn-navbar" type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                        <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                            <i className="fas fa-expand-arrows-alt"></i>
                        </a>
                    </li>
                    {localStorage.getItem(configEnv.TOKEN_KEY) !== null
                        ? <Button variant="text" color="error" onClick={this.handleLogout}><LogoutIcon fontSize="small" /></Button>
                        : null
                    }
                    <li className="nav-item">

                    </li>
                </ul>
            </nav>
        )
    }
}

export default Header;