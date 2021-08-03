//////UTILITIES///////////////

const myApiKey = "wBmQSDXkME1hKn80LC75kd2OSaeifuM4";
let trendingGifos = document.getElementsByClassName("trending_gifos")[0];

let navBar = document.getElementsByClassName("navBar")[0];
let searchDiv = document.getElementsByClassName("search")[0];
let footer = document.getElementsByClassName("footer")[0];
let logo = document.getElementsByClassName("logo")[0];
let line1 = document.getElementsByClassName("line")[0];
let line2 = document.getElementsByClassName("line")[1];

/** funcion de fetch para cualquier URL */
async function myFetch(url) {
    let res = await fetch(url);
    let json = await res.json();
    return json;
}

// FUNCION HOVER y ACTIVE FAV

/////////// INPUT SEARCH y SUGERENCIAS////////

let searchInput = document.getElementById('searchInput');
let suggDiv = document.getElementById('suggestion');
let suggestion = document.getElementsByClassName('jsSug');
let results = document.getElementById("results");
let gifosGrid = document.getElementsByClassName("gifosGrid")[0];
let vermas = document.getElementById("seeMore");
let resultsTitle = document.getElementById("resultsTitle");
let titleSearch = document.getElementById("titleSearch");
let lineTitle = document.getElementById("lineTitle");
let searchString = "";// se carga el valor que se vaya tipeando en el input search.
let indexS = 0;
let suggestDataIndex = []; // se cargan en este¿a variable el array de las sugerencias desde la funcion searchSugg(); 
let encontrado = [];
let searchWrapper = document.querySelector(".search_input");
let inputBox = searchWrapper.querySelector("input");


////// KEYPRESS SUGERENCIAS Y BUSQUEDA DE GIFOS////////

searchInput.addEventListener("keyup", (e) => {
    searchString = e.target.value;
    // abre sugerencias y las remueve con close
    searchWrapper.classList.add("active");
    document.querySelector(".close").style.display = "block";
    document.querySelector(".lupa").style.display = "none";
    document.querySelector(".close").addEventListener
        ("click", () => {
            inputBox.value = "";
            searchWrapper.classList.remove("active");
            document.querySelector(".close").style.display = "none";
            document.querySelector(".lupa").style.display = "block";
        });

    // IF PRESS ENTER
    if (e.key === 'Enter') {
        resultsTitle.innerHTML = searchString;
        // TRAE LOS RESULTADOS DE LOS GIF BUSCADOS//
        gifoResult(searchString);
        // reemplaza close con lupa
        document.querySelector(".close").style.display = "none";
        document.querySelector(".lupa").style.display = "block";
        //me remueve la visualizacion de la lista de preferencias
        searchWrapper.classList.remove("active");
        // me vacia el input
        inputBox.value = "";
        // me hace unfocus en el input
        document.getElementById("searchInput").blur();
        // me remueve el resultado anterior de GIF, titulo y ver mas
        gifosGrid.innerHTML = "";
        // Muestra titulo y Ver mas
        document.querySelector("#titleSearch").style.display = "flex";
        document.querySelector("#seeMore").style.display = "block";


    }



    else {/// ELSE LLAMA A SUGGESTIONS
        searchSugg();

        /// FUNCION SI APRIETA UNA SUGERENCIA
        function selectSUggestion() {
            for (let index = 0; index < suggestion.length; index++) {

                suggestion[index].setAttribute("onClick", "select(this);");

            }
        }
        selectSUggestion();

    }

});



function select(element) {
    event.preventDefault();
    let selectUserData = element.textContent;
    searchInput.value = selectUserData;
    gifoResult(selectUserData);
    // reemplaza close con lupa
    document.querySelector(".close").style.display = "none";
    document.querySelector(".lupa").style.display = "block";
    //me remueve la visualizacion de la lista de preferencias
    searchWrapper.classList.remove("active");
    // me vacia el input
    inputBox.value = "";
    // me hace unfocus en el input
    document.getElementById("searchInput").blur();
    // me remueve el resultado anterior de GIF, titulo y ver mas
    resultsTitle.innerHTML = selectUserData;
    gifosGrid.innerHTML = "";
    // Muestra titulo y Ver mas
    document.querySelector("#titleSearch").style.display = "flex";
    document.querySelector("#seeMore").style.display = "block";
}

/////////// INPUT SUGERENCIAS////////


function searchSugg() {
    let searchS = myFetch(`https://api.giphy.com/v1/tags/related/${searchString}?api_key=${myApiKey}`);
    searchS.then(json => {
        for (let i = 0; i < 4; i++) {
            suggestDataIndex = suggestion[i].textContent = `${json.data[i].name}`;
        }
    })

        .catch(err => console.error(err));
}


//****************************************************//////////////// RESULTADOS DE BUSQUEDA ////////////////////////////////////////////////////////////////////////////////////

let offset = 0;
let limit = 12;

function gifoResult(searchString) {

    let info = myFetch(`https://api.giphy.com/v1/gifs/search?api_key=${myApiKey}&q=${searchString}&limit=${limit}&offset=${offset}`);

    info.then(json => {
        ///buscar resultados y agregar al div grid////
        for (let i = 0; i < json.data.length; i++) {
            let urlSearch = json.data[i].images.fixed_width.url;
            let urlId = json.data[i].id;
            // crear div con el overlay con iconos en cada gifos////
            //div general
            let divGifos = document.createElement("div");
            gifosGrid.appendChild(divGifos);
            divGifos.setAttribute("class", "gifos");
            //div contenedor de iconos
            let iconsGifos = document.createElement("div");
            divGifos.appendChild(iconsGifos);
            iconsGifos.setAttribute("class", "icons_gifos");

            //icono favoritos//
            let aFavourites = document.createElement("a");
            iconsGifos.appendChild(aFavourites);
            let favourites = document.createElement("img");
            aFavourites.appendChild(favourites);
            favourites.setAttribute("class", "favSearch");
            favourites.setAttribute("src", "assets/icon-fav.svg");
            hoverSearch(favourites, "assets/icon-fav-hover.svg", "assets/icon-fav.svg");

            //icono download//
            let aDownload = document.createElement("a");
            iconsGifos.appendChild(aDownload);
            let download = document.createElement("img");
            aDownload.appendChild(download);
            download.setAttribute("class", "downS");
            download.setAttribute("src", "assets/icon-download.svg");
            hoverSearch(download, "assets/icon-download-hover.svg", "assets/icon-download.svg");
            //icono maximize//
            let aMax = document.createElement("a");
            iconsGifos.appendChild(aMax);
            let max = document.createElement("img");
            aMax.appendChild(max);
            max.setAttribute("class", "max");
            max.setAttribute("id", "maxS");
            max.setAttribute("src", "assets/icon-max-normal.svg");
            hoverSearch(max, "assets/icon-max-hover.svg", "assets/icon-max-normal.svg");


            ///// CLICK en ICONO FAVORITO
            favourites.addEventListener("click", () => {
                let encontrado = localStorage.getItem(`${urlId}`);
                if (encontrado === null) {
                    localStorage.setItem(`${urlId}`, `{"url": "${urlSearch}", "user": "${userGif}", "title": "${titleGif}"}`);
                    favourites.setAttribute("src", "assets/icon-fav-active.svg")
                    hoverSearch(favourites, "assets/icon-fav-active.svg", "assets/icon-fav-active.svg");
                } else {
                    localStorage.removeItem(`${urlId}`);
                    favourites.setAttribute("src", "assets/icon-fav.svg")
                    hoverSearch(favourites, "assets/icon-fav-hover.svg", "assets/icon-fav.svg");
                }

            })


            //CLICK EN ICONO DOWNLOAD////

            download.addEventListener("click", () => {
                fetch(gifo.src)
                    .then((response) => response.blob())
                    .then(function (myGifBlob) {
                        gifDown(myGifBlob, i, urlSearch);
                    });
            })


            ///// CLICK en ICONO MAXIMIZE
            aMax.addEventListener("click", () => {
                results.style.display = "none";
                navBar.style.display = "none";
                footer.style.display = "none";
                searchDiv.style.display = "none";
                trendingGifos.style.display = "none";

                line2.style.display = "none";
                line1.style.opacity = "0.5";
                logo.style.opacity = "0.5";

                let maxDiv = document.createElement("div");
                searchDiv.before(maxDiv);
                maxDiv.setAttribute("class", "maxDiv");

                let favMax = document.createElement("div")
                maxDiv.appendChild(favMax);
                favMax.setAttribute("class", "favMax");

                let xDiv = document.createElement("div")
                favMax.appendChild(xDiv);
                xDiv.setAttribute("class", "xDiv");

                let xImgDiv = document.createElement("img")
                xDiv.appendChild(xImgDiv);
                xImgDiv.setAttribute("class", "xImgDiv");
                xImgDiv.setAttribute("src", "assets/close.svg");

                // CLOSE EN MAX///

                xImgDiv.addEventListener("click", () => {
                    maxDiv.style.display = "none";
                    searchDiv.style.display = "flex";
                    trendingGifos.style.display = "block";
                    results.style.display = "flex";
                    navBar.style.display = "block";
                    footer.style.display = "block";
                    line2.style.display = "block";
                    line1.style.opacity = "1";
                    logo.style.opacity = "1";
                    clickFav();
                })


                // crear div con el overlay con iconos en cada gifos////

                //////////// TRAE GIFOS DE LA API//////////////////
                let gifo = document.createElement("img");
                gifo.setAttribute("src", json.data[i].images.fixed_width.url);
                gifo.setAttribute("class", "gif");
                favMax.appendChild(gifo);

                //div general
                let divGifos = document.createElement("div");
                favMax.appendChild(divGifos);
                divGifos.setAttribute("class", "gifos");



                /// User  y Titulo del GIFOS traido de la API/////

                // div contenedor user///
                let divUser = document.createElement("div");
                divGifos.appendChild(divUser)
                divUser.setAttribute("class", "user");
                // h2 user///
                let user = document.createElement("h2");
                user.innerHTML = json.data[i].username;
                divUser.appendChild(user);
                // p user///
                let pUser = document.createElement("p");
                pUser.innerHTML = json.data[i].title;
                divUser.appendChild(pUser);


                //div contenedor de iconos
                let iconsGifos = document.createElement("div");
                divGifos.appendChild(iconsGifos);
                iconsGifos.setAttribute("class", "icons_gifos");

                //icono favoritos//
                let aTrash = document.createElement("a");
                iconsGifos.appendChild(aTrash);
                let trash = document.createElement("img");
                aTrash.appendChild(trash);
                trash.setAttribute("class", "favSearch");
                trash.setAttribute("src", "assets/icon-fav-active.svg");


                //icono download//
                let aDownload = document.createElement("a");
                iconsGifos.appendChild(aDownload);
                let download = document.createElement("img");
                aDownload.appendChild(download);
                download.setAttribute("class", "downS");
                download.setAttribute("src", "assets/icon-download.svg");
                hoverSearch(download, "assets/icon-download-hover.svg", "assets/icon-download.svg");


                ///// CLICK en ICONO DOWNLOAD
                download.addEventListener("click", () => {
                    fetch(gifo.src)
                        .then((response) => response.blob())
                        .then(function (myGifBlob) {
                            gifDown(myGifBlob, i);
                        });
                })




            });

            //////////// TRAE GIFOS DE LA API//////////////////
            let gifo = document.createElement("img");
            gifo.setAttribute("src", json.data[i].images.fixed_width.url);
            gifo.setAttribute("class", "gif");
            divGifos.appendChild(gifo);


            /// User  y Titulo del GIFOS traido de la API/////

            // div contenedor user///
            let divUser = document.createElement("div");
            divGifos.appendChild(divUser)
            divUser.setAttribute("class", "user");
            // h2 user///
            let user = document.createElement("h2");
            user.innerHTML = json.data[i].username;
            let userGif = json.data[i].username;
            divUser.appendChild(user);
            // p user///
            let pUser = document.createElement("p");
            pUser.innerHTML = json.data[i].title;
            let titleGif = json.data[i].title;
            divUser.appendChild(pUser);

        }

    })

        // HAY QUE VER A PAGINA DE ERROR///
        .catch(() => {
            let errorSearch = document.createElement("div");
            errorSearch.id = "errorSearch";
            results.appendChild(errorSearch);

            let errorImg = document.createElement("img");
            errorImg.setAttribute("src", "assets/icon-busqueda-sin-resultado.svg")
            let errorP = document.createElement("p");
            errorP.innerHTML = "Intenta con otra búsqueda.";
            errorSearch.appendChild(errorImg);
            errorSearch.appendChild(errorP);

        });


};

////// Hover FUNCTION


function hoverSearch(x, urlOver, urlOut) {
    /// HOVER FAV de TRENDING


    function mouseOver() {
        x.setAttribute("src", urlOver);
    }
    x.addEventListener('mouseover', mouseOver);

    function mouseOut() {
        x.setAttribute("src", urlOut);
    }
    x.addEventListener('mouseout', mouseOut);
}

vermas.addEventListener("click", () => {
    offset += 12;
    gifoResult(searchString);
})



function gifDown(blob, idBlob, newRetrievedObject) {
    var objectURL = URL.createObjectURL(blob);
    let flags = document.createElement("a");
    flags.href = objectURL;
    flags.download = `Gif DOwnload ${idBlob}.gif`;
    flags.click();
}
