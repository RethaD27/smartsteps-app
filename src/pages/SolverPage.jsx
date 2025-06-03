import { useState } from "react";
import { evaluate, simplify, parse } from "mathjs";

export default function SolverPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [steps, setSteps] = useState([]);

  const handleSolve = () => {
    try {
      const node = parse(input);
      const simplified = simplify(node);
      const evaluated = evaluate(input);

      setResult(evaluated.toString());
      setSteps([
        `Original: ${input}`,
        `Simplified: ${simplified.toString()}`,
        `Evaluated: ${evaluated.toString()}`
      ]);
    } catch (err) {
      setResult("❌ Error: Invalid Expression");
      setSteps([]);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">SmartSteps Solver</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter an expression or equation"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleSolve}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Solve
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h3 className="font-semibold">Steps:</h3>
          <ul className="list-disc pl-5">
            {steps.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
          <p className="mt-2"><strong>Result:</strong> {result}</p>
        </div>
      )}
    </div>
  );
}
