d3.json("https://raw.githubusercontent.com/DiegoUrquizo/data/main/data.json").then(function (datos) {
    var escalaTamanio = d3.scaleLinear()
        .domain(d3.extent(datos, function (d) { return d.ranking; }))
        .range(["50px", "10px"]);

    var escalaColor = d3.scaleLinear()
        .domain(d3.extent(datos, function (d) { return d.nota; }))
        .range(["red", "green"]);

    var elementoUl = d3.select("body").append("ul");

    elementoUl
        .selectAll("li")
        .data(datos)
        .join("li")
        .text(function (d) { return d.nota; })
        .style("font-size", "0px") // Inicialmente el tamaño es 0
        .style("color", function (d) { return escalaColor(d.nota); })
        .style("opacity", 0) // Inicialmente invisible
        .transition() // Añadir transición
        .duration(1000) // Duración de la animación en milisegundos
        .style("font-size", function (d) { return escalaTamanio(d.ranking); })
        .style("opacity", 1); // Al final de la animación es completamente visible
});
