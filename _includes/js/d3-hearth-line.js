

function hearthChart(domId, uri) {
                                   // set the dimensions and margins of the graph
                                   var margin = {
                                       top: 10,
                                       right: 10,
                                       bottom: 20,
                                       left: 10
                                     },
                                     width = 1068, // 1068
                                     height = 128; // 128
                                   // append the svg object to the body of the page
                                   var svg = d3
                                     .select(
                                       domId
                                     )
                                     .append(
                                       "svg"
                                     )
                                     .attr(
                                       "width",
                                       width +
                                         margin.left +
                                         margin.right
                                     )
                                     .attr(
                                       "height",
                                       height +
                                         margin.top +
                                         margin.bottom
                                     )
                                     .call(
                                       responsivefy
                                     )
                                     .append(
                                       "g"
                                     )
                                     .attr(
                                       "transform",
                                       "translate(" +
                                         margin.left +
                                         "," +
                                         margin.top +
                                         ")"
                                     );

                                   //Read the data
                                   d3.csv(
                                     uri,
                                     // "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
                                     // "/assets/data/ecg_2019-03-28.csv",

                                     // When reading the csv, I must format variables:
                                     function(
                                       d
                                     ) {
                                       return {
                                         point:
                                           d.point /
                                           510.0,
                                         value:
                                           d.value
                                       }; // 510 Hz
                                     },

                                     // Now I can use this dataset:
                                     function(
                                       data
                                     ) {
                                       var x = d3
                                         .scaleLinear()
                                         .domain(
                                           [
                                             0,
                                             10
                                           ]
                                         ) // 30
                                         .range(
                                           [
                                             0,
                                             width
                                           ]
                                         );
                                       xAxis = svg
                                         .append(
                                           "g"
                                         )
                                         .attr(
                                           "transform",
                                           "translate(0," +
                                             height +
                                             ")"
                                         )
                                         .attr(
                                           "class",
                                           "grid"
                                         )
                                         .call(
                                           d3
                                             .axisBottom(
                                               x
                                             )
                                             .tickFormat(
                                               d =>
                                                 d +
                                                 "s"
                                             )
                                         );

                                       // Add Y axis
                                       var y = d3
                                         .scaleLinear()
                                         .domain(
                                           [
                                             // d3.max(data, function(d) {
                                             //   return +d.value + 100;
                                             // }),
                                             // -d3.max(data, function(d) {
                                             //   return -d.value + 100;
                                             // }),
                                             2000,
                                             -1000
                                           ]
                                         )
                                         .range(
                                           [
                                             0,
                                             height
                                           ]
                                         );
                                       yAxis = svg
                                         .append(
                                           "g"
                                         )
                                         .attr(
                                           "class",
                                           "grid"
                                         )
                                         .call(
                                           d3
                                             .axisLeft(
                                               y
                                             )
                                             .tickFormat(
                                               ""
                                             )
                                         );

                                       // Add a clipPath: everything out of this area won't be drawn.
                                       var clip = svg
                                         .append(
                                           "defs"
                                         )
                                         .append(
                                           "svg:clipPath"
                                         )
                                         .attr(
                                           "id",
                                           "clip"
                                         )
                                         .append(
                                           "svg:rect"
                                         )
                                         .attr(
                                           "width",
                                           width
                                         )
                                         .attr(
                                           "height",
                                           height
                                         )
                                         .attr(
                                           "x",
                                           0
                                         )
                                         .attr(
                                           "y",
                                           0
                                         );

                                       // Add brushing
                                       var brush = d3
                                         .brushX() // Add the brush feature using the d3.brush function
                                         .extent(
                                           [
                                             [
                                               0,
                                               0
                                             ],
                                             [
                                               width,
                                               height
                                             ]
                                           ]
                                         ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
                                         .on(
                                           "end",
                                           updateChart
                                         ); // Each time the brush selection changes, trigger the 'updateChart' function

                                       svg
                                         .append(
                                           "g"
                                         )
                                         .attr(
                                           "class",
                                           "grid"
                                         )
                                         .attr(
                                           "transform",
                                           "translate(0," +
                                             height +
                                             ")"
                                         )
                                         .call(
                                           make_x_axis()
                                             .tickSize(
                                               -height,
                                               0,
                                               0
                                             )
                                             .tickFormat(
                                               ""
                                             )
                                         );

                                       svg
                                         .append(
                                           "g"
                                         )
                                         .attr(
                                           "class",
                                           "grid-minor"
                                         )
                                         .attr(
                                           "transform",
                                           "translate(0," +
                                             height +
                                             ")"
                                         )
                                         .call(
                                           make_x_minor_axis()
                                             .tickSize(
                                               -height,
                                               0,
                                               0
                                             )
                                             .tickFormat(
                                               ""
                                             )
                                         );

                                       svg
                                         .append(
                                           "g"
                                         )
                                         .attr(
                                           "class",
                                           "grid"
                                         )
                                         .call(
                                           make_y_axis()
                                             .tickSize(
                                               -width,
                                               0,
                                               0
                                             )
                                             .tickFormat(
                                               ""
                                             )
                                         );

                                       svg
                                         .append(
                                           "g"
                                         )
                                         .attr(
                                           "class",
                                           "grid-minor"
                                         )
                                         .call(
                                           make_y_minor_axis()
                                             .tickSize(
                                               -width,
                                               0,
                                               0
                                             )
                                             .tickFormat(
                                               ""
                                             )
                                         );

                                       function make_x_axis() {
                                         return d3
                                           .axisBottom(
                                             x
                                           )
                                           .ticks(
                                             50
                                           );
                                       }

                                       function make_x_minor_axis() {
                                         var tickXValues = [];
                                         for (
                                           var i = 0;
                                           i <
                                           250;
                                           i++
                                         ) {
                                           tickXValues[
                                             i
                                           ] =
                                             i *
                                             0.04;
                                         }
                                         return d3
                                           .axisBottom(
                                             x
                                           )
                                           .tickValues(
                                             tickXValues
                                           );
                                       }

                                       function make_y_axis() {
                                         return d3
                                           .axisLeft(
                                             y
                                           )
                                           .ticks(
                                             6
                                           );
                                       }

                                       function make_y_minor_axis() {
                                         return d3
                                           .axisLeft(
                                             y
                                           )
                                           .ticks(
                                             30
                                           );
                                       }

                                       // Create the line variable: where both the line and the brush take place
                                       var line = svg
                                         .append(
                                           "g"
                                         )
                                         .attr(
                                           "clip-path",
                                           "url(#clip)"
                                         );

                                       // Add the line
                                       line
                                         .append(
                                           "path"
                                         )
                                         .datum(
                                           data
                                         )
                                         .attr(
                                           "class",
                                           "line hearth-line"
                                         ) // I add the class line to be able to modify this line later on.
                                         .attr(
                                           "fill",
                                           "none"
                                         )
                                         .attr(
                                           "stroke-width",
                                           1.5
                                         )
                                         .attr(
                                           "d",
                                           d3
                                             .line()
                                             .x(
                                               function(
                                                 d
                                               ) {
                                                 return x(
                                                   d.point
                                                 );
                                               }
                                             )
                                             .y(
                                               function(
                                                 d
                                               ) {
                                                 return y(
                                                   d.value
                                                 );
                                               }
                                             )
                                         );

                                       var borderPath = svg
                                         .append(
                                           "rect"
                                         )
                                         .attr(
                                           "x",
                                           0
                                         )
                                         .attr(
                                           "y",
                                           0
                                         )
                                         .attr(
                                           "height",
                                           height
                                         )
                                         .attr(
                                           "width",
                                           width
                                         )
                                         .attr(
                                           "class",
                                           "border"
                                         )
                                         .style(
                                           "fill",
                                           "none"
                                         )
                                         .style(
                                           "stroke-width",
                                           1
                                         );

                                       // Add the brushing
                                       line
                                         .append(
                                           "g"
                                         )
                                         .attr(
                                           "class",
                                           "brush"
                                         )
                                         .call(
                                           brush
                                         );

                                       // A function that set idleTimeOut to null
                                       var idleTimeout;
                                       function idled() {
                                         idleTimeout = null;
                                       }

                                       // A function that update the chart for given boundaries
                                       function updateChart() {
                                         // What are the selected boundaries?
                                         extent =
                                           d3
                                             .event
                                             .selection;

                                         // If no selection, back to initial coordinate. Otherwise, update X axis domain
                                         if (
                                           !extent
                                         ) {
                                           if (
                                             !idleTimeout
                                           )
                                             return (idleTimeout = setTimeout(
                                               idled,
                                               350
                                             )); // This allows to wait a little bit
                                           x.domain(
                                             [
                                               4,
                                               8
                                             ]
                                           );
                                         } else {
                                           x.domain(
                                             [
                                               x.invert(
                                                 extent[0]
                                               ),
                                               x.invert(
                                                 extent[1]
                                               )
                                             ]
                                           );
                                           line
                                             .select(
                                               ".brush"
                                             )
                                             .call(
                                               brush.move,
                                               null
                                             ); // This remove the grey brush area as soon as the selection has been done
                                         }

                                         // Update axis and line position
                                         xAxis
                                           .transition()
                                           .duration(
                                             1000
                                           )
                                           .call(
                                             d3.axisBottom(
                                               x
                                             )
                                           );
                                         line
                                           .select(
                                             ".line"
                                           )
                                           .transition()
                                           .duration(
                                             1000
                                           )
                                           .attr(
                                             "d",
                                             d3
                                               .line()
                                               .x(
                                                 function(
                                                   d
                                                 ) {
                                                   return x(
                                                     d.point
                                                   );
                                                 }
                                               )
                                               .y(
                                                 function(
                                                   d
                                                 ) {
                                                   return y(
                                                     d.value
                                                   );
                                                 }
                                               )
                                           );
                                       }

                                       // If user double click, reinitialize the chart
                                       svg.on(
                                         "dblclick",
                                         function() {
                                           x.domain(
                                             d3.extent(
                                               data,
                                               function(
                                                 d
                                               ) {
                                                 return d.point;
                                               }
                                             )
                                           );
                                           xAxis
                                             .transition()
                                             .call(
                                               d3.axisBottom(
                                                 x
                                               )
                                             );
                                           line
                                             .select(
                                               ".line"
                                             )
                                             .transition()
                                             .attr(
                                               "d",
                                               d3
                                                 .line()
                                                 .x(
                                                   function(
                                                     d
                                                   ) {
                                                     return x(
                                                       d.point
                                                     );
                                                   }
                                                 )
                                                 .y(
                                                   function(
                                                     d
                                                   ) {
                                                     return y(
                                                       d.value
                                                     );
                                                   }
                                                 )
                                             );
                                         }
                                       );
                                     }
                                   );
                                 };