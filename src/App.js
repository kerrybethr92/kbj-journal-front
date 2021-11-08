import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

import Header from './components/Header'
// import NavBar from './components/NavBar'
// import UserProfile from './components/UserProfile'
import NewEntry from './components/NewEntry'
import EditEntry from './components/EditEntry'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'

const App = () => {
    ////////////////////////
    //// entries states ////
    ////////////////////////
    const [newDate, setNewDate] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newLog, setNewLog] = useState('')
    const [newShare, setNewShare] = useState(false)
    const [entries, setEntries] = useState([])

    //////////////////////
    //// users states ////
    //////////////////////
    const [newName, setNewName] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newBio, setNewBio] = useState('')
    const [newProfilePic, setNewProfilePic] = useState('')

    const [users, setUsers] = useState([])
    // const [currentUser, setCurrentUser] = useState(undefined)

    ///////////////////////
    //// log in states ////
    ///////////////////////
    const [toggleError, setToggleError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [toggleLogin, setToggleLogin] = useState(true)


    const [toggleLogout, setToggleLogout] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    const handleLogout = () => {
    setCurrentUser({})
    handleToggleLogout()
  }
  const handleToggleForm = () => {
   setToggleError(false)
   if(toggleLogin === true) {
     setToggleLogin(false)
   } else {
     setToggleLogin(true)
   }
 }

 const handleToggleLogout = () => {
   if(toggleLogout) {
     setToggleLogout(false)
   } else {
     setToggleLogout(true)
   }
 }
 const handleLogin = (userObj) => {
      console.log(userObj);
    axios.put('https://journal-back-kbj.herokuapp.com/users/login', userObj).then((response) => {
      if(response.data.username){
        console.log(response);
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
      } else {
        console.log(response);
        setToggleError(true)
        setErrorMessage(response.data)
      }
    })
  }

  const handleCreateUser = (userObj) => {
    axios.post('https://journal-back-kbj.herokuapp.com/users/createaccount', userObj).then((response) => {
      if(response.data.username){
        console.log(response);
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
      } else {
        setErrorMessage(response.data)
        setToggleError(true)
      }
    })
  }

    useEffect(() => {
        axios
            .get('https://journal-back-kbj.herokuapp.com/entries')
            .then((response) => {
                setEntries(response.data)
            })
    },[])


    const showNewSecretForm = () => {
        let newSecret = document.getElementById('new-secret');
        if (newSecret.style.display === "none") {
            newSecret.style.display = "block"
        } else {
            newSecret.style.display = "none";
        }
    }

    const handleNewEntrySubmit = (event) => {
        event.preventDefault();
        axios.post(
            'https://journal-back-kbj.herokuapp.com/entries',
            {
                date:newDate,
                title:newTitle,
                log:newLog,
                share:newShare
            }
        ).then(() => {
            axios
                .get('https://journal-back-kbj.herokuapp.com/entries')
                .then((response) => {
                    setEntries(response.data)
                })
        })
        event.target.reset();
    }
    const handleShowEditForm = (event) => {
        let editForm = event.target.parentNode.querySelector('form');
        if (editForm.style.display === "none") {
            editForm.style.display = 'block'
        } else {
            editForm.style.display = 'none'
        }
    }
    const handleEditEntrySubmit = (event, entryData) => {
        event.preventDefault();
        axios
            .put(
                `https://journal-back-kbj.herokuapp.com/entries/${entryData._id}`,
                {
                    date:newDate || entryData.date,
                    title:newTitle || entryData.title,
                    log:newLog || entryData.log,
                    share:entryData.share
                }
            )
            .then(()=> {
                axios
                    .get(`https://journal-back-kbj.herokuapp.com/entries/`)
                        .then((response) => {
                            setEntries(response.data)
                        })
            })
            event.target.reset();
            handleShowEditForm(event);
    }
    const handleDelete = (entryData) => {
        axios
            .delete(`https://journal-back-kbj.herokuapp.com/entries/${entryData._id}`)
            .then(()=>{
                axios
                    .get(`https://journal-back-kbj.herokuapp.com/entries`)
                    .then((response) => {
                        setEntries(response.data)
                    })
            })
    }

    //////////////////////////////
    //// entry change handlers////
    //////////////////////////////
    const handleNewDateChange = (event) => {
        setNewDate(event.target.value);
    }
    const handleNewTitleChange = (event) => {
        setNewTitle(event.target.value);
    }
    const handleNewLogChange = (event) => {
        setNewLog(event.target.value)
    }
    const handleNewShareChange = (event) => {
        setNewShare(event.target.checked)
    }
    //////////////////////////////
    //// user change handlers ////
    //////////////////////////////
    const handleNewNameChange = (event) => {
        setNewName(event.target.value);
    }
    const handleNewUsernameChange = (event) => {
        setNewUsername(event.target.value);
    }
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    }
    const handleNewBioChange = (event) => {
        setNewBio(event.target.value);
    }
    const handleNewProfilePicChange = (event) => {
        setNewProfilePic(event.target.value);
    }
    // const showJournalEntry = (event) => {
    //     let journalEntry = document.getElementById('journal-entry');
    //     if (journalEntry.style.display === "none") {
    //         journalEntry.style.display = "block"
    //     } else {
    //         journalEntry.style.display = "none";
    //     }
    // }

    const showSignUp = () => {
        let signUp = document.getElementById('sign-up');
        if (signUp.style.display === "none") {
            signUp.style.display = "block"
        } else {
            signUp.style.display = "none";
        }
    }
    const handleNewSignUp = (event) => {
        event.preventDefault()
        axios.post(
            'https://journal-back-kbj.herokuapp.com/users/createaccount',
            {
                name:newName,
                username:newUsername,
                password:newPassword,
                bio:newBio,
                profilePic:newProfilePic || 'https://i.pinimg.com/originals/c8/fc/b7/c8fcb7cb0df7ffd3879479cd56209954.jpg'
            }
        ).then((response) => {
            setCurrentUser(response.data)
        })
        event.target.reset()
        showSignUp(event)
    }

    const showLogIn = () => {
        let logInForm = document.getElementById('log-in');
        if (logInForm.style.display === "none") {
            logInForm.style.display = "block"
        } else {
            logInForm.style.display = "none";
        }
    }
    const handleNewLogIn = (userObj) => {
        console.log(userObj); // for shits and giggles
        axios.put('https://journal-back-kbj.herokuapp.com/users/login', userObj).then((response) => {
            if (response.data.username) {
                console.log(response);
                setToggleError(false)
                setErrorMessage('')
                setCurrentUser(response.data)

            } else {
                console.log(response);
                setToggleError(true)
                setErrorMessage(response.data)
            }
        })
    }

    return (
        <>
        <Header/>
        <nav>
        <div className="App">
              <div>
                {toggleLogout ?
                  <button onClick={handleLogout} class='logoutBtn'>Logout</button> :
                  <div class='appFormDiv'>
                    {toggleLogin ?
                    <LogIn handleLogin={handleLogin} toggleError={toggleError} errorMessage={errorMessage}/>
                    :
                    <SignUp handleCreateUser={handleCreateUser} toggleError={toggleError} errorMessage={errorMessage}/>
                    }
                    <button onClick={handleToggleForm} class='accountBtn'>{toggleLogin ? 'Need an account?' : 'Already have an account?'}</button>
                  </div>
                }


              </div>
              {currentUser.username ?
                <div class='loggedInDiv'>
                  <h1>This entire div will only show if a user is currently logged in</h1>
                  <h2>So you could show profile info, or whatever else you want to be authentication protected!</h2>
                  <h3>And you could even stick other React components in here!</h3>
                </div>
                :
                null
              }
            </div>
            
        </nav>
        <main>
            <h2>Journal Entries</h2>
            <ul>
            {
                entries.map((entry) => {
                    return <li key={entry._id}>
                    {entry.date}<br/>
                    {entry.title}<br/>
                    <p id={entry._id}>{entry.log}</p><br/>
                    <button onClick={(event)=>{handleShowEditForm(event)}}>Edit</button>
                    <EditEntry
                        handleNewDateChange={handleNewDateChange}
                        handleNewTitleChange={handleNewTitleChange}
                        handleNewLogChange={handleNewLogChange}
                        handleNewShareChange={handleNewShareChange}
                        handleEditEntrySubmit={handleEditEntrySubmit}
                        entry={entry}
                    />
                    <button onClick={(event) => {handleDelete(entry)}}>Delete</button>
                    </li>
                })
            }
            </ul>
            <h2>Write a new journal entry:</h2>

        </main>
    </>)
}


export default App;


///// ~~~~~ graveyard ~~~~~~ ////
// <section>
//
// </section>
// <section>
//     {
//         users.map((user) => {
//             return (<div>
//                     <h3>user.username</h3>
//                     <img src={user.photo} alt="profile photo of user"/>
//                     <button>View Profile</button>
//                 </div>
//             )
//         })
//     }
// </section>

// // nav bar to include: link to homepage, log in, sign up, create new entry
// // divs in sections will be user's card with name and photo
// // footer will stay at bottom of page and have links to our githubs, etc
//
// const showLogIn = () => {
//     let logIn = document.getElementById('log-in');
//     if (logIn.style.display === "none") {
//         logIn.style.display = "block"
//     } else {
//         logIn.style.display = "none"
//     }
// }
//
// const showSignUp = () => {
//     let signUp = document.getElementById('sign-up');
//     if (signUp.style.display === "none") {
//         signUp.style.display = "block"
//     } else {
//         signUp.style.display = "none";
//     }
//
// }
//
// const showNewEntryBox = () => {
//     let entryForm = document.getElementById('new-entry');
//     if (entryForm.style.display === "none") {
//         entryForm.style.display = "block"
//     } else {
//         entryForm.style.display = "none";
//     }
// }
