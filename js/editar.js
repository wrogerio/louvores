import { getUrlId, getLouvorById, editarLouvor } from './functions.js';

$(function () {

  $(window).on('load', function () {
    const id = getUrlId();
    getLouvorById(id)
      .then(louvor => {
        $('#nome').val(louvor.nome);
        $('#cantor').val(louvor.cantor);
        $('#tom').val(louvor.tom);
        $('#formula').val(louvor.formula);
        $('#inicio').val(louvor.inicio);
      })
      .catch(error => {
        console.error('Erro ao carregar louvor:', error);
      });
  });


  $('#salvar').on('click', function (e) {
    e.preventDefault();
    const id = getUrlId();
    var nome = $('#nome').val();
    var cantor = $('#cantor').val();
    var tom = $('#tom').val();
    var formula = $('#formula').val();
    var inicio = $('#inicio').val();

    if (!nome || !cantor || !tom || !formula || !inicio) {
      alert('Preencha todos os campos!');
      return;
    }

    editarLouvor(id, nome, cantor, inicio, tom, formula)
      .then(() => {
        window.location.href = 'index.html'; 
      })
      .catch(error => {
        console.error('Erro ao editar louvor:', error);
      });
  });

  $('#modalEditar').on('submit', '#formEditar', function (e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      url: 'editar.php',
      type: 'POST',
      data: formData,
      success: function (response) {
        $('#modalEditar').modal('hide');
        location.reload();
      }
    });
  });
});