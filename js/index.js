const url_root = 'https://lqxnlojeuuextavhyfrd.supabase.co/rest/v1/'
const louvores = 'TbLouvores'
const letras = 'TbLetras'
const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeG5sb2pldXVleHRhdmh5ZnJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NjEyMTYsImV4cCI6MjA2MjAzNzIxNn0.Ig7zUn--bBj2YIYdFHaRoi-1kfHW2aWpKu6qRmqiDaw'
const tableDataBody = document.getElementById('tableDataBody')

tableDataBody.innerHTML = ''
getLouvores()

function getLouvores() {
  alert('getLouvores')
  return new Promise((resolve, reject) => {
    const url = `${url_root}${louvores}?select=*`;

    // using fetch API to get data from the API
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': anon,
        'Authorization': `Bearer ${anon}`,
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
      }
      return response.json();
    }).then(data => {
      const arrayLouvores = data.map(louvor => ({
        cantor: louvor.cantor,
        formula: louvor.formula,
        id: louvor.id,
        nome: louvor.nome,
        inicio: louvor.inicio,
        tom: louvor.tom
      }));
      resolve(arrayLouvores); // Retorna o array para quem chamou
    }).catch(error => {
      console.error('Erro ao buscar os louvores:', error);
      reject(error); // Retorna o erro para quem chamou
    })

    //   $.ajax({
    //     url: `${url_root}${louvores}?select=*`,
    //     type: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'apikey': anon,
    //       'Authorization': `Bearer ${anon}`,
    //     },
    //     success: function (data) {
    //       const arrayLouvores = data.map(louvor => ({
    //         cantor: louvor.cantor,
    //         formula: louvor.formula,
    //         id: louvor.id,
    //         nome: louvor.nome,
    //         inicio: louvor.inicio,
    //         tom: louvor.tom
    //       }));
    //       resolve(arrayLouvores); // Retorna o array para quem chamou
    //     },
    //     error: function (xhr, status, error) {
    //       alert(error);
    //       reject(error); // Retorna o erro para quem chamou
    //     }
    //   });
  });
}