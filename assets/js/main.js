document.addEventListener('DOMContentLoaded', function() {
    console.log('main.js carregado e DOMContentLoaded disparado.');

    let fonteAtual = 100;

    // Função para alterar tamanho da fonte
    window.alterarFonte = function(op) {
        if (op === '+') {
            fonteAtual += 10;
        } else if (op === '-' && fonteAtual > 60) {
            fonteAtual -= 10;
        }
        document.body.style.fontSize = fonteAtual + '%';
    };

    // Lógica para mostrar/ocultar usuário logado
    const email = localStorage.getItem("usuarioEmail");
    const userInfoDiv = document.getElementById("user-info");
    console.log('Email no localStorage:', email); // Log para depuração
    console.log('userInfoDiv encontrado:', userInfoDiv); // Log para depuração

    if (userInfoDiv) { // Verifique se o elemento existe antes de tentar manipulá-lo
        if (email) {
            userInfoDiv.innerHTML = `Olá, <strong>${email}</strong> <button class="btn btn-sm btn-danger" onclick="logout()" style="margin-left: 10px;">Sair</button>`;
            console.log('Email exibido:', email);
        } else {
            // Determina o caminho correto para o login.html com base na página atual
            const currentPath = window.location.pathname;
            let loginLinkHref = "./assets/pages/login.html"; // Default para index.html (raiz)
            // Se a URL contém '/assets/pages/', significa que estamos em uma subpasta (como jogos.html ou o próprio login.html)
            if (currentPath.includes('/assets/pages/')) {
                loginLinkHref = "./login.html"; // Caminho relativo para login.html na mesma pasta (assets/pages/)
            }
            userInfoDiv.innerHTML = `<a href="${loginLinkHref}" id="login-link">Login</a>`;
            console.log('Link de Login exibido. Caminho:', loginLinkHref);
        }
    } else {
        console.error('Elemento #user-info não encontrado.');
    }


    // Função de logout (torna global)
    window.logout = function() {
        console.log('Executando logout...');
        localStorage.removeItem("usuarioEmail");
        localStorage.removeItem("usuarioSenha");
        // Redireciona para a página inicial (index.html) que está na raiz do projeto.
        // Se main.js está em assets/js, o caminho para a raiz é ../../
        window.location.href = "../../index.html";
    };


    // Lógica para o modal de detalhes do jogo (em jogos.html)
    const jogoModal = document.getElementById('jogoModal');
    if (jogoModal) {
        jogoModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const jogoId = button.getAttribute('data-jogo-id');

            const jogosData = {
                fobia: {
                    titulo: 'Fobia - St. Dinfna Hotel',
                    imagem: '../images/fobia-.jpg',
                    descricao: 'Fobia é um jogo de terror psicológico brasileiro que se passa em um hotel mal-assombrado. Com quebra-cabeças complexos e uma atmosfera imersiva, ele promete arrepiar os jogadores.',
                    infoAdicional: 'Desenvolvido por Pulsatrix Studios. Lançado em 2022.'
                },
                horizon: {
                    titulo: 'Horizon Chase 2',
                    imagem: '../images/horizon-chase-2.jpg',
                    descricao: 'Horizon Chase 2 é um jogo de corrida arcade com gráficos coloridos e jogabilidade viciante. Uma homenagem aos clássicos dos anos 90, com muita velocidade e diversão.',
                    infoAdicional: 'Desenvolvido por Aquiris Game Studio. Lançado em 2022.'
                },
                hazel: {
                    titulo: 'Hazel Sky',
                    imagem: '../images/hazel-sky.jpg',
                    descricao: 'Hazel Sky é uma aventura emocionante sobre um jovem engenheiro que deve passar por um teste para retornar ao seu mundo. Explore ilhas flutuantes e resolva enigmas.',
                    infoAdicional: 'Desenvolvido por Coffee Addict Studio. Lançado em 2022.'
                },
                acao1: {
                    titulo: 'Jogo de Ação 1',
                    imagem: 'https://via.placeholder.com/200x150?text=Jogo+Acao',
                    descricao: 'Um jogo de ação eletrizante com batalhas intensas e gráficos de tirar o fôlego. Prepare-se para muita adrenalina e desafios épicos.',
                    infoAdicional: 'Categoria: Ação. Desenvolvedor: Estúdio X. Ano: 2023.'
                },
                aventura2: {
                    titulo: 'Jogo de Aventura 2',
                    imagem: 'https://via.placeholder.com/200x150?text=Jogo+Aventura',
                    descricao: 'Embarque em uma jornada inesquecível por terras místicas, desvende segredos antigos e lute contra criaturas fantásticas neste jogo de aventura épico.',
                    infoAdicional: 'Categoria: Aventura. Desenvolvedor: Estúdio Y. Ano: 2024.'
                }
            };

            const jogoInfo = jogosData[jogoId];

            if (jogoInfo) {
                const modalTitle = jogoModal.querySelector('.modal-title');
                const modalBodyImagem = jogoModal.querySelector('#modalJogoImagem');
                const modalBodyDescricao = jogoModal.querySelector('#modalJogoDescricao');
                const modalBodyInfoAdicional = jogoModal.querySelector('#modalJogoInfoAdicional');

                modalTitle.textContent = jogoInfo.titulo;
                modalBodyImagem.src = jogoInfo.imagem;
                modalBodyImagem.alt = jogoInfo.titulo;
                modalBodyDescricao.textContent = jogoInfo.descricao;
                modalBodyInfoAdicional.textContent = jogoInfo.infoAdicional;
            }
        });
    }

    // Lógica de filtro de jogos (em jogos.html)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const jogosItems = document.querySelectorAll('.jogos-lista .jogo-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            jogosItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (category === 'todos' || itemCategory === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});