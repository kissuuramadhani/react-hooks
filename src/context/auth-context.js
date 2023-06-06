import React, { useState } from "react";

export const AuthContext = React.createContext({
    isAuth: false,
    login: () => {}
});

const AuthContextProvider = props => {
    // Managing Login State of the Application
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginHandler = () => { 
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider
            value={{ login: loginHandler, isAuth: isAuthenticated }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;