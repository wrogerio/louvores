const url_root = 'https://lqxnlojeuuextavhyfrd.supabase.co/rest/v1/'
const louvores = 'TbLouvores'
const letras = 'TbLetras'
const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeG5sb2pldXVleHRhdmh5ZnJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NjEyMTYsImV4cCI6MjA2MjAzNzIxNn0.Ig7zUn--bBj2YIYdFHaRoi-1kfHW2aWpKu6qRmqiDaw'



function getLouvores() {
    let url = `${url_root}${louvores}?select=*`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': anon,
            'Authorization': `Bearer ${anon}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        let louvores = data.map(louvor => {
            return {
                id: louvor.id,
                nome: louvor.nome,
                letra_id: louvor.letra_id,
                letra: null // Inicialmente nulo, será preenchido depois
            };
        });
        return louvores;
    })
    .then(louvores => {
        console.log(louvores);
    })
    .catch(error => {
        console.error('Erro ao buscar os louvores:', error);
    });
}