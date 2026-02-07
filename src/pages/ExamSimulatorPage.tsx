import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getModules } from '../data';
import Quiz from '../components/Quiz';

export const ExamSimulatorPage = () => {
    const { lang } = useAppContext();
    const navigate = useNavigate();
    const isRTL = lang === 'he';

    const [isStarted, setIsStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
    const [questions, setQuestions] = useState<any[]>([]);

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

    const startExam = () => {
        // Gather all questions from all modules
        const modules = getModules(lang);
        const allQuestions = modules.flatMap(m => m.questions);

        // Shuffle and pick 20
        const shuffled = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 20);

        // If not enough questions, just duplicate for demo match
        if (shuffled.length < 5) {
            // Mock questions if empty for demo
            const mockQ = [
                { id: 'mq1', text: 'Which layer is responsible for Routing?', options: ['Layer 2', 'Layer 3', 'Layer 4', 'Layer 1'], correctIndex: 1, explanation: 'Layer 3 (Network) handles logical addressing and routing.' },
                { id: 'mq2', text: 'What is the PDU of Layer 4?', options: ['Frame', 'Packet', 'Segment', 'Bit'], correctIndex: 2, explanation: 'Transport layer uses Segments.' },
                { id: 'mq3', text: 'Which protocol is connection-oriented?', options: ['UDP', 'IP', 'TCP', 'Ethernet'], correctIndex: 2, explanation: 'TCP establishes a connection (Handshake) before sending data.' },
                { id: 'mq4', text: 'What is a Private IP address?', options: ['8.8.8.8', '192.168.1.1', '1.1.1.1', '172.217.1.1'], correctIndex: 1, explanation: '192.168.x.x is a private range (Class C).' },
            ];
            setQuestions(mockQ);
        } else {
            setQuestions(shuffled);
        }

        setIsStarted(true);
    };

    const handleComplete = (score: number) => {
        // Save score via API later
        console.log("Exam finished, score:", score);
    };

    if (!isStarted) {
        return (
            <div className="flex flex-col grow h-full bg-slate-50 dark:bg-background-dark items-center justify-center p-6">
                <div className="max-w-md w-full bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-slate-200 dark:border-card-border p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <Clock size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Final Exam Simulator</h1>
                    <p className="text-slate-500 mb-8">
                        You are about to start a timed mock exam.
                        <br />
                        <span className="font-bold">20 Questions • 30 Minutes</span>
                    </p>

                    <button onClick={startExam} className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/30">
                        Start Exam Now
                    </button>
                    <button onClick={() => navigate('/')} className="w-full mt-4 text-slate-500 font-medium hover:text-slate-900 dark:hover:text-white">
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col grow h-full bg-slate-50 dark:bg-background-dark">
            {/* Exam Header */}
            <div className="bg-white dark:bg-card-dark border-b border-slate-200 dark:border-card-border px-6 py-4 flex justify-between items-center sticky top-0 z-40">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <AlertCircle size={20} className="text-orange-500" />
                    Mock Exam
                </div>
                <div className={`font-mono text-xl font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-slate-700 dark:text-slate-200'}`}>
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="max-w-3xl mx-auto w-full p-6">
                <Quiz
                    questions={questions}
                    onComplete={handleComplete}
                    language={lang}
                    isExamMode={true} // Add this prop to Quiz to hide per-question feedback if needed, or keep it for learning
                />
            </div>
        </div>
    );
};
