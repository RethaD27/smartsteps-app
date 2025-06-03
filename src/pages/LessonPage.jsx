import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this exports Firestore as `db`

export default function LessonPage() {
  const { grade, topic } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  const lessonId = `Grade_${grade}_${topic.replace(/\s+/g, "_")}`;

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const docRef = doc(db, 'lessons', lessonId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLesson(docSnap.data());
        } else {
          setLesson({ title: topic, content: "Lesson not found. Coming soon!" });
        }
      } catch (error) {
        console.error("Error fetching lesson:", error);
        setLesson({ title: topic, content: "Error loading lesson." });
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  if (loading) {
    return <div className="p-4">Loading lesson...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <div className="bg-white p-4 shadow rounded prose max-w-none">
        <p>{lesson.content}</p>
      </div>
    </div>
  );
}
