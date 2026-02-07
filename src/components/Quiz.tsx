import React, { useState } from 'react';
import { Question, Language } from '../types';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Clock, ChevronLeft } from 'lucide-react';

interface QuizProps {
    questions: Question[];
    onComplete: (score: number) => void;
    language: Language;
    isExamMode?: boolean;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete, language, isExamMode = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
    const [isFinished, setIsFinished] = useState(false);

    const currentQuestion = questions[currentIndex];
    const isRTL = language === Language.HE;

    const handleSelect = (optionIndex: number) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentIndex] = optionIndex;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
            const score = userAnswers.reduce((acc, ans, idx) => {
                return acc + (ans === questions[idx].correctIndex ? 1 : 0);
            }, 0);
            onComplete(score);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const calculateScore = () => {
        return userAnswers.reduce((acc, ans, idx) => {
            return acc + (ans === questions[idx].correctIndex ? 1 : 0);
        }, 0);
    };

    if (isFinished) {
        const score = calculateScore();
        const percentage = Math.round((score / questions.length) * 100);
        const circumference = 2 * Math.PI * 45; // r=45 (viewbox 100)
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <div className="max-w-6xl mx-auto px-4 py-8" dir="ltr">
                <div className="flex flex-wrap gap-2 mb-8 text-sm text-slate-500 dark:text-[#9dabb9]">
                    <span>Home</span> / <span>Module Assessment</span> / <span className="text-slate-900 dark:text-white font-medium">Results</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Score Card */}
                    <section className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-white dark:bg-[#1A222C] rounded-xl p-8 border border-slate-200 dark:border-[#283039] shadow-sm flex flex-col items-center text-center">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                                {percentage >= 70 ? 'Great Job! 🎉' : 'Keep Learning!'}
                            </h1>
                            <p className="text-slate-500 dark:text-[#9dabb9] text-sm md:text-base mb-8">
                                {percentage >= 70 ? "You've mastered the fundamentals of this module." : "Review the material and try again to improve your score."}
                            </p>

                            {/* Circular Progress */}
                            <div className="relative size-48 md:size-56 mb-6">
                                <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                                    <circle className="text-slate-100 dark:text-[#283039]" strokeWidth="8" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                                    <circle
                                        className="text-primary drop-shadow-[0_0_10px_rgba(19,127,236,0.5)] transition-all duration-1000 ease-out"
                                        strokeWidth="8"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="45" cx="50" cy="50"
                                    />
                                </svg>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                    <span className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white block">{percentage}%</span>
                                    <span className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mt-1">Score</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                                <span className="material-symbols-outlined text-[18px]">trending_up</span>
                                {percentage > 0 ? `Better than last time` : `First attempt`}
                            </div>

                            <button className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                                Continue Learning <ArrowRight size={20} />
                            </button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white dark:bg-[#1A222C] rounded-lg p-4 border border-slate-200 dark:border-[#283039] flex flex-col items-center justify-center gap-1">
                                <CheckCircle className="text-green-500" size={24} />
                                <span className="text-xl font-bold text-slate-900 dark:text-white">{score}</span>
                                <span className="text-xs text-slate-500 dark:text-[#9dabb9] font-medium">Correct</span>
                            </div>
                            <div className="bg-white dark:bg-[#1A222C] rounded-lg p-4 border border-slate-200 dark:border-[#283039] flex flex-col items-center justify-center gap-1">
                                <XCircle className="text-red-500" size={24} />
                                <span className="text-xl font-bold text-slate-900 dark:text-white">{questions.length - score}</span>
                                <span className="text-xs text-slate-500 dark:text-[#9dabb9] font-medium">Incorrect</span>
                            </div>
                            <div className="bg-white dark:bg-[#1A222C] rounded-lg p-4 border border-slate-200 dark:border-[#283039] flex flex-col items-center justify-center gap-1">
                                <Clock className="text-amber-500" size={24} />
                                <span className="text-xl font-bold text-slate-900 dark:text-white">--:--</span>
                                <span className="text-xs text-slate-500 dark:text-[#9dabb9] font-medium">Time</span>
                            </div>
                        </div>
                    </section>

                    {/* Right Column: Breakdown */}
                    <section className="lg:col-span-7 flex flex-col h-full">
                        <div className="bg-white dark:bg-[#1A222C] rounded-xl border border-slate-200 dark:border-[#283039] flex flex-col flex-grow overflow-hidden">
                            <div className="p-6 border-b border-slate-200 dark:border-[#283039] bg-slate-50 dark:bg-[#161b22]">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Question Breakdown</h3>
                                <p className="text-sm text-slate-500 dark:text-[#9dabb9]">Review your answers and learn from explanations.</p>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[800px]">
                                {questions.map((q, idx) => {
                                    const isCorrect = userAnswers[idx] === q.correctIndex;
                                    const userAnswerIndex = userAnswers[idx];

                                    return (
                                        <div key={q.id} className={`group flex flex-col gap-4 p-5 rounded-lg border transition-colors ${isCorrect ? 'border-slate-200 dark:border-[#3b4754] hover:bg-slate-50 dark:hover:bg-[#232b35]' : 'border-red-200 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10 hover:border-red-300'}`}>
                                            <div className="flex justify-between items-start gap-4">
                                                <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100 leading-snug">
                                                    {idx + 1}. {q.text}
                                                </h4>
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap ${isCorrect ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'}`}>
                                                    {isCorrect ? <CheckCircle size={14} /> : <XCircle size={14} />} {isCorrect ? 'Correct' : 'Incorrect'}
                                                </span>
                                            </div>

                                            {!isCorrect && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wide">Your Answer</span>
                                                        <span className="text-slate-700 dark:text-slate-300 font-medium line-through decoration-red-500 decoration-2">
                                                            {userAnswerIndex !== null ? q.options[userAnswerIndex] : 'Skipped'}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wide">Correct Answer</span>
                                                        <span className="text-green-600 dark:text-green-400 font-bold">{q.options[q.correctIndex]}</span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className={`mt-2 pt-4 ${!isCorrect ? 'border-t border-red-200/50 dark:border-red-800/20' : ''}`}>
                                                {isCorrect ? (
                                                    <div className="flex flex-col gap-1 text-sm mt-1">
                                                        <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wide">Your Answer</span>
                                                        <span className="text-slate-900 dark:text-white font-medium">{q.options[q.correctIndex]}</span>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                        <strong className="text-slate-800 dark:text-slate-200">Explanation:</strong> {q.explanation}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    // Active Quiz Interface
    return (
        <div className="w-full max-w-[960px] mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-8" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Progress Section */}
            <div className="flex flex-col gap-3">
                <div className="flex gap-6 justify-between items-end">
                    <div>
                        <h1 className="text-xl font-bold dark:text-white text-slate-900">Module Quiz</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">Question {currentIndex + 1} of {questions.length}</p>
                    </div>
                    <p className="text-primary text-sm font-bold bg-primary/10 px-3 py-1 rounded-full">
                        {Math.round(((currentIndex) / questions.length) * 100)}% Complete
                    </p>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all duration-500 ease-out" style={{ width: `${((currentIndex) / questions.length) * 100}%` }}></div>
                </div>
            </div>

            {/* Question Card */}
            <div className="relative overflow-hidden rounded-2xl bg-[#1c222f] shadow-xl border border-slate-200 dark:border-slate-700/50">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-stretch min-h-[240px]">
                    <div className="flex-1 p-8 flex flex-col justify-center gap-4">
                        <span className="inline-flex w-fit items-center gap-1 rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20">
                            Assessment
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            {currentQuestion.text}
                        </h3>
                        <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
                            Select the best answer from the options below.
                        </p>
                    </div>
                    {/* Visual Side */}
                    <div className="hidden md:block w-1/3 bg-cover bg-center border-l border-white/5" style={{ backgroundImage: "linear-gradient(to right, #1c222f, transparent), url('https://images.unsplash.com/photo-1558494949-efdeb6bf80d1?auto=format&fit=crop&q=80')" }}>
                    </div>
                </div>
            </div>

            {/* Answer Options */}
            <div className="grid gap-4">
                {currentQuestion.options.map((option, idx) => {
                    const isSelected = userAnswers[currentIndex] === idx;
                    return (
                        <label key={idx} className="group cursor-pointer relative">
                            <input
                                type="radio"
                                name={`question-${currentQuestion.id}`}
                                className="peer sr-only"
                                checked={isSelected}
                                onChange={() => handleSelect(idx)}
                            />
                            <div className={`flex items-center gap-5 rounded-xl border-2 bg-white dark:bg-[#151b26] p-5 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-[#1a212e] transition-all duration-200 ease-in-out ${isSelected ? 'border-primary bg-primary/5 dark:bg-primary/5' : 'border-slate-200 dark:border-slate-700'}`}>
                                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${isSelected ? 'border-primary bg-primary' : 'border-slate-300 dark:border-slate-500'}`}>
                                    {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-base font-semibold transition-colors ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
                                        {option}
                                    </span>
                                </div>
                            </div>
                        </label>
                    );
                })}
            </div>

            {/* Actions Bar */}
            <div className="mt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold transition-colors flex items-center justify-center gap-2 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed text-slate-400' : 'text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                    <ChevronLeft size={20} />
                    Previous
                </button>

                <button
                    onClick={handleNext}
                    disabled={userAnswers[currentIndex] === null}
                    className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 ${userAnswers[currentIndex] === null ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed shadow-none' : 'bg-primary text-white hover:bg-blue-600 shadow-primary/25 hover:shadow-primary/40'}`}
                >
                    {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    <ArrowRight size={20} />
                </button>
            </div>

            <div className="h-10"></div>
        </div>
    );
};

export default Quiz;