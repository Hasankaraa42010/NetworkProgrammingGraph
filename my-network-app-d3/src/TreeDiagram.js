import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TreeDiagram = ({ data }) => {
    const ref = useRef();

    useEffect(() => {
        drawChart();
    }, [data]);

    const drawChart = () => {
        const margin = { top: 20, right: 90, bottom: 30, left: 90 },
            width = 1200 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
            

        const svg = d3.select(ref.current)
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
         svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "lightyellow"); // Arka plan rengi burada belirleniyor

        const tree = d3.tree().size([height, width]);
        const root = d3.hierarchy(data, d => d.children);
        tree(root);

        const g = svg.selectAll('.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr('transform', function(d) { 
                return "translate(" + d.y + "," + d.x + ")"; 
            });

        g.append('circle')
            .attr('r', 10)
            .style('fill', 'lightsteelblue');

        g.append('text')
            .attr('dx', function(d) { return d.children ? -8 : 8; })
            .attr('dy', 3)
            .style('text-anchor', function(d) { return d.children ? 'end' : 'start'; })
            .text(function(d) { return d.data.name; });

        svg.selectAll('.link')
            .data(root.links())
            .enter()
            .insert('path', 'g')
            .attr('class', 'link')
            .attr('d', d3.linkHorizontal()
                .x(function(d) { return d.y; })
                .y(function(d) { return d.x; }));
    };

    return <svg ref={ref}></svg>
};

export default TreeDiagram;
