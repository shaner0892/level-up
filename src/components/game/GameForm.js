import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [game, setGame] = useState({
        skill_level: 1,
        number_of_players: 0,
        title: "",
        maker: "",
        game_type: 0
    })

    useEffect(() => {
        getGameTypes().then(gameTypesData => setGameTypes(gameTypesData))
    }, [])

    const changeGameState = (event) => {
        const newGame = Object.assign({}, game)
        newGame[event.target.name] = event.target.value
        setGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={game.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Game type: </label>
                    <select name="game_type"
                        proptype="int"
                        value={game.game_type}
                        onChange={changeGameState}>
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
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill-level">Skill Level: </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={game.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const createdGame = {
                        maker: game.maker,
                        title: game.title,
                        number_of_players: parseInt(game.number_of_players),
                        skill_level: parseInt(game.skill_level),
                        game_type: parseInt(game.game_type)
                    }

                    // Send POST request to your API
                    createGame(createdGame)
                        .then(() => history.push("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}