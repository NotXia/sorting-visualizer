import { View } from "./View.js";

export class DotsView extends View {
    constructor(container_id, updateDelay) {
        super(container_id, updateDelay);
    }

    /* Returns the id of the dot that represents the given index */
    getDotId(index) {
        return `dot${index}`;
    }

    /* Returns the size for the dots adapted to the data length */
    getDotSize(data) {
        var container = $(`#${this.container_id}`);
        var diameter = Math.floor(container.width() / data.length);

        return {
            diameter: diameter,
            unit_height: Math.floor((container.height()-diameter) / (Math.max.apply(null, data)))
        };
    }

    /* Clears the container and renders the dots */
    render(data) {
        var container = $(`#${this.container_id}`);
        container.html("");

        var size = this.getDotSize(data);

        for (let i = 0; i < data.length; i++) {
            let dot = $("<div></div>")
                .addClass("data-dot")
                .attr({ id: this.getDotId(i) })
                .css({ 
                    width: `${size.diameter}px`, 
                    height: `${size.diameter}px`,
                    marginBottom: `${(size.unit_height * data[i])}px` 
                });

            container.append(dot);
        }
    }

    /* Restores the previously modified dots and updates the new modified dots */
    async update(data, modifiedIndex) {
        var size = this.getDotSize(data);

        for (let index in this.prevModifiedIndexes) {
            let dot = $(`#${this.getDotId(index)}`);
            dot.removeClass(`datastatus-${this.prevModifiedIndexes[index]}`);
        }

        this.prevModifiedIndexes = modifiedIndex;
        for (let index in modifiedIndex) {
            let dot = $(`#${this.getDotId(index)}`);
            dot.css({ marginBottom: `${(size.unit_height * data[index])}px` });
            dot.addClass(`datastatus-${modifiedIndex[index]}`);
        }

        await new Promise(r => setTimeout(r, this.updateDelay));
    }
}