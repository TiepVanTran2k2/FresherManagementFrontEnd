import React from "react";

class Footer extends React.Component {
    render() {
        return (
            <footer className="main-footer">
                <strong>Copyright &copy; {new Date().getFullYear()} </strong>
                All rights reserved.
            </footer>
        )
    }
}

export default Footer;