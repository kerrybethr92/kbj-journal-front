import React from 'react'

const EditEntry = (props) => {
    return (
        <form onSubmit={(event) => {props.handleEditEntrySubmit(event, props.entry)}}>
            <label for="date">Date:</label>
            <input type="date" name="date" onChange={props.handleNewDateChange}/><br/>

            <label for="title">Title:</label>
            <input type="text" name="title" onChange={props.handleNewTitleChange}/><br/>

            <label for="log">Log:</label>
            <textarea name="log" onChange={props.handleNewLogChange}/><br/>

            <label for="share">Public:</label>
            <input type="checkbox" name="share" onChange={props.handleNewShareChange}/><br/>

            <input type="submit" value="Submit Edit"/>
        </form>
    )
}

export default EditEntry;
