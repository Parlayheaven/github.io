// Function to update the odds displayed for each game when selected
function updateOdds(gameId, oddsId) {
    const selectedGame = document.getElementById(gameId);
    const oddsValue = selectedGame.value;
    document.getElementById(oddsId).innerText = oddsValue || "0";
    calculateParlay(); // Automatically calculate odds and payout after updating odds

    // Update available game options to prevent duplicate selections
    updateAvailableOptions();
}

// Function to update the available options in all dropdowns based on current selections
function updateAvailableOptions() {
    const gameSelects = ['game1', 'game2', 'game3', 'game4', 'game5', 'game6', 'game7', 'game8'];
    const selectedValues = new Set();

    // Collect all selected values
    gameSelects.forEach(selectId => {
        const selectElement = document.getElementById(selectId);
        if (selectElement.value) {
            selectedValues.add(selectElement.value);
        }
    });

    // Disable the options that are already selected in other dropdowns
    gameSelects.forEach(selectId => {
        const selectElement = document.getElementById(selectId);
        Array.from(selectElement.options).forEach(option => {
            option.disabled = selectedValues.has(option.value) && selectElement.value !== option.value;
        });
    });
}

// Function to calculate the total parlay odds and payout
function calculateParlay() {
    const betAmount = parseFloat(document.getElementById("betAmount").value) || 0;
    const gameSelects = ['game1', 'game2', 'game3', 'game4', 'game5', 'game6', 'game7', 'game8'];
    let parlayOdds = 1;
    let numGamesSelected = 0;

    // Multiply the odds of all selected games
    gameSelects.forEach(selectId => {
        const selectedGame = document.getElementById(selectId);
        if (selectedGame.value) {
            parlayOdds *= parseFloat(selectedGame.value);
            numGamesSelected++;
        }
    });

    // Calculate the payout
    const potentialPayout = (betAmount * parlayOdds).toFixed(2);

    // Display the results
    document.getElementById("parlayOdds").innerText = numGamesSelected > 0 ? `Combined Odds: ${parlayOdds.toFixed(2)}` : 'Combined Odds: 0.00';
    document.getElementById("payout").innerText = numGamesSelected > 0 ? `Potential Payout: €${potentialPayout}` : 'Potential Payout: €0.00';
}

// Function to randomize match selections with a random number of games selected
function randomizeSelections() {
    const gameSelects = ['game1', 'game2', 'game3', 'game4', 'game5', 'game6', 'game7', 'game8'];

    // Collect all available game options
    const availableGames = Array.from(document.querySelectorAll('select option'))
        .filter(option => option.value !== "")
        .map(option => option.value);

    // Shuffle the available games array
    const shuffledGames = shuffleArray(availableGames);

    // Randomly choose how many games to select (between 2 and 6)
    const randomNumGames = Math.floor(Math.random() * 5) + 2; // Randomly pick between 2 and 6 games

    // Reset all selects
    gameSelects.forEach(selectId => {
        const selectElement = document.getElementById(selectId);
        selectElement.value = ""; // Clear existing selection
        document.getElementById(`odds${gameSelects.indexOf(selectId) + 1}`).innerText = "0"; // Reset odds display
    });

    const selectedGames = new Set();

    // Select unique games from the shuffled array
    for (let i = 0; i < shuffledGames.length && selectedGames.size < randomNumGames; i++) {
        const randomGame = shuffledGames[i];
        selectedGames.add(randomGame);
        const selectElement = document.getElementById(gameSelects[selectedGames.size - 1]);
        selectElement.value = randomGame;
        updateOdds(gameSelects[selectedGames.size - 1], `odds${selectedGames.size}`);
    }

    // Update available options to prevent duplicate selections after randomization
    updateAvailableOptions();
}

// Helper function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
