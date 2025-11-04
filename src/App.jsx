
import { use, useState } from 'react';
import './App.css'

const userPromise = fetch("http://localhost:3000/users/").then(res => res.json());

function App() {

  const intialUsers = use(userPromise)
  const [users, setUsers] = useState(intialUsers);

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };

    // Send to API or Server site data
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers)
                  alert("Successfull Add the User in MongoDB");
                  e.target.reset;
                }
    })

 }

  return (
    <>
      <div>
        <h1>Simple Crud</h1>
        <form onSubmit={handleAddUser}>
          <input type="text" name="name" placeholder="User Name" /> <br />
          <input type="email" name="email" placeholder="User Email" /> <br />
          <input type="submit" value="Add User" placeholder="User Name" />{" "}
          <br />
        </form>
        {
          users.map(user => <p key={user._id}>Name: {user.name} <br /> Email: { user.email}</p>)
        }
      </div>
    </>
  );
}

export default App
