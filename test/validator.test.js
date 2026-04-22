import { luhnCheck } from '../src/validator';

describe('Luhn Algorithm', () => {
  test('should return true for valid Visa', () => {
    expect(luhnCheck('4111111111111111')).toBe(true);
  });

  test('should return true for valid Mastercard', () => {
    expect(luhnCheck('5555555555554444')).toBe(true);
  });

  test('should return true for valid Amex', () => {
    expect(luhnCheck('378282246310005')).toBe(true);
  });

  test('should return false for invalid number', () => {
    expect(luhnCheck('4111111111111112')).toBe(false);
  });

  test('should return false for empty string', () => {
    expect(luhnCheck('')).toBe(false);
  });
});
