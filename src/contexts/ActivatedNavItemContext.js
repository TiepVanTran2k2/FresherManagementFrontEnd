import React from "react";

const ActivatedNavItemContext = React.createContext({
    activatedItem: 0,
    setActivatedItem: item => {
    }
});

export default ActivatedNavItemContext;