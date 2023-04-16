import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

// zapis lub aktualizacja w lokalnej pamięci istniejącego czasu video
// setItem(key, value)
const savePlayerTime = throttle(data => {
  // console.log(data.seconds);
  localStorage.setItem('videoplayer-current-time', data.seconds), 1000;
});

const endPlayerTime = function () {
  localStorage.removeItem('videoplayer-current-time');
  player.unload();
};

player.on('play', function () {
  console.log('played the video!');
});
player.on('timeupdate', savePlayerTime);
player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
player.on('ended', endPlayerTime);

// odczyt zapisanego czasu video z lokalnej pamięci
const getLocalTime = () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime === 0) return 0;

  const parsedTime = JSON.parse(savedTime); // zmniejszamy(sprasowujemy) dane czasu zapisanego w lokalnej pamięci
  return Number(parsedTime);
};

const resumePlayerOnLastTime = () => {
  const lastPlayedTime = getLocalTime();
  player.setCurrentTime(lastPlayedTime);
};

resumePlayerOnLastTime();
