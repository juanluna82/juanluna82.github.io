

////////////////////////////////////////////////////////////////////// TRENDING SLIDER //////////////////////////////////////////////////////////// //

let arrayOfGifs = []
let arrayOfGifsUser = []
let arrayOfGifsTitle = [];
let firstIF = 0;
const numberOfImg = 4;
let urlIdCarrousel = new Array();
let fav = document.getElementsByClassName("fav");
let offseTrend = 0;
let key = [];


async function gifosTrendingLoad() {

    let limiTrend = 3;
    let json = await myFetch(`https://api.giphy.com/v1/gifs/trending?api_key=wBmQSDXkME1hKn80LC75kd2OSaeifuM4&limit=${limiTrend}&offset=${offseTrend}`);

    //CARGA DE GIF EN ARRAYS/////////////////////////////////////////////////////////////////////////////////
    for (let index = 0; index < json.data.length; index++) {
        arrayOfGifs.push(json.data[index].images.original.url)//url del gif .
        arrayOfGifsUser.push(json.data[index].username)//username del gif .
        arrayOfGifsTitle.push(json.data[index].title)//Title del gif
        urlIdCarrousel.push(json.data[index].id);
        document.getElementById("gif" + (index + 1)).setAttribute("src", arrayOfGifs[index]);
        document.getElementById("h2" + (index + 1)).textContent = arrayOfGifsUser[index];
        document.getElementById("p" + (index + 1)).textContent = arrayOfGifsTitle[index];

    }

};


gifosTrendingLoad().then(x => {

    //// Chequeo los Favoritos marcados
    favMarcado(urlIdCarrousel);

    ///////// HOVER Y CLICK EN DOWNLOAD //////////////
    for (let index = 0; index < 3; index++) {
        let download = document.getElementsByClassName("downS")[index];
        hoverSearch(download, "assets/icon-download-hover.svg", "assets/icon-download.svg");

        download.addEventListener("click", () => {
            fetch(arrayOfGifs[index])
                .then((response) => response.blob())
                .then(function (myGifBlob) {
                    gifDownC(myGifBlob, index);
                });
        })

        ///// CLICK en ICONO MAXIMIZE
        let maxS = document.getElementsByClassName("maxS")[index];
        hoverSearch(maxS, "assets/icon-max-hover.svg", "assets/icon-max-normal.svg");

        maxS.addEventListener("click", () => {
            let favDiv = document.getElementsByClassName("favDiv")[0];
            favDiv.style.display = "none";
            trendingGifos.style.display = "none";
            searchDiv.style.display = "none";
            navBar.style.display = "none";
            footer.style.display = "none";
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



            // crear div con el overlay con iconos en cada gifos////

            //////////// TRAE GIFOS DE LA API//////////////////
            let gifo = document.createElement("img");
            gifo.setAttribute("src", arrayOfGifs[index]);
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
            user.innerHTML = arrayOfGifsUser[index];
            divUser.appendChild(user);
            // p user///
            let pUser = document.createElement("p");
            pUser.innerHTML = arrayOfGifsTitle[index];
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
            download.setAttribute("class", "downSF");
            download.setAttribute("src", "assets/icon-download.svg");
            hoverSearch(download, "assets/icon-download-hover.svg", "assets/icon-download.svg");


            // CLOSE EN MAX///

            xImgDiv.addEventListener("click", () => {
                maxDiv.style.display = "none";
                trendingGifos.style.display = "block";
                searchDiv.style.display = "flex";
                navBar.style.display = "block";
                footer.style.display = "block";
                line2.style.display = "block";
                line1.style.opacity = "1";
                logo.style.opacity = "1";
                location.reload();
            });

            ///// CLICK en ICONO DOWNLOAD
            download.addEventListener("click", () => {
                fetch(gifo.src)
                    .then((response) => response.blob())
                    .then(function (myGifBlob) {
                        gifDownC(myGifBlob, index);
                    });
            })

        });
    }
});


///////////////////////////////////////////////////////////

function favMarcado(urlId) {

    for (let i = 0; i < urlId.length; i++) {
        for (let j = 0; j < localStorage.length; j++) {
            let localSt = localStorage.key(j);
            let boton = document.getElementById(`fav${i + 1}`)
            if (localSt == urlId[i]) {
                boton.setAttribute("src", "assets/icon-fav-active.svg");
                hoverSearch(boton, "assets/icon-fav-active.svg", "assets/icon-fav-active.svg");

            } else {
                boton.setAttribute("src", "assets/icon-fav.svg");
                hoverSearch(boton, "assets/icon-fav-hover.svg", "assets/icon-fav.svg");
            }
        }
    }

}



for (let index = 0; index < 3; index++) {
    fav = document.getElementsByClassName("fav")[index];
    hoverSearch(fav, "assets/icon-fav-hover.svg", "assets/icon-fav.svg");


    //CLICK EN ICONO FAVORITO////

    fav.addEventListener("click", function () {
        fav = document.getElementsByClassName("fav")[index]
        encontrado = localStorage.getItem(`${urlIdCarrousel[index]}`);
        if (encontrado === null) {
            localStorage.setItem(`${urlIdCarrousel[index]}`, `{"url": "${arrayOfGifs[index]}", "user": "${arrayOfGifsUser[index]}", "title": "${arrayOfGifsTitle[index]}"}`);
            fav.setAttribute("src", "assets/icon-fav-active.svg")
            hoverSearch(fav, "assets/icon-fav-active.svg", "assets/icon-fav-active.svg");
        } else {
            localStorage.removeItem(`${urlIdCarrousel[index]}`);
            fav.setAttribute("src", "assets/icon-fav.svg")
            hoverSearch(fav, "assets/icon-fav-hover.svg", "assets/icon-fav.svg");
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///// BOTON RIGHT //////////////////

let buttonNN = document.getElementsByClassName("right")[0];

buttonNN.addEventListener('click', () => {

    if (offseTrend >= 9) {
        offseTrend = 9;
    } else {

        offseTrend += 3;
        arrayOfGifs = []
        arrayOfGifsUser = []
        arrayOfGifsTitle = []
        urlIdCarrousel = [];
        gifosTrendingLoad().then(x => {
            favMarcado(urlIdCarrousel);
        });
    }
});

////// BOTON LEFT //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let buttonNL = document.getElementsByClassName("left")[0];
buttonNL.addEventListener('click', () => {
    if (offseTrend <= 0) {
        offseTrend = 0;

    } else {
        offseTrend = (offseTrend - 3);
        arrayOfGifs = []
        arrayOfGifsUser = []
        arrayOfGifsTitle = [];
        urlIdCarrousel = [];
        gifosTrendingLoad().then(x => {
            favMarcado(urlIdCarrousel);
        });
    }
});

function gifDownC(blob, idBlob) {
    var objectURL = URL.createObjectURL(blob);
    let flags = document.createElement("a");
    flags.href = objectURL;
    flags.download = `Gif DOwnload ${arrayOfGifs}.gif`;
    flags.click();
}