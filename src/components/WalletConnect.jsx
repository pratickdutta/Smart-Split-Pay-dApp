import { Wallet } from 'lucide-react';

export default function WalletConnect({ publicKey, onConnect, onDisconnect, loading }) {
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 5)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-500/20 p-2 rounded-lg">
          <Wallet className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">Your Wallet</h2>
          {publicKey ? (
            <p className="text-sm text-slate-400 font-mono">{formatAddress(publicKey)}</p>
          ) : (
            <p className="text-sm text-slate-400">Not connected</p>
          )}
        </div>
      </div>
      
      {publicKey ? (
        <button
          onClick={onDisconnect}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 transition-colors text-sm font-medium rounded-lg text-slate-300"
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={onConnect}
          disabled={loading}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 transition-colors text-sm font-medium rounded-lg text-white shadow-md shadow-indigo-500/20 disabled:opacity-50"
        >
          {loading ? 'Connecting...' : 'Connect Freighter'}
        </button>
      )}
    </div>
  );
}
