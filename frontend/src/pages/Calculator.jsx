import { useState } from "react";
import { Link } from "react-router-dom";
import { calculate } from "../api/calculatorApi.js";
import { errorMessage } from "../api/client.js";

const OPS = [
  { op: "add", sym: "+", label: "Add" },
  { op: "subtract", sym: "−", label: "Subtract" },
  { op: "multiply", sym: "×", label: "Multiply" },
  { op: "divide", sym: "÷", label: "Divide" },
];

export default function Calculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("0");
  const [isError, setIsError] = useState(false);
  const [history, setHistory] = useState([]);

  function show(text, error = false) {
    setResult(String(text));
    setIsError(error);
  }

  async function run(op, sym) {
    if (a === "" || b === "") return show("Enter both numbers", true);
    if (op === "divide" && Number(b) === 0) return show("Can't divide by zero", true);

    setExpr(`${a} ${sym} ${b}`);
    try {
      const value = await calculate(op, a, b);
      show(value);
      setHistory(h => [`${a} ${sym} ${b} = ${value}`, ...h].slice(0, 5));
    } catch (err) {
      show(errorMessage(err), true);
    }
  }

  function clearAll() {
    setA(""); setB(""); setExpr(""); show("0");
  }

  return (
    <main className="card calc">
      <Link to="/" className="back">← Home</Link>

      <div className="screen" aria-live="polite">
        <div className="expr">{expr}</div>
        <div className={"result" + (isError ? " error" : "")}>{result}</div>
      </div>

      <div className="fields two">
        <label>First number
          <input type="number" step="any" inputMode="decimal" placeholder="0"
                 value={a} onChange={e => setA(e.target.value)} />
        </label>
        <label>Second number
          <input type="number" step="any" inputMode="decimal" placeholder="0"
                 value={b} onChange={e => setB(e.target.value)} />
        </label>
      </div>

      <div className="ops">
        {OPS.map(o => (
          <button key={o.op} aria-label={o.label} onClick={() => run(o.op, o.sym)}>
            {o.sym}
          </button>
        ))}
        <button className="clear" onClick={clearAll}>Clear</button>
      </div>

      <ul className="history">
        {history.map((h, i) => <li key={i}>{h}</li>)}
      </ul>
    </main>
  );
}
