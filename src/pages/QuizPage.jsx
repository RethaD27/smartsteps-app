import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function QuizPage() {
  const { grade, topic } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const quizId = `Grade_${grade}_${topic.replace(/\s+/g, "_")}_quiz`;

  useEffect(() => {
    const fetchQuiz = async () => {
      const docRef = doc(db, "quizzes", quizId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setQuiz(docSnap.data().questions);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleNext = () => {
    if (selected === quiz[currentQ].answer) {
      setScore(score + 1);
    }
    if (currentQ + 1 < quiz.length) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  };

  if (!quiz.length) return <div className="p-4">Loading quiz...</div>;

  if (done) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg">You scored {score} out of {quiz.length}</p>
      </div>
    );
  }

  const question = quiz[currentQ];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">{question.question}</h2>
      <div className="space-y-2">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(opt)}
            className={`w-full p-2 border rounded ${selected === opt ? 'bg-blue-100' : 'bg-white'}`}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={selected === null}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {currentQ + 1 === quiz.length ? "Finish" : "Next"}
      </button>
    </div>
  );
}
