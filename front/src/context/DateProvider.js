import moment from "moment";
import { string } from "prop-types";
import React, { createContext, useState } from "react";

const defaultDate = {
    date: ''
};

export const DateContext = createContext();

const DateProvider = ({children}) => {
    const [currentDate, setDate] = useState(defaultDate);


    return (<DateContext.Provider value={{currentDate, setDate}}>{children}</DateContext.Provider>);
}

export default DateProvider;
