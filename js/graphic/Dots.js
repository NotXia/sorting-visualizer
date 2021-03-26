import { View } from "./View.js";

export class DotsView extends View {
    constructor(container_id) {
        super();
        this.container_id = container_id;
        this.prevModifiedIndexes = [];
    }

    getDotId(index) {
        return `dot${index}`;
    }

    getDotSize(data) {
        var container = $(`#${this.container_id}`);

        return {
            diameter: container.width() / data.length,
            unit_height: (container.height() - 50) / Math.max(...data)
        };
    }

    render(data) {
        var container = $(`#${this.container_id}`);
        container.html("");

        var size = this.getDotSize(data);

        for (let i = 0; i < data.length; i++) {
            let dot = $("<div></div>")
                .addClass("data-dot")
                .attr({ id: this.getDotId(i) })
                .css({ 
                    width: `${size.diameter / 2}px`, 
                    height: `${size.diameter / 2}px`,
                    marginRight: `${size.diameter / 2}px`,
                    marginBottom: `${(size.unit_height * data[i])}px` 
                });
            if (i === 0) {
                dot.css({ marginLeft: `${size.diameter / 2}px`, })
            }

            container.append(dot);
        }
    }

    update(data, modifiedIndex) {
        var size = this.getDotSize(data);

        this.prevModifiedIndexes.forEach(index => {
            let dot = $(`#${this.getDotId(index)}`);
            dot.removeClass("affected-data");
        });

        this.prevModifiedIndexes = modifiedIndex;
        modifiedIndex.forEach(index => {
            let dot = $(`#${this.getDotId(index)}`);
            dot.css({ marginBottom: `${(size.unit_height * data[index])}px` });
            dot.addClass("affected-data");
        });
    }
}