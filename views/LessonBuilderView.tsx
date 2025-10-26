import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lesson, ContentBlock, ContentType, Quiz, Question, QuestionType } from '../types';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { PlusIcon, BookOpenIcon, CodeIcon, VideoIcon, TrashIcon } from '../constants';

interface LessonBuilderProps {
  lessons: Lesson[];
  onSave: (lesson: Lesson) => void;
}

const LessonBuilderView: React.FC<LessonBuilderProps> = ({ lessons, onSave }) => {
  const navigate = useNavigate();
  const { lessonId } = useParams<{ lessonId: string }>();

  const lesson = useMemo(() => lessons.find(l => l.id === lessonId), [lessons, lessonId]);

  const [title, setTitle] = useState(lesson?.title || '');
  const [description, setDescription] = useState(lesson?.description || '');
  const [content, setContent] = useState<ContentBlock[]>(lesson?.content || []);
  const [quiz, setQuiz] = useState<Quiz>(lesson?.quiz || { id: `q-${Date.now()}`, questions: [] });

  const handleAddContentBlock = (type: ContentType) => {
    const newBlock: ContentBlock = { id: `c-${Date.now()}`, type, value: '' };
    setContent([...content, newBlock]);
  };

  const handleUpdateContentBlock = (id: string, value: string) => {
    setContent(content.map(block => block.id === id ? { ...block, value } : block));
  };
  
  const handleRemoveContentBlock = (id: string) => {
    setContent(content.filter(block => block.id !== id));
  };

  const handleAddQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: `qq-${Date.now()}`,
      type,
      prompt: '',
      correctAnswer: '',
      ...(type === QuestionType.MULTIPLE_CHOICE && { options: ['', '', '', ''] })
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };
  
  const handleUpdateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map(q => q.id === id ? { ...q, [field]: value } : q)
    });
  };

  const handleUpdateOption = (qId: string, optionIndex: number, value: string) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map(q => {
        if (q.id === qId && q.options) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    });
  };

  const handleRemoveQuestion = (id: string) => {
    setQuiz({ ...quiz, questions: quiz.questions.filter(q => q.id !== id) });
  };
  
  const handleSave = () => {
    if (!title || !description) {
        alert("Please fill out the title and description.");
        return;
    }
    const newLesson: Lesson = {
      id: lesson?.id || `l-${Date.now()}`,
      title,
      description,
      author: 'Current User', // Mocked
      content,
      quiz,
    };
    onSave(newLesson);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{lesson ? 'Edit Lesson' : 'Create a New Lesson'}</h1>
      
      <div className="space-y-8">
        <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Lesson Details</h2>
          <div className="space-y-4">
            <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Introduction to Python" />
            <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief summary of what this lesson covers." />
          </div>
        </section>

        <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Lesson Content</h2>
          {content.map((block) => (
            <div key={block.id} className="mb-4 p-4 border dark:border-slate-700 rounded-md relative">
               <button onClick={() => handleRemoveContentBlock(block.id)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><TrashIcon /></button>
              {block.type === ContentType.TEXT && <Textarea value={block.value} onChange={(e) => handleUpdateContentBlock(block.id, e.target.value)} placeholder="Write your lesson text here..." />}
              {block.type === ContentType.CODE && <Textarea value={block.value} onChange={(e) => handleUpdateContentBlock(block.id, e.target.value)} placeholder="Paste your code snippet here..." className="font-mono" />}
              {block.type === ContentType.VIDEO && <Input value={block.value} onChange={(e) => handleUpdateContentBlock(block.id, e.target.value)} placeholder="Enter a YouTube embed URL" />}
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Button variant="secondary" onClick={() => handleAddContentBlock(ContentType.TEXT)}><span className="flex items-center gap-2"><BookOpenIcon/> Text</span></Button>
            <Button variant="secondary" onClick={() => handleAddContentBlock(ContentType.CODE)}><span className="flex items-center gap-2"><CodeIcon/> Code</span></Button>
            <Button variant="secondary" onClick={() => handleAddContentBlock(ContentType.VIDEO)}><span className="flex items-center gap-2"><VideoIcon/> Video</span></Button>
          </div>
        </section>

        <section className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quiz</h2>
            {quiz.questions.map((q, index) => (
                <div key={q.id} className="mb-4 p-4 border dark:border-slate-700 rounded-md relative">
                    <button onClick={() => handleRemoveQuestion(q.id)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><TrashIcon /></button>
                    <Input label={`Question ${index + 1}`} value={q.prompt} onChange={(e) => handleUpdateQuestion(q.id, 'prompt', e.target.value)} placeholder="Enter the question prompt"/>
                    {q.type === QuestionType.MULTIPLE_CHOICE && q.options?.map((opt, i) => (
                        <Input key={i} label={`Option ${i + 1}`} value={opt} onChange={(e) => handleUpdateOption(q.id, i, e.target.value)} className="mt-2"/>
                    ))}
                    <Input label="Correct Answer" value={q.correctAnswer} onChange={(e) => handleUpdateQuestion(q.id, 'correctAnswer', e.target.value)} placeholder="Enter the exact correct answer" className="mt-2"/>
                </div>
            ))}
            <div className="flex items-center space-x-2">
              <Button variant="secondary" onClick={() => handleAddQuestion(QuestionType.MULTIPLE_CHOICE)}><PlusIcon/> Multiple Choice</Button>
              <Button variant="secondary" onClick={() => handleAddQuestion(QuestionType.SHORT_ANSWER)}><PlusIcon/> Short Answer</Button>
            </div>
        </section>

        <div className="flex justify-end space-x-4">
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>Cancel</Button>
          <Button onClick={handleSave}>Save Lesson</Button>
        </div>
      </div>
    </div>
  );
};

export default LessonBuilderView;
