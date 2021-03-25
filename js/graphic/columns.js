export function plot(container_id, data) {
    var container = $(`#${container_id}`);

    var column_width = container.width() / data.length;
    var unit_height = ((container.height()-5) / Math.max(...data));

    data.forEach(element => {
        let column = $("<div></div>")
            .html(`<span>${element}</span>`)
            .addClass("data-column")
            .css({ width: `${column_width}px`, height: `${(unit_height*element)}px`});
        container.append(column);
    });
}