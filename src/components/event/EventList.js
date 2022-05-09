import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "./EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()

    const loadEvents = () => {
        getEvents().then(data => setEvents(data))
    }

    useEffect(() => {
        loadEvents()
    }, [])

    const removeEvent = (id) => {
        deleteEvent(id)
            .then(()=> {
                getEvents()
                    .then((eventData) => {
                        setEvents(eventData)
                    })
            })
    }

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
            history.push({ pathname: "/events/new" })
        }}
        >Register New Event</button>
            <article className="events">
                {
                    events.map(event => {
                        return <section key={`event--${event.id}`} className="event">
                            <div className="event__about">{event.description}</div>
                            <div className="event__when">It will be on {event.date} at {event.time}</div>
                            <button id="btn" onClick={() => history.push(`/edit-event/${event.id}`)}> Edit Event </button><br></br>
                            <button id="btn" onClick={() => {removeEvent(event.id)}}> Delete Event </button><br></br>
                            <button id="btn" onClick={() => history.push(`/event-details/${event.id}`)}> View More </button><br></br>
                            {
                                event.joined ? <button onClick={() => {leaveEvent(event.id).then(loadEvents)}}>Leave Event</button> : <button onClick={() => {joinEvent(event.id).then(loadEvents)}}>Join Event</button>
                            }
                            <br></br>
                        </section>
                    })
                }
            </article>
        </>
    )
}