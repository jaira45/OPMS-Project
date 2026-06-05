import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome to OPMS. How may I assist you with your luxury property search today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages([...messages, userMsg]);
        setInput('');

        setTimeout(() => {
            const botMsg = { 
                id: Date.now() + 1, 
                text: getBotResponse(input), 
                sender: 'bot' 
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    const getBotResponse = (query) => {
        const q = query.toLowerCase();
        if (q.includes('indore')) return "We have exclusive penthouse listings in Vijay Nagar and Nipania, Indore. Shall I curate a selection for you?";
        if (q.includes('bhopal')) return "Arera Colony and Gulmohar are prime locations in Bhopal. I can schedule a private viewing for you.";
        if (q.includes('price') || q.includes('budget')) return "Our premium portfolio starts from ₹2Cr. We can tailor recommendations to your specific investment profile.";
        if (q.includes('contact') || q.includes('agent')) return "Our senior advisors are available for consultation. You can reach them at concierge@opms.com.";
        return "I am here to assist with your high-end real estate requirements. Could you specify your preferred location or property type?";
    };

    return (
        <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[1000] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, originY: 'bottom', originX: 'right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="w-[320px] sm:w-[400px] h-[500px] bg-white dark:bg-[#0A1120] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 flex flex-col overflow-hidden mb-6"
                    >
                        {/* Header */}
                        <div className="bg-[#061B45] p-6 text-white flex justify-between items-center border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30 shadow-inner">
                                    <Sparkles className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm tracking-wide">Elite Concierge</p>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <p className="text-[10px] font-medium opacity-60">Active Now</p>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-slate-50 dark:bg-[#0A1120]">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                                        msg.sender === 'user' 
                                            ? 'bg-[#061B45] text-white rounded-tr-none' 
                                            : 'bg-white dark:bg-[#16213E] text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-white/5'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-[#0A1120] border-t border-slate-100 dark:border-white/5 pt-6">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Inquire about properties..."
                                    className="w-full bg-slate-50 dark:bg-[#16213E] border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-accent/50 outline-none transition-all pr-14 dark:text-white"
                                />
                                <button 
                                    onClick={handleSend}
                                    className="absolute right-2 w-10 h-10 bg-accent text-[#061B45] rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-[10px] text-center mt-4 opacity-30 font-medium">Powered by OPMS Intelligence</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-[0_15px_30px_rgba(6,27,69,0.3)] transition-all relative z-[1001] ${
                    isOpen ? 'bg-slate-800' : 'bg-[#061B45]'
                }`}
            >
                {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
}
