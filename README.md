# P.A.C.T. - Programmable Asset & Compliance Toolkit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![ICP](https://img.shields.io/badge/ICP-Mainnet-blue)](https://internetcomputer.org/)
[![Story Protocol](https://img.shields.io/badge/Story-Protocol-purple)](https://www.story.foundation/)
[![Constellation](https://img.shields.io/badge/Constellation-Network-green)](https://constellationnetwork.io/)

A multi-chain legal document factory with AI-powered generation, IP licensing, and evidence management built for LegalHack 2025.

## 🎯 Overview

P.A.C.T. is an integrated platform that combines:
- **AI-Powered Legal Document Generation** on Internet Computer Protocol (ICP)
- **IP Registration & Licensing** on Story Protocol
- **Evidence Validation & Compliance** on Constellation Network
- **Bitcoin Payment Integration** for document purchases and royalties

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                  P.A.C.T. Multi-Chain Platform                   │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────┐
│ Constellation│  │     ICP      │  │    Story     │  │ Bitcoin  │
│   DAG Layer  │  │    Layer     │  │  Protocol    │  │  Layer   │
│              │  │              │  │              │  │          │
│ • Evidence   │  │ • AI Gen     │  │ • IP Reg     │  │ • Payment│
│ • Validation │  │ • Smart      │  │ • Licensing  │  │ • Royalty│
│ • Compliance │  │   Contracts  │  │ • Disputes   │  │  Payout  │
│ • Audit Log  │  │ • Storage    │  │ • Royalties  │  │          │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────┘
```

## ✨ Key Features

### 🤖 AI Legal Document Generation
- Generate custom NDAs, contracts, and legal templates in seconds
- AI-powered document customization based on user requirements
- On-chain storage with tamper-proof verification

### 📜 IP Registration & Licensing
- Automatic IP registration on Story Protocol for generated documents
- Programmable IP Licenses (PIL) for template monetization
- Automated royalty distribution to document creators
- Usage tracking and attribution

### 🔐 Evidence Management
- Digital evidence validation on Constellation DAG
- Immutable chain-of-custody records
- Multi-witness cryptographic validation
- Real-time compliance monitoring

### ₿ Bitcoin Integration
- Buy legal templates with Bitcoin
- Automatic Bitcoin royalty payouts
- Non-custodial wallet integration
- Direct Bitcoin-to-lawyer transfers

### 🏢 Enterprise Features
- Multi-user law firm management dashboard
- Role-based access control
- Compliance tracking across 50+ jurisdictions
- Automated settlement execution

## 🚀 Quick Start

### Prerequisites

- Node.js v18+
- Rust 1.70+
- dfx (ICP SDK) 0.15.0+
- Python 3.9+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pact.git
cd pact

# Install dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Install ICP SDK
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

### Local Development

```bash
# Start ICP local replica
dfx start --background

# Deploy canisters locally
dfx deploy

# Start frontend development server
npm run dev

# Start backend API
cd backend && python main.py
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **ICP Candid UI**: http://localhost:8000/?canisterId={canister_id}

## 📁 Project Structure

```
pact/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API services
│   │   └── utils/           # Utility functions
│   └── public/
├── backend/                  # FastAPI backend
│   ├── api/                 # API routes
│   ├── services/            # Business logic
│   │   ├── ai_generator.py
│   │   ├── story_client.py
│   │   └── constellation_client.py
│   └── models/              # Data models
├── canisters/               # ICP Canisters
│   ├── document_factory/    # Rust canister
│   ├── firm_manager/        # Rust canister
│   └── bitcoin_integration/ # Motoko canister
├── contracts/               # Smart contracts
│   └── story/               # Story Protocol contracts
├── constellation/           # Constellation metagraph
│   └── evidence_validator/ 
├── docs/                    # Documentation
└── tests/                   # Test suites
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# ICP Configuration
DFX_NETWORK=ic
CANISTER_ID_DOCUMENT_FACTORY=xxxxx-xxxxx-xxxxx-xxxxx-cai
CANISTER_ID_FIRM_MANAGER=xxxxx-xxxxx-xxxxx-xxxxx-cai

# Story Protocol
STORY_PRIVATE_KEY=your_private_key
STORY_RPC_URL=https://rpc.story.foundation

# Constellation Network
CONSTELLATION_API_KEY=your_api_key
CONSTELLATION_NETWORK_URL=https://api.constellationnetwork.io

# OpenAI
OPENAI_API_KEY=your_openai_key

# Bitcoin
BTC_NETWORK=mainnet
```

## 📚 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Smart Contract Guide](./docs/CONTRACTS.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guidelines](./docs/CONTRIBUTING.md)

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
pytest

# Run ICP canister tests
dfx test

# Run integration tests
npm run test:integration
```

## 🚢 Deployment

### ICP Mainnet Deployment

```bash
# Deploy to ICP mainnet
dfx deploy --network ic

# Get canister IDs
dfx canister --network ic id document_factory
dfx canister --network ic id firm_manager
```

### Story Protocol Deployment

```bash
# Deploy IP licensing contracts
cd contracts/story
npx hardhat deploy --network story-testnet
```

### Constellation Network Deployment

```bash
# Deploy metagraph
cd constellation/evidence_validator
dag deploy --network mainnet
```

## 🎥 Demo Videos

- [2-Minute Platform Overview](https://youtu.be/demo)
- [AI Document Generation Demo](https://youtu.be/demo)
- [IP Licensing Workflow](https://youtu.be/demo)
- [Evidence Validation Demo](https://youtu.be/demo)

## 🛠️ Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- WalletConnect

### Backend
- FastAPI (Python)
- ICP Canisters (Rust + Motoko)
- Story Protocol SDK
- Constellation API Client

### Blockchain
- Internet Computer Protocol
- Story Protocol
- Constellation Network
- Bitcoin

### AI/ML
- OpenAI GPT-4
- LangChain
- Semantic Search

### Storage
- ICP (encrypted documents)
- Constellation (audit logs)
- IPFS (backup storage)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ for LegalHack 2025
