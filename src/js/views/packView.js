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

const addPack = (selection, data) => {
  var nodes = selection.select('svg g')
  .selectAll('g')
  .data(data.descendants())
  .enter()
  .append('g')
  .attr('transform', function(d) {return 'translate(' + [d.x, d.y] + ')'});

nodes
  .append('circle')
  .attr('r', function(d) { return d.r; });

nodes
  .append('text')
  .attr('dy', 4)
  .text(function(d) {
    return d.children === undefined ? d.data.name : '';
  });
}

function packView(container, settings) {
  
  const selectedContainer = d3.select(container);
    
    const padding = 30;
    const {width: containerWidth, height: containerHeight} = selectedContainer.node().getBoundingClientRect();
    
    const data = treeData(settings);

    var packLayout = d3.pack()
    .size([containerWidth - padding, containerHeight - padding]);
    //.paddingOuter(16);
    
    packLayout(data);
  
    selectedContainer.append('svg').attr('width', '100%')
    .attr('height', '100%').append('g');
  
    addPack(selectedContainer, data); 

}
packView.plugin = {
    type: "d3packView",
    name: "d3 pack",
    max_size: 25000
};
export default packView;
