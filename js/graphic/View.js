export class View {

    constructor(container_id, updateDelay) {
        if (this.constructor == View) {
            throw new Error("Abstract class");
        }

        this.container_id = container_id;
        this.updateDelay = updateDelay;
        this.prevModifiedIndexes = [];
    }

    /* Renders the given array */
    render(data) {
        throw new Error("Abstract class");
    }

    /* Updates from the render the modified indexes */
    update(data, modifiedIndex) {
        throw new Error("Abstract class");
    }

}