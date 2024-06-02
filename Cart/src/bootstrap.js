import faker from 'faker';

const mount = (el) => {
  const cartText = `<div>You have ${faker.random.number()} items in your cart</div>`;

  el.innerHTML = cartText;
};

// Check if we're running this project in development and in isolation!
if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#cart-dev');

  if (el) {
    mount(el);
  }
}

export { mount };
