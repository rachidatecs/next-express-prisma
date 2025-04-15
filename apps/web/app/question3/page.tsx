'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTest } from '../context/TestContext';

export default function Question3Page() {
  const { answers, setAnswers } = useTest();
  const router = useRouter();

  useEffect(() => {
    if (!answers?.phone || !answers?.q1 || !answers?.q2) {
      router.push('/');
    }
  }, [answers, router]);

  const updateAnswer = (question: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = (value: string) => {
    updateAnswer('q3', value);
    const correctAnswers = {
      q1: '4',
      q2: 'Mars',
      q3: 'Harper Lee',
    };

    const allCorrect =
      answers?.q1 === correctAnswers.q1 &&
      answers?.q2 === correctAnswers.q2 &&
      value === correctAnswers.q3;

    if (!answers?.consent) {
      alert('☝️ Please consent to receive marketing messages to receive the quiz result via SMS.');
      return;
    }

    if (allCorrect) {
      fetch('https://next-express-prisma-production.up.railway.app/api/sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: answers.phone,
          message: '🎉 Congrats! You passed the quiz with all correct answers!',
        }),
      })
        .then(() => alert('✅ All answers correct! SMS sent.'))
        .catch(() => alert('❌ SMS sending failed.'));
    } else {
      alert('❌ Some answers are incorrect. Try again.');
    }

    // This only works while the browser is open and active (not true background push).
    // For persistent web push notifications (like real push to a device even when tab is closed),
    // you'd need a Service Worker + Push API + VAPID keys, which is a bit more setup.
    if (Notification.permission === 'granted') {
      new Notification('🎉 Congrats!', {
        body: 'All answers correct! Thanks for playing.',
        //icon: '/icon.png', // optional
      });
    }
  };

  return (
    <section className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Question 3 of 3</h1>
      <p className="mb-4">Who wrote &quot;To Kill a Mockingbird&quot;?</p>
      <div className="space-y-2">
        {['Harper Lee', 'Mark Twain', 'Jane Austen'].map((option) => (
          <button
            key={option}
            className="block w-full p-2 border rounded hover:bg-yellow-500"
            onClick={() => handleSubmit(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
}
