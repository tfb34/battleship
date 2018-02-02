import _ from 'lodash';
import ship from './ship';

let battleship = ship({length: 5});
console.log(battleship);

function component() {
  var element = document.createElement('div');

 // lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
