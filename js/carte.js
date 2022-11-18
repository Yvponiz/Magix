const dictImages = {
    1: { Name: "Genome Minion", ImageURL: "images/cartes/minion.jpg" },
    5: { Name: "Gray Fox", ImageURL: "images/cartes/gray-fox.jpg" },
    6: { Name: "Meryl", ImageURL: "images/cartes/meryl.jpg" },
    9: { Name: "Mei Ling", ImageURL: "images/cartes/mei-ling.jpg" },
    20: { Name: "Psycho Mantis", ImageURL: "images/cartes/psycho-mantis.jpg" },
    23: { Name: "Sniper Wolf", ImageURL: "images/cartes/sniper-wolf.jpg" },
    25: { Name: "Genome Soldier", ImageURL: "images/cartes/genome-1.jpg" },
    30: { Name: "Genome Soldier", ImageURL: "images/cartes/genome-2.jpg" },
    31: { Name: "Genome Soldier", ImageURL: "images/cartes/genome-3.jpg" },
    33: { Name: "Solid Snake", ImageURL: "images/cartes/solid-snake2.jpg" },
    41: { Name: "Big Boss", ImageURL: "images/cartes/big-boss.jpg" },
    42: { Name: "Darpa Chief", ImageURL: "images/cartes/darpa-chief.jpg" },
    46: { Name: "Natasha", ImageURL: "images/cartes/natasha.jpg" },
    47: { Name: "Psycho Mantis", ImageURL: "images/cartes/psycho-mantis2.jpg" },
    57: { Name: "Meryl Action", ImageURL: "images/cartes/meryl2.jpg" },
    62: { Name: "Miller", ImageURL: "images/cartes/miller.jpg" },
    63: { Name: "Revolver Ocelot", ImageURL: "images/cartes/revolver-ocelot.jpg" },
    64: { Name: "Baker", ImageURL: "images/cartes/baker.jpg" },
    88: { Name: "Snake", ImageURL: "images/cartes/solid-snake.jpg" },
    71: { Name: "Otacon", ImageURL: "images/cartes/otacon.jpg" },
    73: { Name: "Ocelot", ImageURL: "images/cartes/ocelot.jpg" },
    78: { Name: "Raven", ImageURL: "images/cartes/raven.jpg" },
    81: { Name: "Campbell", ImageURL: "images/cartes/campbell.jpg" },
    87: { Name: "Ninja", ImageURL: "images/cartes/ninja.jpg" },
    92: { Name: "Naomi", ImageURL: "images/cartes/naomi.jpg" },
}


function createCard(dataCarte, border, opacity) {
    const cost = dataCarte.cost
    const mechanics = dataCarte.mechanics
    const atk = dataCarte.atk
    const hp = dataCarte.hp
    const uid = dataCarte.uid

    let imageURL = "images/cartes/other.jpg"
    let cardName = ""

    if (dictImages[dataCarte.id]) {
        imageURL = dictImages[dataCarte.id].ImageURL
        cardName = dictImages[dataCarte.id].Name
    }

    return `
        <div class="card-frame" style="border:${border};opacity:${opacity}" data-uid="${uid}">
            <div class="card-cost">
                ${cost}
            </div>
            <div class="card-image-div">
                <img src="${imageURL}" class="card-image-item">
            </div>
            <span class="card-name">${cardName}</span>
            <div class="card-mechanics">
                ${mechanics}
            </div>
            <div class="card-info">
                <div class="card-atk">${atk}</div>
                <div class="card-hp">${hp}</div>
            </div>
        </div>
    `;
}