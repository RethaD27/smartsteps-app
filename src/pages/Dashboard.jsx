import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const topics = {
  7: ["Whole Numbers", "Fractions", "Algebraic Expressions", "Equations", "Geometry"],
  8: ["Integers", "Percentages", "Linear Equations", "Area & Volume", "Data Handling"],
  9: ["Exponents", "Graphs", "Inequalities", "Angles", "Probability"],
  10: ["Functions", "Trigonometry", "Patterns", "Finance", "Analytical Geometry"],
  11: ["Trigonometric Identities", "Quadratic Equations", "Series", "Statistics"],
  12: ["Calculus", "Exponential Functions", "Probability", "Financial Math", "Derivatives"]
};

export default function Dashboard() {
  const [grade, setGrade] = useState(7);
  const navigate = useNavigate();

  const handleLessonClick = (topic) => {
    navigate(`/lesson/${grade}/${topic}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📚 Welcome to SmartSteps!</h1>

      <label className="block mb-2">Select Grade:</label>
      <select
        value={grade}
        onChange={(e) => setGrade(Number(e.target.value))}
        className="border p-2 mb-4 rounded"
      >
        {[7,8,9,10,11,12].map(g => (
          <option key={g} value={g}>Grade {g}</option>
        ))}
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {topics[grade].map((topic, idx) => (
          <div key={idx} className="bg-white shadow p-4 rounded">
            <h2 className="text-lg font-semibold">{topic}</h2>
            <div className="mt-2 flex flex-col gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => handleLessonClick(topic)}
              >
                📖 View Lesson
              </button>
              <button className="bg-green-500 text-white px-3 py-1 rounded">
                🧪 Take Quiz
              </button>
              <button className="bg-purple-500 text-white px-3 py-1 rounded">
                🧮 Use Solver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
