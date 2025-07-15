const ctx = document.getElementById('activityChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Steps',
            data: [8000, 10000, 7500, 12000, 9000, 11000, 6000],
            backgroundColor: '#28a745',
            borderColor: '#218838',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Steps'
                }
            }
        },
        plugins: {
            legend: {
                display: true
            }
        }
    }
});

// Live activity tracker
let trackerInterval = null;
function startTracker() {
    const liveSteps = document.getElementById('liveSteps');
    let steps = 0;
    if (trackerInterval) clearInterval(trackerInterval);
    trackerInterval = setInterval(() => {
        steps += Math.floor(Math.random() * 10) + 1;
        liveSteps.textContent = steps;
        if (steps >= 10000) clearInterval(trackerInterval);
    }, 500);
}