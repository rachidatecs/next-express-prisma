'use client';

import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { useState } from 'react';

export default function HomePage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('Hello from our app!');
  const [status, setStatus] = useState('');

  const sendSms = async () => {
    try {
      setStatus('Sending...');
      const res = await fetch('http://localhost:4000/api/sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, message }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('✅ SMS sent successfully!');
      } else {
        setStatus(`❌ Failed to send SMS: ${data.error}`);
      }
    } catch (err) {
      console.error('SMS error:', err);
      setStatus('❌ Error sending SMS');
    }
  };

  return (
    <main className="p-6">
      <SignedIn>
        <h1 className="text-xl">You&apos;re signed in!</h1>
      </SignedIn>
      <SignedOut>
        <h1 className="text-xl mb-4">Welcome 👋</h1>
        <SignInButton />
      </SignedOut>

      <h2 className="text-2xl font-bold mb-4">Send a Quick SMS</h2>

      <input
        type="tel"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      <textarea
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full mb-3 rounded h-24"
      />

      <button
        onClick={sendSms}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        Send SMS
      </button>

      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </main>
  );
}
