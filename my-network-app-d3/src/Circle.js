import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function Circle() {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    let circle = svg.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', 50)
      .style('fill', 'blue');

    svg.on('click', function() {
      circle.transition()
        .duration(1000)
        .attr('r', Math.random() * 100);
    });
  }, []);

  return <svg ref={ref} width="500" height="500" />;
}

export default Circle;
