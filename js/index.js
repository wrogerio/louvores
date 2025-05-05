const url_root = 'https://lqxnlojeuuextavhyfrd.supabase.co/rest/v1/'
const louvores = 'TbLouvores'
const letras = 'TbLetras'
const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeG5sb2pldXVleHRhdmh5ZnJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NjEyMTYsImV4cCI6MjA2MjAzNzIxNn0.Ig7zUn--bBj2YIYdFHaRoi-1kfHW2aWpKu6qRmqiDaw'

$(function () {
  $('#tableDataBody').empty();
  getLouvores()
    .then(louvores => {
      louvores.forEach(louvor => {
        let row = `
          <tr>
            <td>${louvor.nome}</td>
            <td>${louvor.cantor}</td>
            <td width=80>${louvor.tom}</td>
            <td class="text-center"></td>
          </tr>
        `
        $('#tableDataBody').append(row);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar louvores:', error);
    });
});


function getLouvores() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${url_root}${louvores}?select=*`,
      type: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': anon,
        'Authorization': `Bearer ${anon}`,
      },
      success: function (data) {
        const arrayLouvores = data.map(louvor => ({
          cantor: louvor.cantor,
          formula: louvor.formula,
          id: louvor.id,
          nome: louvor.nome,
          tom: louvor.tom
        }));
        resolve(arrayLouvores); // Retorna o array para quem chamou
      },
      error: function (xhr, status, error) {
        console.error('Erro ao buscar os louvores:', error);
        reject(error); // Retorna o erro para quem chamou
      }
    });
  });
}