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

            // html var toevoegen
            html += `<section class="boek">`;
            html += `<img class="boek__cover" src="${boek.cover}" alt="${completeTitel}">` ;
            html += `<h3>${completeTitel}</h3>`;
            html += `<span class="boek__uitgave">  ${boek.uitgave} </span>`;
            html += `<span class="boek__ean"> ean: ${boek.ean} </span>`;
            html += `<span class="boek__paginas"> ${boek.paginas} pagina's </span>`;
            html += `<span class="boek__taal"> ${boek.taal}</span>`;
            html += `</section>`;
        });
        uitvoer.innerHTML = html
    }
}