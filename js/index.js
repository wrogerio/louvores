const url_root = 'https://lqxnlojeuuextavhyfrd.supabase.co/rest/v1/'
const louvores = 'TbLouvores'
const letras = 'TbLetras'
const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeG5sb2pldXVleHRhdmh5ZnJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NjEyMTYsImV4cCI6MjA2MjAzNzIxNn0.Ig7zUn--bBj2YIYdFHaRoi-1kfHW2aWpKu6qRmqiDaw'

$(function () {
  $('#tableDataBody').empty();
  $(window).on('load', function () {
    getLouvores()
      .then(louvores => {
        louvores.forEach(louvor => {
          let row = `
          <tr>
            <td colspan="3">
              <div class="d-flex justify-content-between align-items-center">
                <a href="apresentacao.html?id=${louvor.id}" class="text-primary me-2">
                  ${louvor.nome}
                </a>
                <section class='text-success fw-bold'>
                  <span class='me-2'>${louvor.tom}</span>  
                  <span>${louvor.formula}</span>  
                </section>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">${louvor.cantor}</small>
                <section class='text-success fw-bold'>
                  <a href="editar.html?id=${louvor.id}" class="text-primary me-2">
                    <i class="fa-regular fa-money-check-pen"></i>
                  </a>
                  <a href="remover.html?id=${louvor.id}" class="text-danger">
                    <i class="fa-solid fa-trash-xmark"></i>
                  </a>
                </section>
              </div>
              <div class="d-flex justify-content-start align-items-center">
                <small class="text-success">${louvor.inicio}</small>
              </div>
            </td>
          </tr>
        `
          $('#tableDataBody').append(row);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar louvores:', error);
      });
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
          inicio: louvor.inicio,
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