exports.definirComprimentoDaLinha = function(texto, pos, comprimento) {
  if(pos + comprimento >= texto.length) {
    return texto.length - pos;
  }

  let i = pos + comprimento + 1;

  while(i >= 0 && texto[i] != ' ') {
    i--;
  }

  return i - pos;
}