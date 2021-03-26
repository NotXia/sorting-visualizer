import { Sort } from "./Sort.js";

export class MergeSort extends Sort {
    constructor(data, viewController) {
        super(data, viewController);
    }

    async start() {
        await mergesort(this.data, 0, this.data.length-1, this.viewController);

        function getRange(start, end) {
            var out = [];
            for(start; start <= end; start++) {
                out.push(start);
            }
            return out;
        }

        async function merge(data, start, center, end, viewController) {
            var i = start;
            var j = center + 1;
            var temp = [];

            while (i <= center && j <= end) {
                if (data[i] < data[j]) {
                    temp.push(data[i]);
                    i++;
                }
                else {
                    temp.push(data[j]);
                    j++;
                }
            }

            for (i; i <= center; i++) {
                temp.push(data[i]);
            }
            for (j; j <= end; j++) {
                temp.push(data[j]);
            }

            for (let i = start; i <= end; i++) {
                data[i] = temp[i - start];
                await viewController.update(data, [i]);
            }
        }

        async function mergesort(data, start, end, viewController) {
            if (start < end) {
                let center = Math.floor((start+end) / 2);

                await viewController.update(data, getRange(start, center));
                await mergesort(data, start, center, viewController);
                
                await viewController.update(data, getRange(center+1, end));
                await mergesort(data, center + 1, end, viewController);
    
                await merge(data, start, center, end, viewController);
            }
        }
    }
}