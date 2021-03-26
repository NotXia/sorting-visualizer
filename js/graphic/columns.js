import { View } from "./View.js";

export class ColumnsView extends View {
    constructor(container_id) {
        super(container_id);
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
    update(data, modifiedIndex) {
        var size = this.getColumnSize(data);
        
        this.prevModifiedIndexes.forEach(index => {
            let column = $(`#${this.getColumnId(index)}`);
            column.removeClass("affected-data");
        });

        this.prevModifiedIndexes = modifiedIndex;
        modifiedIndex.forEach(index => {
            let column = $(`#${this.getColumnId(index)}`);
            column.css({ width: `${size.width}px`, height: `${(size.unit_height * data[index])}px` });
            column.addClass("affected-data");
        });
    }
}