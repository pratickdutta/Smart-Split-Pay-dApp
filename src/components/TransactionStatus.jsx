import { CheckCircle2, XCircle, ExternalLink } from 'lucide-react';

export default function TransactionStatus({ status, error, hash, onClear }) {
  if (status === 'idle') return null;

  return (
    <div className={`p-4 rounded-xl shadow-lg border relative ${
      status === 'success' 
        ? 'bg-emerald-500/10 border-emerald-500/30' 
        : 'bg-red-500/10 border-red-500/30'
    }`}>
      <button 
        onClick={onClear}
        className="absolute top-2 right-2 text-slate-400 hover:text-slate-200"
      >
        &times;
      </button>

      <div className="flex items-start space-x-3">
        {status === 'success' ? (
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
        )}
        
        <div className="pr-4">
          <h4 className={`font-semibold ${status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
            {status === 'success' ? 'Transaction सफल!' : 'Transaction Failed'}
          </h4>
          
          {status === 'success' && hash && (
            <div className="mt-2">
              <p className="text-slate-300 text-sm mb-1">Hash:</p>
              <a 
                href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono bg-slate-900/50 p-2 rounded block break-all text-indigo-300 hover:text-indigo-200 flex items-center group"
              >
                {hash}
                <ExternalLink className="w-3 h-3 ml-2 opacity-50 group-hover:opacity-100" />
              </a>
            </div>
          )}

          {status === 'error' && error && (
            <p className="mt-1 text-sm text-slate-300 break-words">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
