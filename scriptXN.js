// Datos de ejemplo
/*
const data = [
    {"alumno":"TuNombre","nota":9.09,"ranking":10},
    {"alumno":"Pedro","nota":8.7,"ranking":20},
    {"alumno":"Juan","nota":7.8,"ranking":30},
    {"alumno":"Ana","nota":6.8,"ranking":40},
    {"alumno":"Luis","nota":6.1,"ranking":50},
    {"alumno":"Maria","nota":5.3,"ranking":60},
    {"alumno":"Carlos","nota":4.2,"ranking":70},
    {"alumno":"Elena","nota":3.5,"ranking":80},
    {"alumno":"Jorge","nota":3.1,"ranking":90}
];
*/
// En la parte de abajo se lee el fichero .json, desde un repositorio de GitHub
d3.json ("https://raw.githubusercontent.com/DiegoUrquizo/data/main/data.json").then (function (datos){

    const data = datos;

// Ajustamos dimensiones de la gráfica
    const width = 600;
    const height = 500;
    const margin = {top: 20, right: 30, bottom: 40, left: 40};

// Crear el SVG
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

// Escalas
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.nota)])
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([d3.max(data, d => d.ranking),0])
        .range([height - margin.bottom, margin.top]);

    const color = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.nota)])
        .range(["red", "green"]);

    const radius = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.ranking)])
        .range([d3.max(data, d => d.ranking),0]);

// Ejes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    // Añadir ejes con animación
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis)
        .attr("opacity", 0) // Inicialmente invisible
        .transition()
        .duration(1000)
        .attr("opacity", 1); // Aparecerá lentamente

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis)
        .attr("opacity", 0) // Inicialmente invisible
        .transition()
        .duration(1000)
        .attr("opacity", 1); // Aparecerá lentamente

// Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

// Añadir círculos
    svg.append("g")
        .selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => x(d.nota))
        .attr("cy", d => y(d.ranking))
        .attr("r", d => radius(d.ranking))
        .attr("fill", d => color(d.nota))
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`Alumno: ${d.alumno}<br/>Nota: ${d.nota}`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
})