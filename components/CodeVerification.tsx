import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { ScribbleTape, ScribbleUnderline } from './Scribbles';

interface CodeVerificationProps {
  onVerify: (code: string) => Promise<boolean>;
}

export const CodeVerification: React.FC<CodeVerificationProps> = ({ onVerify }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError('');

    try {
      const isValid = await onVerify(code);
      if (!isValid) {
        setError('Invalid Code. Try "DR8888"');
      }
    } catch (err) {
      setError('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      className="bg-paper relative border-2 border-dark shadow-sketch max-w-md w-full mx-auto text-center p-8 md:p-12"
    >
      {/* Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 text-gray-200/80 transform rotate-1 z-10">
         <ScribbleTape className="w-full h-full" opacity={0.6} />
      </div>

      <div className="w-16 h-16 border-2 border-dark rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-sketch-sm">
        <Lock className="text-dark" size={32} />
      </div>

      <h2 className="text-3xl font-black text-dark mb-2 tracking-tight">Locked!</h2>
      <p className="font-hand text-xl text-gray-500 mb-8">
        Enter your secret key to unlock the soul fragments.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError('');
            }}
            placeholder="CODE: DR8888"
            className={`w-full px-4 py-3 bg-transparent font-mono text-center text-2xl tracking-widest outline-none transition-all placeholder-gray-300
              ${error ? 'text-red-500' : 'text-dark'}
            `}
            disabled={loading}
          />
          {/* Handwritten underline style for input */}
          <ScribbleUnderline className={`w-full h-4 mt-1 ${error ? 'text-red-400' : 'text-dark'}`} />
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex items-center justify-center gap-2 text-red-500 font-bold font-hand text-lg"
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="w-full bg-dark text-white py-4 font-bold text-xl shadow-sketch-sm hover:shadow-sketch hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border-2 border-transparent"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              <span className="font-hand">Unlock Now</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-300">
        <p className="font-hand text-lg text-gray-400 mb-2">No code?</p>
        <a 
          href="#" 
          onClick={(e) => e.preventDefault()} 
          className="text-primary font-bold hover:underline decoration-wavy decoration-2 underline-offset-4"
        >
          Get one from Rednote ➜
        </a>
      </div>
    </motion.div>
  );
};