import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContacts from './CreateContacts'
import './index.css'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
	
	state = {
		contacts: []
	}
	
	componentDidMount() {
		ContactsAPI.getAll().then( (contacts) => {
			this.setState({ contacts: contacts })
		} )
	}
	
	
	//change state by passing in a function. Here UI is a function of the state
	removeContact = (contact) => {
		
		// Update contacts state of page
		this.setState((prevState) => ({
			// new state.contacts will have only contacts whose id is not equal to the currently clicked contact's id
			contacts: prevState.contacts.filter((stateContact) => stateContact.id !== contact.id)
		}))
		
		// Update existing contacts in db
		ContactsAPI.remove(contact);
	}
	
	createContacts(contact) {
		ContactsAPI.create(contact).then(contact => {
			this.setState( state => ({
				contacts: state.contacts.concat([contact])
			}))
		})
	}
	
	render(){
		return(
			<div className='app'>
				<Route exact path='/' render={() => (
					<ListContacts 
						onDeleteContact={this.removeContact} 
						contacts={this.state.contacts}
					/>
				)}/>
				<Route path='/create' render={({history}) => (
					<CreateContacts 
						onCreateContact ={(contact)=>{
							this.createContacts(contact)
							history.push('/')
					}}/>
				)}/>
			</div>
		) 
	}
}

export default App