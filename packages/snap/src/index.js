/**
 * JEP Snap for MetaMask
 * Protects users from malicious transactions by:
 * 1. Analyzing transaction risk
 * 2. Showing confirmation dialogs
 * 3. Generating JEP receipts as evidence
 */

const { panel, heading, text, divider } = require('@metamask/snaps-sdk');

// High-risk addresses (known malicious contracts)
const HIGH_RISK_ADDRESSES = [
  // Add known malicious addresses here
  // This could be fetched from a remote source
];

// High-risk function signatures
const HIGH_RISK_SIGNATURES = [
  '0x095ea7b3', // approve
  '0xa9059cbb', // transfer
  '0x23b872dd', // transferFrom
  '0x42966c68', // burn
];

/**
 * Check if a transaction is high-risk
 */
function isHighRiskTransaction(transaction) {
  // Check recipient address
  if (HIGH_RISK_ADDRESSES.includes(transaction.to?.toLowerCase())) {
    return { risk: 'high', reason: 'Known malicious address' };
  }

  // Check function signature
  if (transaction.data) {
    const signature = transaction.data.slice(0, 10);
    if (HIGH_RISK_SIGNATURES.includes(signature)) {
      return { risk: 'medium', reason: 'High-risk function call' };
    }
  }

  // Check value
  if (transaction.value && transaction.value > 0) {
    const valueInEth = parseInt(transaction.value, 16) / 1e18;
    if (valueInEth > 10) {
      return { risk: 'medium', reason: `Large transfer: ${valueInEth} ETH` };
    }
  }

  return { risk: 'low', reason: 'Normal transaction' };
}

/**
 * Generate a JEP receipt for the transaction
 */
async function generateJEPReceipt(transaction, risk, approved) {
  const receipt = {
    version: '1.0',
    timestamp: new Date().toISOString(),
    transaction: {
      to: transaction.to,
      from: transaction.from,
      value: transaction.value,
      data: transaction.data ? transaction.data.slice(0, 10) + '...' : null,
    },
    risk: risk,
    approved: approved,
    snapVersion: '0.1.0',
    receiptHash: '0x' + Math.random().toString(36).substring(2, 15) // Placeholder
  };

  // Store receipt in snap state
  const state = await snap.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  const currentState = state || { receipts: [] };
  currentState.receipts.push(receipt);

  await snap.request({
    method: 'snap_manageState',
    params: ['update', currentState],
  });

  return receipt;
}

/**
 * Main transaction insight handler
 */
module.exports.onTransaction = async ({ transaction }) => {
  // Analyze risk
  const { risk, reason } = isHighRiskTransaction(transaction);

  // Build dialog content
  const dialogContent = panel([
    heading(risk === 'high' ? '⚠️ HIGH RISK TRANSACTION' : '🛡️ Transaction Review'),
    divider(),
    text(`**To:** ${transaction.to || 'Unknown'}`),
    text(`**Value:** ${transaction.value ? parseInt(transaction.value, 16) / 1e18 + ' ETH' : '0 ETH'}`),
    text(`**Risk Level:** ${risk.toUpperCase()} - ${reason}`),
  ]);

  // Show confirmation dialog for medium/high risk
  if (risk !== 'low') {
    const confirmation = await snap.request({
      method: 'snap_dialog',
      params: {
        type: 'confirmation',
        content: dialogContent,
      },
    });

    // Generate receipt
    await generateJEPReceipt(transaction, { risk, reason }, confirmation);

    return {
      insights: {
        risk: risk,
        reason: reason,
        warning: risk === 'high' ? '⚠️ This transaction appears malicious!' : undefined,
      },
    };
  }

  // For low-risk transactions, just log
  await generateJEPReceipt(transaction, { risk, reason }, true);

  return {
    insights: {
      risk: risk,
      reason: reason,
    },
  };
};

/**
 * Handle RPC requests from dApps
 */
module.exports.onRpcRequest = async ({ request }) => {
  const { method, params } = request;

  switch (method) {
    case 'jep_getReceipts':
      const state = await snap.request({
        method: 'snap_manageState',
        params: ['get'],
      });
      return state?.receipts || [];

    case 'jep_clearReceipts':
      await snap.request({
        method: 'snap_manageState',
        params: ['update', {}],
      });
      return { success: true };

    default:
      throw new Error('Method not found');
  }
};
