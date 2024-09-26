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

    // Collect all selected values (entire match names)
    gameSelects.forEach(selectId => {
        const selectElement = document.getElementById(selectId);
        if (selectElement.value) {
            selectedValues.add(selectElement.options[selectElement.selectedIndex].text); // Use the full match text
        }
    });

    // Disable the options that are already selected in other dropdowns
    gameSelects.forEach(selectId => {
        const selectElement = document.getElementById(selectId);
        Array.from(selectElement.options).forEach(option => {
            option.disabled = selectedValues.has(option.text) && selectElement.value !== option.value;
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

    // Randomly choose how many games to select (between 2 and 8)
    const randomNumGames = Math.floor(Math.random() * 7) + 2; // Randomly pick between 2 and 8 games

    // Reset all selects and then assign random unique games
    gameSelects.forEach(selectId => {
        const selectElement = document.getElementById(selectId);
        selectElement.value = ""; // Clear existing selection
        document.getElementById(`odds${gameSelects.indexOf(selectId) + 1}`).innerText = "0"; // Reset odds display
    });

    const selectedGames = new Set(); // To track unique game selections
    let gameCount = 0;

    // Select unique games from the shuffled array
    for (let i = 0; i < shuffledGames.length && gameCount < randomNumGames; i++) {
        const randomGame = shuffledGames[i];
        if (!selectedGames.has(randomGame)) {
            selectedGames.add(randomGame);
            const selectElement = document.getElementById(gameSelects[gameCount]);
            selectElement.value = randomGame;
            updateOdds(gameSelects[gameCount], `odds${gameCount + 1}`);
            gameCount++;
        }
    }

    // If fewer than 2 games are selected, enforce selection
    if (selectedGames.size < 2) {
        randomizeSelections(); // Retry randomization until at least 2 games are selected
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
