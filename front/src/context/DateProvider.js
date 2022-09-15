import React, { useState } from "react";

const defaultDate = {
    date: ''
};

export const DateContext = React.createContext();

const DateProvider = ({children}) => {
    const [currentDate, setDate] = useState(defaultDate);

    return <DateContext.Provider value={[currentDate, setDate]}>{children}</DateContext.Provider>;
}

export default DateProvider;
