export default class Grid {
  constructor(grid_selector, show_selector, hide_selector) {
    this.grid = $(grid_selector);
    this.show = $(show_selector);
    this.hide = $(hide_selector);
    this.setGrid();
  }

  setGrid() {
    this.show.on(
      'click',
      this.showGrid.bind(this)
    );
    this.hide.on(
      'click',
      this.hideGrid.bind(this)
    );
  }

  showGrid() {
    this.grid.addClass('show');
    this.show.addClass('hide');
    this.hide.removeClass('hide');
  }

  hideGrid() {
    this.grid.removeClass('show');
    this.show.removeClass('hide');
    this.hide.addClass('hide');
  }
}