
/////////////////////////////////
// HOVERS DE MODO DIURNO//////////////////////////////////////////////////////////////////


// HOVER de iconos sociales/////////////////////////////////
// FACEBOOK
let face = document.getElementById("facebook");

face.addEventListener('mouseover', () => {
        facebook_hover = document.getElementById("facebook_hover");
        face.setAttribute("src", "assets/icon_facebook_hover.svg");
})

face.addEventListener('mouseout', () => {
        facebook_hover = document.getElementById("facebook_hover");
        face.setAttribute("src", "assets/icon_facebook.svg");
})

// TWITTER

let twit = document.getElementById("twitter");

twit.addEventListener('mouseover', () => {

        twit.setAttribute("src", "assets/icon-twitter-hover.svg");
})

twit.addEventListener('mouseout', () => {

        twit.setAttribute("src", "assets/icon-twitter.svg");
})

// INSTAGRAM

let inst = document.getElementById("instagram");

inst.addEventListener('mouseover', () => {
        inst_hover = document.getElementById("inst_hover");
        inst.setAttribute("src", "assets/icon_instagram-hover.svg");
})

inst.addEventListener('mouseout', () => {
        inst_hover = document.getElementById("inst_hover");
        inst.setAttribute("src", "assets/icon_instagram.svg");
})


// HOVER de NAV/////////////////////////////////
// CREATE
let create = document.getElementById("create");

create.addEventListener('mouseover', () => {
        create_hover = document.getElementById("create_hover");
        create.setAttribute("src", "assets/CTA-crear-gifo-hover.svg");
})

create.addEventListener('mouseout', () => {
        create_hover = document.getElementById("create_hover");
        create.setAttribute("src", "assets/button-crear-gifo.svg");
});




// HOVER de ARROW/////////////////////////////////
// LEFT
let left = document.getElementsByClassName("left")[0];

left.addEventListener('mouseover', () => {
        left.setAttribute("src", "assets/button-slider-left-hover.svg");
})

left.addEventListener('mouseout', () => {
        left.setAttribute("src", "assets/button-slider-left.svg");
})

// RIGHT
let right = document.getElementsByClassName("right")[0];

right.addEventListener('mouseover', () => {
        right.setAttribute("src", "assets/button-slider-right-hover.svg");
})

right.addEventListener('mouseout', () => {
        right.setAttribute("src", "assets/button-slider-right.svg");
})


//////////////////////////////////////////////////////////////////////////////////////////////
// HOVERS DE MODO NOCTURNO////////////////////////////////////////////////////////////////////////////////////

/*funcion para pasar camodo nocturno cuando aprieto el MODO NOCTURNO */
let night_mode = false;
let clickNoc = document.getElementById("click_mn");

clickNoc.addEventListener('click', () => {
        //IF CAMBIO A NOCTURNO/// 
        if (night_mode === false) {
                //MODIFICACION GENERAL MODO NOCTURNO
                let noc_mode = document.getElementById("noc_mode");
                noc_mode.setAttribute("href", "style/nocturno/nocturno.css");
                clickNoc.textContent = "Modo Diurno";
                night_mode = true;
                //LOGO HEADER
                let logoNoc = document.getElementById("logo");

                logoNoc.setAttribute("src", "assets/Logo-modo-noc.svg");
                // HEADER +
                let createNight = document.getElementById("create");

                createNight.setAttribute("src", "assets/CTA-crar-gifo-modo-noc.svg");
                // HOVER de HEADER +/////////////////////////////////
                // CREATE
                createNight.addEventListener('mouseover', () => {
                        createNight.setAttribute("src", "assets/CTA-crear-gifo-modo-noc.svg");
                })
                createNight.addEventListener('mouseout', () => {
                        createNight.setAttribute("src", "assets/CTA-crear-gifo-hover-modo-noc.svg");
                })
                //INPUT  X
                let close = document.getElementById("close");
                close.setAttribute("src", "assets/close-modo-noct.svg");

                // INPUT LUPAS
                document.getElementById("lupaSug").setAttribute("src", "assets/icon-search-modo-noct.svg");
                let lupaSug = document.getElementsByClassName("lupaSug");
                for (let index = 0; index < lupaSug.length; index++) {
                        lupaSug[index].setAttribute("src", "assets/icon-search-modo-noct.svg");
                }

                //ARROWS CARROUSEL
                //LEFT////
                let arrowLeft = document.getElementsByClassName("left")[0];
                arrowLeft.setAttribute("src", "assets/button-slider-left-md-noct.svg");

                // HOVER de ARROW LEFT/////////////////////
                arrowLeft.addEventListener('mouseover', () => {

                        arrowLeft.setAttribute("src", "assets/button-slider-left-hover.svg");
                })

                arrowLeft.addEventListener('mouseout', () => {

                        arrowLeft.setAttribute("src", "assets/button-slider-left-md-noct.svg");
                })

                //RIGHT///////////////////
                let arrowRight = document.getElementsByClassName("right")[0];
                arrowRight.setAttribute("src", "assets/button-slider-right-md-noct.svg");

                // HOVER de ARROW Right/////////////////////
                arrowRight.addEventListener('mouseover', () => {
                        arrowRight.setAttribute("src", "assets/button-slider-right-hover.svg");
                })

                arrowRight.addEventListener('mouseout', () => {
                        arrowRight.setAttribute("src", "assets/button-slider-right-md-noct.svg");
                })

                //ICONOS REDES SOCIALES/////

                // FACEBOOK
                let face = document.getElementById("facebook");
                face.addEventListener('mouseover', () => {
                        facebook_hover = document.getElementById("facebook_hover");
                        face.setAttribute("src", "assets/icon_facebook_noc.svg");
                })

                face.addEventListener('mouseout', () => {
                        facebook_hover = document.getElementById("facebook_hover");
                        face.setAttribute("src", "assets/icon_facebook.svg");
                })

                // TWITTER

                let twit = document.getElementById("twitter");

                twit.addEventListener('mouseover', () => {

                        twit.setAttribute("src", "assets/icon_twitter_noc.svg");
                })

                twit.addEventListener('mouseout', () => {

                        twit.setAttribute("src", "assets/icon-twitter.svg");
                })

                // INSTAGRAM

                let inst = document.getElementById("instagram");

                inst.addEventListener('mouseover', () => {
                        inst_hover = document.getElementById("inst_hover");
                        inst.setAttribute("src", "assets/icon_instagram_noc.svg");
                })

                inst.addEventListener('mouseout', () => {
                        inst_hover = document.getElementById("inst_hover");
                        inst.setAttribute("src", "assets/icon_instagram.svg");
                })
        }

        //ELSE VUELTA AL DIURNO///        
        else {
                //VUELTA GENERAL MODO DIURNO
                let noc_mode = document.getElementById("noc_mode");
                noc_mode.setAttribute("href", "style/style.css");
                clickNoc.textContent = "Modo Nocturno";
                night_mode = false;

                // HEADER LOGO VUELTA DIURNO
                let logoNoc = document.getElementById("logo");

                logoNoc.setAttribute("src", "assets/logo-mobile.svg");
                // HEADER + VUELTA DIURNO
                let create = document.getElementById("create");

                create.setAttribute("src", "assets/button-crear-gifo.svg");
                create.addEventListener('mouseover', () => {
                        create.setAttribute("src", "assets/CTA-crear-gifo-hover.svg");
                })
                create.addEventListener('mouseout', () => {
                        create.setAttribute("src", "assets/button-crear-gifo.svg");
                })

                //INPUT  X VUELTA DIURNO
                let close = document.getElementsByClassName("close")[0];

                close.setAttribute("src", "assets/close.svg");
                // INPUT LUPAS VUELTA DIURNO
                document.getElementById("lupaSug").setAttribute("src", "assets/icon-search.svg");
                let lupaSug = document.getElementsByClassName("lupaSug");
                for (let index = 0; index < lupaSug.length; index++) {
                        lupaSug[index].setAttribute("src", "assets/icon-search.svg");
                }


                //ARROWS CARROUSEL VUELTA DIURNO
                //LEFT VUELTA DIURNO
                let left = document.getElementsByClassName("left")[0];
                left.setAttribute("src", "assets/button-slider-left.svg")

                left.addEventListener('mouseover', () => {

                        left.setAttribute("src", "assets/button-slider-left-hover.svg");
                })

                left.addEventListener('mouseout', () => {

                        left.setAttribute("src", "assets/button-slider-left.svg");
                })

                // RIGHT VUELTA DIURNO

                //LEFT VUELTA
                let right = document.getElementsByClassName("right")[0];
                right.setAttribute("src", "assets/button-slider-right.svg")

                right.addEventListener('mouseover', () => {

                        right.setAttribute("src", "assets/button-slider-right-hover.svg");
                })

                right.addEventListener('mouseout', () => {

                        right.setAttribute("src", "assets/button-slider-right.svg");
                })
                let face = document.getElementById("facebook");

                face.addEventListener('mouseover', () => {
                        facebook_hover = document.getElementById("facebook_hover");
                        face.setAttribute("src", "assets/icon_facebook_hover.svg");
                })

                face.addEventListener('mouseout', () => {
                        facebook_hover = document.getElementById("facebook_hover");
                        face.setAttribute("src", "assets/icon_facebook.svg");
                })
                // TWITTER

                let twit = document.getElementById("twitter");

                twit.addEventListener('mouseover', () => {

                        twit.setAttribute("src", "assets/icon-twitter-hover.svg");
                })

                twit.addEventListener('mouseout', () => {

                        twit.setAttribute("src", "assets/icon-twitter.svg");
                })

                // INSTAGRAM

                let inst = document.getElementById("instagram");

                inst.addEventListener('mouseover', () => {
                        inst_hover = document.getElementById("inst_hover");
                        inst.setAttribute("src", "assets/icon_instagram-hover.svg");
                })

                inst.addEventListener('mouseout', () => {
                        inst_hover = document.getElementById("inst_hover");
                        inst.setAttribute("src", "assets/icon_instagram.svg");
                })


        }
});

