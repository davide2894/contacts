import React, {Component} from 'react'

function ListContacts(props){
	return (
		<ol className='contact-list'>
			{props.contacts.map(contact => (
				<li key={contact.id} className='contact-list-item'>
					<div className='contact-avatar' style={{
							backgroundImage: `url(${contact.avatarURL})`
						}}>
					</div>
					<div className='contact-details'>
						<p className="contact-name">{contact.name}</p>
						<p className="contact-email">{contact.email}</p>
					</div>
					<button className="contact-remove">Remove</button>
				</li>
			))}
		</ol>
	)
}

//class ListContacts extends Component {
//	render(){
//	
//	}
//}

export default ListContacts