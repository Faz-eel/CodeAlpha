
let tracks = [
    { id: "0", title: "Gardens", cover: "static/gardens-stylish-chill-303261.webp", artist: "Penguinmusic", album: "Stylish Chill", path: "songs/gardens-stylish-chill-303261.mp3"},
    { id: "1", title: "Nightfall", cover: "static/nightfall-future-bass-music-228100.jpg", artist: "SoulProdMusic", album: "Summer Days", path: "songs/nightfall-future-bass-music-228100.mp3"},
    { id: "2", title: "Slow Motion", cover: "static/slowmo.webp", artist: "Soundbay", album: "Motions", path: "songs/in-slow-motion-inspiring-ambient-lounge-219592.mp3"},
    { id: "3", title: "AMALGAM", cover: "static/amalgam.webp", artist: "Rockot", album: "The World Is Yours", path: "songs/amalgam-217007.mp3"},
    { id: "4", title: "Flow", cover: "static/flow.webp", artist: "Loksii", album: "Scars", path: "songs/flow-211881.mp3"},
    { id: "5", title: "Alone", cover: "static/alone.webp", artist: "BoDleasons", album: "All The Way Up", path: "songs/alone-296348.mp3"},
    { id: "6", title: "Midnight Forest", cover: "static/midnight-forest-184304.jpg", artist: "Syouki_Takahashi", album: "Raindrops", path: "songs/midnight-forest-184304.mp3"},
    { id: "7", title: "Titanium", cover: "static/titanium.webp", artist: "AlisiaBeats", album: "Vibrations", path: "songs/titanium-170190.mp3"},
    { id: "8", title: "Once In Paris", cover: "static/once-in-paris-168895.png", artist: "Pumpupthemind", album: "Worldly Pleasure", path: "songs/once-in-paris-168895.mp3"},
    { id: "9", title: "Legend In The Making", cover: "static/deep-future-garage-royalty-free-music-163081.jpg", artist: "T Mayne", album: "K.E.L.R", path: "songs/deep-future-garage-royalty-free-music-163081.mp3"},
    { id: "10", title: "Unlock Me", cover: "static/amapiano.webp", artist: "Prazkhanal", album: "One Africa", path: "songs/unlock-me-amapiano-music-149058.mp3"},

]


let current_track = document.createElement('audio');
let playing = 0;

function seek() {
    time_control = document.querySelector('#time-control');
    current_track.currentTime = current_track.duration * (time_control.value/100); 
    
}

function volume() {
    volume_control = document.querySelector('#volume-control');
    current_track.volume = volume_control.value/100;
}



document.addEventListener('DOMContentLoaded', function() {
    setInterval(constant_seek, 1000);

    document.querySelector('#stop-start').addEventListener('click', function() {
        playpause();
    });

    document.addEventListener('click', event => {
        element = event.target;

        if (element.id == 'seek-previous') {
            play_previous(playing);
        }
        else if (element.id == 'seek-next') {
            play_next(playing);
        }
    });

    document.addEventListener('click', event => {
        element = event.target;

        if (element.className == 'player') {
            parent = element.closest('tr');
            let index = parseInt(parent.id);
            play_track(index);
        }
    });

    
    current_track.addEventListener('ended', function() {
        play_next(playing);

    });

    tracks.forEach(item => {
        list_track(item);
    });

    random_color();

    heading1 = document.createElement('th');
    heading1.innerHTML = '#';
    heading1.className = 'number';

    heading2 = document.createElement('th');
    
    heading3 = document.createElement('th');
    heading3.innerHTML = 'title';

    heading4 = document.createElement('th');
    heading4.innerHTML = 'album';
    heading4.className = 'albums';

    document.querySelector('thead').append(heading1);
    document.querySelector('thead').append(heading2);
    document.querySelector('thead').append(heading3);
    document.querySelector('thead').append(heading4);

    document.querySelector('#not-playing').innerHTML = 'FIND SOMETHING TO PLAY'

    function list_track(item) {
        tr = document.createElement('tr');
        tr.id = `${item.id}`;

        id = document.createElement('td');
        id.innerHTML = parseInt(item.id) + 1;
        id.className = 'player';
        id.className = 'number';

        image_column = document.createElement('td');
        image_column.id = 'list-image';
        image_column.className = 'player';
        image = document.createElement('img');
        image.src = `${item.cover}`;
        image_column.append(image);

        title = document.createElement('td');
        title.className = 'player';
        title.innerHTML = `${item.title}`;

        artiste = document.createElement('td');
        artiste.className = 'player';
        artiste.innerHTML = `${item.artist}`;

        album = document.createElement('td');
        album.className = 'player';
        album.innerHTML = `${item.album}`;
        album.className = 'albums';

        div = document.createElement('div');
        div1 = document.createElement('div');
        div1.append(title);
        div2 = document.createElement('div');
        div2.append(artiste);
        div.append(div1);
        div.append(div2);
        
        
        tbody = document.querySelector('tbody');
    
        tr.append(id);
        tr.append(image_column);
        tr.append(div);
        tr.append(album);
        tbody.append(tr);
    }


    function play_track(index) {
        clear_info();
        current_track.src = tracks[index].path;
        current_track.load();
        current_track.play();
        playing = index;

        document.querySelector('#top-info').innerHTML = 'Now Playing';
        document.querySelector('#cover').src = `${tracks[index].cover}`;

        random_color();

        title = document.createElement('div');
        title.innerHTML = `${tracks[index].title}`;
        title.id = 'song-title';

        artiste = document.createElement('div');
        artiste.innerHTML = `${tracks[index].artist}`;
        artiste.id = 'composer';

        document.querySelector('#music-info').append(title);
        document.querySelector('#music-info').append(artiste);

        document.querySelector('#stop-start').className = 'bi-pause-fill';

    }

    function playpause() {
        if (current_track.readyState == 0) {
            play_track(0);
            document.querySelector('#stop-start').className = 'bi-pause-fill';
        }
        else {
            if (current_track.paused) {
                current_track.play();
                document.querySelector('#stop-start').className = 'bi-pause-fill';
            }
            else {
                current_track.pause();
                document.querySelector('#stop-start').className = 'bi-play-fill';
            }
        }
    }

    function clear_info() {
        document.querySelector('#not-playing').style.display = 'none';
        document.querySelector('#music-info').innerHTML = '';
        document.querySelector('#time-control').value = 0;
        document.querySelector('#current-time').innerHTML = '';
        document.querySelector('#duration').innerHTML = '';
    }

    function play_next(index) {
        if (index < tracks.length - 1) {
            index += 1;
            play_track(index);
        }
        else {
            play_track(0);
        }
    }

    function play_previous(index) {
        if (index > 0) {
            index -= 1;
            play_track(index);
        }

        else {
            play_track(tracks.length - 1);
        }
    }

    function find_duration(track) {
        total_minutes = Math.round(track.duration / 60);
        total_seconds = Math.floor(track.duration % 60);

        if (total_seconds < 10) {
            total_seconds = `0${total_seconds}`;
        }
    }

    function constant_seek() {
        if (current_track.src) {
            time_control = document.querySelector('#time-control');
    
            time_control.value = (current_track.currentTime/current_track.duration) * 100;
    
            minute = Math.round(current_track.currentTime / 60);
            second = Math.floor(current_track.currentTime % 60);
    
            if (second < 10) {
                second = `0${second}`;
            }
    
            find_duration(current_track);
    
            current_time = document.querySelector('#current-time');
            current_time.innerHTML = `${minute}:${second}`;
    
            duration = document.querySelector('#duration');
            duration.innerHTML = `${total_minutes}:${total_seconds}`;
        }
        
    }

    function random_color() {
        let red = Math.floor(Math.random() * 256) + 64;
        let green = Math.floor(Math.random() * 256) + 64;
        let blue = Math.floor(Math.random() * 256) + 64;

        Color = `rgb(${red},${green},${blue})`;
        document.querySelector('#view-track').style.backgroundColor = Color;
        document.querySelector('#logo').style.backgroundColor = Color;
      }

});