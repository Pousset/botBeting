let bets = [];
let betIdCounter = 1;

function createBet(creator, equipe1, equipe2) {
    const newBet = {
        id: betIdCounter++,
        creator,
        equipe1,
        equipe2,
        predictions: [],
        active: true
    };
    bets.push(newBet);
    return newBet;
}

function getBets() {
    return bets.filter(bet => bet.active);
}

function addUserPrediction(betId, userId, winner, score1, score2) {
    const bet = bets.find(b => b.id === betId);
    if (bet) {
        bet.predictions.push({
            userId,
            winner,
            score1,
            score2,
            points: 0
        });
    }
}

function endBet(betId, actualScore1, actualScore2) {
    const bet = bets.find(b => b.id === betId);
    if (bet) {
        bet.active = false;
        // Calcul des points
        bet.predictions.forEach(prediction => {
            prediction.points = calculatePoints(prediction, actualScore1, actualScore2);
        });
        return bet.predictions.sort((a, b) => b.points - a.points);
    }
    return null;
}


function calculatePoints(prediction, actualScore1, actualScore2) {
    let points = 0;
    // Points pour avoir prédit la bonne équipe gagnante
    const winnerPredicted = prediction.winner === (actualScore1 > actualScore2 ? prediction.equipe1 : prediction.equipe2);
    points += winnerPredicted ? 5 : 0;
    
    // Points pour avoir prédit le score exact
    const exactScore = prediction.score1 === actualScore1 && prediction.score2 === actualScore2;
    points += exactScore ? 10 : 0;
    
    // Points pour avoir prédit le score d'une des équipes
    const partialScore = (prediction.score1 === actualScore1 || prediction.score2 === actualScore2) && !exactScore;
    points += partialScore ? 3 : 0;

    return points;
}

module.exports = { createBet, getBets, addUserPrediction, endBet };
