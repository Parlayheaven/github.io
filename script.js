function updateOdds(gameId, oddsId) {
    const selectedGame = document.getElementById(gameId);
    const odds = selectedGame.value;
    document.getElementById(oddsId).textContent = odds;

    disableSelectedOptions();
}

function disableSelectedOptions() {
    const gameDropdowns = [
        document.getElementById('game1'),
        // Add other game dropdowns (game2 to game8)
    ];

    const selectedValues = gameDropdowns
        .map(dropdown => dropdown.value)
        .filter(value => value);

    gameDropdowns.forEach(dropdown => {
        Array.from(dropdown.options).forEach(option => {
            option.disabled = selectedValues.includes(option.value) && option.value !== dropdown.value;
        });
    });
}

function calculateParlay() {
    const oddsElements = [
        document.getElementById('odds1').textContent,
        // Add other odds elements (odds2 to odds8)
    ];

    const betAmount = parseFloat(document.getElementById('betAmount').value);

    const selectedOdds = oddsElements
        .map(parseFloat)
        .filter(odds => !isNaN(odds) && odds > 0);

    if (selectedOdds.length === 0) {
        alert('Please select at least one game to calculate the parlay.');
        return;
    }

    const combinedOdds = selectedOdds.reduce((acc, currentOdds) => acc * currentOdds, 1);
    const payout = betAmount * combinedOdds;

    document.getElementById('parlayOdds').textContent = `Combined Odds: ${combinedOdds.toFixed(2)}`;
    document.getElementById('payout').textContent = `Potential Payout: €${payout.toFixed(2)}`;
}
