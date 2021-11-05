import React from 'react'

const SignUp = (props) => {
    return (
        <>
            <form id="sign-up" onSubmit={props.handleNewSignUp}>
                <label for="name">Name:</label>
                <input type="text" name="name" onChange={props.handleNewNameChange}/><br/>

                <label for="username">User name:</label>
                <input type="text" name="username" required onChange={props.handleNewUsernameChange}/><br/>

                <label for="password"> Password:</label>
                <input type="password" name="password" required onChange={props.handleNewPasswordChange}/><br/>

                <label for="bio">Bio:</label>
                <textarea name="bio" onChange={props.handleNewBioChange}/><br/>

                <label for="profilePic">Profile Picture:</label>
                <input type="text" name="profilePic" onChange={props.handleNewProfilePicChange}/><br/>

                <input type="submit" value="Sign Up"/>
            </form>
        </>
    )
}

export default SignUp;
