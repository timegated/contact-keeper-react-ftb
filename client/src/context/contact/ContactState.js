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
    UPDATE_CONTACT,
    FILTER_CONTACTS
} from '../types';


const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    const addContact = contacts => {
        dispatch({
            type: ADD_CONTACT,
            payload: contacts
        })
    };

    const deleteContact = id => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        })
    };

    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    };

    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    };

    const updateContact = () => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        });
    }

    const filterContacts = () => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        })
    }

    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    };

    return (
        <ContactContext.Provider value={
            {
                contacts: state.contacts,
                current: state.current,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }
        }> {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;