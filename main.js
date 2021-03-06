import { ColumnsView } from "./js/graphic/Columns.js";
import { DotsView } from "./js/graphic/Dots.js";
import { SelectionSort } from "./js/algorithms/SelectionSort.js";
import { MergeSort } from "./js/algorithms/MergeSort.js";
import { QuickSort } from "./js/algorithms/QuickSort.js";
import { InsertionSort } from "./js/algorithms/InsertionSort.js";
import { BubbleSort } from "./js/algorithms/BubbleSort.js";
import { QuickSortRandom } from "./js/algorithms/QuickSortRandom.js";
import { HeapSort } from "./js/algorithms/HeapSort.js";

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

        case "insertion":
            return new InsertionSort(data, viewController);

        case "bubble":
            return new BubbleSort(data, viewController);

        case "merge":
            return new MergeSort(data, viewController);

        case "quick":
            return new QuickSort(data, viewController);

        case "quick_random":
            return new QuickSortRandom(data, viewController);

        case "heap":
            return new HeapSort(data, viewController);

        default:
            return null;
    }
}

function lock_ui() {
    $("#view_toggle").prop("disabled", true);
    $("#start_button").prop("disabled", true);
    $("#generate_button").prop("disabled", true);
}

function unlock_ui() {
    $("#view_toggle").prop("disabled", false);
    $("#start_button").prop("disabled", false);
    $("#generate_button").prop("disabled", false);
}

var delay = 500;
var viewController = new ColumnsView("data_container", delay);

$("#reset_button").hide();
var reset = true;
var old_data = []

var data = [];
var executing = false;

$("#generate_button").click(() => {
    $("#reset_button").hide();
    
    if (!executing) {
        data = generate($("#data_size_input").val());
        old_data = [];
        viewController.render(data);
    }
});

$("#start_button").click(async () => {
    $("#reset_button").hide();

    if (!executing) {
        executing = true;
        lock_ui();

        if (data.length <= 0) {
            data = generate($("#data_size_input").val());
        }  
        
        if (reset) {
            old_data = [...data];
        }

        var sort = getAlgorithm(data, viewController);
        viewController.render(data);
        await sort.start();
        viewController.render(data);

        unlock_ui();
        executing = false;
        $("#reset_button").show();
        reset = false;
    }
});

$("#view_toggle").change(() => {
    if (!executing) {
        if ($("#view_toggle").is(':checked')) {
            viewController = new DotsView("data_container", delay);
            $("#view_label").html("Dots");
        }
        else {
            viewController = new ColumnsView("data_container", delay);
            $("#view_label").html("Columns");
        }
    
        viewController.render(data);
    }
});

$("#reset_button").click(() => {
    $("#reset_button").hide();
    reset = true;
    data = old_data;
    old_data = [];
    viewController.render(data);
});

$(document).on('input', '#speed_slider', function () {
    delay = 50 - $("#speed_slider").val();
    delay = delay * delay
    viewController.updateDelay = delay;
});

$(window).on('resize', function () {
    viewController.render(data);
    viewController.update(data, viewController.prevModifiedIndexes);
});
