const translate = require('translate')
let fishes = [
    {
        "en": "Silver spoon",
        "fr": ""
    },
    {
        "en": "Silver fork",
        "fr": ""
    },
    {
        "en": "Oversized spoon",
        "fr": ""
    },
    {
        "en": "Small figurine",
        "fr": ""
    },
    {
        "en": "Ship's wheel",
        "fr": ""
    },
    {
        "en": "Rusty anchor",
        "fr": ""
    },
    {
        "en": "Snow globe",
        "fr": ""
    },
    {
        "en": "Hammerstone",
        "fr": ""
    },
    {
        "en": "Stone hand axe",
        "fr": ""
    },
    {
        "en": "Harpoon",
        "fr": ""
    },
    {
        "en": "Rusty spear",
        "fr": ""
    },
    {
        "en": "Terracotta soldier",
        "fr": ""
    },
    {
        "en": "Underwater tablet",
        "fr": ""
    },
    {
        "en": "Green mask",
        "fr": ""
    },
    {
        "en": "Red mask",
        "fr": ""
    },
    {
        "en": "Blue mask",
        "fr": ""
    },
    {
        "en": "Prehistoric bowl",
        "fr": ""
    },
    {
        "en": "Ancient map",
        "fr": ""
    },
    {
        "en": "Stone portrait",
        "fr": ""
    },
    {
        "en": "Bronze hammer",
        "fr": ""
    },
    {
        "en": "Ruby hairpin",
        "fr": ""
    },
    {
        "en": "Sky disk",
        "fr": ""
    },
    {
        "en": "Clay vessel",
        "fr": ""
    },
    {
        "en": "Ancient battery",
        "fr": ""
    },
    {
        "en": "Golden bell",
        "fr": ""
    },
    {
        "en": "Optical glass prism",
        "fr": ""
    },
    {
        "en": "Leather parchment",
        "fr": ""
    },
    {
        "en": "Wood carving",
        "fr": ""
    },
    {
        "en": "Shadow puppet",
        "fr": ""
    },
    {
        "en": "Golden keris",
        "fr": ""
    },
    {
        "en": "Ceramic vase",
        "fr": ""
    },
    {
        "en": "Chipped pottery jug",
        "fr": ""
    },
    {
        "en": "Ancient compass",
        "fr": ""
    },
    {
        "en": "Wooden hand fan",
        "fr": ""
    },
    {
        "en": "Bronze statue",
        "fr": ""
    },
    {
        "en": "Chipped helmet",
        "fr": ""
    },
    {
        "en": "Unfinished clay statue",
        "fr": ""
    },
    {
        "en": "Beaded necklace",
        "fr": ""
    },
    {
        "en": "Metal boot",
        "fr": ""
    },
    {
        "en": "Agate ring",
        "fr": ""
    },
    {
        "en": "Jasmine crown",
        "fr": ""
    },
    {
        "en": "Jade locket",
        "fr": ""
    },
    {
        "en": "Masquerade mask",
        "fr": ""
    },
    {
        "en": "Pearl chain",
        "fr": ""
    },
    {
        "en": "Gold earring",
        "fr": ""
    },
    {
        "en": "Shell anklet",
        "fr": ""
    },
    {
        "en": "Ancient rainbow armband",
        "fr": ""
    },
    {
        "en": "Gemstone beads",
        "fr": ""
    },
    {
        "en": "Stingray jewel plate",
        "fr": ""
    },
    {
        "en": "Terrarium pendant",
        "fr": ""
    },
    {
        "en": "Moonlight earrings",
        "fr": ""
    },
    {
        "en": "Dragon's tears",
        "fr": ""
    },
    {
        "en": "Jade hair stick",
        "fr": ""
    },
    {
        "en": "Pearl brooch",
        "fr": ""
    },
    {
        "en": "Carved ring holder",
        "fr": ""
    },
    {
        "en": "Dragon's trisula",
        "fr": ""
    },
    {
        "en": "Broken blade",
        "fr": ""
    },
    {
        "en": "Batik shawl",
        "fr": ""
    },
    {
        "en": "Royal bowl",
        "fr": ""
    },
    {
        "en": "Beach snow globe",
        "fr": ""
    },
    {
        "en": "Glass bowl",
        "fr": ""
    },
    {
        "en": "Flying dragon teapot",
        "fr": ""
    },
    {
        "en": "Town model",
        "fr": ""
    },
    {
        "en": "Gemstone bonsai",
        "fr": ""
    },
    {
        "en": "Gold fish",
        "fr": ""
    },
    {
        "en": "Crystal ball",
        "fr": ""
    },
    {
        "en": "Gemstone hourglass",
        "fr": ""
    },
    {
        "en": "Gemstone candlestick",
        "fr": ""
    },
    {
        "en": "Magic lamp",
        "fr": ""
    },
    {
        "en": "Broken sundial",
        "fr": ""
    },
    {
        "en": "Salt lamp",
        "fr": ""
    },
    {
        "en": "Glass star",
        "fr": ""
    },
    {
        "en": "Silver sandal",
        "fr": ""
    },
    {
        "en": "Cassete player",
        "fr": ""
    },
    {
        "en": "C.I. Jo",
        "fr": ""
    },
    {
        "en": "Dumbphone",
        "fr": ""
    },
    {
        "en": "Water bottle",
        "fr": ""
    },
    {
        "en": "Vinyl record",
        "fr": ""
    }
];

translate.engine = 'google'
translate.key = 'zzfzf'
translate.from = "en"

const promise = new Promise((resolve, reject) => {
    let processed = 0;
    fishes.map((fish, fishIndex) => {
        translate(fish.en, "fr").then(translated => {
            fishes[fishIndex].fr = translated
            processed++;
            console.log(processed, fishes.length)
            if (processed === fishes.length) { resolve(); }
        })
    })
})

promise.then(() => {
    console.log(fishes);
}).catch(err => {
    console.log(err);
})