'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Answers = {
  phone: string;
  consent?: boolean;
  q1?: string;
  q2?: string;
  q3?: string;
};

type TestContextType = {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
};

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<Answers>({ phone: '' });

  return (
    <TestContext.Provider value={{ answers, setAnswers }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => {
  const context = useContext(TestContext);
  if (!context) throw new Error('useTest must be used within TestProvider');
  return context;
};
