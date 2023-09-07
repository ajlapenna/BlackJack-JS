const myModule = (() => {
    "use strict";

    let deck = [];

    const sets = ['C', 'D', 'H', 'S'];
    const specials = ['A', 'J', 'Q', 'K'];

    let playersScores = [];

    // HTML Refs
    const btnNew = document.querySelector("#btnNew");
    const btnAsk = document.querySelector("#btnAsk");
    const btnStop = document.querySelector("#btnStop");
    
    const divPlayerCards = document.querySelectorAll(".divCards");
    const scoresHTML = document.querySelectorAll("small");

    const createDeck = () => {
        deck = [];
        
        for (let i = 2; i <= 10; i++) {
            for (let set of sets) {
                deck.push(i + set);
            }
        }

        for (let set of sets) {
            for (let sp of specials) {
                deck.push(sp + set);
            }
        }

        return _.shuffle(deck);
    };

    const initGame = (players = 2) => {
        deck = createDeck();
        playersScores = [];

        for (let i = 0; i < players; i++) {
            playersScores.push(0);
        }

        scoresHTML.forEach(elem => elem.innerText = 0);
        divPlayerCards.forEach(elem => elem.innerHTML = "");

        btnAsk.disabled = false;
        btnStop.disabled = false;

    };

    const drawCard = () => {        
        return (deck.length) ? deck.pop() : console.warn("Mazo vacío");
    };

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);

        return isNaN(value) ?
                ((value === "A") ? 11 : 10) :
                value * 1;
    };

    const sumPoints = (card ,turn) => {
        playersScores[turn] += cardValue(card);
        scoresHTML[turn].innerText = playersScores[turn];
        return playersScores[turn];
    };

    const createCard = (card, turn) => {
        const imgCard = document.createElement("img");
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList.add("card");
        divPlayerCards[turn].append(imgCard);
    };

    const whoWins = () => {
        const [minScore, computerScore] = playersScores;

        setTimeout(() => {
            if(computerScore === minScore) {
                alert("Nadie gana");
            } else if(minScore > 21) {
                alert("Computadora gana");
            } else if(computerScore > 21) {
                alert("Jugador Gana");
            } else {
                alert("Computadora gana");
            }
        }, 100);
    };

    const computerTurn = ( minScore ) => {
        let computerScore = 0;
        
        do {
            const card = drawCard();
            computerScore = sumPoints(card, playersScores.length - 1);
            createCard(card, playersScores.length - 1);

        } while ((computerScore < minScore) && (minScore <= 21));

        whoWins();
    };

    // Events
    btnAsk.addEventListener("click", () => {
        const card = drawCard();
        const playerScore = sumPoints(card, 0);

        createCard(card, 0);

        if(playerScore > 21) {
            console.warn("Perdiste");
            btnAsk.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerScore);
        } else if ( playerScore === 21) {
            console.warn("21, genial");
            btnAsk.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerScore);
        }
    });

    btnStop.addEventListener("click", () => {
        btnAsk.disabled = true;
        btnStop.disabled = true;
        computerTurn(playersScores[0]);
    });

    // btnNew.addEventListener("click", () => {
        
    //     initGame();
        
    // });

    return {
        newGame: initGame
    };

})();