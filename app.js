
const API_URL = "https://api.frankfurter.dev/v1/latest?base=USD";

// ---------- STATE (plain variables for now) ----------
let allRates = [];          // array of { code, rate }, filled after fetch
let searchText = "";         // current text in the search box
let sortAscending = true;    // true = A->Z, false = Z->A
let favorites = new Set();   // Set of currency codes (like a Python set)
//          (look up: Set.add, Set.has, Set.delete)

// ---------- BLOCK 2: render ----------
function renderRates(rows) {
    const tbody = document.querySelector("#rates-body");  // get the table body element
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
function getVisibleRates() {
    let rows = allRates.filter(row => row.code.toUpperCase().includes(searchText.toUpperCase())); // 1. filter by searchText
    rows = [...rows].sort((a, b) => sortAscending ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code)); // 2. sort by code, direction depends on sortAscending
    return rows; // 3. return the new array
}
//
function updates() {
    renderRates(getVisibleRates()); // 1. get the visible rates and render them
}
//
// Wire up events (after the page loads, so after defer it is safe at top level):
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", (event) => { searchText = event.target.value; updates(); });
const sortBtn = document.querySelector("#sort-btn");
const sortLabel = () => `Sort: ${sortAscending ? "A→Z" : "Z→A"}`;
sortBtn.textContent = sortLabel();
sortBtn.addEventListener("click", () => {
    sortAscending = !sortAscending;
    sortBtn.textContent = sortLabel();
    updates();
});

// ---------- BLOCK 4: favorites ----------
function toggleFavorite(code) {
    if (favorites.has(code)){
        favorites.delete(code);
    }
    else {
        favorites.add(code);
    }
    updates();
}
// ---------- LOAD DATA ----------
async function main() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const rows = Object.entries(data.rates).map(([code, rate]) => ({ code, rate }));
    allRates = rows;
    updates();
    // BLOCK 3+: set allRates = rows and call updates() instead of renderRates(rows)
}

main();
