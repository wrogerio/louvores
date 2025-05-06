import { getLouvores } from './functions.js'

$(function () {
  $('#tableDataBody').empty()
  getLouvores().then(louvores => {
    louvores.forEach(louvor => {
      $('#tableDataBody').append(`
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
      `)
    })
  }).catch(error => {
      console.error('Erro ao carregar louvores:', error);
    });
})
