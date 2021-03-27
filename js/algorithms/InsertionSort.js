import { Sort } from "./Sort.js";

export class InsertionSort extends Sort {
    constructor(data, viewController) {
        super(data, viewController);
    }

    async start() {
        for (let i=1; i<this.data.length; i++) {
            let value = this.data[i];
            let insert_index = i;

            for (let j=0; j<i; j++) {
                await this.viewController.update(this.data, { [j]: "scan", [i] : "highlight" });
                if (value < this.data[j]) {
                    insert_index = j;
                    break;
                }
            }

            for (let j=i; j>insert_index; j--) {
                this.data[j] = this.data[j-1];
                await this.viewController.update(this.data, { [j]: "modify", [j-1]: "modify" });
            }
            this.data[insert_index] = value;
            await this.viewController.update(this.data, { [insert_index]: "modify" });
        }
    }
}
