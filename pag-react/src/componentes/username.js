
import React, { createContext, useContext, useState } from 'react';

const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
    const [username, setUsername] = useState('');

    const setAndSaveUsername = (newUsername) => {
        setUsername(newUsername);
    };

    return (
        <UsernameContext.Provider value={{ username, setAndSaveUsername }}>
            {children}
        </UsernameContext.Provider>
    );
};

export const useUsername = () => {
    const context = useContext(UsernameContext);
    if (!context) {
        throw new Error('useUsername debe ser utilizado dentro de un UsernameProvider');
    }
    return context;
};
