import React, { useState } from 'react';

const PersonForm = (props) => {
  const { persons, submit } = props;
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');



  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  }



  return (
  <form onSubmit={e => submit(e, newName, newPhone)}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      number: <input value={newPhone} onChange={handlePhoneChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm;