import RateRow from "./RateRow.jsx";

const RATES = [
  { code: "EUR", rate: 0.92 },
  { code: "GBP", rate: 0.81 },
  { code: "JPY", rate: 134.16 },
  { code: "CAD", rate: 1.35 },
];

function App() {
  return (
    <>
      <h1>Exchange Rates</h1>
      <table>
        <tbody>
          {RATES.map(({ code, rate }) => (
            <RateRow key={code} code={code} rate={rate} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
