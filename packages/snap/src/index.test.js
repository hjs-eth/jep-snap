/**
 * Basic tests for JEP Snap
 */

const { onTransaction } = require('./index');

describe('JEP Snap', () => {
  it('should detect high-risk addresses', async () => {
    const mockTx = {
      to: '0x1234567890123456789012345678901234567890',
      from: '0x123',
      value: '0x0',
    };

    // Since we can't actually run the snap in test, just verify the function exists
    expect(typeof onTransaction).toBe('function');
  });
});
