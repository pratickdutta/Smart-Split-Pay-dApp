# Smart Split & Pay — Stellar dApp

<div align="center">

**Split bills instantly. Send XLM to friends. Live on-chain.**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-smart--split--ebon.vercel.app-00d4ff?style=for-the-badge)](https://smart-split-ebon.vercel.app/)
[![Stellar](https://img.shields.io/badge/Network-Stellar%20Testnet-7c3aed?style=flat-square)](https://stellar.org)
[![React](https://img.shields.io/badge/Frontend-React%20+%20Vite-61dafb?style=flat-square)](https://react.dev)
[![Three.js](https://img.shields.io/badge/3D-Three.js%20+%20R3F-white?style=flat-square)](https://threejs.org)

</div>

---

## Description

Smart Split & Pay is a Web3 dApp built on the **Stellar Testnet** that lets friends connect their wallets, view live XLM balances, and split bills by sending payments directly on-chain — no middlemen, no delay.

By framing transactions around everyday bill-splitting, it bridges the gap between raw crypto transfers and real-world utility. The interface features a cinematic **Interstellar-themed 3D background** (star field, wormhole ring, ringed planet) powered by Three.js, with a premium glassmorphism UI built in React + Tailwind CSS.

### Key Features

| Feature | Description |
|---|---|
| 🔗 **Wallet Connect** | One-click Freighter integration with live connection status |
| 💰 **Live Balance** | Real-time XLM balance via Stellar Horizon API |
| ✈️ **Split & Pay** | Send XLM to any Stellar address in one transaction |
| 📡 **TX Feedback** | Success/error status with Explorer hash link |
| 🛸 **Freighter Guard** | Auto-detects missing extension, shows install guide |
| 🌌 **3D Space UI** | Interstellar scene: stars, wormhole ring, planet, crystals |

---

## System Design & Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        USER BROWSER                          │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                React Frontend  (Vite)                 │  │
│  │                                                       │  │
│  │   Background3D.jsx        App.jsx (Root State)        │  │
│  │   ─ Star field            ─ publicKey                 │  │
│  │   ─ Wormhole ring         ─ balance                   │  │
│  │   ─ Ringed planet         ─ txStatus / txHash         │  │
│  │   ─ Nebula clouds                                     │  │
│  │   ─ Data crystals         WalletConnect.jsx           │  │
│  │                           BalanceCard.jsx             │  │
│  │   FreighterNotice.jsx     SplitPaymentForm.jsx        │  │
│  │   ─ Extension toast       TransactionStatus.jsx       │  │
│  └───────────────────────────────────────────────────────┘  │
│                             │                                │
└─────────────────────────────┼────────────────────────────────┘
                              │
           ┌──────────────────┴──────────────────┐
           │                                     │
 ┌─────────▼──────────┐             ┌────────────▼──────────┐
 │ Freighter Extension│             │  Stellar Horizon API  │
 │  (Browser Wallet)  │             │  horizon-testnet      │
 │                    │             │  .stellar.org         │
 │  isConnected()     │             │                       │
 │  getAddress()      │             │  loadAccount()        │
 │  signTransaction() │             │  submitTransaction()  │
 └─────────┬──────────┘             └────────────┬──────────┘
           │                                     │
           └──────────────────┬──────────────────┘
                              │
                   ┌──────────▼──────────┐
                   │   Stellar Testnet   │
                   │   Blockchain        │
                   │                    │
                   │  Asset: XLM native │
                   │  Network: TESTNET  │
                   │  Passphrase signed │
                   └────────────────────┘
```

### Payment Transaction Flow

```
User submits form
      │
      ▼
SplitPaymentForm → onSend(recipient, amount)
      │
      ▼
stellar.js → sendPayment()
      │
      ├── loadAccount(sender)      ← Horizon API: fetch sequence number
      ├── TransactionBuilder
      │     .addOperation(Payment) ← native XLM, recipient, amount
      │     .setTimeout(30)
      │     .build()
      │
      ├── transaction.toXDR()
      │
      ├── Freighter: signTransaction(xdr, 'TESTNET')
      │         └── User approves popup
      │
      ├── TransactionBuilder.fromXDR(signedXdr)
      │
      └── server.submitTransaction()
                └── Stellar Ledger confirmed
                        │
                        ▼
              TransactionStatus.jsx
              ✅  Hash + Explorer link
              ❌  Error message
```

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS + CSS custom properties |
| 3D Graphics | Three.js + `@react-three/fiber` |
| Wallet | Freighter + `@stellar/freighter-api` |
| Blockchain SDK | `@stellar/stellar-sdk` |
| Network | Stellar Testnet — Horizon API |
| Fonts | Inter + Space Grotesk (Google Fonts) |
| Icons | Lucide React |

---

## Setup

### Prerequisites

- **Node.js** v18+
- **[Freighter Wallet](https://www.freighter.app/)** extension (Chrome / Firefox)
  - Set network to **Testnet** in Freighter settings
  - Fund account at [Stellar Friendbot](https://laboratory.stellar.org/#account-creator?network=test)

### Run Locally

```bash
git clone https://github.com/pratickdutta/Smart-Split-Pay-dApp.git
cd Smart-Split-Pay-dApp
npm install
npm run dev
```

Or visit the live deployment → **[smart-split-ebon.vercel.app](https://smart-split-ebon.vercel.app/)**

---

## White Belt Progression

> End-to-end development journey from initial build to final polished submission.

### 🥋 White Belt Certificate

![White Belt Certificate](screenshots/white-belt-certificate.png)

---

### Stage 1 — Landing Page (Wallet Disconnected)

Initial clean state. Premium dark theme with cyan–violet gradient title, glassmorphism wallet card, and live Stellar Testnet badge.

![Stage 1 – Wallet Disconnected](screenshots/01-wallet-disconnected.png)

---

### Stage 2 — 3D Wireframe Background (v1)

First 3D iteration: colorful wireframe geometric objects (tori, icosahedrons, octahedra) floating across the background using React Three Fiber.

![Stage 2 – 3D Wireframe Theme](screenshots/02-3d-wireframe-theme.png)

---

### Stage 3 — Interstellar Space Theme (Final)

Refined to a cinematic Interstellar-inspired scene: 1,800-star deep-space field, pulsing wormhole gravitational ring, ringed planet with atmosphere glow, nebula clouds, and data crystals. Fewer objects, far more majestic.

![Stage 3 – Interstellar Theme](screenshots/03-interstellar-theme.png)

---

### Stage 4 — Wallet Connected + Live Balance

Freighter connected — live testnet XLM balance (`10,000 XLM`) fetched from Stellar Horizon API. Split & Pay form revealed below with recipient address and amount fields.

![Stage 4 – Wallet Connected & Balance](screenshots/04-wallet-connected-balance.png)

---

## Future Scope

- **Group vaults** — Shared on-chain pools via Soroban smart contracts
- **Bill splitting math** — Split a total equally across N friends
- **Transaction history** — View past payments on-chain
- **Mainnet mode** — Production deployment with real XLM

---

> ⚠️ Testnet only. No real value is transferred. Ensure Freighter is set to **Testnet** before use.
