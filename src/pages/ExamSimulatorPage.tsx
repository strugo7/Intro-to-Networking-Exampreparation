import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, AlertCircle, PlayCircle, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getModules } from '../data';
import Quiz from '../components/Quiz';
import { EXAMS, Exam } from '../data/exams';
import { Language } from '../types';

export const ExamSimulatorPage = () => {
    const { lang } = useAppContext();
    const navigate = useNavigate();
    const isRTL = lang === 'he';

    const [isStarted, setIsStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30 * 60); // Default 30 minutes
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentExamTitle, setCurrentExamTitle] = useState("");
    const [quizLanguage, setQuizLanguage] = useState(lang);

    useEffect(() => {
        if (isStarted && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(p => p - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [isStarted, timeLeft]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const startExam = (exam?: Exam) => {
        if (exam) {
            // Start specific exam
            setQuestions(exam.questions);
            setCurrentExamTitle(exam.title);
            // Adjust time based on question count? Let's say 1.5 min per question or just 1 hour for 40 questions
            // Standard exam time: 40 questions -> 60 minutes maybe?
            setTimeLeft(60 * 60);
            setQuizLanguage(Language.EN);
        } else {
            // Random Mix (old behavior)
            const modules = getModules(lang);
            const allQuestions = modules.flatMap(m => m.questions);
            const shuffled = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 20);

            if (shuffled.length < 5) {
                // Should not happen with real data, but fallback
                setQuestions([]);
            } else {
                setQuestions(shuffled);
            }
            setCurrentExamTitle("Random Practice Exam");
            setTimeLeft(30 * 60);
            setQuizLanguage(lang as Language);
        }

        setIsStarted(true);
    };

    const handleComplete = (score: number) => {
        // Save score via API later
        console.log("Exam finished, score:", score);
    };

    if (!isStarted) {
        return (
            <div className="flex flex-col grow h-full bg-slate-50 dark:bg-background-dark items-center justify-center p-6 overflow-y-auto">
                <div className="max-w-4xl w-full bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-slate-200 dark:border-card-border p-8">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                            <Clock size={32} />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Exam Simulator</h1>
                        <p className="text-slate-500 max-w-lg mx-auto">
                            Select an exam to test your knowledge. These realistic exams simulate the final test environment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Pre-defined Exams */}
                        {EXAMS.map((exam) => (
                            <div key={exam.id} className="group relative bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all hover:shadow-md cursor-pointer" onClick={() => startExam(exam)}>
                                <div className="absolute top-4 right-4 text-slate-400 group-hover:text-primary transition-colors">
                                    <PlayCircle size={24} />
                                </div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
                                        <BookOpen size={20} />
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{exam.title}</h3>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 h-10 line-clamp-2">
                                    {exam.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                                    <span className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">{exam.questions.length} Questions</span>
                                    <span>~60 Mins</span>
                                </div>
                            </div>
                        ))}

                        {/* Random Mix Option */}
                        <div className="group relative bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 transition-all hover:shadow-md cursor-pointer" onClick={() => startExam()}>
                            <div className="absolute top-4 right-4 text-slate-400 group-hover:text-amber-500 transition-colors">
                                <PlayCircle size={24} />
                            </div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-amber-500/10 text-amber-600 rounded-lg">
                                    <Clock size={20} />
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Random Practice</h3>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 h-10">
                                A randomized mix of questions from all learning modules to test general knowledge.
                            </p>
                            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                                <span className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">20 Questions</span>
                                <span>30 Mins</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button onClick={() => navigate('/')} className="text-slate-500 font-medium hover:text-slate-900 dark:hover:text-white transition-colors">
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col grow h-full bg-slate-50 dark:bg-background-dark">
            {/* Exam Header */}
            <div className="bg-white dark:bg-card-dark border-b border-slate-200 dark:border-card-border px-6 py-4 flex justify-between items-center sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <button onClick={() => {
                        if (confirm("Are you sure you want to quit the exam? Progress will be lost.")) {
                            setIsStarted(false);
                            setQuestions([]);
                        }
                    }} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <AlertCircle size={20} className="text-orange-500" />
                        {currentExamTitle}
                    </div>
                </div>
                <div className={`font-mono text-xl font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-slate-700 dark:text-slate-200'}`}>
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="max-w-3xl mx-auto w-full p-6 pb-20">
                <Quiz
                    questions={questions}
                    onComplete={handleComplete}
                    language={quizLanguage}
                    isExamMode={true}
                />
            </div>
        </div>
    );
};
