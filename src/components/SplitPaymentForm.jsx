import { useState } from 'react';
import { Send, Users } from 'lucide-react';

export default function SplitPaymentForm({ onSend, loading }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipient || !amount) return;
    onSend(recipient, amount);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-semibold text-slate-100">Split Payment with Friend</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Friend's Stellar Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="G..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Split Amount (XLM)
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.0000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
            <span className="absolute right-4 top-2.5 text-slate-500 font-medium">XLM</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !recipient || !amount}
          className="w-full flex items-center justify-center space-x-2 bg-indigo-500 hover:bg-indigo-600 transition-colors text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
            <span>Processing...</span>
          ) : (
            <>
              <span>Send Invite & Pay</span>
              <Send className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
