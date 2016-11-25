console.log("start");


let list = document.getElementById('list')
let point = document.createElement('div');
let pict = document.createElement('div');
let name = document.createElement('div');
let perks = document.createElement('div');
let perk1 = document.createElement('div');
let perk2 = document.createElement('div');
for (let i = 0; i < 12; i++) {
    point[i] = document.createElement('div');
    point[i].onclick = (() => {
        console.log(this);
    });
    pict[i] = document.createElement('div');
    name[i] = document.createElement('div');
    perks[i] = document.createElement('div');
    perk1[i] = document.createElement('div');
    perk2[i] = document.createElement('div');
    point[i].className = 'point';
    pict[i].className = 'pict';
    name[i].className = 'name';
    perks[i].className = 'perks';
    perk1[i].className = 'perk1';
    perk2[i].className = 'perk2';
    point[i].appendChild(name[i]);
    point[i].appendChild(pict[i]);
    point[i].appendChild(perks[i]);
    // perks[i].appendChild(perk1[i]);
}
const add = () => {
    for (let i = 0; i < 12; i++) {
        list.appendChild(point[i]);
    }
}
let pokemon = [];
let url = "/api/v1/pokemon/?limit=12"
const getList = () => {
    console.log("Getting list");
    return new Promise((resolve, reject) => {
        fetch("http://pokeapi.co" +url)
            .then((res) => {
                return res.json();
            })
                .then((json) => {
                    url = json.meta.next;
                    for (var i = 0; i < 12; i++) {
                        pokemon[i] = {id: json.objects[i].pkdx_id}
                    }
                    resolve(pokemon)
                })
                .catch((err) => {
                    console.log(err);
                })
    });
}
let types = [];
const getInfo = (pokemon) => {
    console.log("Getting Info");
    return new Promise((resolve, reject) => {
        for (let i = 0; i < 12; i++) {

            $(pict[i]).css({
                background: `url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon[i].id}.png")`,
                backgroundSize: "cover",
                backgroundColor: "rgb(15, 0, 110)",
                backgroundPosition: "center"
            })
            fetch(`http://pokeapi.co/api/v2/pokemon/${pokemon[i].id}`)
                .then((res) => {
                    return res.json();
                })
                    .then((json) => {
                        $(name[i]).html(json.name);
                        types[i] = json.types;
                        switch (types[i].length) {
                            case 1:
                                $(perk1[i]).html(types[i][0].type.name);
                                perks[i].appendChild(perk1[i]);
                                break;
                            case 2:
                                $(perk1[i]).html(types[i][0].type.name);
                                $(perk2[i]).html(types[i][1].type.name);
                                perks[i].appendChild(perk1[i]);
                                perks[i].appendChild(perk2[i]);
                                break;
                            case 3:
                                perks[i].appendChild(perk1[i]);
                                perks[i].appendChild(perk2[i]);
                                perks[i].appendChild(perk3[i]);
                                break;
                            case 4:
                                perks[i].appendChild(perk1[i]);
                                perks[i].appendChild(perk2[i]);
                                perks[i].appendChild(perk3[i]);
                                perks[i].appendChild(perk4[i]);
                                break;
                            default:
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })

        }
        add()
    });
}
const go = () => {
    getList()
        .then((pokemon) => {
            getInfo(pokemon)
                .then((pokemon, types) => {
                    console.log("the end");
                })
        })
}
go();
