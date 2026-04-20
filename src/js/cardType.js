/**
 * Определяет платёжную систему по номеру карты
 * @param {string} cardNumber - номер карты без пробелов
 * @returns {string} тип карты ('visa', 'mastercard', 'amex', 'discover', 'mir', 'unknown')
 */
export function getCardType(cardNumber) {
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length === 0) return 'unknown';

  const firstDigit = cleaned.charAt(0);
  const firstTwo = cleaned.substring(0, 2);

  // Мир: начинается с 2
  if (firstDigit === '2') return 'mir';

  // Visa: начинается с 4
  if (firstDigit === '4') return 'visa';

  // MasterCard: 51-55 или 2221-2720 (упрощённо: первая цифра 5)
  if (firstDigit === '5') return 'mastercard';

  // American Express: 34 или 37
  if (firstTwo === '34' || firstTwo === '37') return 'amex';

  // Discover: 6011, 65, 644-649, 622126-622925 (упрощённо: первая цифра 6)
  if (firstDigit === '6') return 'discover';

  return 'unknown';
}
