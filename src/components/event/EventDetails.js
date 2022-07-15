import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getCurrentEvent } from "./EventManager.js"

export const EventDetails = () => {
    const history = useHistory()
    const [ event, setEvent ] = useState({})
    const {eventId} = useParams()

    useEffect(
        () => {
            getCurrentEvent(parseInt(eventId)).then(setEvent)
        }, 
        []
    )

    return (
        <>
            <section key={`event--${event.id}`} className="event">
                <div className="event__game">Game Title: {event.game?.title}</div>
                <div className="event__about">About: {event.description}</div>
                <div className="event__when">Date: {event.date} </div>
                <div className="event__when">Time: {event.time} </div>
                <button id="btn" onClick={() => history.push(`/edit-event/${event.id}`)}> Edit Event </button>
            </section>
        </>
    )
}