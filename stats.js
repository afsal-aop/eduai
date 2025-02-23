document.addEventListener("DOMContentLoaded", function () {
    const statsData = [
        { id: "chart1", label: "Total XP Earned", data: [500, 800, 1200, 1600, 2000] },
        { id: "chart2", label: "Courses Completed", data: [2, 5, 8, 12, 15] },
        { id: "chart3", label: "Current Streak (Days)", data: [1, 3, 7, 14, 21] },
        { id: "chart4", label: "Quiz Scores", data: [70, 75, 80, 85, 90] },

        { id: "chart5", label: "Leaderboard Rank", data: [50, 40, 30, 20, 10] },
        { id: "chart6", label: "Followers & Following", data: [10, 20, 35, 50, 65] },
        { id: "chart7", label: "Friend Streaks", data: [2, 4, 6, 8, 10] },
        { id: "chart8", label: "Top 3 Finishes", data: [1, 3, 5, 7, 10] }
    ];

    statsData.forEach(stat => {
        new Chart(document.getElementById(stat.id), {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [{
                    label: stat.label,
                    data: stat.data,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { font: { size: 14 } } }
                },
                scales: {
                    y: { beginAtZero: true, grid: { color: "rgba(200, 200, 200, 0.2)" } },
                    x: { grid: { color: "rgba(200, 200, 200, 0.2)" } }
                }
            }
        });
    });
});
