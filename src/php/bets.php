<?php
  $min_bets = 5;
  $max_bets = 20;
  $min_bet = 1;
  $max_bet = 100;


  function generateName() {
    $name = [
      'first' => [
        'Больной',
        'Грязный',
        'Великий',
        'Розовый',
        'Бешенный',
        'Старый',
        'Веселый',
        'Слепой',
        'Черный',
        'Пьяный',
        'Скупой',
        'Русский',
        'Белый',
        'Черный',
        'Утконосый',
        'Плохой',
        'Хороший',
        'Адский',
        'Хитрый',
        'Ушлый',
      ],
      'second' => [
        'ублюдок',
        'Гарри',
        'немой',
        'пони',
        'Макс',
        'пердун',
        'Роджер',
        'Пью',
        'плащ',
        'мачо',
        'рыцарь',
        'богатырь',
        'негр',
        'альбинос',
        'утконос',
        'актер',
        'папа',
        'сатана',
        'дрыщ',
        'жид',
      ]
    ];
    return $name['first'][rand(0, count($name['first']) - 1)].' '.$name['second'][rand(0, count($name['second']) - 1)];
  }

  function getBets() {
    return [
      'sword' => [],
      'axe' => []
    ];
  }

  function fillBets($min_bets, $max_bets, $min_bet, $max_bet, $coefficients, $data) {
    foreach($data as $team => $group) {
      $bets = [];
      $total = [
       'bets' => rand($min_bets, $max_bets),
       'sum' => 0
      ];
      for($i = 0; $i < $total['bets']; $i++) {
        $player = generateName();
        $icon = '/images/tmp/'.rand(1, 32).'.jpg';
        $bet = rand($min_bet, $max_bet);
        $total['sum'] += $bet;
        $date = date("d.m.Y");
        $time = date("H:i");
        $gain = $coefficients[$team] * $bet;
        $bets[] = [
          'player' => $player,
          'icon' => $icon,
          'bet' => $bet,
          'date' => $date,
          'time' => $time,
          'gain' => $gain
        ];
      }
      $data[$team] = [
        'bets' => $bets,
        'total' => $total
      ];
    }
    return $data;
  }

  $bets = getBets();
  $bets = fillBets($min_bets, $max_bets, $min_bet, $max_bet, $coefficients, $bets);
?>