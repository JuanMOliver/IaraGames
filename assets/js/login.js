
document.addEventListener('DOMContentLoaded', function() {
    console.log('login.js carregado e DOMContentLoaded disparado.');

    // Elementos do DOM
    const loginBox = document.getElementById('login-box');
    const cadastroBox = document.getElementById('cadastro-box');
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');

    const emailLoginInput = document.getElementById('emailLogin');
    const senhaLoginInput = document.getElementById('senhaLogin');
    const emailCadastroInput = document.getElementById('cadastroEmail');
    const senhaCadastroInput = document.getElementById('cadastroSenha');

    // Funções de toggle de formulário e senha (tornadas globais através de window)
    window.mostrarCadastro = function() {
        loginBox.classList.add('hidden');
        cadastroBox.classList.remove('hidden');
        cadastroForm.reset(); // Reset fields on switch
        clearValidationFeedback(loginForm); // Clear previous login validation
        console.log('Mostrando formulário de cadastro.');
    };

    window.mostrarLogin = function() {
        cadastroBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
        loginForm.reset(); // Reset fields on switch
        clearValidationFeedback(cadastroForm); // Clear previous cadastro validation
        console.log('Mostrando formulário de login.');
    };

    window.toggleSenha = function(id = 'senhaLogin') {
        const input = document.getElementById(id);
        if (input) {
            if (input.type === "password") {
                input.type = "text";
            } else {
                input.type = "password";
            }
            console.log(`Senha do campo ${id} alternada.`);
        } else {
            console.warn(`Campo de senha com ID ${id} não encontrado.`);
        }
    };

    // Funções de validação
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6; // Senha deve ter pelo menos 6 caracteres
    }

    function displayValidationFeedback(inputElement, isValid, message = '') {
        const feedbackElement = inputElement.nextElementSibling; // Assume que o div.invalid-feedback é o próximo irmão

        if (isValid) {
            inputElement.classList.remove('is-invalid');
            inputElement.classList.add('is-valid');
            if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                feedbackElement.textContent = '';
            }
        } else {
            inputElement.classList.remove('is-valid');
            inputElement.classList.add('is-invalid');
            if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                feedbackElement.textContent = message;
            }
        }
    }

    function clearValidationFeedback(formElement) {
        formElement.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
            const feedback = input.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.textContent = '';
            }
        });
    }

    // Event Listener para Login
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const email = emailLoginInput.value.trim();
            const senha = senhaLoginInput.value.trim();

            let formIsValid = true;

            // Validação de Email de Login
            if (!validateEmail(email)) {
                displayValidationFeedback(emailLoginInput, false, 'Por favor, insira um email válido.');
                formIsValid = false;
            } else {
                displayValidationFeedback(emailLoginInput, true);
            }

            // Validação de Senha de Login
            if (!validatePassword(senha)) {
                displayValidationFeedback(senhaLoginInput, false, 'A senha deve ter pelo menos 6 caracteres.');
                formIsValid = false;
            } else {
                displayValidationFeedback(senhaLoginInput, true);
            }

            if (!formIsValid) {
                console.log('Validação de login falhou.');
                return; // Impede o restante da execução se a validação falhar
            }

            const emailSalvo = localStorage.getItem("usuarioEmail");
            const senhaSalva = localStorage.getItem("usuarioSenha");

            if (email === emailSalvo && senha === senhaSalva) {
                console.log('Login bem-sucedido para:', email);
                // Redireciona para a página inicial (index.html) na raiz do projeto
                // Considerando que login.html está em assets/pages/, precisamos de ../../
                window.location.href = "../../index.html";
            } else {
                alert("Email ou senha incorretos. Por favor, tente novamente.");
                console.log('Login falhou: credenciais incorretas.');
                // Opcional: Adicionar feedback visual específico para erro de credenciais
                displayValidationFeedback(emailLoginInput, false, 'Email ou senha inválidos.');
                displayValidationFeedback(senhaLoginInput, false, ''); // Limpa se houver erro de validação anterior na senha
            }
        });
    }

    // Event Listener para Cadastro
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const email = emailCadastroInput.value.trim();
            const senha = senhaCadastroInput.value.trim();

            let formIsValid = true;

            // Validação de Email de Cadastro
            if (!validateEmail(email)) {
                displayValidationFeedback(emailCadastroInput, false, 'Por favor, insira um email válido.');
                formIsValid = false;
            } else {
                displayValidationFeedback(emailCadastroInput, true);
            }

            // Validação de Senha de Cadastro
            if (!validatePassword(senha)) {
                displayValidationFeedback(senhaCadastroInput, false, 'A senha deve ter pelo menos 6 caracteres.');
                formIsValid = false;
            } else {
                displayValidationFeedback(senhaCadastroInput, true);
            }

            if (!formIsValid) {
                console.log('Validação de cadastro falhou.');
                return; // Impede o restante da execução se a validação falhar
            }

            // Simulação de verificação de email já cadastrado (opcional)
            const emailSalvo = localStorage.getItem("usuarioEmail");
            if (email === emailSalvo) {
                displayValidationFeedback(emailCadastroInput, false, 'Este email já está cadastrado.');
                console.log('Cadastro falhou: email já cadastrado.');
                return;
            }

            localStorage.setItem("usuarioEmail", email);
            localStorage.setItem("usuarioSenha", senha);

            alert("Cadastro realizado com sucesso! Agora você pode fazer login.");
            console.log('Cadastro bem-sucedido para:', email);
            mostrarLogin(); // Volta para a tela de login
        });
    }
});