import React, {useState} from 'react'

const LogIn = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const triggerLogin = (event) => {
        event.preventDefault()
        let userObj = {
            username: username,
            password: password
        }
        props.handleNewLogIn(userObj)
    }
    return (
        <>
            <form id="log-in" onSubmit={triggerLogin}>
                <label for="username">User name:</label>
                <input type="text" placeholder="username" required onChange={(event)=>{setUsername(event.target.value)}}/><br/>

                <label for="password"> Password:</label>
                <input type="password" name="password" required onChange={(event)=> {setPassword(event.target.value)}}/><br/>

                <input type="submit" value="Login"/>
            </form>
        </>
    )
}

export default LogIn;
