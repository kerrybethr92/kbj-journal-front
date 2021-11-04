import React from 'react'

const NewEntry = () => {

    return (
        <form onSubmit={handleNewEntrySubmit}>
            <label for="date">Date:</label>
            <input type="date" name="date" onChange={handleNewDateChange}/><br/>
            <label for="title">Title:</label>
            <input type="text" name="title" onChange={handleNewTitleChange}/><br/>
            <label for="entry">Entry:</label>
            <textarea name="entry" onChange={handleNewEntryChange}/><br/>
            <label for="share">Public:</label>
            <input type="checkbox" name="share" onChange={handleNewShareChange}/><br/>
            <input type="submit" value="Submit Journal Entry"/>
        </form>
    )
}

export default NewEntry;

/// date, title, entry, share
