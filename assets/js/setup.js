function start() { // Inicio da função start()

    //quando a função for chamada a div com id inicio fica oculto
    $("#inicio").hide();

    //criando novas div dentro da div fundoGame
    $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1'class='anima2'></div>");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");




    let jogo = {};

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

        // jogador com o inimigo1

        console.log(colisao1);

    } //Fim da função colisao()



}