import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getGames } from "../game/GameManager.js"
import { putEvent, getCurrentEvent } from "./EventManager.js"

export const UpdateEventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const [event, updateEvent] = useState({})
    const {eventId} = useParams()

    useEffect(() => {
        getGames()
            .then(setGames)
        getCurrentEvent(parseInt(eventId))
            .then(updateEvent)
    }, [])

    const editEventState = (evt) => {
        const editedEvent = Object.assign({}, event)
        editedEvent[evt.target.name] = evt.target.value
        updateEvent(editedEvent)
    }

    return (
        <form className="event__form">
            <h2 className="event__form__title">Edit your Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game"
                        proptype="int"
                        value={event.game}
                        onChange={editEventState}>
                        <option value="0">Select a game</option>
                        {games.map(g => (
                            <option key={g.id} value={g.id}>
                                {g.title}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={event.description}
                        onChange={editEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="text" name="date" required autoFocus className="form-control"
                        value={event.date}
                        onChange={editEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" required autoFocus className="form-control" 
                        value={event.time}
                        onChange={editEventState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    const updatedEvent = {
                        game: parseInt(event.game),
                        description: event.description,
                        date: event.date,
                        time: event.time
                    }
                    // Send POST request to your API
                    putEvent(updatedEvent, eventId)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}