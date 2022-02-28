const allPlayers = () => {
    document.getElementById('player-container').innerHTML = '';
    document.getElementById('spinner').style.display = "block";
    const searchBox = document.getElementById('search-box').value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchBox}`;
    // console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => showPlayerDetail(data.player))
    // document.getElementById('spinner').style.display = "none";
}

const showPlayerDetail = (players) => {
    const playerContainer = document.getElementById('player-container');
    for(const player of players) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card border p-2 m-2">
            <div class="pro-pic">
                <img class="w-50" src="${player.strThumb}" alt="">
            </div>
            <h2>Name: ${player.strPlayer}</h2>
            <h5>Country: ${player.strNationality}</h5>
            <p></p>
            <div class="allButton">
                <button class="btn-danger">Delete</button>
                <button onclick="details('${player.idPlayer}')" class="btn-success">Details</button>
            </div>
        </div>
        `;
        playerContainer.appendChild(div);
    } 
    // console.log(players);
}

const details = (id) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => setDetails(data.players[0]));
}

const setDetails = (info) => {
    // console.log(info);
    document.getElementById('details-container').innerHTML = `
        <div>
            <img class="w-50" src="${info.strThumb}" alt="">
            <h1>Name: ${info.strPlayer}</h1>
            <h2>Country: ${info.strNationality}</h2>
            <h3>Height: ${info.strHeight}</h3>
            <h3>Weight: ${info.strWeight}</h3>
            <p>${info.strDescriptionEN}</p>
        </div>
    `; 
}