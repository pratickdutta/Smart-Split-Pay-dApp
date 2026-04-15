export default function BalanceCard({ balance }) {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
      
      <p className="text-indigo-100 text-sm font-medium mb-1 relative z-10">Total Balance</p>
      <div className="flex items-baseline space-x-2 relative z-10">
        <h1 className="text-4xl font-bold">{balance}</h1>
        <span className="text-xl font-medium text-indigo-200">XLM</span>
      </div>
    </div>
  );
}
