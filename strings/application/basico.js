let comprimento = require('./utils/comprimento_string.js');

function basico(texto, comprimento) {

  let saida = '';
  let pos = 0;
  let largura = 0;

  while(pos < texto.length) {
    largura = comprimento.definirComprimentoDaLinha(texto, pos, comprimento);
    saida = saida + texto.substr(pos, largura).trim() + "\n";    
    pos += largura;
  }

  return saida;
}


let entrada = 'In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.';
let entrada2 = 'And God said, "Let there be light," and there was light. God saw that the light was good, and he separated the light from the darkness. God called the light "day," and the darkness he called "night." And there was evening, and there was morning - the first day.';

// Este código é só um teste, por favor não passe um texto que contenha uma palavra maior do que [Comprimento] caracteres. :)
// Tratar essa situação, quebrando a palavra e hifenizando-a aumentaria bastante a complexidade do problema.

console.log(basico(entrada1, 40));
console.log(basico(entrada2, 40));