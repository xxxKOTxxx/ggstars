<?php
  $languages = ['ru', 'ua', 'en'];
  $current_language = 'ru';
  if(isset($_GET['language']) && in_array($_GET['language'], $languages)) {
    $current_language = $_GET['language'];
  };
  $available_languages = array_diff($languages, [$current_language]);
  $lang = $current_language == 'ua' ? 'uk' : $current_language;

  $title = 'GGStars.com :: Игровые турниры и матчи League of Legends и StarCtaft 2';
  $description = 'На нашем портале вы можете участвовать в игровых турнирах и матчах League of Legends и StarCtaft 2';
  $keywords = 'league of legends, игровые турниры, starcraft 2, киберспортивная дисциплина, матчи по киберспорту, заработок на играх, матчи lol, матчи starcraft 2, турниры по лиге легенд, новости lol, гайды, обзоры игр, стримы';

  $recruited = 8;
  $tournament_date = 1495596800000;
  include 'php/grid.php';
  $grid = generateGrid(2);

  function getRandomCofficient() {
    $random = rand(1, 300);
    return number_format($random / 100, 2);
  }
  $coefficients = [
    'sword' => getRandomCofficient(),
    'axe' => getRandomCofficient()
  ];
  $bet = [
    'sword' => [
      'name' => generateTeam()['name'],
      'coefficient' => $coefficients['sword']
    ],
    'axe' => [
      'name' => generateTeam()['name'],
      'coefficient' => $coefficients['axe']
    ],
  ];

  include 'php/bets.php';
  include 'templates/index.php';
?>