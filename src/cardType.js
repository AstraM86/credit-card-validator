export function getCardType(cardNumber) {
  const str = cardNumber.toString().replace(/\D/g, '');
  if (str.length === 0) return null;

  // Visa
  if (/^4/.test(str)) return 'visa';
  // Mastercard
  if (/^5[1-5]/.test(str) || /^2(2[2-9][1-9]|[3-6][0-9]{2}|7[0-1][0-9]|720)/.test(str)) return 'mastercard';
  // American Express
  if (/^3[47]/.test(str)) return 'amex';
  // Discover
  if (/^6(?:011|5|4[4-9]|221(?:2[6-9]|[3-9][0-9])|22[2-8][0-9]{2}|22[0-1][0-9]{3}|2[3-6][0-9]{3}|27[0-1][0-9]{2}|2720)/.test(str)) return 'discover';
  // JCB
  if (/^35(2[8-9]|[3-8][0-9])/.test(str)) return 'jcb';
  // Diners Club
  if (/^3(?:0[0-5]|09|6|8|9)/.test(str)) return 'diners';
  // Mir
  if (/^220[0-4]/.test(str)) return 'mir';

  return null;
}
