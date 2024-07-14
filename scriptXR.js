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
    const width = 900;
    const height = 400;
    const margin = {top: 20, right: 30, bottom: 40, left: 40};

// Crear el SVG
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

// Escalas
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.ranking)])
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.nota)])
        .range([height - margin.bottom, margin.top]);

    const color = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, d3.max(data, d => d.nota)]);

    const radius = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.nota)])
        .range([0, 20]);

// Ejes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

// Añadir ejes con animación
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .transition()
        .duration(1000)
        .call(xAxis);

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .transition()
        .duration(1000)
        .call(yAxis);

// Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

// Añadir círculos
    svg.append("g")
        .selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => x(d.ranking))
        .attr("cy", d => y(d.nota))
        .attr("r", d => radius(d.nota))
        .attr("fill", d => color(d.nota))
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`Alumno: ${d.alumno}<br/>Ranking: ${d.ranking}`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
})