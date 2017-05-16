export default class Menu {
  constructor() {
    this.lock = false;
    this.animated = false;
    this.header = $('header');
    this.logo = this.header.find('.logo');
    this.header_height = this.header.outerHeight();
    this.menu = this.header.find('.menu');
    this.runner = this.menu.find('.runner');
    this.content_blocks = $('.content-block');
    this.menu_items = this.menu.find('.menu-item');
    this.menu_links = this.menu_items.find('a');
    this.menu_blocks = $.map(
      this.menu_links, 
      (link)=> {
        return $(link).attr('href');
      }
    );
    this.animation_time = 200;
    this.setMenu();
    this.last_hash = false;
  }

  loadScrollPosition() {
    let position = parseInt($.cookie('scroll_position')) || false;
    return position;
  }
  restoreScroll() {
    let position = this.loadScrollPosition();
    console.log('position', position);
    if(position) {
      scrollTo(position, 0)
    }
  }

  getPosition(hash = false) {
    let position = 0;
    if(!hash) {
      position = Math.floor($(window).scrollTop() + this.header_height);
    }
    else {
      position = Math.floor($(hash).offset().top) - this.header_height;
    }
    return position;
  }

  getCurrentBlock() {
    let result;
    let viewTop = this.getPosition();
    let content_blocks = this.content_blocks.length;
    $.each(
      this.content_blocks,
      (index, block)=> {
        let hash = '#' + $(block).attr('id');
        let block_offset = this.getPosition(hash);
        if(viewTop < block_offset) {
          result = '#' + $(this.content_blocks[index - 1]).attr('id');
          return false;
        }
        if(index + 1 == content_blocks) {
          result = hash;
          return false;
        }
      }
    );
    return result;
  }

  scrollTo(hash = false, time = this.animation_time) {
    let position = 0;
    if(typeof hash != 'number') {
      position = this.getPosition(hash);
    }
    $('html, body').animate(
      {
        scrollTop: position
      },
      time,
      ()=> {
        this.lock = false;
        this.saveScrollPosition();
      }
    );
  }

  scrollTop(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.scrollTo(0);
  }

  saveScrollPosition() {
    let position = this.getPosition();
    $.cookie('scroll_position', position);
  }

  setRunner(hash) {
    if(this.lock) {
      return false;
    }
    let item = this.menu_blocks.indexOf(hash);
    let position = 0;
    let width = 0;
    $(this.menu_items).removeClass('active');
    if(item > -1) {
      let link = $(this.menu_links[item]);
      $(this.menu_items[item]).addClass('active');
      position = Math.round(link.offset().left - this.menu.offset().left + ((link.outerWidth() - link.width()) / 2));
      width = Math.round(link.width());
    }
    else {
      if(hash !== '#intro') {
        position = this.menu.outerWidth();
      }
    }
    this.runner.css({
      'width': `${width}px`,
      'left': `${position}px`
    });
    if(!this.animated) {
      let self = this;
      setTimeout(
        ()=> {
          self.menu.addClass('animated');
          self.animated = true;
        },
        0
      );
    }
  }

  menuHandler(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let element = $(event.currentTarget);
    if(!element.parent('.active').length) {
      this.lock = true;
      let hash = element[0].hash;
      this.setRunner(hash);
      this.scrollTo(hash);
    }
  }

  checkMenu() {
    if(this.lock) {
      return false;
    }
    let hash = this.getCurrentBlock();
    if(this.last_hash == hash) {
      return false;
    }
    this.last_hash = hash;
    this.setRunner(hash);
  }

  checkResize() {
    let width = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    if(width < 720) {
      this.menu.removeClass('static');
      this.menu.addClass('dropdown');
    }
    else {
      this.menu.removeClass('open dropdown ');
      this.menu.addClass('static');
    }
    let self = this;
    setTimeout(
      ()=> {
        self.checkMenu();
      },
      200
    );
  }

  setMenu() {
    let self = this;
    this.restoreScroll();
    this.logo.on('click', this.scrollTop.bind(self));
    this.menu_links.on('click', this.menuHandler.bind(self));
    $(window).on('scroll', this.checkMenu.bind(self));
    $(window).on('resize', this.checkResize.bind(self));
    this.checkResize();
  }

}