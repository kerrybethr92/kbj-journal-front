import React from 'react'

const NewEntry = (props) => {

    return (
        <form id="newSecret" onSubmit={props.handleNewEntrySubmit}>
          <label for="date">Date:</label>
          <input type="date" name="date" onChange={props.handleNewDateChange}/><br/><br/>
          <label for="title">Title:</label>
          <input type="text" name="title" onChange={props.handleNewTitleChange}/><br/><br/>
          <label for="log">Log:</label>
          <textarea name="log" onChange={props.handleNewLogChange}/><br/><br/>
          <label for="share">Public:</label>
          <input type="checkbox" name="share" onChange={props.handleNewShareChange}/><br/><br/>
          <input id="submit" type="submit" value="share secret with universe"/>
        </form>
    )
}

export default NewEntry;
