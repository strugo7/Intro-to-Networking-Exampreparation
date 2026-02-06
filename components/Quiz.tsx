import React, { useState } from 'react';
import { Question, Language } from '../types';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
  language: Language;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete, language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onComplete(score);
    }
  };

  const isRTL = language === Language.HE;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 mt-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          {language === Language.EN ? 'Question' : 'שאלה'} {currentIndex + 1} / {questions.length}
        </span>
        <span className="text-sm font-bold text-primary">
            {language === Language.EN ? 'Score: ' : 'ניקוד: '}{score}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-6">{currentQuestion.text}</h3>

      <div className="space-y-3">
        {currentQuestion.options.map((option, idx) => {
          let styles = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 flex justify-between items-center ";
          
          if (isAnswered) {
             if (idx === currentQuestion.correctIndex) {
                 styles += "border-green-500 bg-green-50 text-green-700";
             } else if (idx === selectedOption) {
                 styles += "border-red-500 bg-red-50 text-red-700";
             } else {
                 styles += "border-gray-200 text-gray-400";
             }
          } else {
             styles += "border-gray-200 hover:border-primary hover:bg-blue-50 cursor-pointer";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={styles}
              disabled={isAnswered}
            >
              <span className={isRTL ? "ml-2" : "mr-2"}>{option}</span>
              {isAnswered && idx === currentQuestion.correctIndex && <CheckCircle size={20} className="text-green-500" />}
              {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && <XCircle size={20} className="text-red-500" />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start gap-3">
                <AlertCircle className="text-primary shrink-0 mt-1" size={20} />
                <div>
                    <h4 className="font-semibold text-primary mb-1">
                        {language === Language.EN ? 'Explanation' : 'הסבר'}
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{currentQuestion.explanation}</p>
                </div>
            </div>
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isAnswered 
              ? 'bg-primary text-white hover:bg-blue-700 shadow-md' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentIndex === questions.length - 1 
            ? (language === Language.EN ? 'Finish' : 'סיים') 
            : (language === Language.EN ? 'Next Question' : 'השאלה הבאה')}
        </button>
      </div>
    </div>
  );
};

export default Quiz;