import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function ClusterLayout() {
  const svgRef = useRef();

  useEffect(() => {
    const width = 500;
    const height = 500;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const data = {
      name: 'Parent',
      children: [
        { name: 'Child 1' },
        { name: 'Child 2' },
        { name: 'Child 3' },
        { name: 'Child 4' },
        { name: 'Child 5' },
       
      ]
    };

    const cluster = d3.cluster().size([2 * Math.PI, width / 2 - 100]);

    const root = d3.hierarchy(data);
    cluster(root);

    svg.selectAll('line')
      .data(root.links())
      .enter()
      .append('line')
      .attr('x1', (d) => radialPoint(d.source.x, d.source.y)[0])
      .attr('y1', (d) => radialPoint(d.source.x, d.source.y)[1])
      .attr('x2', (d) => radialPoint(d.target.x, d.target.y)[0])
      .attr('y2', (d) => radialPoint(d.target.x, d.target.y)[1])
      .attr('stroke', 'black');

    svg.selectAll('circle')
      .data(root.descendants())
      .enter()
      .append('circle')
      .attr('cx', (d) => radialPoint(d.x, d.y)[0])
      .attr('cy', (d) => radialPoint(d.x, d.y)[1])
      .attr('r', 5)
      .attr('fill', 'lightblue')
      .attr('stroke', 'black');

    svg.selectAll('text')
      .data(root.descendants())
      .enter()
      .append('text')
      .attr('x', (d) => radialPoint(d.x, d.y)[0])
      .attr('y', (d) => radialPoint(d.x, d.y)[1])
      .attr('dy', '0.31em')
      .attr('text-anchor', (d) => d.x < Math.PI === !d.children ? 'start' : 'end')
      .attr('transform', (d) => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .text((d) => d.data.name)
      .style('font-size', '12px')
      .style('font-family', 'Arial');

    function radialPoint(x, y) {
      return [y * Math.cos(x), y * Math.sin(x)];
    }
  }, []);

  return <svg ref={svgRef}></svg>;
}
