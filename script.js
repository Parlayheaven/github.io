function updateOdds(selectId, oddsId) {
    const select = document.getElementById(selectId);
    const odds = document.getElementById(oddsId);
    odds.textContent = select.value || 0;

    // Update other dropdowns to disable the selected option
    const selectedValue = select.value;
    const dropdowns = document.querySelectorAll('select');

    dropdowns.forEach(dropdown => {
        if (dropdown.id !== selectId) {
            const options = dropdown.querySelectorAll('option');
            options.forEach(option => {
                option.disabled = (option.value === selectedValue) && selectedValue !== "";
            });
        }
    });
}

function calculateParlay() {
    let totalOdds = 1;
    const betAmount = parseFloat(document.getElementById('betAmount').value);

    for (let i = 1; i <= 8; i++) {
        const odds = parseFloat(document.getElementById(`game${i}`).value);
        if (odds) {
            totalOdds *= odds;
        }
    }

    const payout = betAmount * totalOdds;

    document.getElementById('parlayOdds').textContent = `Combined Odds: ${totalOdds.toFixed(2)}`;
    document.getElementById('payout').textContent = `Potential Payout: €${payout.toFixed(2)}`;
}
