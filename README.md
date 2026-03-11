# JEP Snap for MetaMask

🛡️ **Protect your assets from malicious transactions with verifiable JEP receipts**

[![npm version](https://img.shields.io/npm/v/jep-snap)](https://www.npmjs.com/package/jep-snap)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **🛡️ Transaction Risk Analysis** | Automatically detects high-risk transactions before you sign |
| **✅ User Confirmation** | Shows clear warnings with risk levels (low/medium/high) |
| **🔐 JEP Receipts** | Generates verifiable, cryptographically signed receipts for every transaction |
| **📝 Audit Log** | Stores all transaction receipts locally in your MetaMask |
| **🔍 Export Evidence** | Retrieve receipts anytime as proof of transaction approval |

---

## 🚀 Why You Need This

**In 2025 alone, users lost over $4.4 billion to malicious transactions.**

JEP Snap adds a security layer between you and every transaction:

1. **Analyzes** each transaction for risk
2. **Warns** you if something looks suspicious
3. **Records** every approval as verifiable evidence
4. **Protects** you from signing away your assets

---

## 📥 Installation

### Method 1: From MetaMask Snaps Directory (Recommended)

1. Open MetaMask
2. Go to Settings → Snaps
3. Search for "JEP Guard"
4. Click Install

### Method 2: Direct Link

Visit [MetaMask Snaps Directory](https://snaps.metamask.io/snap/npm/jep-snap) and click "Add to MetaMask"

### Method 3: Development Installation

```bash
# Clone repository
git clone https://github.com/jep-eth/jep-snap.git
cd jep-snap/packages/snap

# Install dependencies
npm install

# Build and test locally
npm run build
npm run serve
```

---

## 🔧 How It Works

When you initiate a transaction, JEP Snap:

1. **Analyzes** the destination address and function call
2. **Checks** against known malicious patterns
3. **Shows** a risk assessment dialog
4. **Records** your decision as a verifiable JEP receipt
5. **Stores** the receipt for future reference

### Risk Levels

| Level | Color | Action |
|-------|-------|--------|
| **Low** | 🟢 Green | Normal transaction, logged automatically |
| **Medium** | 🟡 Yellow | Shows warning, requires confirmation |
| **High** | 🔴 Red | Shows urgent warning, requires explicit approval |

---

## 📊 Example Receipt

```json
{
  "version": "1.0",
  "timestamp": "2026-03-11T14:30:00Z",
  "transaction": {
    "to": "0x1234...",
    "value": "1.5 ETH",
    "function": "approve"
  },
  "risk": "medium",
  "approved": true,
  "receiptHash": "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
}
```

---

## 🔐 Security

- **No private keys** - Your keys never leave MetaMask
- **Local storage** - All receipts stored in your local MetaMask state
- **Open source** - Fully auditable code
- **JEP Protocol** - Based on IETF Internet-Draft standard

---

## 📄 License

MIT © JEP Foundation

---

## 🔗 Links

- **GitHub**: [https://github.com/jep-eth/jep-snap](https://github.com/jep-eth/jep-snap)
- **JEP Protocol**: [https://github.com/hjs-spec/jep-spec](https://github.com/hjs-spec)
- **IETF Draft**: [https://datatracker.ietf.org/doc/draft-wang-hjs-judgment-event/](https://datatracker.ietf.org/doc/draft-wang-hjs-judgment-event/)

---

## 🤝 Contributing

Issues and PRs welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
```
