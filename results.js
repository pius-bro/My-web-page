// Get URL parameters
const params = new URLSearchParams(window.location.search);

const from = params.get("from");
const to = params.get("to");
const departure = params.get("departure");

// Fake flight data (for now)
const flights = [
    {
        airline: "Kenya Airways",
        time: "08:00 AM",
        economy: 450,
        business: 900
    },
    {
        airline: "Emirates",
        time: "12:30 PM",
        economy: 600,
        business: 1200
    },
    {
        airline: "Qatar Airways",
        time: "06:00 PM",
        economy: 550,
        business: 1100
    }
];

// Display results
const container = document.getElementById("results");

container.innerHTML = `<h3>${from} → ${to} (${departure})</h3>`;

flights.forEach(flight => {
    container.innerHTML += `
        <div style="border:1px solid #ccc; margin:10px; padding:10px;">
            <h4>${flight.airline}</h4>
            <p>Departure: ${flight.time}</p>
            <p>Economy: $${flight.economy}</p>
            <p>Business: $${flight.business}</p>
            <button>Select Flight</button>
        </div>
    `;
});