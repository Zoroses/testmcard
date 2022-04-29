var eCard = document.querySelector(".ecard");
var ePrev = document.querySelector("#ecard-preview");
var eDownloadPopup = document.querySelector("#ecard-download-popup");
var eText = document.querySelectorAll(".ecard-text");
var eOutput = document.querySelector(".ecard-output");
var eOverlay = document.querySelector(".ecard-popup-overlay");
var ePopup = document.querySelector(".ecard-popup");
var eEdit = document.querySelector("#ecard-edit");
var eLoadmore = document.querySelector(".ecard-loadmore");
var ePick = document.querySelector(".ecard-pick");
var eUcapan = document.querySelector("#ucapan");
var eImg = document.querySelector(".ecard-img img");
var eNama = document.querySelector("#nama");
var eDisplayNama = document.querySelector(".ecard-display-nama");
var eDisplayUcapan = document.querySelector(".ecard-display-text");
var eClose = document.querySelector(".ecard-close");
var eBorderNama = document.querySelector(".ecard-border-nama");
var eBorderUcapan = document.querySelector(".ecard-border-ucapan");
var canvas = document.querySelector("#canvas");

ePrev.addEventListener("click", function() {
    ePopup.style.display = "block";
    eOverlay.style.display = "block";

    eBorderNama.style.opacity = 0;
    eBorderUcapan.style.opacity = 0;

    eDisplayNama.style.opacity = 1;
    eDisplayUcapan.style.opacity = 1;

    setTimeout(function() {
        if (!!canvas) canvas.remove();
        else console.log("no");

        html2canvas(eCard, {
            useCORS: true
        }).then(canvas => {
            eOutput.appendChild(canvas).setAttribute("id", "canvas");
        })
    }, 1250);
});

eEdit.addEventListener("click", reload);

eLoadmore.addEventListener("click", function() {
    ePick.classList.toggle("opened");
    if (eLoadmore.innerHTML === "Lihat Semua") {
        eLoadmore.innerHTML = "Lihat Lebih Sedikit";
    } else {
        eLoadmore.innerHTML = "Lihat Semua";
    }
});

var radiosBg = document.querySelectorAll("input[name='kartu']");

for(var i=0; i<radiosBg.length; i++) {
    radiosBg[i].addEventListener("change", function() {
        for (var j=0; j<radiosBg.length; j++) {
            radiosBg[j].parentElement.classList.remove("selected");
        }
        this.parentElement.classList.add("selected");
        eImg.src = this.nextElementSibling.querySelector("img").src;
        eDisplayNama.style.color = this.getAttribute("data-color");
        eDisplayUcapan.style.color = this.getAttribute("data-color");
        eBorderNama.style.borderColor = this.getAttribute("data-color");
        eBorderUcapan.style.borderColor = this.getAttribute("data-color");
        for (i=0; i<eText.length; i++) {
            eText[i].style.color = this.getAttribute("data-color");
        }
    });
};

var radiosCopy = document.querySelectorAll("input[name='ucapan']");

for(var i=0; i<radiosCopy.length; i++) {
    radiosCopy[i].addEventListener("change", function() {
        eUcapan.value = this.nextElementSibling.innerText;
        eDisplayUcapan.innerHTML = this.nextElementSibling.innerHTML;
    });
};

eNama.onkeyup = function() {
    eDisplayNama.innerHTML = eNama.value;
}

eUcapan.onkeyup = function() {
    clearText(); 
    clearText();
    
    eDisplayUcapan.innerHTML = eUcapan.value;
    var text = this.value;
    var charlimit = 250;
    var lines = text.split("\n");

    for (var i = 0; i < lines.length; i++) {
        if (lines[i].length <= charlimit) continue;
        var j = 0; space = charlimit;
        while (j++ <= charlimit) {
            if (lines[i].charAt(j) === ' ') space = j;
        }
        lines[i + 1] = lines[i].substring(space + 1) + (lines[i + 1] || "");
        lines[i] = lines[i].substring(0, space);
    }
}

function downloadImg() {
    var link = document.createElement('a');
    link.download = 'ecard-kompas.png';
    link.href = document.getElementById('canvas').toDataURL()
    link.click();
}

eDownloadPopup.addEventListener("click", downloadImg);

var clearText = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            // do something
            eUcapan.value = "";
        }
    };
})();

function reload() {
    location.reload();
}

eClose.addEventListener("click", reload);
eOverlay.addEventListener("click", reload);

// tabbing
function openPage(pageName, el, color) {
    var i, tc, tl;
    tc = document.querySelectorAll(".tabcontent");
    for (i = 0; i < tc.length; i++) {
        tc[i].style.display = "none";
    }
    tl = document.querySelectorAll(".tablink");
    for (i = 0; i < tl.length; i++) {
        tl[i].classList.remove("ecard-active");
    }
    document.getElementById(pageName).style.display = "block";
    el.classList.add("ecard-active");
}

var defaultOpen = document.querySelector("#defaultOpen");
// Get the element with id="defaultOpen" and click on it
if (!!defaultOpen) {
    defaultOpen.click();
}