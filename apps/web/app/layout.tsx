import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import { TestProvider } from './context/TestContext';

export const metadata = {
  title: 'Fullstack App',
  description: 'Next.js + Clerk + Turbo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <nav className="flex items-center justify-between p-4 border-b">
            <div className="flex gap-4">
              <Link href="/">Home</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>
            <div>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </div>
          </nav>
          <main>
            <TestProvider>{children}</TestProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
