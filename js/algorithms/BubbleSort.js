import { Sort } from "./Sort.js";

export class BubbleSort extends Sort {
    constructor(data, viewController) {
        super(data, viewController);
    }

    async start() {
        for (let i=0; i<this.data.length; i++) {
            let hasSwapped = false;

            for (let j=0; j<this.data.length-i; j++) {
                await this.viewController.update(this.data, { [j]: "scan", [j + 1]: "scan" });

                if (this.data[j] > this.data[j+1]) {
                    let temp = this.data[j];
                    this.data[j] = this.data[j+1];
                    this.data[j+1] = temp;
                    hasSwapped = true;
                    await this.viewController.update(this.data, { [j]: "modify", [j+1]: "modify" });
                }
            }

            if (!hasSwapped) {
                break;
            }
        }
    }
}
