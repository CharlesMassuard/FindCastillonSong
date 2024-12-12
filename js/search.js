document.getElementById('searchInput').addEventListener('input', function(event) {
    const searchQuery = event.target.value.toLowerCase();
    const articles = document.querySelectorAll('#selectGame article');

    articles.forEach(article => {
        const titre = article.getAttribute('data-titre');
        const artiste = article.getAttribute('data-artiste');
        const album = article.getAttribute('data-album');
        if (titre.includes(searchQuery) || artiste.includes(searchQuery) || album.includes(searchQuery)) {
            article.style.display = '';
        } else {
            article.style.display = 'none';
        }
    });
});


// document.getElementById('searchForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the default form submission

//     const searchQuery = event.target.search.value;
//     const trackName = encodeURIComponent(searchQuery.split(' - ')[0]);
//     const artistName = encodeURIComponent(searchQuery.split(' - ')[1]);

//     console.log('Track name:', trackName);

//     fetch(`https://lrclib.net/api/search?track_name=${trackName}&artist_name=${artistName}`)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             // Process the data as needed
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// });