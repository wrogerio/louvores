import { getLetras, getUrlId } from './functions.js'


$(function () {
  const id = getUrlId()
  $('#tableDataBody').empty()
  $('#linkVoltar').attr('href', `index.html`)

  $('#is_intro').change(function () {
    if ($(this).is(':checked')) {
      $('#labelIsIntro').text('Sim')
      $('#labelIsIntro').attr('title', 'Sim')
    } else {
      $('#labelIsIntro').text('Não')
      $('#labelIsIntro').attr('title', 'Não')
    }
  })

  getLetras(id).then(letras => {
    letras.forEach(letra => {
      $('#tableDataBody').append(`
        <tr>
          <td>
            <span>${letra.ordem}</span>
            <div class="d-flex justify-content-center align-items-center text-center">
              <a href="editarletra.html?id=${letra.id}" class="text-primary me-2">
                ${letra.letra}
              </a>
            </div>
            <div class="d-flex justify-content-center align-items-center text-center">
              <span class='fs-6'>
                | ${letra.notas.replace(/,/g, ' | ').replace(/-/g, ' ').replace(/\+/g, ' |<br>| ')} |
              </span>  
            </div>
          </td>
        </td>
      `)
    })
  }).catch(error => {
    console.error('Erro ao carregar letras:', error);
  });
})
