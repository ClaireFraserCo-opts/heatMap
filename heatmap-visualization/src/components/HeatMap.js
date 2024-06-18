import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { processConversationData } from '../utils/dataProcessing';

const Heatmap = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const processedData = processConversationData(data);

    const margin = { top: 80, right: 25, bottom: 100, left: 150 };
    const width = 950 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const timestamps = Array.from(new Set(processedData.map(d => d.timestamp))).sort((a, b) => a - b);
    const speakers = Array.from(new Set(processedData.map(d => d.speaker)));

    const x = d3.scaleTime()
      .domain([new Date(d3.min(timestamps)), new Date(d3.max(timestamps))])
      .range([0, width]);

    const xAxis = d3.axisBottom(x)
      .ticks(d3.timeMinute.every(1))
      .tickFormat(d3.timeFormat("%H:%M:%S"));

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .select(".domain").remove();

    svg.selectAll(".tick text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em")
      .attr("transform", "rotate(-65)");

    const y = d3.scaleBand()
      .range([height, 0])
      .domain(speakers)
      .padding(0.05);

    svg.append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain").remove();

    // Define color scale for word frequency
    const colorScale = d3.scaleThreshold()
      .domain([1, 5, 10, 15, 20, 25]) // Example threshold values
      .range(["darkblue", "lightblue", "cyan", "orange", "red", "darkred"]);

    const silenceColor = "lightgray"; // Define silence color

    const tooltip = d3.select("body")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    const mouseover = function (event, d) {
      tooltip.style("opacity", 1);
      d3.select(this).style("stroke", "black").style("opacity", 1);
    };

    const mousemove = function (event, d) {
      tooltip
        .html(`Speaker: ${d.speaker}<br>Timestamp: ${new Date(d.timestamp).toLocaleTimeString()}<br>Word: ${d.word}<br>Frequency: ${d.frequency}`)
        .style("left", (event.pageX + 15) + "px")
        .style("top", (event.pageY - 28) + "px");
    };

    const mouseleave = function (event, d) {
      tooltip.style("opacity", 0);
      d3.select(this).style("stroke", "none").style("opacity", 0.8);
    };

    const rectWidth = width / timestamps.length;

    svg.selectAll()
      .data(processedData, d => `${d.speaker}:${d.timestamp}:${d.word}`)
      .join("rect")
      .attr("x", d => x(new Date(d.timestamp)))
      .attr("y", d => y(d.speaker))
      .attr("width", rectWidth)
      .attr("height", y.bandwidth())
      .style("fill", d => {
        if (d.frequency === 0) {
          return silenceColor; // Apply silence color if frequency is 0
        } else {
          return colorScale(d.frequency); // Apply color based on frequency
        }
      })
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);

    svg.append("text")
      .attr("x", 0)
      .attr("y", -50)
      .attr("text-anchor", "left")
      .style("font-size", "22px")
      .text("Conversation Heatmap");

    svg.append("text")
      .attr("x", 0)
      .attr("y", -20)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("fill", "grey")
      .style("max-width", 400)
      .text("A visual representation of word frequency over time.");

  }, [data]);

  return <div id="my_dataviz"><svg ref={svgRef}></svg></div>;
};

export default Heatmap;
