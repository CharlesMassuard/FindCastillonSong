document.addEventListener('DOMContentLoaded', () => {
    let div_menu = document.getElementById('selectGame');
    // Lire fichier JSON
    fetch('../paroles/datas_paroles.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(musique => {
                console.log(musique);
                let titre = musique['titre'];
                let artiste = musique['artiste'];
                let album = musique['album'];
                let annee = musique['année'];
                let fichier_paroles = musique['fichier_paroles'];
                let fichier_audio = musique['fichier_audio'];
                let fichier_image = musique['fichier_image'];
                console.log(`${titre} ${artiste} ${album} ${annee} ${fichier_paroles} ${fichier_audio} ${fichier_image}`);
                div_menu.innerHTML += `
                    <article id="musique">
                        <figure><img src="../img/imgs_musiques/${fichier_image}" alt="Image de la musique"></figure>
                        <h3>${titre}</h3>
                        <p>${album} • ${artiste} • ${annee}</p>
                    </article>
                `;	
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});