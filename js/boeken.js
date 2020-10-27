const uitvoer = document.getElementById('boeken');
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && xhr.status ==200) {
        let resultaat = JSON.parse(xhr.responseText);
        boeken.data = resultaat;
        boeken.uitvoeren();
    } 
}
xhr.open('GET', 'boek.json', true);
xhr.send();

const boeken = {

    // er wordt hier een eigenschop data aangemaakt (regel 7)
    uitvoeren() {
        let html = "";
        this.data.forEach( boek => {

            // in het geval van een voortitel moet deze voor de titel worden geplaatst
            let completeTitel = "";
            if(boek.voortitel ) {
                completeTitel += boek.voortitel + " ";
            }
            completeTitel += boek.titel;

            // een lijst met auteurs maken
            let auteurs = "";
            boek.auteurs.forEach((schrijver, index) => {
                let tv = schrijver.tussenvoegsel ? schrijver.tussenvoegsel+" " : "";
                // het scheidingsteken tussen de auteurs
                let separator = ", ";
                if(index >= boek.auteurs.length-2 ) { separator = " en "; }
                if(index >= boek.auteurs.length-1 ) { separator = ""; }
                auteurs += schrijver.voornaam + " " + tv + schrijver.achternaam + separator;
            })

            // html var toevoegen
            html += `<section class="boek">`;
            html += `<img class="boek__cover" src="${boek.cover}" alt="${completeTitel}">` ;
            html += `<h3 class="boek__kopje">${completeTitel}</h3>`;
            html += `<p class="boek__auteurs"> ${auteurs}</p>`;
            html += `<span class="boek__uitgave">  ${boek.uitgave} </span>`;
            html += `<span class="boek__ean"> ean: ${boek.ean} </span>`;
            html += `<span class="boek__paginas"> ${boek.paginas} pagina's </span>`;
            html += `<span class="boek__taal"> ${boek.taal}</span>`;
            html += `<div class="boek__prijs"> ${boek.prijs.toLocaleString('nl-NL',{currency: 'EUR', style: 'currency'})}</div>`;
            html += `</section>`;
        });
        uitvoer.innerHTML = html
    }
}