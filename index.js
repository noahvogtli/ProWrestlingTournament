let checkbox = document.getElementById('checkbox');
let href = 'Tournament.html';

checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    href = 'AutoTournament.html';
  } else {
    href = 'Tournament.html';
  }
});

document.getElementById('start-button').addEventListener('click', function() {
  window.location.href = href;
});
