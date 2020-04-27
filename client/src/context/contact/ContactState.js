import React, {
    useReducer
} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT
} from '../types';


const ContactState = props => {
    const initialState = {
        contacts: []
    };
    const [state, dispatch] = useReducer(contactReducer, initialState);

    const addContact = contact => {
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        })
    };

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            addContact
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;