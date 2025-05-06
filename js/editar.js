const url_root = 'https://lqxnlojeuuextavhyfrd.supabase.co/rest/v1/'
const louvores = 'TbLouvores'
const letras = 'TbLetras'
const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxeG5sb2pldXVleHRhdmh5ZnJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NjEyMTYsImV4cCI6MjA2MjAzNzIxNn0.Ig7zUn--bBj2YIYdFHaRoi-1kfHW2aWpKu6qRmqiDaw'

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

function getUrlId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

function getLouvorById(id) {
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
        const louvor = data.find(louvor => louvor.id === id);
        resolve(louvor); // Retorna o louvor encontrado
      },
      error: function (xhr, status, error) {
        console.error('Erro ao buscar o louvor:', error);
        reject(error); // Retorna o erro para quem chamou
      }
    });
  });
}

function editarLouvor(id, nome, cantor, inicio, tom, formula) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${url_root}${louvores}?id=eq.${id}`,
      type: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': anon,
        'Authorization': `Bearer ${anon}`,
        'Prefer': 'return=minimal'
      },
      data: JSON.stringify({
        nome: nome,
        cantor: cantor,
        inicio: inicio,
        tom: tom,
        formula: formula
      }),
      success: function () {
        resolve(true);
      },
      error: function (xhr, status, error) {
        console.error('Erro ao editar o louvor:', error);
        reject(error); // Retorna o erro para quem chamou
      }
    });
  });
}
