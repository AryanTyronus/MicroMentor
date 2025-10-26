import React, { useState, useMemo } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Lesson, ContentType, QuestionType } from '../types';
import Button from '../components/Button';
import Input from '../components/Input';

interface LessonPlayerProps {
  lessons: Lesson[];
}

const LessonPlayerView: React.FC<LessonPlayerProps> = ({ lessons }) => {
  const navigate = useNavigate();
  const { lessonId } = useParams<{ lessonId: string }>();

  const lesson = useMemo(() => lessons.find(l => l.id === lessonId), [lessons, lessonId]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  if (!lesson) {
    return <Navigate to="/dashboard" />;
  }

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  const handleSubmitQuiz = () => {
    let newScore = 0;
    lesson.quiz.questions.forEach(q => {
      if (answers[q.id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  const renderContentBlock = (block: Lesson['content'][0]) => {
    switch (block.type) {
      case ContentType.TEXT:
        return <p className="mb-4 leading-relaxed">{block.value}</p>;
      case ContentType.CODE:
        return <pre className="bg-slate-800 text-white p-4 rounded-md overflow-x-auto mb-4"><code className="font-mono text-sm">{block.value}</code></pre>;
      case ContentType.VIDEO:
        return (
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <iframe 
              src={block.value} 
              title="Lesson Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
              style={{aspectRatio: '16/9'}}
            ></iframe>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 md:p-10">
      <button onClick={() => navigate('/dashboard')} className="text-violet-600 dark:text-violet-400 mb-4">&larr; Back to Dashboard</button>
      <h1 className="text-4xl font-bold mb-2">{lesson.title}</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">{lesson.description}</p>
      
      <div className="prose dark:prose-invert max-w-none">
        {lesson.content.map(block => (
          <div key={block.id}>{renderContentBlock(block)}</div>
        ))}
      </div>
      
      <hr className="my-8 dark:border-slate-700"/>

      <h2 className="text-2xl font-bold mb-4">Quiz Time!</h2>
      {!showResults ? (
        <div>
          {lesson.quiz.questions.map((q, index) => (
            <div key={q.id} className="mb-6">
              <p className="font-semibold mb-2">{index + 1}. {q.prompt}</p>
              {q.type === QuestionType.SHORT_ANSWER && (
                <Input 
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder="Your answer..."
                />
              )}
              {q.type === QuestionType.MULTIPLE_CHOICE && q.options && (
                <div className="space-y-2">
                  {q.options.map((option, i) => (
                    <label key={i} className="flex items-center p-3 bg-slate-100 dark:bg-slate-700 rounded-md cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600">
                      <input 
                        type="radio"
                        name={q.id}
                        value={option}
                        checked={answers[q.id] === option}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        className="form-radio h-4 w-4 text-violet-600"
                      />
                      <span className="ml-3">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button onClick={handleSubmitQuiz} disabled={!lesson.quiz.questions.length}>Submit Quiz</Button>
        </div>
      ) : (
        <div className="text-center p-8 bg-violet-100 dark:bg-violet-900/50 rounded-lg">
          <h3 className="text-3xl font-bold text-violet-700 dark:text-violet-300">Quiz Complete!</h3>
          <p className="text-xl mt-2 mb-4">You scored {score} out of {lesson.quiz.questions.length}</p>
          <Button onClick={() => navigate('/dashboard')}>Finish Lesson</Button>
        </div>
      )}
    </div>
  );
};

export default LessonPlayerView;
