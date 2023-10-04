var slides = document.querySelectorAll('.slide');
var seta = document.querySelector('#seta_btn1');
let login = document.querySelector('#login');
let cadastro = document.querySelector('#cadastro');  
let noticia = document.querySelector('#noticia');
let quiz = document.querySelector('#quiz');
var perfil = document.querySelector('#perfil');
var perfil2 = document.querySelector('#perfil_gamificado');

// Seleciona os botões de rádio
var radioButtons = document.querySelectorAll('[name="radio-btn"]');

// Define o índice do slide atual
var currentSlide = 0;

// Adiciona a classe 'active' ao slide atual
slides[currentSlide].classList.add('active');

// Função para avançar para o próximo slide
function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    radioButtons[currentSlide].checked = true;
}

var contar_body_total = 0;
var contar_body = 1;

document.addEventListener('keydown', function(event) {
    const ANCORA = document.createElement("a");
    switch (event.key){
        case "ArrowLeft":
            if(currentSlide == 0){
                currentSlide = 4;
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide) % slides.length;
                slides[currentSlide].classList.add('active');
                radioButtons[currentSlide].checked = true;    
            }else{
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide - 1) % slides.length;
                slides[currentSlide].classList.add('active');
                radioButtons[currentSlide].checked = true;
            }
        break;

        case "ArrowRight":
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
            radioButtons[currentSlide].checked = true;  
        break;
    }
});

// Chama a função nextSlide a cada 10 segundos (10000 milissegundos)
var slideInterval = setInterval(nextSlide, 10000);

// Adiciona evento de clique aos botões de rádio
for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('click', function() {
        clearInterval(slideInterval);
        var selectedSlide = this.id.slice(-1) - 1;
        slides[currentSlide].classList.remove('active');
        slides[selectedSlide].classList.add('active');
        currentSlide = selectedSlide;
        slideInterval = setInterval(nextSlide, 10000);
    });
}

if(seta != null){
    var currentScreen = 0;

    if (localStorage.getItem("currentScreen")){
        currentScreen = parseInt(localStorage.getItem("currentScreen"));
        if(currentScreen > 4){
            currentScreen = 1;
        }
        if(currentScreen > 3){
            seta.style.display = 'none';
        }    
    }else{
        currentScreen = 1;
    }
    function navigateScreens(direction){
    if(direction === "ArrowDown"){
        if (currentScreen < 4){
            currentScreen++;
            if(currentScreen > 3){
                seta.style.display = 'none';
            }
        }
        }else if(direction === "ArrowUp"){
            if(currentScreen > 1){
            currentScreen--;
            seta.style.display = 'block';
        }
    }

    localStorage.setItem("currentScreen", currentScreen.toString());

    var targetScreen = document.getElementById("body" + currentScreen);
    targetScreen.scrollIntoView();
    }

    document.addEventListener("keydown", function(event) {
        switch (event.key) {
            case "ArrowDown":
            case "ArrowUp":
            navigateScreens(event.key);
            break;
        }
    });

    seta.addEventListener('click', function(){
        if (currentScreen < 4){
            currentScreen++;
            localStorage.setItem("currentScreen", currentScreen.toString());
            targetScreen = document.getElementById("body" + currentScreen);
            targetScreen.scrollIntoView();
            seta.style.display = 'block';
        }
        if(currentScreen > 3){
            seta.style.display = 'none';
        }
    });
}

if(noticia != null && quiz != null && login != null && cadastro != null){
    noticia.addEventListener('click', e=>{
        window.location.href = "php/cardnoticia.php";
    });

    quiz.addEventListener('click', e=>{
        window.location.href = "php/cardquiz.php";
    });

    perfil2.addEventListener('click', e=>{
        window.location.href = "php/perfil.php";
    });

    login.addEventListener('click', e =>{
        if(currentSlide == 4){
            window.open("php/login.php");
            login.style.cursor = 'pointer';
        }else{
            login.style.cursor = 'default'; 
        }
    });
    login.addEventListener('mousemove', e =>{
        if(currentSlide == 4){
            login.style.cursor = 'pointer';
        }else{
            login.style.cursor = 'default';
        }
    });

    cadastro.addEventListener('click', e =>{
        if(currentSlide == 4){
            window.open("php/cadastro.php");
            login.style.cursor = 'pointer';
        }else{
            login.style.cursor = 'default'; 
        }
    });
    cadastro.addEventListener('mousemove', e =>{
        if(currentSlide == 4){
            login.style.cursor = 'pointer';
        }else{
            login.style.cursor = 'default';
        }
    });
}