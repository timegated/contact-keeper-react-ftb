import React, { useContext, useEffect, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, getContacts } = contactContext;
    
    
    useEffect(() => {
        getContacts();

        // eslint-disable-next-line
    }, []);
    
    
    if (contacts !== null && contacts.length === 0) {
        return <h4>Please add a contact</h4>
    };
   
    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null ?
                    filtered.map(contact => (
                        <CSSTransition key={contact._id} timeout={1000} className="item">
                            <ContactItem contact={contact} />
                        </CSSTransition>
                ))
                : 
                    contacts.map(contact => (
                        <CSSTransition key={contact._id} timeout={1000} className="item">
                            <ContactItem contact={contact} />
                        </CSSTransition>
                
            ))}
            </TransitionGroup>
            
        </Fragment>
    );
};

export default Contacts;
