import { luhnCheck } from './validator';
import { getCardType } from './cardType';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('card-form');
  const input = document.getElementById('card-input');
  const messageDiv = document.getElementById('message');
  const icons = document.querySelectorAll('.card-icon');

  function resetActiveIcons() {
    icons.forEach(icon => icon.classList.remove('active'));
  }

  function showMessage(text, isValid) {
    messageDiv.textContent = text;
    messageDiv.className = isValid ? 'valid' : 'invalid';
  }

  function validateCard(number) {
    const isValid = luhnCheck(number);
    const type = getCardType(number);

    // Подсвечиваем иконку соответствующей системы
    resetActiveIcons();
    if (type !== 'unknown') {
      const activeIcon = document.querySelector(`.card-icon.${type}`);
      if (activeIcon) {
        activeIcon.classList.add('active');
      }
    }

    if (isValid) {
      showMessage(`Карта валидна (${type})`, true);
    } else {
      showMessage('Номер карты недействителен', false);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cardNumber = input.value.trim();
    if (cardNumber === '') {
      showMessage('Введите номер карты', false);
      resetActiveIcons();
      return;
    }
    validateCard(cardNumber);
  });

  input.addEventListener('input', () => {
    const number = input.value.trim();
    if (number === '') {
      resetActiveIcons();
      messageDiv.textContent = '';
      messageDiv.className = '';
      return;
    }
    const type = getCardType(number);
    resetActiveIcons();
    if (type !== 'unknown') {
      const activeIcon = document.querySelector(`.card-icon.${type}`);
      if (activeIcon) {
        activeIcon.classList.add('active');
      }
    }
  });
});
