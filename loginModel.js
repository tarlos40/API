// IMPORTANDO AS VÁRIAVEIS //
import { buttonsSelect, buttonsSubmit, checkboxs, closeLoginMenu, closeRegisterMenu, containers, iconsClose, inputs, linksRegister, modals, nextButton, previousButton, showLoginMenu, showRegisterMenu, textSuccess, textsCheckbox } from '../../public/assets/js/variables.js';

let count = 0;

const userLoggedIn = localStorage.getItem('userLoggedIn');
const userId = localStorage.getItem('userId')


document.addEventListener('DOMContentLoaded', () => {
    // LÓGICA PARA APARECER O CARD DE LOGIN //
    
    if (userLoggedIn == 'true' && localStorage.getItem('userId') == null) {
        localStorage.setItem('userLoggedIn', 'false')
    }
    
    if (userLoggedIn !== 'true') {
        showLoginMenu();
    } else {
        closeLoginMenu();
    }
})

document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');

    fetch(`http://54.94.41.85:3000/api/usuarios?email=${email}&password=${password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                // LÓGICA PARA APARECER MENSAGEM DE ERROR //
                containers[0].style.display = 'flex';
                containers[0].querySelector('.text-error').innerHTML = data.error;
            } else {
                // Após o login bem-sucedido
                localStorage.setItem('userEmail', data.email);
                localStorage.setItem('userName', data.nickName);
                localStorage.setItem('userId', data._id)
                localStorage.setItem('userLoggedIn', 'true');
                closeLoginMenu();
                modals[3].style.display = 'flex';
                textSuccess[0].innerHTML = 'Conta logada com sucesso!!!'
                setTimeout(() => {
                    window.location.href = 'index.html'
                }, 1500);
            }
        })
})

// MOSTRAR SENHA //
checkboxs[0].addEventListener('change', () => {
    if (checkboxs[0].checked) {
        inputs[1].type = 'text';
    } else {
        inputs[1].type = 'password';
    }
});

checkboxs[1].addEventListener('change', () => {
    if (checkboxs[1].checked) {
        inputs[6].type = 'text';
    } else {
        inputs[6].type = 'password';
    }
});

// FECHAR O MODAL LOGIN //
iconsClose[0].addEventListener('click', () => {
    closeLoginMenu();
});

// FECHAR O MODAL REGISTRO //
iconsClose[1].addEventListener('click', () => {
    closeRegisterMenu();
});

// TRANSIÇÃO TELA DE LOGIN //
linksRegister[1].addEventListener('click', () => {
    closeRegisterMenu();
    showLoginMenu();
    count = 0;
});

// TRANSIÇÃO TELA REGISTRO //
linksRegister[0].addEventListener('click', () => {
    closeLoginMenu();
    showRegisterMenu();
});

// TRANSIÇÃO PELO CADASTRO // 
buttonsSelect[1].addEventListener('click', () => {
    count--;
    previousButton(count);

});

buttonsSelect[0].addEventListener('click', () => {
    count++;
    nextButton(count);
});

if (count == 0) {
    buttonsSelect[1].style.display = 'none';
    buttonsSubmit[1].style.display = 'none';
    inputs[4].style.display = 'none';
    inputs[5].style.display = 'none';
    inputs[6].style.display = 'none';
    textsCheckbox[1].style.display = 'none';
    containers[1].style.display = 'none';
}

async function getUserData() {
    return await fetch(`http://54.94.41.85:3000/api/searchById?id=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
        .then(response => {
            if (!response) {
                console.log("Erro ao pegar dados do usuário");
                return null;
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log("Erro ao pegar userData", error);
            return null;
        });
}
export { getUserData, userId, userLoggedIn };
