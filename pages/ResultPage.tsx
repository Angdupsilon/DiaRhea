import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TESTS } from '../constants';
import { getPendingResult, hasVerifiedCode, saveToHistory, getHistory } from '../services/storage';
import { ResultCard } from '../components/ResultCard';
import { Result } from '../types';
import { ScribbleStar, ScribbleCat } from '../components/Scribbles';

export const ResultPage: React.FC = () => {
  const { testId, resultId } = useParams<{ testId: string; resultId: string }>();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState<{ result: Result; score: number; maxScore: number } | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!testId || !resultId) {
      navigate('/');
      return;
    }

    const test = TESTS.find(t => t.id === testId);
    if (!test) {
      navigate('/');
      return;
    }

    const history = getHistory();
    const historyItem = history.find(h => h.resultId === resultId);

    if (historyItem) {
      const result = test.results.find(r => r.name === historyItem.resultData.name);
      if (result) {
        setResultData({
          result,
          score: historyItem.resultData.score,
          maxScore: test.questions.reduce((acc, q) => acc + Math.max(...q.options.map(o => o.value)), 0)
        });
        setIsSaved(true);
        return;
      }
    }

    if (!hasVerifiedCode(testId)) {
      navigate(`/verify/${testId}`);
      return;
    }

    const pending = getPendingResult(testId);
    if (!pending) {
      navigate('/');
      return;
    }

    const score = pending.score;
    const matchedResult = test.results.find(
      r => score >= r.minScore && score <= r.maxScore
    ) || test.results[0];

    const maxScore = test.questions.reduce((acc, q) => acc + Math.max(...q.options.map(o => o.value)), 0);

    setResultData({
      result: matchedResult,
      score,
      maxScore
    });

  }, [testId, resultId, navigate]);

  const handleSave = () => {
    if (!resultData || !testId || !resultId) return;
    
    const test = TESTS.find(t => t.id === testId);
    
    saveToHistory({
      id: `${Date.now()}`,
      testId,
      testTitle: test?.title || 'Unknown Test',
      resultId,
      timestamp: Date.now(),
      resultData: {
        name: resultData.result.name,
        emoji: resultData.result.emoji,
        description: resultData.result.description,
        score: resultData.score
      }
    });
    
    setIsSaved(true);
  };

  if (!resultData) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-dark border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen pt-8 pb-20 px-4 relative overflow-hidden">
      {/* Scribble decorations */}
      <div className="absolute top-20 left-4 opacity-10 pointer-events-none rotate-12">
        <ScribbleStar className="w-24 h-24 text-primary" />
      </div>
      <div className="absolute bottom-10 right-4 opacity-10 pointer-events-none -rotate-6">
        <ScribbleCat className="w-32 h-32 text-dark" />
      </div>

      <div className="relative z-10">
        <ResultCard 
          result={resultData.result}
          score={resultData.score}
          maxPossibleScore={resultData.maxScore}
          onSave={handleSave}
          isSaved={isSaved}
        />
      </div>
    </div>
  );
};