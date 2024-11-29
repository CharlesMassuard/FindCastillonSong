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
                let fichier_clip = musique['fichier_clip'] ?? null;
                console.log(`${titre} ${artiste} ${album} ${annee} ${fichier_paroles} ${fichier_audio} ${fichier_image}`);
                
                // Create article element
                let article = document.createElement('article');
                article.className = 'musique';
                article.innerHTML = `
                    <img src="../img/imgs_musiques/${fichier_image}" alt="Image de la musique">
                    <h3>${titre}</h3>
                    <p>${album} • ${artiste} • ${annee}</p>
                `;
                
                // Add click event listener to the article
                article.addEventListener('click', () => {
                    window.location.href = `../html/paroles.html?fichier_paroles=${fichier_paroles}&fichier_audio=${fichier_audio}`;
                });
                
                // Append article to the div_menu
                div_menu.appendChild(article);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});