async function fetchHistory() {
    // Implementation of the fetchHistory function
    // ...
}

function updateHistoryUI(historyData) {
    // Update your UI with the fetched history data
    console.log(historyData);
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/history');
        const historyData = await response.json();
        updateHistoryUI(historyData);
    } catch (error) {
        console.error('Error fetching history:', error);
    }
});

const historyButton = document.getElementById('historyButton');
historyButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/history');
        const historyData = await response.json();
        console.log(historyData);
    } catch (error) {
        console.error('Error fetching history:', error);
    }
});
