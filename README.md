# JEP Snap for MetaMask

Protect your assets from malicious transactions with verifiable JEP receipts.

## ✨ Features

- **🛡️ Transaction Risk Analysis** - Automatically detects high-risk transactions
- **✅ User Confirmation** - Shows clear warnings before risky operations
- **🔐 JEP Receipts** - Generates verifiable evidence for every transaction
- **📝 Audit Log** - Stores all transaction receipts locally
- **🔍 Export Evidence** - Retrieve receipts when needed

## 📥 Installation

1. Install MetaMask Flask (or MetaMask with Snaps support)
2. [Add JEP Snap to MetaMask](https://metamask.io/snaps)
3. Start using!

## 🔧 Development

```bash
# Clone repository
git clone https://github.com/jep-eth/jep-snap.git
cd jep-snap

# Install dependencies
cd packages/snap
npm install

# Build
npm run build

# Test locally
npm run serve
```

## 📄 License

MIT
```

4. 点击 **Commit new file**

---

## **文件6：`.gitignore`**（项目根目录）

1. **Add file** → **Create new file**
2. 文件名输入：`.gitignore`
3. 粘贴：

```
# Dependencies
node_modules/

# Build output
dist/
build/
packages/*/dist/
packages/*/build/

# Environment
.env
.env.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
