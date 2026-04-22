import './style.css';
import CreditCardValidator from './app';

import visaImg from './img/visa.svg';
import mastercardImg from './img/mastercard.svg';
import amexImg from './img/amex.svg';
import discoverImg from './img/discover.svg';
import jcbImg from './img/jcb.png';
import dinersImg from './img/diners.png';
import mirImg from './img/mir.png';

// Функция для установки src изображениям
function setImageSrc(id, src) {
  const img = document.getElementById(id);
  if (img) img.src = src;
}

document.addEventListener('DOMContentLoaded', () => {
  setImageSrc('visa-icon', visaImg);
  setImageSrc('mastercard-icon', mastercardImg);
  setImageSrc('amex-icon', amexImg);
  setImageSrc('discover-icon', discoverImg);
  setImageSrc('jcb-icon', jcbImg);
  setImageSrc('diners-icon', dinersImg);
  setImageSrc('mir-icon', mirImg);

  new CreditCardValidator('.container');
});