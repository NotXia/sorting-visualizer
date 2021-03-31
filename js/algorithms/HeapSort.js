import { Sort } from "./Sort.js";

export class HeapSort extends Sort {
    constructor(data, viewController) {
        super(data, viewController);
    }

    async start() {
        const getLeftIndex = (index) => {
            return index*2 + 1;
        }
        const getRightIndex = (index) => {
            return index*2 + 2;
        }

        const fixHeap = async (heap, heapEndIndex, toFixIndex) => {
            if (getLeftIndex(toFixIndex) > heapEndIndex) {
                return;
            }
            
            // Finds the biggest child
            var biggestChildIndex = getRightIndex(toFixIndex);
            await this.viewController.update(this.data, { [biggestChildIndex]: "scan" });
            if (heap[biggestChildIndex] < heap[getLeftIndex(toFixIndex)]) {
                biggestChildIndex = getLeftIndex(toFixIndex);
                await this.viewController.update(this.data, { [biggestChildIndex]: "scan" });
            }

            // Swap if the parent is smaller than the child
            if (heap[biggestChildIndex] > heap[toFixIndex]) {
                var temp = heap[biggestChildIndex];
                heap[biggestChildIndex] = heap[toFixIndex];
                heap[toFixIndex] = temp;
                await this.viewController.update(this.data, { [toFixIndex]: "modify", [biggestChildIndex]: "modify" });

                await fixHeap(heap, heapEndIndex, biggestChildIndex);
            }
        }

        const heapify = async (data, heapEndIndex, rootIndex) => {
            if (rootIndex <= heapEndIndex) {
                await heapify(data, heapEndIndex, getLeftIndex(rootIndex));
                await heapify(data, heapEndIndex, getRightIndex(rootIndex));
                
                await this.viewController.update(this.data, { [rootIndex]: "highlight" });
                await fixHeap(data, heapEndIndex, rootIndex);
            }
        }

        const popMax = async (heap, heapEndIndex) => {
            let max = heap[0];

            heap[0] = heap[heapEndIndex];
            await this.viewController.update(this.data, { [0]: "modify", [heapEndIndex]: "modify" });
            await fixHeap(heap, heapEndIndex-1, 0);

            return max;
        }

        var heapEndIndex = this.data.length - 1;
        await heapify(this.data, heapEndIndex, 0);
        
        for (let i=heapEndIndex; i>=0; i--) {
            this.data[i] = await popMax(this.data, i);
            await this.viewController.update(this.data, { [i]: "highlight" });
        }
    }
}