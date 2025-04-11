'use client';

import { useRouter } from 'next/navigation';
import { useTest } from './context/TestContext';
import { useState } from 'react';

export default function Page1() {
  const { answers, setAnswers } = useTest();
  const [localPhone, setLocalPhone] = useState(answers.phone || '');
  const [answer, setAnswer] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    setAnswers(prev => ({ ...prev, phone: localPhone, q1: answer }));
    router.push('/question2');
  };

  return (
    <section className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Question 1 of 3</h1>

      <p className="mb-2">Cell: <em>(We'll text you a voucher if you win. We don't store or share these numbers.)</em></p>
      <input
        type="tel"
        name="telephone-number"
        placeholder="Phone number"
        value={localPhone}
        onChange={(e) => setLocalPhone(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      <p className="mb-2">What is 2 + 2?</p>
      <select value={answer} onChange={(e) => setAnswer(e.target.value)} className="border p-2 rounded w-full mb-4">
        <option value="">Select an answer</option>
        <option value="3">3</option>
        <option value="4">4</option> {/* ✅ correct */}
        <option value="5">5</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-violet-700 text-white px-6 py-2 rounded"
      >
        Next
      </button>
    </section>
  );
}
