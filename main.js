import { ColumnsView } from "./js/graphic/columns.js";
import { DotsView } from "./js/graphic/dots.js";
import { SelectionSort } from "./js/algorithms/SelectionSort.js";

function generate(size) {
    var out = [];
    for (let i=0; i<size; i++) {
        out.push(Math.floor(Math.random() * 100));
    }
    return out;
}

var view = new ColumnsView("data_container");
var data = [];

$("#start_button").click(async () => {
    data = generate(20);
    var sort = new SelectionSort(data);

    view.render(data);
    
    while(!sort.hasEnded) {
        await new Promise(r => setTimeout(r, 20));
        let modifiedIndex = sort.nextStep();
        view.update(data, modifiedIndex);
    }

    view.render(data);
});

$("#view_toggle").click(() => {
    if ($("#view_toggle").is(':checked')) {
        view = new DotsView("data_container");
        $("#view_label").html("Dots");
    }
    else {
        view = new ColumnsView("data_container");
        $("#view_label").html("Columns");
    }

    view.render(data);
});