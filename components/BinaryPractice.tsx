import React, { useState, useEffect } from 'react';
import { Lightbulb, CheckCircle, RefreshCw, Cpu } from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface BinaryPracticeProps {
  language: Language;
}

const BinaryPractice: React.FC<BinaryPracticeProps> = ({ language }) => {
  const [targetNumber, setTargetNumber] = useState(0);
  const [bits, setBits] = useState<boolean[]>(new Array(8).fill(false));
  const [isSuccess, setIsSuccess] = useState(false);

  const t = TRANSLATIONS[language];
  const isRTL = language === Language.HE;

  const BIT_VALUES = [128, 64, 32, 16, 8, 4, 2, 1];

  const generateNewNumber = () => {
    // Generate a random number between 1 and 255
    setTargetNumber(Math.floor(Math.random() * 255) + 1);
    setBits(new Array(8).fill(false));
    setIsSuccess(false);
  };

  useEffect(() => {
    generateNewNumber();
  }, []);

  const toggleBit = (index: number) => {
    const newBits = [...bits];
    newBits[index] = !newBits[index];
    setBits(newBits);
    
    // Check if correct
    const currentValue = newBits.reduce((acc, bit, idx) => acc + (bit ? BIT_VALUES[idx] : 0), 0);
    if (currentValue === targetNumber) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  const currentDecimalValue = bits.reduce((acc, bit, idx) => acc + (bit ? BIT_VALUES[idx] : 0), 0);
  const binaryString = bits.map(b => b ? '1' : '0').join(' ');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header Section */}
      <div className="mb-10 text-center md:text-start">
        <div className="flex items-center gap-3 mb-2 justify-center md:justify-start text-primary dark:text-blue-400">
           <Cpu size={28} />
           <span className="text-sm font-bold tracking-wider uppercase">{t.practice}</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">{t.binaryTitle}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">{t.binaryDesc}</p>
      </div>

      {/* Info Card - Octet Method */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-700/30 rounded-2xl p-6 mb-8 relative overflow-hidden">
         <div className="flex flex-col md:flex-row gap-4 items-start relative z-10">
            <div className={`p-3 bg-amber-100 dark:bg-amber-800 text-amber-600 dark:text-amber-200 rounded-xl shrink-0 ${isRTL ? 'order-first' : 'order-first'}`}>
                <Lightbulb size={24} />
            </div>
            <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-100 text-lg mb-1">{t.octetTitle}</h3>
                <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed">{t.octetDesc}</p>
            </div>
         </div>
         {/* Decorative blob */}
         <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-200/30 dark:bg-amber-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Target & Result Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
         <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-card-border p-6 shadow-sm flex flex-col items-center justify-center">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">{t.binaryResult}</span>
            <div className="text-3xl font-mono font-bold text-primary dark:text-blue-400 tracking-widest bg-blue-50 dark:bg-blue-900/20 px-6 py-3 rounded-xl w-full text-center">
                {binaryString}
                <span className="text-slate-300 dark:text-slate-600 ml-2 text-sm select-none">{' {}'}</span>
            </div>
         </div>
         
         <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-card-border p-6 shadow-sm flex flex-col items-center justify-center">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2 text-right w-full">{t.targetDecimal}</span>
            <div className="flex items-center justify-between w-full">
               <span className="text-xs text-slate-300 dark:text-slate-600 font-mono select-none">DEC</span>
               <span className="text-5xl font-bold text-slate-800 dark:text-white">{targetNumber}</span>
               <div></div>
            </div>
         </div>
      </div>

      {/* Interactive Table Section */}
      <div className="mb-8">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4">{t.conversionTable}</h3>
        
        <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-card-border shadow-sm overflow-hidden">
           {/* Headers (Values) */}
           <div className="grid grid-cols-8 border-b border-slate-100 dark:border-card-border bg-slate-50 dark:bg-card-border/30">
              {BIT_VALUES.map((val) => (
                  <div key={val} className="py-4 text-center text-sm font-bold text-slate-700 dark:text-slate-300">{val}</div>
              ))}
           </div>

           {/* Switches */}
           <div className="grid grid-cols-8 py-6">
              {bits.map((isOn, idx) => (
                  <div key={idx} className="flex justify-center border-r border-slate-50 dark:border-card-border last:border-0">
                      <button 
                        onClick={() => toggleBit(idx)}
                        className={`w-12 h-7 rounded-full transition-colors duration-200 ease-in-out relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-card-dark ${isOn ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                      >
                         <span className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
                      </button>
                  </div>
              ))}
           </div>

           {/* Binary Result Row */}
           <div className="grid grid-cols-8 border-t border-slate-100 dark:border-card-border bg-slate-50/50 dark:bg-card-border/10">
              {bits.map((isOn, idx) => (
                  <div key={idx} className={`py-4 text-center font-mono font-bold text-xl ${isOn ? 'text-primary dark:text-blue-400' : 'text-slate-300 dark:text-slate-600'}`}>
                      {isOn ? '1' : '0'}
                  </div>
              ))}
           </div>
        </div>
      </div>

      {/* Success / Next Section */}
      {isSuccess && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
               <div className="bg-emerald-100 dark:bg-emerald-800 p-2 rounded-full text-emerald-600 dark:text-emerald-100">
                  <CheckCircle size={32} />
               </div>
               <div>
                  <h3 className="font-bold text-emerald-800 dark:text-emerald-100 text-lg">{t.success}</h3>
                  <p className="text-emerald-600 dark:text-emerald-300/80 text-sm">{t.successDesc} {currentDecimalValue}.</p>
               </div>
            </div>
            <button 
                onClick={generateNewNumber}
                className="bg-white dark:bg-emerald-800 text-emerald-700 dark:text-white px-6 py-3 rounded-xl font-bold shadow-sm border border-emerald-100 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
                <span>{t.next}</span>
                <RefreshCw size={18} />
            </button>
        </div>
      )}

      {/* Footer hint if stuck */}
      {!isSuccess && currentDecimalValue !== targetNumber && (
         <div className="text-center mt-8 text-slate-400 dark:text-slate-500 text-sm">
            Current Sum: {currentDecimalValue} / Target: {targetNumber}
         </div>
      )}
    </div>
  );
};

export default BinaryPractice;