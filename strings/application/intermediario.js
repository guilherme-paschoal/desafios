let shuffle = require('./utils/array_shuffle.js');

function intermediario(texto, comprimento) {
  let saida = '';
  let pos = 0;
  let largura = 0;

  while(pos < texto.length) {
    largura = definirComprimentoDaLinha(texto, pos, comprimento);
    saida = saida + justificarLinha(texto.substr(pos, largura).trim(), comprimento) + "\n";    
    pos += largura;
  }

  return saida;
}

function justificarLinha(texto, comprimento) {

  let tamanho =texto.length;

  // Check de sanidade
  if(tamanho == comprimento) { return texto; }

  // Cria um array com as palavras
  const palavras = texto.split(' ');
  
  // Apaga todos os espacos e calcula, baseado no tamanho maximo da linha, quantos espacos sao necessarios 
  // para fazer a linha ficar com o tamanho justificado
  const espacosNecessarios = comprimento - texto.replace(/\s/g,'').length;
    
  // Tendo o numero de espacos necessarios para justificar a linha, divido pelo tamanho do array de espacos que sera criado abaixo
  const espacosPorPalavra = Math.floor(espacosNecessarios / (palavras.length - 1));

  // Caso a quantidade de espacos necessarios calculada acima seja ímpar, calcula quantos espacos a mais devem ser adicionados na linha
  const espacosExtra = espacosNecessarios % (palavras.length - 1);
  
  // Cria um array contendo somente a quantidade de espacos necessarios em cada posicao
  const espacos = criarArrayDeEspacos(palavras.length - 1, espacosPorPalavra, espacosExtra);

  let saida = '';
  
  for(let i=0;i<palavras.length;i++) {
    saida += palavras[i] + (i < palavras.length - 1 ? espacos[i] : '');
  }
  
  return saida;
}


function criarArrayDeEspacos(tamanho, espacos, espacosExtra) {
  let array = [];
  let indices = [];
  
  for(let i=0;i<tamanho;i++) { 
    if(i<tamanho-1) { indices.push(i); }
    array.push(' '.repeat(espacos)); 
  }
  
  indices = shuffle.shuffle(indices);

  for(let i=0;i<espacosExtra;i++) {
    array[indices[i]] += ' ';
  }

  return array;
}


function definirComprimentoDaLinha(texto, pos, comprimento) {

  if(pos + comprimento >= texto.length) {
    return texto.length - pos;
  }

  let i = pos + comprimento + 1;

  while(i >= 0 && texto[i] != ' ') {
    i--;
  }

  return i - pos;
}

let entrada = 'In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.';
let entrada2 = 'And God said, "Let there be light," and there was light. God saw that the light was good, and he separated the light from the darkness. God called the light "day," and the darkness he called "night." And there was evening, and there was morning - the first day.';

console.log(intermediario(entrada1, 40));
console.log(intermediario(entrada2, 40));