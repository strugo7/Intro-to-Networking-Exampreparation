import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TopologyVisualizerProps {
  data: {
    nodes: { id: string; group: number }[];
    links: { source: string; target: string }[];
  };
}

const TopologyVisualizer: React.FC<TopologyVisualizerProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const width = svgRef.current.clientWidth;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    // Simulation setup
    const simulation = d3.forceSimulation(data.nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(data.links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Draw lines for links
    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", 2);

    // Draw circles for nodes
    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("g")
      .data(data.nodes)
      .join("g");
      
    node.append("circle")
      .attr("r", 20)
      .attr("fill", (d: any) => {
        // Simple color scale based on group
        const colors = ["#2563EB", "#7C3AED", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#6366f1", "#8b5cf6"];
        return colors[d.group % colors.length];
      });

    node.append("text")
      .text((d: any) => d.id)
      .attr('x', 25)
      .attr('y', 5)
      .attr("fill", "#374151")
      .style("font-size", "12px")
      .style("font-family", "monospace")
      .style("font-weight", "bold");

    // Drag behavior
    const drag = (simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>) => {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      
      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    node.call(drag(simulation) as any);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <div className="w-full bg-white rounded-xl shadow-inner border border-gray-200 overflow-hidden">
      <svg ref={svgRef} className="w-full h-[400px] cursor-move bg-slate-50"></svg>
    </div>
  );
};

export default TopologyVisualizer;