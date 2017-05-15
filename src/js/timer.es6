export default class Timer {
  constructor(timer_selector, recruited_selector) {
    let now = new Date().getTime();
    this.time_left = (window.tournament_date - now) / 1000;
    if(this.time_left < 0) {
      this.time_left = 0;
    }
    this.timer_node = $(timer_selector);

    this.recruited_now = window.recruited;
    this.recruited_node = $(recruited_selector);
    this.setTimer();
  }

  setTimer() {
    this.timer = new window.FlipClock(
      this.timer_node,
      this.time_left,
      {
        clockFace: 'DailyCounter',
        countdown: true,
        language: window.language
      }
    );
    this.recruited = new window.FlipClock(
      this.recruited_node,
      this.recruited_now,
      {
        clockFace: 'Teams',
        autoStart: false,
        minimumDigits: 2,
        language: window.language
      }
    );
  }
}