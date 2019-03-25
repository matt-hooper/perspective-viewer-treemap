/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import * as d3 from "d3"; 

function view1(container, settings) {
  
  var data = {
    "name": "A1",
    "children": [
      {
        "name": "B1",
        "children": [
          {
            "name": "C1",
            "value": 100
          },
          {
            "name": "C2",
            "value": 300
          },
          {
            "name": "C3",
            "value": 200
          }
        ]
      },
      {
        "name": "B2",
        "value": 200
      }
    ]
  };
  
  var treemapLayout = d3.treemap()
  .size([800, 400])
  .paddingOuter(16);
  
  var rootNode = d3.hierarchy(data)
  
  rootNode.sum(function(d) {
    return d.value;
  });
  
  treemapLayout.tile(d3.treemapSquarify.ratio(1));
  treemapLayout(rootNode);

  var selectedContainer = d3.select(container);

  selectedContainer.append('svg').attr('width', '820')
  .attr('height', '420').append('g');

  var nodes = selectedContainer.select('svg g')
    .selectAll('g')    
    .data(rootNode.descendants())
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
    .attr('dx', 4)
    .attr('dy', 14)
    .text(function(d) {
      return d.data.name;
    })

}
view1.plugin = {
    type: "template_view_1",
    name: "Template View 1",
    max_size: 25000
};
export default view1;
