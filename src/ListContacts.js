import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
	
	static propTypes = {
		contacts: PropTypes.array.isRequired,
		onDeleteContact: PropTypes.func.isRequired
	}	
	
	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState( { query: query.trim() } )
	}
	
	resetQuery = () => {
		this.setState({ query: '' })
	}
	
	render() {
		
		const { contacts, onDeleteContact } = this.props
		const { query } = this.state
		
		// Contacts that match a pattern, where pattern is keys typed by user
		let showingContacts;
		
		// If user types something
		if(query){
			// Define pattern to use as match
			const match = new RegExp(escapeRegExp(query), 'i');
			
			// Show only contact whose name match chars typed by user in search
			showingContacts = contacts.filter(contact => match.test(contact.name));
		} else {
			// Otherwise just show contacts as they are
			showingContacts = contacts; 
		}
		
		// Sorty showing contacts by name
		showingContacts.sort(sortBy('name'));
		
		return (
			<div className='list-contacts'>
				<div className='list-contacts-top'>
					<input 
						className='search-contacts'
						type="text"
						placeholder='Search contacts'
						value={this.state.query}
						onChange={ (event) => this.updateQuery(event.target.value) }
					/>
					<Link
						to='/create'
						className='add-contact'
					>Navigate to Create Contacts
					</Link>
				</div>
				
				{showingContacts.length !== contacts.length && (
					<div className='showing-contacts'>
						<span>Now showing {showingContacts.length} of {contacts.length} total </span>
						<button onClick={() => this.resetQuery()}>Show all</button>
					</div>
				)}
				
				<ol className='contact-list'>
					{showingContacts.map(contact => (
						<li key={contact.id} className='contact-list-item'>
							<div className='contact-avatar' style={{
									backgroundImage: `url(${contact.avatarURL})`
								}}>
							</div>
							<div className='contact-details'>
								<p className="contact-name">{contact.name}</p>
								<p className="contact-email">{contact.email}</p>
							</div>
							<button onClick={() => onDeleteContact(contact)} className="contact-remove">Remove</button>
						</li>
					))}
				</ol>			
			</div>
			

		)
	}

}


export default ListContacts