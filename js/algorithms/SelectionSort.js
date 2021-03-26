import { Sort } from "./Sort.js";

export class SelectionSort extends Sort {
    constructor(data) {
        super(data);

        this.i = 0;
        this.j = 1;
        this.curr_min_index = 0;
    }

    nextStep() {
        if (this.hasEnded) { return; }

        var modifiedIndexes = [];

        if (this.j < this.data.length) {
            modifiedIndexes.push(this.i);
            modifiedIndexes.push(this.j);

            if (this.data[this.j] < this.data[this.curr_min_index]) {
                this.curr_min_index = this.j;
            }

            this.j++;
        }
        else {
            modifiedIndexes.push(this.i);
            modifiedIndexes.push(this.curr_min_index);
            
            let temp = this.data[this.i];
            this.data[this.i] = this.data[this.curr_min_index];
            this.data[this.curr_min_index] = temp;
            
            this.i++;
            if (this.i >= this.data.length-1) {
                this.hasEnded = true;
            }
            this.j = this.i+1;
            this.curr_min_index = this.i;
        }

        return modifiedIndexes;
    }
}