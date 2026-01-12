import React, { useRef, useState } from 'react';
import { Result } from '../types';
import { motion } from 'framer-motion';
import { Save, Check, ArrowRight, Download } from 'lucide-react';
import { getScribbleByEmoji, ScribbleTape } from './Scribbles';
import { toPng } from 'html-to-image';
import { Logo } from './Logo';
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';

interface ResultCardProps {
  result: Result;
  score: number;
  maxPossibleScore: number;
  onSave: () => void;
  isSaved: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, score, maxPossibleScore, onSave, isSaved }) => {
  const { testId } = useParams<{ testId: string }>();
  const matchPercentage = Math.round((score / maxPossibleScore) * 100);
  const ScribbleIcon = getScribbleByEmoji(result.emoji);
  
  // Ref for the visible card (interaction)
  const cardRef = useRef<HTMLDivElement>(null);
  // Ref for the hidden export card (image generation)
  const exportRef = useRef<HTMLDivElement>(null);
  
  const [isExporting, setIsExporting] = useState(false);

  const handleExportImage = async () => {
    if (exportRef.current) {
      setIsExporting(true);
      try {
        // Wait for state to update
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Generate image from the dedicated export container
        const dataUrl = await toPng(exportRef.current, {
          quality: 0.95,
          backgroundColor: '#FFFDF5',
          pixelRatio: 1, // 1080px container is already high res
          // We rely on the global stylesheets (with crossorigin="anonymous") for fonts.
          // Filtering LINK tags from the clone to prevent double-loading issues.
          filter: (node) => {
             if (node.tagName === 'LINK') return false;
             return true; 
          }
        });
        
        const link = document.createElement('a');
        link.download = `dia-rhea-result-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to export image', err);
        alert('保存图片失败，请尝试截图 (Failed to generate image, please screenshot)');
      } finally {
        setIsExporting(false);
      }
    }
  };

  // URL for the QR code
  const shareUrl = `https://diarhea.online/#/test/${testId || 'test-001'}`;

  return (
    <div className="max-w-2xl mx-auto">
      {/* 
        ----------------------------------------------------
        HIDDEN EXPORT CARD (Optimized for Image Generation) 
        ----------------------------------------------------
      */}
      <div style={{ position: 'fixed', top: -9999, left: -9999, pointerEvents: 'none' }}>
        <div 
          ref={exportRef} 
          className="w-[1080px] bg-paper p-16 relative border-[4px] border-dark text-dark flex flex-col items-center"
        >
          {/* 
            Define font classes. We rely on global fonts being loaded and inlined by html-to-image 
            now that index.html has crossorigin="anonymous".
          */}
          <style>
            {`
              .export-font-hand { font-family: 'Patrick Hand', 'ZCOOL KuaiLe', cursive; }
              .export-font-zh { font-family: 'ZCOOL KuaiLe', 'Patrick Hand', sans-serif; }
            `}
          </style>

          {/* Header */}
          <div className="w-full flex justify-between items-start mb-12">
            {/* Top Left: Icon Logo */}
            <div className="flex items-center gap-4">
               <Logo className="w-20 h-20 text-dark" />
            </div>
            {/* Top Right: Brand Name */}
            <div className="flex flex-col items-end">
              <span className="export-font-hand font-bold text-4xl text-dark tracking-wide leading-none whitespace-nowrap">Dia Rhea</span>
              <span className="export-font-zh font-bold text-2xl bg-dark text-white px-4 py-1 mt-2 transform -rotate-2 whitespace-nowrap inline-block">负卸空间</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col items-center w-full mb-12 flex-grow">
            <div className="w-64 h-64 relative mb-10">
                <div className="absolute inset-0 bg-secondary rounded-full opacity-20"></div>
                <ScribbleIcon className="w-full h-full text-dark relative z-10" />
                <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-accent rounded-full flex items-center justify-center border-[3px] border-dark shadow-sketch transform rotate-12 z-20">
                    <span className="export-font-hand font-bold text-white text-4xl">{matchPercentage}%</span>
                </div>
            </div>
            
            <h1 className="export-font-zh text-8xl text-dark mb-6 text-center tracking-tighter leading-snug">{result.name}</h1>
            
            <div className="inline-block bg-primary text-white px-8 py-3 transform -rotate-1 shadow-sm mb-12">
                <span className="font-mono text-2xl font-bold uppercase tracking-widest">Type Class</span>
            </div>
            
            <p className="export-font-zh text-3xl text-center text-dark/90 leading-relaxed max-w-4xl px-8 font-normal">
                "{result.description}"
            </p>
          </div>

          <div className="w-full h-1 border-t-[3px] border-dashed border-dark/30 mb-12"></div>

          {/* Two Columns: Features & Recommendations */}
          <div className="flex gap-12 mb-16 items-stretch w-full">
             {/* Features */}
             <div className="flex-1 border-[3px] border-dark p-10 transform -rotate-1 bg-white shadow-[6px_6px_0px_0px_#18181B] flex flex-col">
                <div className="mb-8 relative">
                  <h3 className="export-font-zh text-5xl text-primary inline-block relative z-10">特 征</h3>
                  <div className="absolute bottom-2 left-0 w-full h-4 bg-primary/20 -rotate-1"></div>
                </div>
                
                <ul className="space-y-6 flex-grow">
                  {result.insights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                        <span className="text-primary font-black text-3xl shrink-0 leading-none mt-1">•</span>
                        <span className="export-font-zh text-dark text-3xl leading-snug text-left">{insight}</span>
                    </li>
                  ))}
                </ul>
             </div>

             {/* Recommendations */}
             <div className="flex-1 border-[3px] border-dark p-10 transform rotate-1 bg-white shadow-[6px_6px_0px_0px_#18181B] flex flex-col">
                <div className="mb-8 relative">
                  <h3 className="export-font-zh text-5xl text-secondary inline-block relative z-10">建 议</h3>
                  <div className="absolute bottom-2 left-0 w-full h-4 bg-secondary/30 rotate-1"></div>
                </div>

                <ul className="space-y-6 flex-grow">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                        <ArrowRight size={36} className="text-dark shrink-0 mt-1" />
                        <span className="export-font-zh text-dark text-3xl leading-snug text-left">{rec}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>

          {/* Footer: QR Code */}
          <div className="flex flex-col items-center pt-2">
            <div className="p-4 bg-white border-[3px] border-dark rounded-2xl shadow-sm mb-4">
               <QRCode 
                 value={shareUrl} 
                 size={140}
                 fgColor="#18181B"
                 bgColor="#FFFFFF"
                 level="L"
               />
            </div>
            <p className="export-font-hand font-bold text-gray-500 text-2xl mb-2">Scan to take the test | 扫码测试</p>
            <p className="font-black text-3xl text-dark tracking-wide font-sans">diarhea.online</p>
          </div>
        </div>
      </div>

      {/* 
        ----------------------------------------------------
        VISIBLE WEB CARD
        ----------------------------------------------------
      */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        className="bg-paper rounded-none border-2 border-dark shadow-sketch relative overflow-hidden"
      >
        {/* Texture noise */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-repeat" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

        <div className="p-8 md:p-12 relative z-10">
          
          <div className="flex flex-col items-center mb-10 border-b-2 border-dashed border-dark pb-8 mt-4">
              <div className="w-32 h-32 relative mb-6">
                  <div className="absolute inset-0 bg-secondary rounded-full animate-pulse opacity-20"></div>
                  <ScribbleIcon className="w-full h-full text-dark relative z-10" />
                  <motion.div 
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -right-4 -bottom-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center border-2 border-dark shadow-sketch-sm transform rotate-12"
                  >
                      <span className="font-hand font-bold text-white text-lg">{matchPercentage}%</span>
                  </motion.div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black text-dark mb-3 text-center tracking-tighter font-hand">{result.name}</h1>
              
              <div className="inline-block bg-primary text-white px-4 py-1 transform -rotate-1 shadow-sm">
                  <span className="font-mono text-sm font-bold uppercase tracking-widest">Type Class</span>
              </div>
              
              <p className="mt-8 text-xl font-hand text-center text-dark/80 leading-relaxed max-w-lg font-bold">
                  "{result.description}"
              </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Insights */}
              <div className="bg-white border-2 border-dark p-6 shadow-sketch-sm transform -rotate-1">
                  <h3 className="font-bold text-2xl mb-4 text-primary flex items-center gap-2 font-hand">
                      特征
                      <div className="h-0.5 bg-primary flex-grow"></div>
                  </h3>
                  <ul className="space-y-3">
                      {result.insights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                          <span className="text-primary font-bold text-lg">•</span>
                          <span className="font-bold text-dark/80 font-hand text-lg">{insight}</span>
                      </li>
                      ))}
                  </ul>
              </div>

              {/* Recommendations */}
              <div className="bg-white border-2 border-dark p-6 shadow-sketch-sm transform rotate-1">
                  <h3 className="font-bold text-2xl mb-4 text-secondary flex items-center gap-2 font-hand">
                      建议
                      <div className="h-0.5 bg-secondary flex-grow"></div>
                  </h3>
                  <div className="space-y-3">
                      {result.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                          <ArrowRight size={20} className="text-dark shrink-0 mt-0.5" />
                          <span className="text-lg font-bold text-gray-600 font-hand">{rec}</span>
                      </div>
                      ))}
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
                onClick={onSave}
                disabled={isSaved}
                className={`w-full py-4 font-black text-lg flex items-center justify-center gap-2 border-2 border-dark transition-all transform hover:-translate-y-1 hover:shadow-sketch
                  ${isSaved 
                    ? 'bg-green-400 text-white cursor-default' 
                    : 'bg-dark text-white hover:bg-white hover:text-dark'
                  }`}
              >
                {isSaved ? (
                  <>
                    <Check size={20} strokeWidth={3} />
                    <span className="font-bold">已保存!</span>
                  </>
                ) : (
                  <>
                    <Save size={20} strokeWidth={3} />
                    <span className="font-bold">保存结果</span>
                  </>
                )}
            </button>

            <button
              onClick={handleExportImage}
              disabled={isExporting}
              className="w-full py-4 font-black text-lg flex items-center justify-center gap-2 border-2 border-dark bg-secondary text-dark transition-all transform hover:-translate-y-1 hover:shadow-sketch hover:bg-white"
            >
               <Download size={20} strokeWidth={3} />
               <span className="font-bold">保存图片</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};