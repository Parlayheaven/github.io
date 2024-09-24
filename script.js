// Function to update the odds displayed for each game when selected
function updateOdds(gameId, oddsId) {
    const selectedGame = document.getElementById(gameId);
    const oddsValue = selectedGame.value;
    document.getElementById(oddsId).innerText = oddsValue || "0";

    // Update available game options to prevent duplicate selections
    updateAvailableOptions();

    // Automatically calculate the combined odds and payout after each selection
    calculateParlay();
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
            if (option.value !== "" && selectedValues.has(option.value) && selectElement.value !== option.value) {
                option.disabled = true;
            } else {
                option.disabled = false;
            }
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
    let availableGames = [];
    gameSelects.forEach(selectId => {
        const selectElement = document.getElementById(selectId);
        const options = Array.from(selectElement.options).filter(option => option.value !== "");
        availableGames = availableGames.concat(options);
    });

    // Shuffle the available games array
    availableGames = availableGames.sort(() => 0.5 - Math.random());

    // Randomly choose how many games to select (between 2 and 8)
    const randomNumGames = Math.floor(Math.random() * (8 - 2 + 1)) + 2;

    // Assign random unique games to dropdowns based on the randomNumGames
    const selectedGames = new Set(); // To keep track of already selected games
    gameSelects.forEach((selectId, index) => {
        const selectElement = document.getElementById(selectId);
        if (index < randomNumGames) {
            let randomOption;
            // Find a unique random option
            do {
                randomOption = availableGames[Math.floor(Math.random() * availableGames.length)];
            } while (selectedGames.has(randomOption.value));
            
            selectedGames.add(randomOption.value);
            selectElement.value = randomOption.value;
            updateOdds(selectId, `odds${index + 1}`);
        } else {
            // Clear the remaining dropdowns if fewer games are selected
            selectElement.value = "";
            document.getElementById(`odds${index + 1}`).innerText = "0";
        }
    });

    // Update available options to prevent duplicate selections after randomization
    updateAvailableOptions();

    // Automatically calculate combined odds and payout after randomization
    calculateParlay();
}
