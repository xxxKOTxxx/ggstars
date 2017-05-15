require('../stylus/style');

import Menu from './menu';
import Dropdown from './dropdown';
import Scroll from './scroll';
import Timer from './timer';
import Grid from './grid';
import Bets from './bets';
import Events from './events';

document.addEventListener('DOMContentLoaded', ()=> {
  new Menu('.dropdown-button', '.dropdown');
  new Dropdown('.dropdown-button', '.dropdown');
  new Timer('#timer', '#recruited');
  new Scroll('.scroll-wrap');
  new Grid('.grid-wrap', '.show-grid', '.hide-grid');
  new Bets('.bets-wrap', '.show-bets', '.hide-bets');
  new Events('#vk_groups');
});