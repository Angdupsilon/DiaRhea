import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TESTS } from '../constants';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { Option } from '../types';
import { storePendingResult } from '../services/storage';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const TestPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const test = TESTS.find((t) => t.id === testId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!test) {
      navigate('/');
    }
  }, [test, navigate]);

  if (!test) return null;

  const currentQuestion = test.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === test.questions.length - 1;

  const handleSelectOption = (option: Option) => {
    setSelectedOptionId(option.id);
  };

  const handleNext = () => {
    if (!selectedOptionId) return;

    // Store value
    const optionValue = currentQuestion.options.find(o => o.id === selectedOptionId)?.value || 0;
    const newAnswers = { ...answers, [currentQuestion.id]: optionValue };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate final score
      const totalScore = Object.values(newAnswers).reduce((a: number, b: number) => a + b, 0);
      
      // Store pending result
      storePendingResult(test.id, {
        score: totalScore,
        answers: newAnswers,
        timestamp: Date.now()
      });

      // Navigate to verification
      navigate(`/verify/${test.id}`);
    } else {
      setSelectedOptionId(undefined);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      // We don't restore the selection visually to encourage fresh thinking, 
      // but you could store selection history if desired.
      setSelectedOptionId(undefined);
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <ProgressBar current={currentQuestionIndex + 1} total={test.questionCount} />

      <main className="flex-grow px-4 pb-20 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            onSelect={handleSelectOption}
            selectedOptionId={selectedOptionId}
          />
        </AnimatePresence>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 md:p-6 z-40">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors
              ${currentQuestionIndex === 0 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ArrowLeft size={20} />
            <span className="hidden md:inline">上一题</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedOptionId}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium shadow-lg transition-all
              ${!selectedOptionId 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-dark text-white hover:bg-primary hover:shadow-primary/30 active:scale-95'}`}
          >
            <span className="hidden md:inline">{isLastQuestion ? '查看结果' : '下一题'}</span>
            <span className="md:hidden">{isLastQuestion ? '完成' : '下一步'}</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};