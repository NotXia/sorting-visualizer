import { View } from "./View.js";

export class ColumnsView extends View {
    constructor(container_id, updateDelay) {
        super(container_id, updateDelay);
    }

    /* Returns the id of the column that represents the given index */
    getColumnId(index) {
        return `column${index}`;
    }

    /* Returns the size for the columns adapted to the data length */
    getColumnSize(data) {
        var container = $(`#${this.container_id}`);

        return {
            width: container.width() / data.length,
            unit_height: (container.height() - 5) / Math.max(...data)
        };
    }

    /* Clears the container and renders the columns */
    render(data) {
        var container = $(`#${this.container_id}`);
        container.html("");

        var size = this.getColumnSize(data);

        for (let i = 0; i < data.length; i++) {
            let column = $("<div></div>")
                .html(`<span>${data[i]}</span>`)
                .addClass("data-column")
                .attr({ id: this.getColumnId(i) })
                .css({ width: `${size.width}px`, height: `${(size.unit_height * data[i])}px` });

            container.append(column);
        }
    }

    /* Restores the previously modified columns and updates the new modified columns */
    async update(data, modifiedIndex) {
        var size = this.getColumnSize(data);
        
        for (let index in this.prevModifiedIndexes) {
            let column = $(`#${this.getColumnId(index)}`);
            column.removeClass(`datastatus-${this.prevModifiedIndexes[index]}`);
        }

        this.prevModifiedIndexes = modifiedIndex;
        for (let index in modifiedIndex) {
            let column = $(`#${this.getColumnId(index)}`);
            column.css({ width: `${size.width}px`, height: `${(size.unit_height * data[index])}px` });
            column.html(`<span>${data[index]}</span>`)
            column.addClass(`datastatus-${modifiedIndex[index]}`);
        }

        await new Promise(r => setTimeout(r, this.updateDelay));
    }
}
