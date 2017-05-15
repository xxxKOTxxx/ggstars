export default class Bets {
  constructor(bets_selector, show_selector, hide_selector) {
    this.bets = $(bets_selector);
    this.scroll = $('.scroll-table');
    this.show = $(show_selector);
    this.hide = $(hide_selector);
    this.switch = $('.switch-column');
    this.sword = this.bets.find('.axe');
    this.axe = this.bets.find('.sword');
    this.hide_selector = 'hide-column';
    this.setBets();
  }

  setScroll() {
    this.scroll.mCustomScrollbar({
      theme: 'minimal',
      axis: 'y',
      scrollbarPosition: 'outside',

      advanced: {
        updateOnContentResize: true
      }
    });
  }

  switchColumn() {
    this.sword.toggleClass(this.hide_selector);
    this.axe.toggleClass(this.hide_selector);
  }

  setBets() {
    this.switch.on(
      'click',
      this.switchColumn.bind(this)
    );
    this.show.on(
      'click',
      this.showBets.bind(this)
    );
    this.hide.on(
      'click',
      this.hideBets.bind(this)
    );
    this.setScroll();
  }

  showBets() {
    this.bets.addClass('show');
    this.show.addClass('hide');
    this.hide.removeClass('hide');
  }

  hideBets() {
    this.bets.removeClass('show');
    this.show.removeClass('hide');
    this.hide.addClass('hide');
  }
}