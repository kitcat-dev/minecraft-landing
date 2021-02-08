const maybePluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;

function updateStatusDOM(status, options) {
  const { players } = options;
  const statusContainer = document.getElementById('status-badge');
  let content = 'Status: ';
  content += status ?
    '<b style="color: green;">ONLINE</b>. ' :
    '<b style="color: tomato;"">OFFLINE</b>'
  if (players) content += `${maybePluralize(players.online, 'player')} are playing.`;
  statusContainer.innerHTML = content;
}

function updateStatus() {
  fetch('https://api.mcsrvstat.us/2/play.albert.engineer', { cache: 'no-store' })
    .then(response => response.json())
    .then(response => {
      const { online, players } = response;
      updateStatusDOM(online, { players });
      refreshButton.disabled = false;
      refreshButton.textContent = 'Refresh';
    })
    .catch(error => {
      console.log(error);
    })
}

function initUpdating() {
  refreshButton.textContent = 'Updating...';
  refreshButton.disabled = true;
  updateStatus();
}

const refreshButton = document.getElementById('refresh-button');
refreshButton.addEventListener('click', initUpdating);
initUpdating()
