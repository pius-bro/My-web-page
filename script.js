const sidemenu = document.getElementById("sidemenu");
function openmenu(){
    sidemenu.style.right="0";
}
function closemenu(){
    sidemenu.style.right = '-200px'
}

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".booking-widget");
    const tripType = document.getElementById("tripType");
    const returnDateInput = document.getElementById("returnDate");
    const returnDateGroup = returnDateInput.parentElement;

    const fromAirport = document.getElementById("fromAirport");
    const toDestination = document.getElementById("toDestination");
    const departureDate = document.getElementById("departureDate");

   
    function toggleReturnDate() {
        if (tripType.value === "oneway") {
            returnDateGroup.style.display = "none";
        } else {
            returnDateGroup.style.display = "block";
        }
    }

    toggleReturnDate();
    tripType.addEventListener("change", toggleReturnDate);


    // HANDLE FORM SUBMISSION
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // stop reload

        const type = tripType.value;
        const from = fromAirport.value;
        const to = toDestination.value;
        const departure = departureDate.value;
        const returnDate = returnDateInput.value;

        // VALIDATION
        if (!from || !to || !departure) {
            alert("Please fill all required fields!");
            return;
        }

        if (type === "return" && !returnDate) {
            alert("Please select a return date!");
            return;
        }

        if (from === to) {
            alert("From and To destinations cannot be the same!");
            return;
        }
    const query = `search.html?from=${from}&to=${to}&departure=${departure}&type=${type}`;

    window.location.href = query;

        // SUCCESS OUTPUT
        const bookingData = {
            tripType: type,
            from: from,
            to: to,
            departureDate: departure,
            returnDate: returnDate
        };

        console.log("Booking Data:", bookingData);

        alert("Flight search submitted successfully!");

        fetch("http://localhost:8000/search", { method: "POST", body: JSON.stringify(bookingData) })
    });

});