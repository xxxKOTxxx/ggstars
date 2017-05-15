export default class Dropdown {
  constructor(button_selector, dropdown_selector) {
    this.button_selector = button_selector;
    this.dropdown_selector = dropdown_selector;

    this.dropdown_buttons = document.querySelectorAll(button_selector);
    this.setDropdowns();
  }

  setDropdowns() {
    $(document).on(
      'click',
      this.button_selector,
      (event) => {
        this.toggleDropdown(event);
      }
    );
    document.addEventListener(
      'click',
      (event) => {
        this.checkClose(event);
      }
    );
  }

  toggleDropdown(event) {
    let button = event.currentTarget;
    let dropdown = $(button).siblings(this.dropdown_selector);
    let is_open = dropdown.hasClass('open');
    this.closeDropdowns();
    if(!is_open) {
      dropdown.addClass('open');
    }
  }

  checkClose(event) {
    if(!$(this.dropdown_selector + '.open').length) {
      return false;
    }
    let target = event.target;
    if($(target).closest(this.dropdown_selector).length + $(target).closest(this.dropdown_buttons).length == 0) {
      this.closeDropdowns();
    }
    return false;
  }

  closeDropdowns() {
    $.each(
      $(this.dropdown_selector),
      (index, dropdown_item)=> {
        $(dropdown_item).removeClass('open');
      }
    );
  }
}

