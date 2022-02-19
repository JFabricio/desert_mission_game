function start() { // Inicio da função start()

    //quando a função for chamada a div com id inicio fica oculto
    $("#inicio").hide();

    //criando novas div dentro da div fundoGame
    $("#fundoGame").append("<div id='jogador'></div>");
    $("#fundoGame").append("<div id='inimigo1'></div>");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo'></div>");

}