
let favDiv = document.getElementById("favDiv");
let newRetrievedObject = [];
let blockFavClick = 0;
let gifId;

let urlMyGif = [];


let GifUp = JSON.parse(localStorage.getItem("myGifs"));

function myGifos() {

    /// logo y titulo GENERAL MIS GIFOS

    let favDiv = document.createElement("div")
    searchDiv.before(favDiv);
    favDiv.setAttribute("class", "favDiv");
    favDiv.style.display = "flex";
    let favLogo = document.createElement("div")
    favDiv.appendChild(favLogo);
    favLogo.setAttribute("class", "favLogo");

    let FavImg = document.createElement("img")
    favLogo.appendChild(FavImg);
    FavImg.setAttribute("src", "assets/icon-mis-gifos.svg");
    FavImg.setAttribute("class", "FavImg");

    let FavTitle = document.createElement("h2")
    favLogo.appendChild(FavTitle);
    FavTitle.innerHTML = "Mis GIFOS";
    FavTitle.setAttribute("class", "FavTitle");

    if (GifUp == null || GifUp.length == 0) {

        // MIS GIFOS  SIN RESULTADOS
        let nonFav = document.createElement("div");
        favDiv.appendChild(nonFav);
        nonFav.setAttribute("class", "nonFav");

        let FavImg = document.createElement("img")
        nonFav.appendChild(FavImg);
        FavImg.setAttribute("src", "assets/icon-mis-gifos-sin-contenido.svg");
        FavImg.setAttribute("class", "FavImg");

        let FavTitle = document.createElement("h2")
        nonFav.appendChild(FavTitle);
        FavTitle.innerHTML = '¡Anímate a crear tu primer GIFO!  ';
        FavTitle.setAttribute("class", "FavTitle");


    } else {

        //// Muestra los gif

        // listado de gifos
        let gridFav = document.createElement("div");
        favDiv.appendChild(gridFav);
        gridFav.setAttribute("class", "gridFav");

        //// Rescata los gif del localStorage storage
        for (let i = 0; i < GifUp.length; i++) {
            gifId = GifUp[i];
            let uploadUrl = `https://api.giphy.com/v1/gifs?api_key=${myApiKey}&ids=${gifId}`;
            let misGifos = myFetch(uploadUrl)
            misGifos.then(json => {
                urlMyGif = json.data[0].images.fixed_width.url;
                let urlMyGifArray = [];
                urlMyGifArray.push(urlMyGif);
                // crear div con el overlay con iconos en cada gifos////
                //div general
                let divGifos = document.createElement("div");
                gridFav.appendChild(divGifos);
                divGifos.setAttribute("class", "gifos");
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
                trash.setAttribute("src", "assets/icon-trash-normal.svg");
                hoverSearch(trash, "assets/icon-trash-hover.svg", "assets/icon-trash-normal.svg");

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

                //////////// TRAE GIFOS DE LA API//////////////////
                let gifo = document.createElement("img");
                gifo.setAttribute("src", urlMyGif);
                gifo.setAttribute("class", "gif");
                divGifos.appendChild(gifo);


                ///// CLICK en ICONO TRASH
                trash.addEventListener("click", () => {
                    let element = GifUp[i];
                    let idx = GifUp.indexOf(element);
                    let removed = GifUp.splice(idx, 1);
                    localStorage.setItem("myGifs", JSON.stringify(GifUp));
                    location.reload();

                })

                ///// CLICK en ICONO DOWNLOAD
                download.addEventListener("click", () => {
                    fetch(gifo.src)
                        .then((response) => response.blob())
                        .then(function (myGifBlob) {
                            gifDown(myGifBlob, i);
                        });
                })


                ///// CLICK en ICONO MAXIMIZE
                aMax.addEventListener("click", () => {
                    trendingGifos.style.display = "none";
                    favDiv.style.display = "none";
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

                    // CLOSE EN MAX///

                    xImgDiv.addEventListener("click", () => {
                        maxDiv.style.display = "none";
                        trendingGifos.style.display = "block";
                        favDiv.style.display = "flex";
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
                    gifo.setAttribute("src", urlMyGif);
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
                    divUser.appendChild(user);
                    // p user///
                    let pUser = document.createElement("p");
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


                    ///// CLICK en ICONO DOWNLOAD
                    download.addEventListener("click", () => {
                        fetch(gifo.src)
                            .then((response) => response.blob())
                            .then(function (myGifBlob) {
                                gifDown(myGifBlob, i);
                            });
                    })

                })

            });

        }
        let favSeeMore = document.createElement("button")
        favDiv.appendChild(favSeeMore);
        favSeeMore.innerHTML = "VER MÁS";
        favSeeMore.setAttribute("class", "favSeeMore");
    }

}

myGifos();


function gifDown(blob, idBlob) {
    var objectURL = URL.createObjectURL(blob);
    let flags = document.createElement("a");
    flags.href = objectURL;
    flags.download = `Gif DOwnload ${idBlob}.gif`;
    flags.click();
}
