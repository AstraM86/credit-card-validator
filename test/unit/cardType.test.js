import { getCardType } from '../../src/js/cardType';

describe('Card Type Detection', () => {
  test('detects Visa', () => {
    expect(getCardType('4111111111111111')).toBe('visa');
  });

  test('detects MasterCard', () => {
    expect(getCardType('5500000000000004')).toBe('mastercard');
  });

  test('detects American Express', () => {
    expect(getCardType('340000000000009')).toBe('amex');
    expect(getCardType('370000000000002')).toBe('amex');
  });

  test('detects Discover', () => {
    expect(getCardType('6011000000000004')).toBe('discover');
    expect(getCardType('6500000000000002')).toBe('discover');
  });

  test('detects Mir', () => {
    expect(getCardType('2200774546102058')).toBe('mir');
  });

  test('returns unknown for unrecognized prefix', () => {
    expect(getCardType('9999999999999999')).toBe('unknown');
  });

  test('handles empty string', () => {
    expect(getCardType('')).toBe('unknown');
  });
});
