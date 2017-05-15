export default class Scroll {
  constructor(grid_selector) {
    this.grid_node = $(grid_selector);
    this.setScroll();
  }

  centerGrid() {
    this.grid_node.mCustomScrollbar(
      'scrollTo',
      '50%',
      {
        scrollInertia: 0
      }
    );
  }

  setScroll() {
    this.grid_node.mCustomScrollbar({
      axis: 'x',
      scrollButtons: {
        enable: true
      },
      // autoHideScrollbar: true,
      callbacks:{
        onUpdate: ()=> {
          this.centerGrid();
        }
      }
    });
  }
}