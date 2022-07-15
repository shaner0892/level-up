import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { deleteGame, getGames } from "./GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames()
            .then(setGames)
    }, [])

    const removeGame = (id) => {
        deleteGame(id)
            .then(()=> {
                getGames()
                    .then(setGames)
            })
    }

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
                >Register New Game</button>
            <article className="games">
                {
                    games.map(game => {
                        return <section key={`game--${game.id}`} className="game">
                            <div className="game__title">{game.title} by {game.maker}</div>
                            <button id="btn" onClick={() => history.push(`/edit-game/${game.id}`)}> Edit Game </button><br></br>
                            <button id="btn" onClick={() => {removeGame(game.id)}}> Delete Game </button><br></br>
                            <button id="btn" onClick={() => history.push(`/game-details/${game.id}`)}> View More </button>
                            <br></br>
                        </section>
                    })
                }
            </article>
        </>
    )
}