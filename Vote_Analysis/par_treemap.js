var width = 960,
    height = 500;

var svg = d3.select(".par_treemap").append("svg")
                .style("width", "100%")
                .attr("data-height","0.54")
                .attr("viewBox","0 0 "+width+" "+height)
                .attr("xmlns", 'http://www.w3.org/2000/svg')
                .attr("xlink", 'http://www.w3.org/1999/xlink')
                .attr("version", '1.1');

  var select_box = d3.select('#year')     
                .selectAll("option")
                    .data(['2014','2009','2004','1999','1998','1996','1992','1991','1989','1985','1984','1980','1977','1971','1967','1962','1957','1951'])
                    .enter().append("option")
                    .attr("value", function (d) { return d; })
                    .attr("class","name")
                    .text(function (d) { return d; });

function onRender() {   
 

    var year = document.getElementById("year").value;
          
     d3.select('.par_treemap').select("svg")
       .remove();
   
    var svg = d3.select(".par_treemap").append("svg")
                .style("width", "100%")
                .attr("data-height","0.54")
                .attr("viewBox","0 0 "+width+" "+height)
                .attr("xmlns", 'http://www.w3.org/2000/svg')
                .attr("xlink", 'http://www.w3.org/1999/xlink')
                .attr("version", '1.1');

    var treemap = d3.layout.treemap()
        .padding(0.5)
        .size([width, height])
        .sticky(true)
        .value(function(d) {return d.votes;})
        .children(function(d) {return d.values;});
    
    
    d3.csv("grouped_parliament_data.csv", function(data_csv) {
     
        data_root = {"key":"treemap"};
        
         data_csv.forEach(function(o) {
          o.votes = parseInt(o.votes);
          o.year = parseInt(o.year);
          });

        var nest = d3.nest()
        .key(function(d) { return  d.party; })
        .entries(data_csv.filter(function(d){ return d.year===parseInt(year)}));
        
        console.log(nest);
    data_root["values"] = nest

  var cell = svg.data([data_root]).selectAll("g")
      .data(treemap.nodes)
    .enter().append("a")
      .attr("xlink:href",function(d) { return 'https://www.google.co.in/search?q='+d.party} )
      .attr("target","_blank").append("rect")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.dx; })
      .attr("height", function(d) { return d.dy; })
      .attr("data-title",function(d) { return ' <p>party : '+d.party+'</p> <br/><p> votes : '+d.votes+'</p>' ;})
      .attr("sub_link",function(d) { return d.party ;})
      .style("fill",function(d) { return d.color ;})
      .style("stroke", '#fff')
      .style("stroke-width", 0.5);        

      $("rect").tooltip({container: '.par_treemap', html: true, placement:'top'});
      
    var lastsearch = '';
    var $box = {};
    
    function add_search(search, chart) {
      var $chart = $(chart);
      $(search).on('keypress, change, keyup', function() {
        var search = $(this).val();
        if (lastsearch != search) {
          lastsearch = search;
          var re = new RegExp(search, "i");
          $('rect', $chart).each(function(){
              $(this).css('opacity', re.test($(this).attr("sub_link")) ? '1.0': '0.1');
          });
        }
      });
    }

    add_search('.search', '.par_treemap');
    
        
        });

      }
      //);