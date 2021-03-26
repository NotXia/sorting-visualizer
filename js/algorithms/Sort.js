export class Sort {
    constructor(data, viewController) {
        this.data = data;
        this.viewController = viewController;
    }

    async start() {
        throw new Error("Abstract class");
    }
}