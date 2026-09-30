
const API_URL = "https://api.frankfurter.dev/v1/latest?base=USD";

// ---------- STATE (plain variables for now) ----------
let allRates = [];          // array of { code, rate }, filled after fetch
let searchText = "";         // current text in the search box
let sortAscending = true;    // true = A->Z, false = Z->A
let favorites = new Set();   // Set of currency codes (like a Python set)
//          (look up: Set.add, Set.has, Set.delete)

// ---------- BLOCK 2: render ----------
function renderRates(rows) {
    const tbody = document.querySelector("#rates-body"); 
    tbody.replaceChildren()  // clear the table body 
    for (const row of rows){
        const tr = document.createElement("tr"); // create a new table row
        const td1 = document.createElement("td"); // create a new table cell
        td1.textContent = row.code; // set the text of the cell to the currency code
        const td2 = document.createElement("td"); // create a new table cell
        td2.textContent = row.rate; // set the text of the cell to the currency rate
        tr.append(td1, td2); // append the cells to the row
        tbody.append(tr); // append the row to the table body
    }
    // BLOCK 4: also add a star button cell per row (see toggleFavorite below)
}

// ---------- BLOCK 3: search + sort ----------
// function getVisibleRates() {
//     Start from allRates.
//     1. keep rows where row.code includes searchText (filter + toUpperCase on both sides
//        so "eur" matches "EUR"). Uses .filter().
//     2. sort by code, direction depends on sortAscending.
//        Careful: .sort() mutates! Sort a COPY: [...rows].sort(...)   (spread = Python's [*rows])
//     3. return the new array. Does NOT touch the DOM.
// }
//
// function update() {
//     renderRates(getVisibleRates());   // one place that redraws. Call it after every state change.
// }
//
// Wire up events (after the page loads, so after defer it is safe at top level):
//   const searchInput = document.querySelector("#search");
//   searchInput.addEventListener("input", (event) => { searchText = event.target.value; update(); });
//   sort button "click": flip sortAscending, update button text, update().

// ---------- BLOCK 4: favorites ----------
// function toggleFavorite(code) {
//     if favorites has code -> delete it, else add it. Then update().
// }
// In renderRates: show "★" if favorites.has(row.code) else "☆".
// Click on the star calls toggleFavorite(row.code).
// Extra: show favorites first in getVisibleRates() (sort key: favorite before non-favorite).
// Note: favorites reset on reload. That's expected. localStorage comes Thursday.

// ---------- LOAD DATA ----------
async function main() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const rows = Object.entries(data.rates).map(([code, rate]) => ({ code, rate }));
    renderRates(rows);
    // BLOCK 3+: set allRates = rows and call update() instead of renderRates(rows)
}

main();
