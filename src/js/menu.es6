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
    this.setMenu();
  }

  setMenu() {
    let self = this;
    $('body').mCustomScrollbar({
      theme: 'minimal',
      mouseWheel: {
        enable: true,
        scrollAmount: 80
      },
      advanced: {
        updateOnImageLoad: false,
        updateOnContentResize: true,
      },
      alwaysShowScrollbar: 2,
      documentTouchScroll: true,
      // mouseWheelPixels: 110,
      scrollInertia: 0,
      autoHideScrollbar: false,
      callbacks:{
        onScroll: function() {
          if($(this).data('mCS').trigger === 'external') {
            self.lock = false;
            self.checkMenu();
          }
        },
        whileScrolling: function() {
          self.checkMenu();
        }
      }
    });
    this.restoreScroll();
    this.menu_links.on('click', this.menuHandler.bind(self));
    this.logo.on('click', this.scrollTop.bind(self));
    this.logo.on('click', this.scrollTop.bind(self));
    $(window).on('resize', this.checkResize.bind(self));
    $(window).on('scroll', this.checkMenu.bind(self));
    this.checkResize();
  }

  scrollTop() {
    $('body').mCustomScrollbar('scrollTo', '#intro');
  }

  saveScroll() {
    let position = Math.abs(parseInt($('#mCSB_1_container').css('top')));
    $.cookie('scroll_position', position);
  }

  restoreScroll() {
    let position = parseInt($.cookie('scroll_position')) || false;
    if(position) {
      $('body').mCustomScrollbar(
        'scrollTo',
        position,
        {
          scrollInertia: 0
        }
      );
    }
  }

  checkMenu() {
    if(this.lock) {
      return false;
    }
    let id = '#' + this.getCurrentBlock().attr('id');
    this.setRunner(id);
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

  menuHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    let target = $(event.currentTarget);
    if(target.parent().hasClass('active')) {
      return false;
    }
    this.lock = true;
    let target_id = target.attr('href');
    this.setRunner(target_id);
    $('body').mCustomScrollbar('scrollTo', target_id);
  }

  getCurrentBlock() {
    let result;
    let viewTop = $(window).scrollTop() + this.header_height;
    let content_blocks = this.content_blocks.length;
    $.each(
      this.content_blocks,
      (index, block)=> {
        let block_offset = Math.floor($(block).offset().top);
        if(viewTop < block_offset) {
          result = $(this.content_blocks[index - 1]);
          return false;
        }
        if(index + 1 == content_blocks) {
          result = $(block);
          return false;
        }
      }
    );
    return result;
  }
  
  setRunner(id) {
    let item = this.menu_blocks.indexOf(id);
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
      if(id !== '#intro') {
        position = this.menu.outerWidth();
      }
    }
    this.runner.css({
      'width': `${width}px`,
      'left': `${position}px`
    });
    this.saveScroll();
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
}