import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

import Header from './components/Header'
// import NavBar from './components/NavBar'
import UserProfile from './components/UserProfile'

const App = () => {
    const [entries, setEntries] = useState([])

    useEffect(() => {
        axios
            .get('https://journal-back-kbj.herokuapp.com/entries')
            .then((response) => {
                setEntries(response.data)
            })
    })


    // nav bar to include: link to homepage, log in, sign up, create new entry
    // divs in sections will be user's card with name and photo
    // footer will stay at bottom of page and have links to our githubs, etc

    const showLogIn = () => {
        let logIn = document.getElementById('log-in');
        if (logIn.style.display === "none") {
            logIn.style.display = "block"
        } else {
            logIn.style.display = "none"
        }
    }
    // const handleLogIn = (event) => {
    //     event.preventDefault();
    //     ///// create new sessions here /////
    //     ////// authentication goes here /////
    // }
    const showSignUp = () => {
        let signUp = document.getElementById('sign-up');
        if (signUp.style.display === "none") {
            signUp.style.display = "block"
        } else {
            signUp.style.display = "none";
        }

    }
    // const handleSignUp = () => {
    //     event.preventDefault();
    //     //// create new user here /////
    // }
    const showNewEntryBox = () => {
        let entryForm = document.getElementById('new-entry');
        if (entryForm.style.display === "none") {
            entryForm.style.display = "block"
        } else {
            entryForm.style.display = "none";
        }
    }
    return (
        <main>
            <h1>KBJ Journal App</h1>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>New Entry</li>
                    <li>My Journal</li>
                </ul>
            </nav>
        </main>
    )
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

// return (
//     <main>
//         <section>
//             <h2>Journal entries:</h2>
//             <ul>
//                 {
//                     entries.map((entry) => {
//                         return <li>
//                         {entry.data}<br/>
//                         {entry.title}<br/>
//                         {entry.log}<br/>
//                         </li>
//                     })
//                 }
//             </ul>
//         </section>
//     </main>
// )
