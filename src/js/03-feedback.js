import throttle from 'lodash.throttle';

const feebackForm = document.querySelector('.feedback-form');
let formInputValue = {};
const submitBTN = 'feedback-form-state';

feebackForm.addEventListener('submit', submitFeedbacForm);

function storageInputValue(ev) {
  formInputValue[ev.target.name] = ev.target.value;
  const inputValue = JSON.stringify(formInputValue);
  localStorage.setItem(submitBTN, inputValue);
}

function submitFeedbacForm(ev) {
  ev.preventDefault();
  ev.currentTarget.reset();
  localStorage.removeItem(submitBTN);
  console.log(formInputValue);
}

function presentStorageValue() {
  const StorageValue = localStorage.getItem(submitBTN);
  if (StorageValue) {
    formInputValue = JSON.parse(StorageValue);
    feebackForm.email.value = formInputValue.email ? formInputValue.email : '';
    feebackForm.message.value = formInputValue.message
      ? formInputValue.message
      : '';
  }
}

presentStorageValue();

feebackForm.addEventListener('input', throttle(storageInputValue, 500));
