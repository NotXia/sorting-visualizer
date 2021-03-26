import { Sort } from "./Sort.js";

export class SelectionSort extends Sort {
    constructor(data, viewController) {
        super(data, viewController);
    }

    async start() {
        for (let i=0; i<this.data.length-1; i++) {
            let minIndex = i;
            for (let j=i+1; j<this.data.length; j++) {
                if (this.data[j] < this.data[minIndex]) {
                    minIndex = j;
                }
                await this.viewController.update(this.data, [i, j]);
            }

            let temp = this.data[minIndex];
            this.data[minIndex] = this.data[i];
            this.data[i] = temp;
            await this.viewController.update(this.data, [i, minIndex]);
        }
    }
}