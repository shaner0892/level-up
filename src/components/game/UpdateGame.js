import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { putGame, getGameTypes, getCurrentGame } from './GameManager.js'


export const UpdateGameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const [game, updateGame] = useState({})
    const {gameId} = useParams()

    useEffect(() => {
        getGameTypes().then(gameTypesData => setGameTypes(gameTypesData))
    }, [])

    useEffect(
        () => {
            getCurrentGame(parseInt(gameId)).then((gameData) => {
                    updateGame(gameData)
            })
        },
        []
    )

    const editGameState = (event) => {
        const editedGame = Object.assign({}, game)
        editedGame[event.target.name] = event.target.value
        updateGame(editedGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={editGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={game.maker}
                        onChange={editGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Game type: </label>
                    <select name="game_type"
                        proptype="int"
                        value={game.game_type}
                        onChange={editGameState}>
                        <option value="0">Select a game type</option>
                        {gameTypes.map(gt => (
                            <option key={gt.id} value={gt.id}>
                                {gt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control" 
                        value={game.number_of_players}
                        onChange={editGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill-level">Skill Level: </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={game.skill_level}
                        onChange={editGameState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedGame = {
                        maker: game.maker,
                        title: game.title,
                        number_of_players: parseInt(game.number_of_players),
                        skill_level: parseInt(game.skill_level),
                        game_type: parseInt(game.game_type)
                    }

                    // Send PUT request to your API
                    putGame(updatedGame, gameId)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}