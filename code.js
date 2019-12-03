function createNode(element) {
    return document.createElement(element);
}
listinn = [];
let efni = document.getElementById('efni')

//næ í conserts api-ið 
fetch('https://apis.is/concerts')
    .then((resp) => resp.json())
    .then(function(data) {
        let tonleikar = data.results; 
        // nota map til að fara gegnum gögninn
        return tonleikar.map(function(tonleika) {
            // bý til nodinn
            let li = document.createElement("li"),
                img = document.createElement("img"),
                nafn = document.createElement("span");
                stadur =document.createElement("span");
                timi = document.createElement("span");
            // sit gögninn í  nodinn
            img.src = tonleika.imageSource;
            nafn.innerHTML = tonleika.eventDateName;
            stadur.innerHTML = tonleika.eventHallName;
            timi.innerHTML = tonleika.dateOfShow;
            //sit nodinn í html skrána 
            li.append(img);
            li.append(nafn);
            li.append(stadur);
            li.append(timi);
            efni.append(li);
            // sit nodinn í object
            listinn.push({
                tónleika:tonleika,
                li:li,
                nafn:nafn,
                stadur:stadur,
                timi:timi
            });
        }) 
    })

    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });


const leit = document.forms['leita'].querySelector('input');

// set eventlistener á leitar kassan
leit.addEventListener('keyup', function(e){
    // breyti textan í lágstafi
    const ord = e.target.value.toLowerCase();
    // fer í gegnum listan sem nodinn eru í
    Array.from(listinn).forEach(function(listinn){
        let nafn = listinn.nafn.textContent;
        // gá hvort stafinir í leitar kassanum eru í nafn sýningar
        if (nafn.toLowerCase().indexOf(ord)!=-1){
            listinn.li.style.display = 'grid';
        }
        else{
            listinn.li.style.display = 'none'
        }
    })
})