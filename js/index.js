// tableDataBody (tbody)

$(function () {
  getLouvores()
    .then(louvores => {
      console.log(louvores); // Verifica se os dados foram carregados corretamente
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