import React from 'react'

const NewEntry = (props) => {

    return (
        <form id="newSecret" onSubmit={props.handleNewEntrySubmit}>
            <label for="date">date:</label>
            <input type="date" name="date" onChange={props.handleNewDateChange}/><br/><br/>
            <label for="log">secret:</label>
            <textarea name="log" onChange={props.handleNewLogChange}/><br/><br/>
            <input id="submit" type="submit" value="share secret with universe"/>
        </form>
    )
}

export default NewEntry;
