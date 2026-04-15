import { useState, useEffect } from 'react';
import WalletConnect from './components/WalletConnect';
import BalanceCard from './components/BalanceCard';
import SplitPaymentForm from './components/SplitPaymentForm';
import TransactionStatus from './components/TransactionStatus';
import { connectWallet, getAccountBalance, sendPayment } from './services/stellar';

function App() {
  const [publicKey, setPublicKey] = useState(null);
  const [balance, setBalance] = useState('0.00');
  const [loading, setLoading] = useState(false);
  
  // Transaction State
  const [txStatus, setTxStatus] = useState('idle'); // idle, success, error
  const [txHash, setTxHash] = useState('');
  const [txError, setTxError] = useState('');

  const handleConnect = async () => {
    setLoading(true);
    try {
      const pk = await connectWallet();
      if (pk) {
        setPublicKey(pk);
        await updateBalance(pk);
      }
    } catch (error) {
      console.error("Wallet connection failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    // Freighter doesn't have a strict disconnect, so we just clear local state
    setPublicKey(null);
    setBalance('0.00');
    setTxStatus('idle');
  };

  const updateBalance = async (pk) => {
    try {
      const bal = await getAccountBalance(pk);
      setBalance(bal);
    } catch (error) {
      setBalance('Error fetching');
    }
  };

  const handleSendPayment = async (recipient, amount) => {
    if (!publicKey) return;
    
    setLoading(true);
    setTxStatus('idle');
    setTxError('');
    setTxHash('');

    try {
      const result = await sendPayment(publicKey, recipient, amount);
      setTxStatus('success');
      setTxHash(result.hash);
      // Refresh balance after sending
      setTimeout(() => updateBalance(publicKey), 4000);
    } catch (error) {
      setTxStatus('error');
      setTxError(error.message || 'Transaction failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md mx-auto space-y-8">
        
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Smart Split & Pay
          </h1>
          <p className="mt-2 text-slate-400">
            Easily split bills and send XLM to friends on Testnet.
          </p>
        </div>

        <WalletConnect 
          publicKey={publicKey} 
          onConnect={handleConnect} 
          onDisconnect={handleDisconnect}
          loading={loading && !publicKey} 
        />

        {publicKey && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BalanceCard balance={balance} />
            
            <SplitPaymentForm 
              onSend={handleSendPayment} 
              loading={loading}
            />

            <TransactionStatus 
              status={txStatus}
              error={txError}
              hash={txHash}
              onClear={() => setTxStatus('idle')}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
