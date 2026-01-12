import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPendingResult, storeVerifiedCode, hasVerifiedCode } from '../services/storage';
import { CodeVerification } from '../components/CodeVerification';
import { ScribbleShape } from '../components/Scribbles';

export const VerifyPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    if (!testId) return;

    const pending = getPendingResult(testId);
    if (!pending) {
      navigate('/'); 
      return;
    }

    if (hasVerifiedCode(testId)) {
      const resultId = `res-${Date.now()}`;
      navigate(`/results/${testId}/${resultId}`);
      return;
    }

    setVerifying(false);
  }, [testId, navigate]);

  const handleVerify = async (code: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const normalizedCode = code.toUpperCase();
    const isValid = 
      normalizedCode.startsWith('DR') || 
      normalizedCode.startsWith('DIARHEA') ||
      normalizedCode === '888888';

    if (isValid && testId) {
      storeVerifiedCode(testId, normalizedCode);
      const resultId = `res-${Date.now()}`;
      navigate(`/results/${testId}/${resultId}`);
      return true;
    }
    return false;
  };

  if (verifying) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-dark border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decor */}
      <div className="absolute top-1/4 left-10 opacity-20 -rotate-12">
        <ScribbleShape className="w-32 h-32 text-dark" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <h1 className="font-bold text-2xl text-dark/50">
            步骤 2 / 3
          </h1>
        </div>
        <CodeVerification onVerify={handleVerify} />
      </div>
    </div>
  );
};