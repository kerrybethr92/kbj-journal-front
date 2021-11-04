import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

import Header from './components/Header'
// import NavBar from './components/NavBar'
import UserProfile from './components/UserProfile'
import NewEntry from './components/NewEntry'

const App = () => {
    const [newDate, setNewDate] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newEntry, setNewEntry] = useState('')
    const [newShare, setNewShare] = useState(false)
    const [entries, setEntries] = useState([])

    useEffect(() => {
        axios
            .get('https://journal-back-kbj.herokuapp.com/entries')
            .then((response) => {
                setEntries(response.data)
            })
    },[])

    const handleNewEntrySubmit = (event) => {
        event.preventDefault()
        axios.post(
            'https://journal-back-kbj.herokuapp.com/entries',
            {
                date:newDate,
                title:newTitle,
                entry:newEntry,
                share:newShare
            }
        ).then(() => {
            axios
                .get('https://journal-back-kbj.herokuapp.com/entries')
                .then((response) => {
                    setEntries(response.data)
                })
        })
    }
    const handleNewDateChange = (event) => {
        setNewDate(event.target.value);
    }
    const handleNewTitleChange = (event) => {
        setNewTitle(event.target.value);
    }
    const handleNewEntryChange = (event) => {
        setNewEntry(event.target.value)
    }
    const handleNewShareChange = (event) => {
        setNewShare(event.target.checked)
    }
    // const showJournalEntry = (event) => {
    //     let journalEntry = document.getElementById('journal-entry');
    //     if (journalEntry.style.display === "none") {
    //         journalEntry.style.display = "block"
    //     } else {
    //         journalEntry.style.display = "none";
    //     }
    // }


    return (
        <>
        <Header/>
        <nav>
            <ul>
                <li>Home</li>
                <li>New Entry</li>
                <li>My Journal</li>
            </ul>
        </nav>
        <main>
            <h2>Journal Entries</h2>
            <ul>
            {
                entries.map((entry) => {
                    return <li>
                    {entry.date}<br/>
                    {entry.title}<br/>
                    <p id={entry._id}>{entry.log}</p><br/>
                    </li>
                })
            }
            </ul>
            <h2>Write a new journal entry:</h2>
            <NewEntry
                handleNewDateChange={handleNewDateChange}
                handleNewTitleChange={handleNewTitleChange}
                handleNewEntryChange={handleNewEntryChange}
                handleNewShareChange={handleNewShareChange}
                handleNewEntrySubmit={handleNewEntrySubmit}
            />
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
