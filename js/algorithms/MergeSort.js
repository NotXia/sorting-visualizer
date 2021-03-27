import { Sort } from "./Sort.js";

export class MergeSort extends Sort {
    constructor(data, viewController) {
        super(data, viewController);
    }

    async start() {
        function getRange(start, end) {
            var out = [];
            for(start; start <= end; start++) {
                out.push(start);
            }
            return out;
        }

        const merge = async (start, center, end) => {
            var i = start;
            var j = center + 1;
            var temp = [];

            while (i <= center && j <= end) {
                if (this.data[i] < this.data[j]) {
                    temp.push(this.data[i]);
                    i++;
                }
                else {
                    temp.push(this.data[j]);
                    j++;
                }
            }

            for (i; i <= center; i++) {
                temp.push(this.data[i]);
            }
            for (j; j <= end; j++) {
                temp.push(this.data[j]);
            }

            for (let i = start; i <= end; i++) {
                this.data[i] = temp[i - start];
                await this.viewController.update(this.data, [i]);
            }
        }

        const mergesort = async (start, end) => {
            if (start < end) {
                let center = Math.floor((start+end) / 2);

                await this.viewController.update(this.data, getRange(start, center));
                await mergesort(start, center);
                
                await this.viewController.update(this.data, getRange(center+1, end));
                await mergesort(center + 1, end);
    
                await merge(start, center, end);
            }
        }

        await mergesort(0, this.data.length-1);
    }
}