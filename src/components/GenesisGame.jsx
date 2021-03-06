import React, { Component } from 'react';
import SingleGame from './SingleGame';
import styled from 'styled-components';

const GameWrapper = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
`


class GenesisGame extends Component {
    constructor(props) {
        super(props);
        this.state = {games: []};

    }
    
    getRandomPage = (max) => {
        return Math.floor(Math.random() * Math.floor(max))
    };

    getSingleGame = (arr) => {
        return arr[Math.floor(Math.floor(Math.random()*arr.length))]
    }
    
    async componentDidMount() {
        try {
            const page = this.getRandomPage(39) 
            const response = await fetch(`https://api.rawg.io/api/games?platforms=167&page_size=20&page=${page}`)
            const data = await response.json();
            console.log(data);
            this.setState({games: data.results})
            const game = this.getSingleGame(data.results);
            console.log(game)
            this.setState({games:[game]})
            
        } catch (error) {
            console.log("Error is ", error.message)
        }
    };


    render() {
        const { games } = this.state;
        return (
            <GameWrapper>
                {
                games.map((oneGame, i) => (
                    <SingleGame game={oneGame} key={i} />
                ))}
                <button onClick="window.location.reload();">Refresh Page</button>
            </GameWrapper>
        );
    }
}

export default GenesisGame;