import { luhnCheck } from './validator';
import { getCardType } from './cardType';

export default class CreditCardValidator {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      throw new Error(`Container "${containerSelector}" not found`);
    }

    // Находим элементы внутри контейнера
    this.form = this.container.querySelector('#card-form');
    this.input = this.container.querySelector('#card-input');
    this.resultDiv = this.container.querySelector('#result');
    this.icons = this.container.querySelectorAll('.card-icon');

    // Привязываем обработчики
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.input.addEventListener('input', () => this.handleInput());
  }

  resetIcons() {
    this.icons.forEach(icon => icon.classList.remove('active'));
  }

  highlightCardType(type) {
    if (!type) return;
    const activeIcon = this.container.querySelector(`#${type}-icon`);
    if (activeIcon) activeIcon.classList.add('active');
  }

  validateCard(value) {
    const isValid = luhnCheck(value);
    const type = getCardType(value);

    this.resetIcons();
    this.highlightCardType(type);

    if (isValid) {
      this.resultDiv.textContent = `Карта валидна (${type || 'unknown'})`;
      this.resultDiv.className = 'valid';
    } else {
      this.resultDiv.textContent = 'Неверный номер карты';
      this.resultDiv.className = 'invalid';
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.validateCard(this.input.value);
  }

  handleInput() {
    const type = getCardType(this.input.value);
    this.resetIcons();
    this.highlightCardType(type);
    this.resultDiv.textContent = '';
  }
}
