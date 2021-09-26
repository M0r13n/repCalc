const COUNTERS = document.querySelectorAll('.counter');
const SPEED = 1000; // The higher the slower
const DEVICES = [
    { "id": 1, "name": "iPhone 7", "emissions": 56, "production": 78, "transport": 3, "usage": 18, "recycling": 1, "price": 250, "rep_cheap": 49, "rep_expensive": 99 },
    { "id": 2, "name": "iPhone 7 Plus", "emissions": 67, "production": 78, "transport": 3, "usage": 18, "recycling": 1, "price": 250, "rep_cheap": 49, "rep_expensive": 99 },
    { "id": 3, "name": "iPhone 8", "emissions": 57, "production": 80, "transport": 3, "usage": 16, "recycling": 1, "price": 250, "rep_cheap": 49, "rep_expensive": 99 },
    { "id": 4, "name": "iPhone 8 Plus", "emissions": 68, "production": 79, "transport": 3, "usage": 17, "recycling": 1, "price": 250, "rep_cheap": 49, "rep_expensive": 99 },
    { "id": 5, "name": "iPhone X", "emissions": 79, "production": 80, "transport": 2, "usage": 17, "recycling": 1, "price": 250, "rep_cheap": 69, "rep_expensive": 159 },
    { "id": 6, "name": "iPhone XR", "emissions": 62, "production": 76, "transport": 4, "usage": 19, "recycling": 1, "price": 350, "rep_cheap": 79, "rep_expensive": 199 },
    { "id": 7, "name": "iPhone XS", "emissions": 70, "production": 81, "transport": 3, "usage": 15, "recycling": 1, "price": 425, "rep_cheap": 89, "rep_expensive": 250 },
    { "id": 8, "name": "iPhone XS Max", "emissions": 77, "production": 79, "transport": 3, "usage": 17, "recycling": 1, "price": 475, "rep_cheap": 79, "rep_expensive": 295 },
    { "id": 9, "name": "iPhone 11", "emissions": 72, "production": 79, "transport": 3, "usage": 17, "recycling": 1, "price": 589, "rep_cheap": 99, "rep_expensive": 399 },
    { "id": 10, "name": "iPhone 11 Pro", "emissions": 80, "production": 83, "transport": 3, "usage": 13, "recycling": 1, "price": 689, "rep_cheap": 99, "rep_expensive": 399 },
    { "id": 11, "name": "iPhone 11 Pro Max", "emissions": 86, "production": 78, "transport": 3, "usage": 18, "recycling": 1, "price": 709, "rep_cheap": 99, "rep_expensive": 379 },
    // { "id": 12, "name": "iPhone SE (2. Gen)", "emissions": 57, "production": 84, "transport": 3, "usage": 12, "recycling": 1, "price": null, "battery": 59, "display": 79, misc: 69 },
    // { "id": 13, "name": "iPhone 12 mini", "emissions": 64, "production": 85, "transport": 2, "usage": 12, "recycling": 1, "price": null, "battery": 59, "display": 79, misc: 69 },
    { "id": 14, "name": "iPhone 12", "emissions": 70, "production": 83, "transport": 2, "usage": 14, "recycling": 1, "price": 739, "rep_cheap": 109, "rep_expensive": 379 },
    { "id": 15, "name": "iPhone 12 Pro", "emissions": 82, "production": 86, "transport": 2, "usage": 11, "recycling": 1, "price": 900, "rep_cheap": 109, "rep_expensive": 399 },
    { "id": 16, "name": "iPhone 12 Pro Max", "emissions": 86, "production": 82, "transport": 2, "usage": 15, "recycling": 1, "price": 900, "rep_cheap": 109, "rep_expensive": 399 },
    { "id": 17, "name": "Sonstige", "emissions": 58, "production": 82, "transport": 2, "usage": 15, "recycling": 1, "price": 350, "rep_cheap": 79, "rep_expensive": 159 },
]

function updateCounters(element) {
    const emissions = ((parseInt(element.dataset.production) + parseInt(element.dataset.transport) + parseInt(element.dataset.recycling)) / 100) * parseInt(element.dataset.emissions);
    document.getElementById("co2").dataset.target = Math.floor(emissions);
    document.getElementById("co2").innerText = 0;

    const lowPrice = parseInt(element.dataset.price) - parseInt(element.dataset.rep_expensive);
    const highPrice = parseInt(element.dataset.price) - parseInt(element.dataset.rep_cheap);

    document.getElementById("priceLowest").dataset.target = lowPrice;
    document.getElementById("priceLowest").innerText = lowPrice;
    document.getElementById("priceHighest").dataset.target = highPrice;
    document.getElementById("priceHighest").innerText = highPrice;

    document.getElementById("ressources").dataset.target = 35;
    document.getElementById("ressources").innerText = 0;

    document.getElementById("production").innerText = element.dataset.production;
    document.getElementById("productionVal").value = element.dataset.production;

    document.getElementById("transport").innerText = element.dataset.transport;
    document.getElementById("transportVal").value = element.dataset.transport;

    document.getElementById("usage").innerText = element.dataset.usage;
    document.getElementById("usageVal").value = element.dataset.usage;

    document.getElementById("recycling").innerText = element.dataset.recycling;
    document.getElementById("recyclingVal").value = element.dataset.recycling;
}

function spin() {
    COUNTERS.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // Lower inc to make animation faster
            const inc = target / SPEED;

            // Check if target is reached
            if (count < target) {
                // Add inc to count and output in counter
                // Also round inc to keep integers and not floats
                counter.innerText = Math.ceil(count + inc);
                // Call function every ms
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        // Reset counter to show the full animation again
        counter.innerText = 0;
        updateCount();
    });
}




function update(event) {
    document.getElementById('results').scrollIntoView();
    updateCounters(event.currentTarget);
    setTimeout(spin, 300);

}


function listDevices() {
    const deviceSection = document.getElementById("devices");

    for (const device of DEVICES) {
        let aside = document.createElement("aside");
        let heading = document.createElement("h3");
        heading.innerText = device.name;
        aside.appendChild(heading);
        aside.classList.add("select");
        for (const [k, v] of Object.entries(device)) {
            aside.setAttribute(`data-${k}`, v);
        }
        aside.addEventListener("click", update);
        deviceSection.appendChild(aside);
    }
}



document.addEventListener("DOMContentLoaded", function(event) {
    listDevices();
});