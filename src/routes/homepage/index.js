import React from "react";
import Constants from "../../Constants";
import Card from "../../components/card";

class HomePage extends React.Component {
    render() {
        return (
            <div className="row">
                {
                    Constants.Routes.map((route, index) => {
                        if (index === 0)
                            return null;
                        return (
                            <Card text={route.text} shortText={route.shortText} linkTo={route.link} order={index} />
                        )
                    })
                }
            </div>
        )
    }
}

export default HomePage;