import React from "react"
import { Route } from "react-router-dom"
import { EventDetails } from "./event/EventDetails.js"
import { EventForm } from "./event/EventForm.js"
import { EventList } from "./event/EventList.js"
import { UpdateEventForm } from "./event/UpdateEvent.js"
import { GameDetails } from "./game/GameDetails.js"
import { GameForm } from "./game/GameForm.js"
import { GameList } from "./game/GameList.js"
import { UpdateGameForm } from "./game/UpdateGame.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route path="/edit-game/:gameId(\d+)">
                <UpdateGameForm />
            </Route>
            <Route path="/game-details/:gameId(\d+)">
                <GameDetails />
            </Route>
            <Route path="/edit-event/:eventId(\d+)">
                <UpdateEventForm />
            </Route>
            <Route path="/event-details/:eventId(\d+)">
                <EventDetails />
            </Route>
        </main>
    </>
}