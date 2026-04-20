import { luhnCheck } from '../../src/js/validator';

describe('Luhn Algorithm', () => {
  test('valid Visa number', () => {
    expect(luhnCheck('4111111111111111')).toBe(true);
  });

  test('valid MasterCard number', () => {
    expect(luhnCheck('5500000000000004')).toBe(true);
  });

  test('valid Mir number', () => {
    expect(luhnCheck('2200774546102058')).toBe(true);
  });

  test('invalid number', () => {
    expect(luhnCheck('1234567890123456')).toBe(false);
  });

  test('handles non-digit characters', () => {
    expect(luhnCheck('4111 1111 1111 1111')).toBe(true);
  });

  test('empty string returns false', () => {
    expect(luhnCheck('')).toBe(false);
  });
});
