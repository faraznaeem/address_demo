const storage = window.localStorage

const renderContacts = () => {
  // Read all the contacts from the storage
  const contacts = JSON.parse(storage.getItem('contacts'))

  let div = document.querySelector('.contact-list')

  if (contacts) {
    div.innerHTML = ''
    // render the contacts
    const ul = document.createElement('ul')

    contacts.forEach(contact => {
      let li = document.createElement('li')

      li.innerHTML = `
        <span>${contact.name}</span> |
        <span>${contact.email}</span> |
        <span>${contact.phone}</span>
      `
      ul.appendChild(li)
    })

    div.appendChild(ul)
  } else {
    div.innerHTML = '<p>You have no contacts in your address book</p>'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderContacts()
  const contactForm = document.querySelector('.new-contact-form')

  contactForm.addEventListener('submit', event => {
    event.preventDefault()

    // 1. Read all the input fields and get their values
    const { name, email, phone, company, notes, twitter } = contactForm.elements

    const contact = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      company: company.value,
      notes: notes.value,
      twitter: twitter.value,
    }

    console.log(contact)

    let contacts = JSON.parse(storage.getItem('contacts')) || []

    contacts.push(contact)

    // 2. Save them to our storage
    storage.setItem('contacts', JSON.stringify(contacts))
    renderContacts()
    contactForm.reset()
  })
})
