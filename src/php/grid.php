<?php

  function generateTeam() {
    $adjective = [
      'Суеверные',
      'Веселые',
      'Трудные',
      'Эпичные',
      'Лютые',
      'Чугунные',
      'Адские',
      'Отважные',
      'Ебанутые',
      'Звонкие',
      'Честные',
      'Ходячие',
      'Сталинские',
      'Тупые',
      'Мертвые',
      'Злые',
      'Рваные',
      'Жадные',
      'Добрые',
      'Злюки',
      'Пьяные',
      'Позорные',
      'Вялые',
      'Бодрые',
      'Наглые',
      'Ссущие',
      'Пидарастические',
      'Двуличные',
      'Сукины',
    ];
    $noun = [
      'атеисты',
      'алкаши',
      'подростки',
      'фейлы',
      'вины',
      'скороходы',
      'черти',
      'капитаны',
      'дебилы',
      'пиастры',
      'депутаты',
      'мертвецы',
      'соколы',
      'бараны',
      'души',
      'пули',
      'жопы',
      'попы',
      'клопы',
      'бобры',
      'волки',
      'выхухли',
      'пенсионеры',
      'морды',
      'ангелы',
      'гомофобы',
      'гермофродиты',
      'дети',
    ];
    $icon = '/images/tmp/'.rand(1, 32).'.jpg';
    $name = $adjective[rand(0, count($adjective) - 1)].' '.$noun[rand(0, count($noun) - 1)];
    return [
      'icon' => $icon,
      'name' => $name,
      'winner' => false
    ];
  }

  function getTeams($limit = 0) {
    $teams = [];
    for($i=0; $i < $limit; $i++) {
      array_push($teams, generateTeam());
    }
    return $teams;
  }
  function getGroups($teams) {
    $sword = [];
    $axe = [];
    $both = array(&$sword, &$axe);
    array_walk(
      $teams,
      function($v, $k) use ($both) {
        $both[$k % 2][] = $v;
      }
    );
    $groups = [
      'sword' => $sword,
      'champion' => [],
      'axe' => $axe
    ];
    return $groups;
  }

  function getStages($group) {
    $stage = [];
    $counter = 0;
    while(count($group) > 1) {
      $stage[$counter] = array_chunk($group, 2);
      $group = [];
      foreach($stage[$counter] as $index => $round) {
        $coin = rand(0, 1);
        $winner = $round[$coin];
        $stage[$counter][$index][$coin]['winner'] = true;
        array_push($group, $winner);
      }
      $counter++;
    }
    return $stage;
  }

  function getChampion($grid) {
    $finalists = [];
    foreach($grid as $name => $block) {
      if($name != 'champion') {
        foreach($block[count($block) - 1][0] as $semifinalist) {
          if($semifinalist['winner']) {
            array_push($finalists, $semifinalist);
          }
        }
      }
    }
    $coin = rand(0, 1);
    return $finalists[$coin];
  }

  function getGrid($groups) {
    $grid = [];
    foreach($groups as $name => $group) {
      $grid[$name] = getStages($group);
    }
    $grid['champion'] = getChampion($grid);
    return $grid;
  }

  function generateGrid($size) {
    $sizes = [4,8,16,32,64];
    if($size < 0 || $size > count($sizes)) {
      return false;
    }
    $selected_teams = getTeams($sizes[$size]);
    $groups = getGroups($selected_teams);
    $grid = getGrid($groups);
    return $grid;
  }
?>