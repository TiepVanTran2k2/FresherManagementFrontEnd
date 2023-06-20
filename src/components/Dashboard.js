import React from "react";

import Constants from '../Constants'
import Card from "./Card";

class NavigationContent extends React.Component {
    render() {
        return (
            <>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                        <i className="fas fa-download fa-sm text-white-50"></i>
                        Generate Report
                    </a>
                </div>

                <div className="row">
                    {
                        Constants.Routes.map((item, index) => {
                            if (index === 0)
                                return null;
                            return (
                                <Card head={item.text} title={item.text} iconLabelClassesName={item.iconClassesName} linkTo={item.link} order={index} />
                            );
                        })
                    }
                </div>
            </>
        )
    }
}

export default NavigationContent;