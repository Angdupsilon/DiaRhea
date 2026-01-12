import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPendingResult, storeVerifiedCode, hasVerifiedCode } from '../services/storage';
import { CodeVerification } from '../components/CodeVerification';
import { TESTS } from '../constants';

export const VerifyPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    if (!testId) return;

    // 1. Check if we have a pending result (user actually took the test)
    const pending = getPendingResult(testId);
    if (!pending) {
      navigate('/'); // Redirect to home if no test taken
      return;
    }

    // 2. Check if already verified
    if (hasVerifiedCode(testId)) {
      // Generate a random result ID and go there
      const resultId = `res-${Date.now()}`;
      navigate(`/results/${testId}/${resultId}`);
      return;
    }

    setVerifying(false);
  }, [testId, navigate]);

  const handleVerify = async (code: string): Promise<boolean> => {
    // Simulated API Call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Demo Validation Rules
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

  if (verifying) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAFAFA]">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-xl font-medium text-gray-400">Step 2 / 3</h1>
        </div>
        <CodeVerification onVerify={handleVerify} />
      </div>
    </div>
  );
};