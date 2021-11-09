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
    const [currentUser, setCurrentUser] = useState(undefined)

    ///////////////////////
    //// log in states ////
    ///////////////////////
    const [toggleError, setToggleError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        axios
            .get('https://journal-back-kbj.herokuapp.com/entries')
            .then((response) => {
                setEntries(response.data)
            })
    },[])

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
        // event.stopPropagation()
        let editForm = event.target.parentNode.querySelector('form');
        if (editForm.style.display !== "block") {
            editForm.style.display = 'none'
        } else {
            editForm.style.display = 'block'
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

    const showNewSecretForm = () => {
        let secretForm = document.getElementById('newSecret');
        if (secretForm.style.display === "none") {
            secretForm.style.display = "block"
        } else {
            secretForm.style.display = "none";
        }
    }

    // oh dear, if it weren't for sam, i would not have been able to figure out an issue with having the same id causing an issue with my mapping.
    const openModalButton = (modalId) => {
        let modal = document.getElementById(modalId);
        console.log(modal);
        console.log("from open modal function");
        if (modal.style.display !== "block") {
            modal.style.display = "block"
        }
    }
    //
    const closeModalButton = (event) => {
        event.stopPropagation() // Sam helped me figure out that my second onClick function was bubbling and by adding this on my second click function, it would prevent bubbling
        console.log("hi");
        let modals = document.getElementsByClassName('modal');
        console.log(modals);
        for (let i = 0; i < modals.length; i++) {
             modals[i].style.display = "none"
        }
        // if (modal.style.display !== "none") {
        //      modal.style.display = "none"
        //      console.log(modal.style.display);
        //      console.log(modal);
        // } else {
        //      console.log(modal.style.display);
        // }
    }

    return (
          <>
          <Header/>
          <nav>
               <ul id="nav">
                    <li>Home</li>
                    {currentUser && <li>Welcome {currentUser.username}</li>}
                    <li><button onClick={showSignUp}>Sign Up</button>
                    <SignUp
                        handleNewNameChange={handleNewNameChange}
                        handleNewUsernameChange={handleNewUsernameChange}
                        handleNewPasswordChange={handleNewPasswordChange}
                        handleNewBioChange={handleNewBioChange}
                        handleNewProfilePicChange={handleNewProfilePicChange}
                        handleNewSignUp={handleNewSignUp}
                        setCurrentUser={setCurrentUser}
                    />
                    </li>
                    <li><button onClick={showLogIn}>Log in</button></li>
                    <LogIn
                        handleNewLogIn={handleNewLogIn}
                        toggleError={toggleError}
                        errorMessage={errorMessage}
                    />
               </ul>
          </nav>
          <main>
               <ul id="index">
            {
                entries.map((entry) => {
                     console.log(parseInt(entry._id.charAt(entry._id.length-1)));
                     console.log(entry.log);
                     console.log(entry.date);
                     if (parseInt(entry._id.charAt(entry._id.length-1)) % 2 === 0) {
                          return (
                          <div>
                               <div className="even" id={`openModal${entry._id}`} onClick={() => {openModalButton(`modal${entry._id}`)}} key={entry._id}>
                               </div>
                               <div className="modal" id={`modal${entry._id}`}>
                                     <div className="modal-textbox" id={`modal-textbox${entry._id}`} key={entry._id}>
                                         <button id="closeModal" onClick={closeModalButton}>close</button>
                                         <p>{entry.log}</p><br/>
                                         <p>{entry.date}</p><br/>
                                         <button onClick={(event)=>{handleShowEditForm(event)}}>edit</button>
                                         <EditEntry
                                              handleNewDateChange={handleNewDateChange}
                                              handleNewTitleChange={handleNewTitleChange}
                                              handleNewLogChange={handleNewLogChange}
                                              handleNewShareChange={handleNewShareChange}
                                              handleEditEntrySubmit={handleEditEntrySubmit}
                                              entry={entry}
                                         />
                                         <button onClick={(event) => {handleDelete(entry)}}>delete</button>
                                     </div>
                                </div>
                          </div>
                         )
                     } else if (parseInt(entry._id.charAt(entry._id.length-1)) % 1 === 0) {
                          return (
                              <div>
                               <div className="odd" id={`openModal${entry._id}`} onClick={() => {openModalButton(`modal${entry._id}`)}} key={entry._id}>
                               </div>
                               <div className="modal" id={`modal${entry._id}`}>
                                     <div className="modal-textbox" id={`modal-textbox${entry._id}`} key={entry._id}>
                                         <button id="closeModal" onClick={closeModalButton}>close</button>
                                         <p>{entry.log}</p><br/>
                                         <p>{entry.date}</p><br/>
                                         <button onClick={(event)=>{handleShowEditForm(event)}}>edit</button>
                                         <EditEntry
                                              handleNewDateChange={handleNewDateChange}
                                              handleNewTitleChange={handleNewTitleChange}
                                              handleNewLogChange={handleNewLogChange}
                                              handleNewShareChange={handleNewShareChange}
                                              handleEditEntrySubmit={handleEditEntrySubmit}
                                              entry={entry}
                                         />
                                         <button onClick={(event) => {handleDelete(entry)}}>delete</button>
                                     </div>
                                </div>
                          </div>
                         )
                     } else {
                          return (
                          <div>
                               <div className="letter" id={`openModal${entry._id}`} onClick={() => {openModalButton(`modal${entry._id}`)}} key={entry._id}>
                               </div>
                               <div className="modal" id={`modal${entry._id}`}>
                                     <div className="modal-textbox" id={`modal-textbox${entry._id}`} key={entry._id}>
                                         <button id="closeModal" onClick={closeModalButton}>close</button>
                                         <p>{entry.log}</p><br/>
                                         <p>{entry.date}</p><br/>
                                         <button onClick={(event)=>{handleShowEditForm(event)}}>edit</button>
                                         <EditEntry
                                              handleNewDateChange={handleNewDateChange}
                                              handleNewTitleChange={handleNewTitleChange}
                                              handleNewLogChange={handleNewLogChange}
                                              handleNewShareChange={handleNewShareChange}
                                              handleEditEntrySubmit={handleEditEntrySubmit}
                                              entry={entry}
                                         />
                                         <button onClick={(event) => {handleDelete(entry)}}>delete</button>
                                     </div>
                                </div>
                          </div>
                         )
                     }

                })
            }
            </ul>
               <div id="share-secret-form">
               <h2>share a secret</h2>
               <NewEntry
                    handleNewDateChange={handleNewDateChange}
                    handleNewTitleChange={handleNewTitleChange}
                    handleNewLogChange={handleNewLogChange}
                    handleNewShareChange={handleNewShareChange}
                    handleNewEntrySubmit={handleNewEntrySubmit}
               />
               </div>
          </main>
    </>)
}


export default App;
