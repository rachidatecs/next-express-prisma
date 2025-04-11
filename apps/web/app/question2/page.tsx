'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTest } from '../context/TestContext';

export default function Question2Page() {
  const router = useRouter();
  const { answers, setAnswers } = useTest();
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    if (!answers?.phone || !answers?.q1) {
      router.push('/');
    }
  }, [answers, router]);

  const updateAnswer = (question: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    updateAnswer('q2', selectedAnswer);
    router.push('/question3');
  };

  return (
    <section className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Question 2 of 3</h1>
      <p className="mb-4">Which planet is known as the Red Planet?</p>

      <div className="space-y-2">
        <label className="block">
          <input
            type="radio"
            name="answer"
            value="Earth"
            checked={selectedAnswer === 'Earth'}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />{' '}
          Earth
        </label>
        <label className="block">
          <input
            type="radio"
            name="answer"
            value="Mars"
            checked={selectedAnswer === 'Mars'}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />{' '}
          Mars
        </label>
        <label className="block">
          <input
            type="radio"
            name="answer"
            value="Jupiter"
            checked={selectedAnswer === 'Jupiter'}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />{' '}
          Jupiter
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer}
        className="mt-4 bg-violet-700 hover:bg-violet-800 text-white px-6 py-2 rounded"
      >
        Next
      </button>
    </section>
  );
}
