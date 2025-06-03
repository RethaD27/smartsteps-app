import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

// Firebase instances
const db = getFirestore();
const auth = getAuth();

// Function to save quiz progress
const saveProgress = async (score, topic, grade) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await addDoc(collection(db, "users", user.uid, "progress"), {
      score,
      topic,
      grade,
      date: new Date(),
    });
  } catch (error) {
    console.error("Error saving progress:", error);
  }
};

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
      } else {
        console.warn("Quiz not found.");
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleNext = async () => {
    if (selected === quiz[currentQ].answer) {
      setScore(prev => prev + 1);
    }

    if (currentQ + 1 < quiz.length) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
    } else {
      setDone(true);
      await saveProgress(score + (selected === quiz[currentQ].answer ? 1 : 0), topic, grade);
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
