import {url_root, louvores, letras, anon} from './variaveis.js';

export function getUrlId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

export function getLouvores() {
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

export function getLouvorById(id) {
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

export function getLetras(id) {
  return new Promise((resolve, reject) => {
    
    $.ajax({
      url: `${url_root}${letras}?select=*, TbLouvores(nome, cantor)&order=ordem.asc&louvor_id=eq.${id}`,
      type: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': anon,
        'Authorization': `Bearer ${anon}`,
      },
      success: function (data) {
        const arrayLetras = data.map(letra => ({
          id: letra.id,
          letra: letra.letra,
          louvor_id: letra.louvor_id,
          is_intro: letra.is_intro,
          notas: letra.notas,
          ordem: letra.ordem,
          louvor: letra.TbLouvores.nome,
          cantor: letra.TbLouvores.cantor,
        }));
        resolve(arrayLetras); // Retorna o array para quem chamou
      },
      error: function (xhr, status, error) {
        console.error('Erro ao buscar as letras:', error);
        reject(error); // Retorna o erro para quem chamou
      }
    });
  });
}


export function editarLouvor(id, nome, cantor, inicio, tom, formula) {
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

export function removerLouvor(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${url_root}${louvores}?id=eq.${id}`,
      type: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'apikey': anon,
        'Authorization': `Bearer ${anon}`,
      },
      success: function (data) {
        resolve(data); // Retorna o louvor removido
      },
      error: function (xhr, status, error) {
        console.error('Erro ao remover o louvor:', error);
        reject(error); // Retorna o erro para quem chamou
      }
    });
  });
}

export function adicionarLouvor(nome, cantor, inicio, tom, formula) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${url_root}${louvores}`,
      type: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': anon,
        'Authorization': `Bearer ${anon}`,
      },
      data: JSON.stringify({
        nome: nome,
        cantor: cantor,
        inicio: inicio,
        tom: tom,
        formula: formula
      }),
      success: function (data) {
        resolve(data); // Retorna o louvor adicionado
      },
      error: function (xhr, status, error) {
        console.error('Erro ao adicionar o louvor:', error);
        reject(error); // Retorna o erro para quem chamou
      }
    });
  });
}