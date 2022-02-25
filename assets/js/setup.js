function start() { // Inicio da função start()

    //quando a função for chamada a div com id inicio fica oculto
    $("#inicio").hide();

    //criando novas div dentro da div fundoGame
    $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1'class='anima2'></div>");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame").append("<div id='energia'></div>");
    $("#fundoGame").append("<div id='placar'></div>");


    //Sons do game
    let somDisparo = document.getElementById("somDisparo");
    let somExplosao = document.getElementById("somExplosao");
    let musica = document.getElementById("musica");
    let somGameover = document.getElementById("somGameover");
    let somPerdido = document.getElementById("somPerdido");
    let somResgate = document.getElementById("somResgate");


    let energiaAtual = 3;

    //variaveis da pontuacao
    let pontos = 0;
    let salvos = 0;
    let perdidos = 0;

    //variaveis do jogo
    let jogo = {};
    let fimdejogo = false;
    //inimigo 1
    let velocidade = 5;
    let posicaoY = parseInt(Math.random() * 334);

    let podeAtirar = true;
    let TECLA = {
        W: 87,
        S: 83,
        D: 68,
    };

    jogo.pressionou = [];


    //Game Loop
    jogo.timer = setInterval(loop, 30); //temporizador(função a ser executada, quantos segundos)

    function loop() {
        moveFundo();
        moveJogador();
        moveInimigo1();
        moveInimigo2();
        moveAmigo();
        colisao();
        energia();
        placar();
        //Música em loop
        musica.addEventListener("ended", () => {
            musica.currentTime = 0;
            musica.play();
        }, false);
        musica.play();

    } // Fim da função loop()


    //Verifica se o usuário pressionou alguma tecla	

    $(document).keydown((e) => { jogo.pressionou[e.which] = true; });

    //Verifica se nao tem nenhuma tecla	pressionada
    $(document).keyup((e) => { jogo.pressionou[e.which] = false; });

    //Função que movimenta o fundo do jogo
    function moveFundo() {
        let esquerda = parseInt($("#fundoGame").css("background-position")); //em fundoGame cria uma propriedade css, que é definida pela let esquerda (0 por padrao)*
        //em fundoGame no elemento css criado adiciona esquerda - 1
        $("#fundoGame").css("background-position", esquerda - 1);
    } // fim da função movefundo()

    function moveJogador() {

        if (jogo.pressionou[TECLA.W]) {
            let topo = parseInt($("#jogador").css("top")); //topo recebe o valor em inteiro do elemento css jogador
            $("#jogador").css("top", topo - 10); //atualiza o valor de top no css
            if (topo <= 0) {

                $("#jogador").css("top", topo + 10);
            }

        }

        if (jogo.pressionou[TECLA.S]) {

            let topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo + 10);

            if (topo >= 440) {
                $("#jogador").css("top", topo - 10);

            }
        }

        if (jogo.pressionou[TECLA.D]) {

            disparo();

            somDisparo.play();

        }

    }


    function moveInimigo1() {

        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left", posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);

        if (posicaoX <= 0) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

        }
    } //Fim da função moveinimigo1()


    function moveInimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", posicaoX - 3);

        if (posicaoX <= 0) {

            $("#inimigo2").css("left", 775);

        }
    }

    function moveAmigo() {

        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left", posicaoX + 1);

        if (posicaoX > 906) {

            $("#amigo").css("left", 0);

        }

    }


    function disparo() {

        if (podeAtirar == true) {

            podeAtirar = false;
            //define onde o helicoptero esta e ajusta o elemento disparo
            topo = parseInt($("#jogador").css("top"))
            posicaoX = parseInt($("#jogador").css("left"))
            tiroX = posicaoX + 190;
            topoTiro = topo + 37;

            //cria uma div para o disparo e define a movimentacao 
            $("#fundoGame").append("<div id='disparo'></div");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 30);

        } //Fecha podeAtirar

        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 15);

            if (posicaoX > 900) {

                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;

            }
        } // Fecha executaDisparo()
    } // Fecha disparo()


    function colisao() {
        let colisao1 = ($("#jogador").collision($("#inimigo1")));
        let colisao2 = ($("#jogador").collision($("#inimigo2")));
        let colisao3 = ($("#disparo").collision($("#inimigo1")));
        let colisao4 = ($("#disparo").collision($("#inimigo2")));
        let colisao5 = ($("#jogador").collision($("#amigo")));
        let colisao6 = ($("#inimigo2").collision($("#amigo")));
        // colisao jogador 

        //jogador inimigo1
        if (colisao1.length > 0) {

            //pega a posição x e y do inimigo
            let inimigo1X = parseInt($("#inimigo1").css("left"));
            let inimigo1Y = parseInt($("#inimigo1").css("top"));
            //console.log(inimigo1X, inimigo1Y);
            //chama a funcao explosao
            explosao1(inimigo1X, inimigo1Y);
            somExplosao.play();

            pontos -= 100;
            energiaAtual--;

            //realoca o inimigo um em uma pisição aleatoria
            let posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }


        // jogador com o inimigo2 
        if (colisao2.length > 0) {

            let inimigo2X = parseInt($("#inimigo2").css("left"));
            let inimigo2Y = parseInt($("#inimigo2").css("top"));

            explosao2(inimigo2X, inimigo2Y);
            somExplosao.play();

            pontos -= 80;
            energiaAtual--;

            $("#inimigo2").remove();

            reposicionaInimigo2();

        }


        // Disparo com o inimigo1
        if (colisao3.length > 0) {


            let inimigo1X = parseInt($("#inimigo1").css("left"));
            let inimigo1Y = parseInt($("#inimigo1").css("top"));


            explosao1(inimigo1X, inimigo1Y);
            somExplosao.play();

            pontos += 100;
            $("#disparo").css("left", 1000);

            //posicao do novo inimigo1
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

        }
        // Disparo com o inimigo2

        if (colisao4.length > 0) {

            let inimigo2X = parseInt($("#inimigo2").css("left"));
            let inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();

            explosao2(inimigo2X, inimigo2Y);
            somExplosao.play();

            pontos += 50;
            $("#disparo").css("left", 1000);

            reposicionaInimigo2();

        }

        // jogador com o amigo

        if (colisao5.length > 0) {
            salvos++;
            //almento de velocidade no game
            velocidade += 0.5;
            //son resgate
            somResgate.play();
            reposicionaAmigo();
            $("#amigo").remove();
        }


        //Inimigo2 com o amigo

        if (colisao6.length > 0) {

            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));

            explosao3(amigoX, amigoY);
            somPerdido.play();

            perdidos++;
            $("#amigo").remove();

            reposicionaAmigo();

        }
    } //Fim da função colisao()


    function explosao1(inimigo1X, inimigo1Y) {
        //cria uma div com id explosao
        $("#fundoGame").append("<div id='explosao1'></div");
        //adiciona uma imagem ao css de explosao
        $("#explosao1").css("background-image", "url(/assets/imgs/explosao.png)");

        let div = $("#explosao1");
        //coloca a explosao nos valores atuais de X e Y do inimigo
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({ width: 200, opacity: 0 }, "fast");

        let tempoExplosao = window.setInterval(removeExplosao, 1000);

        //remove explosao
        function removeExplosao() {

            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;

        }
    } // Fim da função explosao1()


    function explosao2(inimigo2X, inimigo2Y) {

        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url('/assets/imgs/explosao.png')");
        let div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({ width: 200, opacity: 0 }, "slow");

        let tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

        function removeExplosao2() {

            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;

        }
    } // Fim da função explosao2()



    function explosao3(amigoX, amigoY) {
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top", amigoY);
        $("#explosao3").css("left", amigoX);
        let tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);

        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3 = null;

        }
    } // Fim da função explosao3


    //Reposiciona Inimigo2
    function reposicionaInimigo2() {

        let tempoColisao4 = window.setInterval(reposiciona4, 10000);

        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;
            if (fimdejogo == false) $("#fundoGame").append("<div id=inimigo2></div");
        }
    }

    //Reposiciona Amigo
    function reposicionaAmigo() {
        let tempoAmigo = window.setInterval(reposiciona6, 5000);

        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;
            if (fimdejogo == false) $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
        }
    } // Fim da função reposicionaAmigo()

    function placar() {

        $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");



    } //fim da função placar()


    //Barra de energia

    function energia() {

        if (energiaAtual == 3) {

            $("#energia").css("background-image", "url('/assets/imgs/energia3.png')");
        }

        if (energiaAtual == 2) {

            $("#energia").css("background-image", "url('/assets/imgs/energia2.png')");
        }

        if (energiaAtual == 1) {

            $("#energia").css("background-image", "url('/assets/imgs/energia1.png')");
        }

        if (energiaAtual == 0) {

            $("#energia").css("background-image", "url('/assets/imgs/energia0.png')");

            //Game Over

            if (energiaAtual == 0) {

                location.reload();
                fimdejogo = true;
                musica.pause();
                somGameover.play();
                alert(
                    `GAME OVER \n \n SUA PONTUAÇÃO FOI: ${pontos} \n SALVOS: ${salvos} \n PERDIDOS: ${perdidos}`
                );
            }

        }

    } // Fim da função energia()


}