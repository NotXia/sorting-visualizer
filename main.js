import { ColumnsView } from "./js/graphic/Columns.js";
import { DotsView } from "./js/graphic/Dots.js";
import { SelectionSort } from "./js/algorithms/SelectionSort.js";
import { MergeSort } from "./js/algorithms/MergeSort.js";

function generate(size) {
    var out = [];
    for (let i=0; i<size; i++) {
        out.push(Math.floor(Math.random() * 100));
    }
    return out;
}

function getAlgorithm(data, viewController) {
    switch ($("#algorithm_select").val()) {
        case "selection":
            return new SelectionSort(data, viewController);

        case "merge":
            return new MergeSort(data, viewController);

        default:
            return null;
    }
}

var delay = 500;
var viewController = new ColumnsView("data_container", delay);
var data = [];

$("#start_button").click(async () => {
    data = generate(20);
    var sort = getAlgorithm(data, viewController);
    $("#view_toggle").prop("disabled", true);

    viewController.render(data);
    await sort.start();
    viewController.render(data);

    $("#view_toggle").prop("disabled", false);
});

$("#view_toggle").change(() => {
    if ($("#view_toggle").is(':checked')) {
        viewController = new DotsView("data_container", delay);
        $("#view_label").html("Dots");
    }
    else {
        viewController = new ColumnsView("data_container", delay);
        $("#view_label").html("Columns");
    }

    viewController.render(data);
});