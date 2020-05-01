import React, {
    useReducer
} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
    ADD_CONTACT,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    UPDATE_CONTACT,
    CONTACT_ERROR,
    FILTER_CONTACTS
} from '../types';


const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');

            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response
            })            
        }
    }


    const addContact = async contact => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/contacts', contact, config);

            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response
            });
        };
    };

    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`)
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response
            });
        };
    };

    const clearContacts = () => {
        dispatch({
            type: CLEAR_CONTACTS,
        })
    }

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

    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        try {
           const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            });
       } catch (error) {
           dispatch({
               type: CONTACT_ERROR,
               payload: error.response
           });
       };
    };

    const filterContacts = (text) => {
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
                error: state.error,
                filtered: state.filtered,
                addContact,
                getContacts,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearContacts,
                clearFilter
            }
        }> {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;