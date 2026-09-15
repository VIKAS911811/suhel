import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { PLACEHOLDERS } from '../data/groupData';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = message.trim() || 'Hello SR Group team, I am interested in your industrial engineering, fabrication, pipeline, and power solution services. Please contact me.';
    const encoded = encodeURIComponent(finalMsg);
    const whatsappUrl = `https://wa.me/${PLACEHOLDERS.whatsappNumber}?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* WhatsApp Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-fadeIn text-left">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-3.5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">SR GROUP Enquiry Desk</h4>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  Online for Industrial Quotes
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSend} className="p-3 space-y-2 bg-slate-900">
            <p className="text-[11px] text-slate-300">
              Send a quick direct WhatsApp message to our engineering team regarding your project scope.
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="E.g., Need quotation for 500T structural fabrication & HT panel installation..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 rounded flex items-center justify-center gap-1.5 transition-colors shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95"
        title="Chat with SR GROUP on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-slate-950 animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-slate-950"></span>
        <MessageSquare className="w-6 h-6 fill-current stroke-none" />
      </button>
    </div>
  );
};
