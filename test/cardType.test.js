import { getCardType } from '../src/cardType';

describe('Card Type Detection', () => {
  test('Visa', () => {
    expect(getCardType('4111111111111111')).toBe('visa');
    expect(getCardType('4012888888881881')).toBe('visa');
  });

  test('Mastercard', () => {
    expect(getCardType('5555555555554444')).toBe('mastercard');
    expect(getCardType('2223000048400011')).toBe('mastercard');
  });

  test('American Express', () => {
    expect(getCardType('378282246310005')).toBe('amex');
    expect(getCardType('371449635398431')).toBe('amex');
  });

  test('Discover', () => {
    expect(getCardType('6011111111111117')).toBe('discover');
    expect(getCardType('6011000990139424')).toBe('discover');
  });

  test('JCB', () => {
    expect(getCardType('3530111333300000')).toBe('jcb');
    expect(getCardType('3566002020360505')).toBe('jcb');
  });

  test('Diners Club', () => {
    expect(getCardType('30569309025904')).toBe('diners');
  });

  test('Mir', () => {
    expect(getCardType('2200123456789010')).toBe('mir');
  });

  test('Unknown', () => {
    expect(getCardType('1234567890123456')).toBe(null);
  });
});
