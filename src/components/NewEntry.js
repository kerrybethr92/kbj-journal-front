import React from 'react'

const NewEntry = (props) => {

    return (
        <form onSubmit={props.handleNewEntrySubmit}>
            <label for="date">Date:</label>
            <input type="date" name="date" onChange={props.handleNewDateChange}/><br/>
            <label for="title">Title:</label>
            <input type="text" name="title" onChange={props.handleNewTitleChange}/><br/>
            <label for="log">Log:</label>
            <textarea name="log" onChange={props.handleNewLogChange}/><br/>
            <label for="share">Public:</label>
            <input type="checkbox" name="share" onChange={props.handleNewShareChange}/><br/>
            <input type="submit" value="Submit Journal Entry"/>
        </form>
    )
}

export default NewEntry;

/// date, title, entry, share
