export class View {

    constructor() {
        if (this.constructor == View) {
            throw new Error("Abstract class");
        }
    }

    render(data) {
        throw new Error("Abstract class");
    }

    update(data, modifiedIndex) {
        throw new Error("Abstract class");
    }

}