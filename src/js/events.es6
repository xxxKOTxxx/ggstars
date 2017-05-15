export default class Events {
  constructor(vk_selector) {
    this.vk = $(vk_selector);
    this.locales = {
      en: 'en_US',
      ru: 'ru_RU',
      ua: 'uk_UA'
    };
    this.setEvents();
  }

  setEvents() {
    this.VK_Widget_Init();
    this.FB_init();
    this.TW_init();
  }

  VK_Widget_Init() {
    window.vkAsyncInit = function() {
      window.VK.init({
        apiId: 21644457
      });

      window.VK.Widgets.Group(
        'vk_groups',
        {
          mode: 3,
          width: 'auto',
          height: '200',
          color1: 'FFFFFF',
          color2: '2B587A',
          color3: '5B7FA6'
        },
        21644457
      );
    };

    setTimeout(function() {
      let el = document.createElement('script');
      el.type = 'text/javascript';
      el.src = 'https://vk.com/js/api/openapi.js?146';
      el.async = true;
      this.vk.append(el);
    }.bind(this), 0);
  }

  FB_init() {
    let locale = this.locales[window.language];
    (function (d, s, id, locale) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/' + locale + '/sdk.js#xfbml=1&version=v2.8&appId=1476563799316625';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk', locale));
  }

  TW_init() {
    window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };
      return t;
    }(document, 'script', 'twitter-wjs'));
  }
}