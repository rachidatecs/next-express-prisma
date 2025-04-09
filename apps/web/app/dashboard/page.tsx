'use client';

import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, useUser, useAuth } from '@clerk/nextjs';

interface BackendUser {
  id: string;
  email: string;
  name?: string;
}

type BackendUserState = BackendUser | { error: string } | null;

export default function DashboardPage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [backendUser, setBackendUser] = useState<BackendUserState>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getToken();
        console.log('Clerk token:', token);

        const res = await fetch('http://localhost:4000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const text = await res.text();
        console.log('Raw response:', text);

        const data = JSON.parse(text);
        setBackendUser(data);
      } catch (err) {
        console.error('Failed to fetch user from backend:', err);
        setBackendUser({ error: 'Could not load user' });
      }
    };

    fetchUser();
  }, [getToken]);

  return (
    <main className="p-6">
      <SignedIn>
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.fullName || 'User'}!</h1>
        {backendUser && 'error' in backendUser ? (
          <p className="text-red-600">{backendUser.error}</p>
        ) : backendUser ? (
          <div className="text-gray-700">
            <p><strong>Backend Email:</strong> {backendUser.email}</p>
            <p><strong>Backend Name:</strong> {backendUser.name}</p>
          </div>
        ) : (
          <p>Loading backend user info...</p>
        )}
      </SignedIn>
      <SignedOut>
        <p>Please sign in to view this page.</p>
      </SignedOut>
    </main>
  );
}
