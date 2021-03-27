import { Sort } from "./Sort.js";

export class QuickSortRandom extends Sort {
    constructor(data, viewController) {
        super(data, viewController);
    }

    async start() {
        function getRange(start, end, type) {
            var out = {};
            for (start; start <= end; start++) {
                out[start] = type;
            }
            return out;
        }

        const partition = async (start, end) => {
            var left = start;
            var right = end + 1;

            var pivot_index = start + (Math.floor(Math.random() * (end-start+1)))
            var pivot = this.data[pivot_index];
            this.data[pivot_index] = this.data[start];
            this.data[start] = pivot;
            await this.viewController.update(this.data, { [start]: "modify", [pivot_index]: "modify" });


            while (true) {
                do {
                    left++;
                    await this.viewController.update(this.data, { [left]: "scan", [start] : "highlight" });
                } while (left <= end && this.data[left] <= pivot);

                do {
                    right--;
                    await this.viewController.update(this.data, { [right]: "scan", [start]: "highlight" });
                } while (this.data[right] > pivot);

                if (left < right) {
                    let temp = this.data[left];
                    this.data[left] = this.data[right];
                    this.data[right] = temp;
                    await this.viewController.update(this.data, { [left]: "modify", [right]: "modify", [start]: "highlight" });
                }
                else {
                    break;
                }
            }

            let temp = this.data[start];
            this.data[start] = this.data[right];
            this.data[right] = temp;
            await this.viewController.update(this.data, {[start] : "modify", [right] : "modify"});

            return right;
        }

        const quicksort = async (start, end) => {
            if (start < end) {
                await this.viewController.update(this.data, getRange(start, end, "scan"));
                let middle = await partition(start, end);
                
                await this.viewController.update(this.data, getRange(start, middle, "scan"));
                await quicksort(start, middle - 1);

                await this.viewController.update(this.data, getRange(middle+1, end, "scan"));
                await quicksort(middle + 1, end);
            }
        }

        await quicksort(0, this.data.length-1);
    }
}