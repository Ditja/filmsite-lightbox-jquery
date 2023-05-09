// JavaScript Document

$(function() {
    let currentImg;
    // variabel forberedt til at indeholde img src fra det billede vi har klikket på
    let currentNr;
    // variabel forberedt til modtage det nummer billede i arrayet vi er nået til (det vi har klikket på)
    const imageList = $("#filmsite_gallery img");
    // vælger alle billeder i #wrapper og lægger dem i en variabel som nodelist
    console.log(imageList);
    const imageSrcList = [];
    console.log(imageSrcList);
    const altCaption = [];
    console.log(altCaption);
    // array forberedt til at modtage img src fra de 9 billeder i #wrapper (imageList)

    // så længe der er img src i vores nodelist, bliver de lagt ind i vores imageSrcList (array), 
    //som komma-separerede værdier, ligesom i vores textList.
    for (let i = 0; i < imageList.length; i++) {
        imageSrcList.push($(imageList[i]).attr("src"));
        altCaption.push($(imageList[i]).attr("alt"));
    }
    // åbn lightbox ved klik på et hvilket som helst billede på siden inden for #wrapper
    $(imageList).on("click", function() {
        if (screen.width > 767) {
            currentImg = $(this).attr("src");
            $(".lightbox__image").attr("src", currentImg);
            currentNr = imageSrcList.indexOf(currentImg);
            $(".lightbox__caption").text(altCaption[currentNr]);
            $(".lightbox").show();
        }
    });

    /* luk lightbox igen ved at trykke indenfor #lightbox (hele skærmen),
    men kun hvis der klikkes udenfor området med billedet ( #lightbox_content) */
    $(".lightbox").on("click", function(e) {
        if ($(e.target).hasClass("lightbox")) {
            $(".lightbox").hide();
        }
    });

    // hvis der trykkes på next-pilen, skal billedet skifte frem, 
    // ud fra hvilket nummer billede vi er nået til og hvis vi er på det sidste i listen, 
    // så skal vi gå til det første billede og så kalde funktionen change().
    $(".lightbox__rightarrow").on("click", function() {
        currentImg = $(".lightbox__image").attr("src");
        currentNr = imageSrcList.indexOf(currentImg);
        if (currentNr < imageSrcList.length - 1) {
            currentNr++;
        } else {
            currentNr = 0;
        }
        changeImg();
    });

    // hvis der trykkes på back-pilen, skal billedet skifte tilbage, 
    // ud fra hvilket nummer billede vi er nået til og hvis vi er på det første i listen, 
    // så skal vi gå til det sidste billede og så kalde funktionen change().
    $(".lightbox__leftarrow").on("click", function() {
        currentImg = $(".lightbox__image").attr("src");
        currentNr = imageSrcList.indexOf(currentImg);
        if (currentNr > 0) {
            currentNr--;
        } else {
            currentNr = imageSrcList.length - 1;
        }
        changeImg();
    });

    // denne funktion skifter src-stien til det store billede og teksten nedenunder,
    // ud fra hvilket billede man er nået til ved tryk på pilene, enten frem eller tilbage.
    function changeImg() {
        $(".lightbox__image").fadeOut(150, function() {
            $(".lightbox__image").attr("src", imageSrcList[currentNr]);
            $(".lightbox__caption").text(altCaption[currentNr]);
            $(".lightbox__image").fadeIn(150);
        });
    }
});