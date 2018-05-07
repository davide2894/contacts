import React, { Component } from 'react'
import ListContacts from './ListContacts'
import CreateContacts from './CreateContacts'
import './index.css'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
	
	state = {
		screen: 'list', // list or create
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
	
	render(){
		return(
			<div>
				{this.state.screen === 'list' && (
					<ListContacts 
						onDeleteContact={this.removeContact} 
						contacts={this.state.contacts}
					/>
				)}
				{this.state.screen === 'create' && (
					<CreateContacts />
				)}
			</div>
			
		) 
	}
}

export default App