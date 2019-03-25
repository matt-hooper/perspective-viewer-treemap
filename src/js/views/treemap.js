/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import * as d3 from "d3"; 
import {treeData, treeColor} from "../data/treeData";

const addTreemap = (selection, data) => {
    const nodes = selection.select('svg g')
    .selectAll('g')    
    .data(data.descendants())
    .enter()
    .append('g')
    .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'});

  nodes
    .append('rect')
    .attr('class', 'treerect')
    .attr('width', function(d) { return d.x1 - d.x0; })
    .attr('height', function(d) { return d.y1 - d.y0; })
  
  nodes
    .append('text')
    .attr('dx', function(d) { return (d.x1 - d.x0) / 2; })
    .attr('dy', function(d) { return (d.y1 - d.y0) / 2; })
    .text(function(d) {
      return d.data.name;
    })
}

function treemap(container, settings) {
    
 const selectedContainer = d3.select(container);
    
    const padding = 30;
    const {width: containerWidth, height: containerHeight} = selectedContainer.node().getBoundingClientRect();
    
    const data = treeData(settings);

    var treemapLayout = d3.treemap()
    .size([containerWidth - padding, containerHeight - padding]);
    //.paddingOuter(16);
    
    treemapLayout.tile(d3.treemapBinary);
    treemapLayout(data);
  
    selectedContainer.append('svg').attr('width', '100%')
    .attr('height', '100%').append('g');
  
    addTreemap(selectedContainer, data); 
  
  }
  treemap.plugin = {
      type: "d3treemap",
      name: "d3 treemap",
      max_size: 25000
  };
  export default treemap;