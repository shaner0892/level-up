import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getCurrentGame } from "./GameManager.js"

export const GameDetails = () => {
    const history = useHistory()
    const [game, updateGame] = useState({})
    const {gameId} = useParams()

    useEffect(
        () => {
            getCurrentGame(parseInt(gameId))
                .then(updateGame)
        },
        []
    )

    return (
        <>
            <section key={`game--${game.id}`} className="game">
                <div className="game__title">{game.title} by {game.maker}</div>
                <div className="game__players">{game.number_of_players} players needed</div>
                <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                <br></br>
                <button id="btn" onClick={() => history.push(`/edit-game/${game.id}`)}> Edit Game </button><br></br>
            </section>
        </>
    )
}