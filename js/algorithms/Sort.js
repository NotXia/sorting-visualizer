export class Sort {
    constructor(data) {
        this.data = data;
        this.hasEnded = false;
    }

    nextStep() {
        throw new Error("Abstract class");
    }
}