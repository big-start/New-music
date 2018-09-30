require('normalize.css');
require('@/main.css');

import template from '@/templates/test.hbs';

const app = document.getElementById('app');
const logoSrc = require('@/assets/images/yeoman-logo.png');
const logo = document.createElement('img');
const content = document.createElement('div');

content.innerHTML = template({name: 'world (example)!'});

console.log('test-hbs', template({name: 'world (example)!'}));

logo.setAttribute('src', logoSrc);
app.appendChild(logo);
app.appendChild(content);

// function append() {
//   require.ensure(['jquery'], require => {
//     const $ = require('jquery')
//     $('#app').append(logo)
//   })
// }

// setTimeout(append, 0)
