// src/components/HeatMap.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HeatMap = ({ data }) => {
    const ref = useRef();

    useEffect(() => {
        if (data.length === 0) return;

        // Extract words and calculate frequencies
        const wordCounts = data.reduce((acc, item) => {
            acc[item.text] = (acc[item.text] || 0) + 1;
            return acc;
        }, {});

        const words = Object.keys(wordCounts);
        const counts = Object.values(wordCounts);

        // Set up dimensions and scales
        const width = 800;
        const height = 600;
        const colorScale = d3.scaleSequential(d3.interpolateBlues)
                             .domain([0, d3.max(counts)]);

        // Create SVG
        const svg = d3.select(ref.current)
                      .attr('width', width)
                      .attr('height', height);

        // Clear previous content
        svg.selectAll('*').remove();

        // Set up grid size and margins
        const gridSize = Math.floor(width / words.length);
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };

        // Create heat map squares
        svg.selectAll('.word')
           .data(words)
           .enter()
           .append('rect')
           .attr('x', (d, i) => (i % Math.floor(width / gridSize)) * gridSize + margin.left)
           .attr('y', (d, i) => Math.floor(i / Math.floor(width / gridSize)) * gridSize + margin.top)
           .attr('width', gridSize)
           .attr('height', gridSize)
           .style('fill', d => colorScale(wordCounts[d]))
           .append('title')
           .text(d => `${d}: ${wordCounts[d]}`);

    }, [data]);

    return (
        <svg ref={ref}></svg>
    );
};

export default HeatMap;
