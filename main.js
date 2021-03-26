import { ColumnsView } from "./js/graphic/columns.js";
import { SelectionSort } from "./js/algorithms/SelectionSort.js";

function generate(size) {
    var out = [];
    for (let i=0; i<size; i++) {
        out.push(Math.floor(Math.random() * 100));
    }
    return out;
}

$("#start_button").click(async () => {
    var data = generate(20);
    var view = new ColumnsView("data_container")
    var sort = new SelectionSort(data);

    view.render(data);
    
    while(!sort.hasEnded) {
        await new Promise(r => setTimeout(r, 20));
        let modifiedIndex = sort.nextStep();
        view.update(data, modifiedIndex);
    }

    view.render(data);
});