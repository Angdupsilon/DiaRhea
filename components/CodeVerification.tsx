import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

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
        setError('无效的激活码，请检查后重试');
      }
    } catch (err) {
      setError('验证失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-md w-full mx-auto text-center border border-gray-100"
    >
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Lock className="text-primary" size={32} />
      </div>

      <h2 className="text-2xl font-bold text-dark mb-2">结果已生成</h2>
      <p className="text-gray-500 mb-8 text-sm">
        请输入激活码解锁您的专属人格报告
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError('');
            }}
            placeholder="输入激活码 (例如: DR8888)"
            className={`w-full px-5 py-4 rounded-xl border-2 bg-gray-50 font-mono text-center text-lg tracking-widest outline-none transition-all
              ${error ? 'border-red-400 focus:border-red-500 bg-red-50 text-red-600' : 'border-gray-100 focus:border-primary focus:bg-white'}
            `}
            disabled={loading}
          />
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex items-center justify-center gap-2 text-red-500 text-sm"
          >
            <AlertCircle size={14} />
            <span>{error}</span>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="w-full bg-dark text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl hover:bg-black active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <span>立即解锁</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-xs text-gray-400 mb-2">没有激活码？</p>
        <a 
          href="#" 
          onClick={(e) => e.preventDefault()} 
          className="text-primary text-sm font-medium hover:underline decoration-primary/50 underline-offset-4"
        >
          前往 Rednote 获取体验码 ➜
        </a>
      </div>
    </motion.div>
  );
};