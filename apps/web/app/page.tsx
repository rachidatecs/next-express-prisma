'use client';

import { useRouter } from 'next/navigation';
import { useTest } from './context/TestContext';
import { useEffect, useState } from 'react';

export default function Page1() {
  const { answers, setAnswers } = useTest();
  const [localPhone, setLocalPhone] = useState(answers.phone || '');
  const [consent, setConsent] = useState(false);
  const [answer, setAnswer] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    setAnswers(prev => ({ ...prev, phone: localPhone, q1: answer, consent }));
    router.push('/question2');
  };

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <section className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Question 1 of 3</h1>

      <p className="mb-1">Cell: <em>(We&apos;ll text you a voucher if you win. We don&apos;t store or share these numbers.)</em></p>
      <input
        type="tel"
        name="telephone-number"
        placeholder="Phone number"
        value={localPhone}
        onChange={(e) => setLocalPhone(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      <label className="block mb-4">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mr-2"
        />
        By checking this box, I agree to receive marketing messages related to this trivia experience.
      </label>

      <p className="mb-2">What is 2 + 2?</p>
      <select value={answer} onChange={(e) => setAnswer(e.target.value)} className="border p-2 rounded w-full mb-4">
        <option value="">Select an answer</option>
        <option value="3">3</option>
        <option value="4">4</option> {/* ✅ correct */}
        <option value="5">5</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-violet-700 hover:bg-violet-800 text-white px-6 py-2 rounded"
      >
        Next
      </button>
    </section>
  );
}
