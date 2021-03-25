import { plot } from "./js/graphic/columns.js";

function generate(size) {
    var out = [];

    for (let i=0; i<size; i++) {
        out.push(Math.floor(Math.random() * 100));
    }

    return out;
}

var data = generate(20);

plot("data_container", data);