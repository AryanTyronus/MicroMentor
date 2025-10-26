
import { Lesson, ContentType, QuestionType } from './types';

export const MOCK_LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Intro to React Hooks',
    author: 'Jane Doe',
    description: 'A quick 5-minute introduction to useState and useEffect hooks in React.',
    content: [
      { id: 'c1', type: ContentType.TEXT, value: 'React Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes — they let you use React without classes.' },
      { id: 'c2', type: ContentType.TEXT, value: 'The two most common hooks are `useState` and `useEffect`.' },
      { id: 'c3', type: ContentType.CODE, value: `import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}` },
      { id: 'c4', type: ContentType.VIDEO, value: 'https://www.youtube.com/embed/a_7Z7C_JCyo' },
    ],
    quiz: {
      id: 'q1',
      questions: [
        { id: 'qq1', type: QuestionType.MULTIPLE_CHOICE, prompt: 'Which hook is used for managing state in a functional component?', options: ['useEffect', 'useState', 'useContext', 'useReducer'], correctAnswer: 'useState' },
        { id: 'qq2', type: QuestionType.SHORT_ANSWER, prompt: 'What is the second argument of useEffect used for?', correctAnswer: 'Dependency array' },
      ],
    },
  },
  {
    id: '2',
    title: 'The Philosophy of Stoicism',
    author: 'Marcus Aurelius',
    description: 'Understand the core tenets of Stoicism and how to apply them to modern life.',
    content: [
       { id: 'c1', type: ContentType.TEXT, value: 'Stoicism is a school of Hellenistic philosophy founded by Zeno of Citium in Athens in the early 3rd century BC. It is a philosophy of personal ethics informed by its system of logic and its views on the natural world.' },
       { id: 'c2', type: ContentType.TEXT, value: 'The core idea is to accept the moment as it presents itself, by not allowing oneself to be controlled by the desire for pleasure or fear of pain.'},
    ],
    quiz: {
      id: 'q2',
      questions: [
        { id: 'qq1', type: QuestionType.SHORT_ANSWER, prompt: 'Who is considered the founder of Stoicism?', correctAnswer: 'Zeno of Citium' },
      ],
    },
  },
];

export const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export const BookOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 14a1 1 0 01-1.447-.894l-1-4A1 1 0 117.447 8.106l1 4A1 1 0 018 14zm4 0a1 1 0 01-1.447-.894l-1-4a1 1 0 111.894-.448l1 4A1 1 0 0112 14z" />
    </svg>
);

export const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

export const VideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 001.553.832l3-2a1 1 0 000-1.664l-3-2z" />
    </svg>
);

export const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);
