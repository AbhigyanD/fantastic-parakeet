/*  Fetch and print the rates from the API
*/

const API_URL = "https://api.frankfurter.dev/v1/latest?base=USD";

async function main() {
    const response = await fetch(API_URL);
    const data = await response.json(); // 1. fetch the API_URL and await the response
    const ratesArray = Object.entries(data.rates); // 3. data.rates is an object. Turn it into an array of [code, rate] pairs
    const sortedRates = ratesArray.sort((a,b) => a[0].localeCompare(b[0])); // 4. sort that array by code
    const rows = sortedRates.map(([code, rate]) => ({code, rate})); // 5. map the sorted array into an array of objects with code and rate properties
    console.table(rows); // 5. console.table(...) the result
}

main();
