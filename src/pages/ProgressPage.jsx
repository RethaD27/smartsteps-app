import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function ProgressPage() {
  const [progress, setProgress] = useState([]);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchProgress = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snapshot = await getDocs(collection(db, "users", user.uid, "progress"));
      const data = snapshot.docs.map(doc => doc.data());
      setProgress(data);
    };

    fetchProgress();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">📈 Your Progress</h2>
      {progress.length === 0 ? (
        <p>No progress yet. Take a quiz!</p>
      ) : (
        <ul className="space-y-2">
          {progress.map((item, idx) => (
            <li key={idx} className="bg-gray-100 p-4 rounded shadow">
              <p><strong>Topic:</strong> {item.topic}</p>
              <p><strong>Grade:</strong> {item.grade}</p>
              <p><strong>Score:</strong> {item.score}%</p>
              <p><strong>Date:</strong> {new Date(item.date.seconds * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
