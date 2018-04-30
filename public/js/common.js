var items = [];
var user = {};
var server = window.location.origin;
var userid;
var socket;
var user;
var width;
var height;

$(document).ready(() => {

	 socket = io();
	 
	console.log('inside common.js');
	
	/*var apiOptions = {
	    server: "http://localhost:8080"
	};*/
	userid = $('#id').text();
	userid.replace(/\s+/g, '');
	// if (process.env.NODE_ENV === 'production') {
	//     apiOptions.server = "https://nameless-basin-42853.herokuapp.com";
	// }
	server = window.location.origin;
	console.log(window.location.origin);

	getRecentItems();

	$('button#submit').on('click', function(e) {
		console.log('form submit button clicked');
		e.preventDefault();

		console.log(userid);
		var name = $('#name').val();
		var category = $('#category').val();
		var price = $('#price').val();
		var description = $('#description').val();

		console.log("name: " + name + ", category: " + category + ", price: " + price + ", description: " + description);

		if(name == '' || category == '' || price == '' || description ==''){
			$('#alert_msg').remove();
			$('#error').append('<div id=\"alert_msg\" class=\"alert alert-danger\" role=\"alert\">All fields must be filled out!</div>')
			.attr('class', 'error');
		} else {
			$('#error').attr('class', 'noerror');
			var path = "/usersanditems/" + userid + '/item';
			console.log(window.location.href);

			// create the new item
			$.ajax({
				type:'POST',
				contentType: 'application/json',
		        url: server + path,
		        data: JSON.stringify({name: name, category: category, description: description, price: price}),						
		        success: function(data) {
		            console.log('success creating new item');
		            $('#new-item-modal').modal('hide');
		            socket.emit('item created', data);
		            clearModal();
		            $('#blockCanvas').remove();
		            getRecentItems();

		        }, error: function(d) {
		        	console.log(d);
		        }
			});
		}
	});

	//
	socket.on('new item', (itemdata) => {
		console.log('new item msg received from the server');
		console.log(itemdata);
		items = itemdata;
	}); 
	//console.log(items);

});

    //clears the modal
    function clearModal() {
        //  alert('modal clearing, active_form: ' + active_form);
        $('#name').val("");
        $('#price').val("");
        $('#category').val("");
        $('#description').val("Medium");

    }


var getRecentItems = () => {
		$(function(){
			var path = "/usersanditems/recentItems";
			console.log('inside of get recentItems')
			$.ajax({
				type:'GET',
				contentType: 'application/json',
		        url: server + path,						
		        success: function(data) {
		            console.log('success');
		            // console.log(JSON.stringify(data));
		            // console.log(data);
		            items = data;
		            // console.log(typeof(data));
		            drawSVG();
		        }
			});
		});
}

// $(window).resize(function() {
// 	width = $(window).width()
// 	height = $(window).height()
// })


var drawSVG = () => {
	console.log(items);
	// console.log(typeof(items));

	width = $(window).width()
	height = $(window).height() - $(window).height() / 5;

	var numParticles = items.length
	var maxVelocity = 1

	// var color = d3.scaleOrdinal().domain(items).range(d3.schemeCategory20)
	var color = d3.scaleOrdinal(d3.schemeCategory10);
	// console.log(d3.schemeCategory10);
	// console.log(color)

	var nodes = Array.apply(null, Array(numParticles)).map(function (_, i) {
	    // var size = Math.random() * 60 + 20
	    var size = 200
	    var velocity = Math.random() * 1.5 + 1
	    var angle = Math.random() * 360
	    // console.log(items[i])
	    console.log(items[i])

	    return {
	        x: Math.random() * (width - size),
	        y: Math.random() * (height - size),
	        vx: velocity * Math.cos(angle * Math.PI / 180),
	        vy: velocity * Math.sin(angle * Math.PI / 180),
	        size: size,
	        fill: color(i),
	        email: items[i].email,
	        category: items[i].item_category,
	        time_created: items[i].item_create,
	        description: items[i].description,
	        item_id: items[i].item_id,
	        item_name: items[i].item_name,
	        item_price: items[i].item_price,
	        user_id: items[i]._id,
	        user_name: items[i].profile.name
	    }
	})

	var drag = d3.drag()
	    .on('start', dragStarted)
	    .on('drag', dragged)
	    .on('end', dragEnded)

	var svg = d3.select('body').append('svg')

	var g = svg
		.attr('width', width)
	    .attr('height', height)
	    .attr('class', 'blockCanvas')
		.selectAll('g')
		.data(nodes)
	    .enter().append('g')
	    .attr('x', function (d) { return d.x })
	    .attr('y', function (d) { return d.y })
	    .attr('email', function (d) { return d.email })
	    .attr('description', function (d) { return d.description })
	    .attr('category', function (d) { return d.category })
	    .attr('time_created', function (d) { return d.time_created })
	    .attr('item_id', function (d) { return d.item_id })
	    .attr('item_name', function (d) { return d.item_name })
	    .attr('item_price', function (d) { return d.item_price })
	    .attr('user_id', function (d) {return d.user_id })
	    .attr('user_name', function (d) {return d.user_name })
	   	.call(drag)

	var rects = g.append('rect')
	    .style('fill', function (d) { return d.fill })
	    .attr('width', function (d) { return d.size })
	    .attr('height', function (d) { return d.size })
	    .attr('class', 'block')
	    .attr('x', function (d) { return d.x })
	    .attr('y', function (d) { return d.y })
	    .style('rx', '15px')
	    .style('ry', '15px')

	var name = g.append('a')
		.attr("xlink:href", function (d) { return server + '/' + d.user_id + "/item/" + d.item_id })
		.attr("class", "linkstyle")
	    .append('text')
	    .attr('x', function (d) { return d.x + 15 })
	    .attr('y', function (d) { return d.y + 25 })
		.text(function (d) { 
			var returnText = ""
			if (d.item_name.length > 25) {
				returnText = d.item_name.substring(0,25) + '...'
			} else {
				returnText = d.item_name
			}
			return returnText
		})
		.attr("fill","#FFF")
        .attr("text-anchor","left")
        .style("font-size", "16px")
        .style("font-family", "HelveticaNeue-CondensedBold, HelveticaNeue-CondensedBold, Helvetica Neue, Arial, sans-serif");

  //       overflow: hidden;
  // text-overflow: ellipsis;
  // max-width: 200px;

    var price = g.append('text')
		.attr('x', function (d) { return d.x + 15 })
	    .attr('y', function (d) { return d.y + 50 })
		.text(function (d) { return '$ ' + d.item_price })
		.attr("fill","#FFF")
        .attr("text-anchor","left")
        .style("font-size", "16px")
        .style("font-family", "HelveticaNeue-CondensedBold, HelveticaNeue-CondensedBold, Helvetica Neue, Arial, sans-serif");

    var description = g.append('text')
		.attr('x', function (d) { return d.x + 15 })
	    .attr('y', function (d) { return d.y + 75 })
		.text(function (d) { 
			var returnText = ""
			if (d.description.length > 25) {
				returnText = d.description.substring(0,25) + '...'
			} else {
				returnText = d.description
			}
			return returnText
		})
		.attr("fill","#FFF")
        .attr("text-anchor","left")
        .style("font-size", "16px")
        .style('overflow', 'hidden')
        // .style('text-overflow', 'ellipsis')
        // .style('max-width', '150px')
        .style("font-family", "HelveticaNeue-CondensedBold, HelveticaNeue-CondensedBold, Helvetica Neue, Arial, sans-serif");

    var username = g.append('a')
		.attr("xlink:href", function (d) { return server + '/' + d.user_id + '/profile' })
		.attr("class", "linkstyle")
	    .append('text')
	    .attr('x', function (d) { return d.x + 15 })
	    .attr('y', function (d) { return d.y + 25 })
		.text(function (d) { return d.user_name })
		.attr("fill","#FFF")
        .attr("text-anchor","left")
        .style("font-size", "16px")
        .style("font-family", "HelveticaNeue-CondensedBold, HelveticaNeue-CondensedBold, Helvetica Neue, Arial, sans-serif");

	var collisionForce = rectCollide()
	    .size(function (d) { return [d.size, d.size] })

	var boxForce = boundedBox()
	    .bounds([[0, 0], [width, height]])
	    .size(function (d) { return [d.size, d.size] })

	d3.forceSimulation()
	    .velocityDecay(0)
	    .alphaTarget(1)
	    .on('tick', ticked)
	    .force('box', boxForce)
	    .force('collision', collisionForce)
	    .nodes(nodes)

	function rectCollide() {
		console.log('in rectCollide')
	    var nodes, sizes, masses
	    var size = constant([0, 0])
	    var strength = 1
	    var iterations = 1

	    function force() {
	        var node, size, mass, xi, yi
	        var i = -1
	        while (++i < iterations) { iterate() }

	        function iterate() {
	            var j = -1
	            var tree = d3.quadtree(nodes, xCenter, yCenter).visitAfter(prepare)

	            while (++j < nodes.length) {
	                node = nodes[j]
	                size = sizes[j]
	                mass = masses[j]
	                xi = xCenter(node)
	                yi = yCenter(node)

	                tree.visit(apply)
	            }
	        }

	        function apply(quad, x0, y0, x1, y1) {
	            var data = quad.data
	            var xSize = (size[0] + quad.size[0]) / 2
	            var ySize = (size[1] + quad.size[1]) / 2
	            if (data) {
	                if (data.index <= node.index) { return }

	                var x = xi - xCenter(data)
	                var y = yi - yCenter(data)
	                var xd = Math.abs(x) - xSize
	                var yd = Math.abs(y) - ySize

	                if (xd < 0 && yd < 0) {
	                    var l = Math.sqrt(x * x + y * y)
	                    var m = masses[data.index] / (mass + masses[data.index])

	                    if (Math.abs(xd) < Math.abs(yd)) {
	                        node.vx -= (x *= xd / l * strength) * m
	                        data.vx += x * (1 - m)
	                    } else {
	                        node.vy -= (y *= yd / l * strength) * m
	                        data.vy += y * (1 - m)
	                    }
	                }
	            }

	            return x0 > xi + xSize || y0 > yi + ySize ||
	                   x1 < xi - xSize || y1 < yi - ySize
	        }

	        function prepare(quad) {
	            if (quad.data) {
	                quad.size = sizes[quad.data.index]
	            } else {
	                quad.size = [0, 0]
	                var i = -1
	                while (++i < 4) {
	                    if (quad[i] && quad[i].size) {
	                        quad.size[0] = Math.max(quad.size[0], quad[i].size[0])
	                        quad.size[1] = Math.max(quad.size[1], quad[i].size[1])
	                    }
	                }
	            }
	        }
	    }

	    function xCenter(d) { return d.x + d.vx + sizes[d.index][0] / 2 }
	    function yCenter(d) { return d.y + d.vy + sizes[d.index][1] / 2 }

	    force.initialize = function (_) {
	        sizes = (nodes = _).map(size)
	        masses = sizes.map(function (d) { return d[0] * d[1] })
	    }

	    force.size = function (_) {
	        return (arguments.length
	             ? (size = typeof _ === 'function' ? _ : constant(_), force)
	             : size)
	    }

	    force.strength = function (_) {
	        return (arguments.length ? (strength = +_, force) : strength)
	    }

	    force.iterations = function (_) {
	        return (arguments.length ? (iterations = +_, force) : iterations)
	    }

	    return force
	}

	function boundedBox() {
	    var nodes, sizes
	    var bounds
	    var size = constant([0, 0])

	    function force() {
	        var node, size
	        var xi, x0, x1, yi, y0, y1
	        var i = -1
	        while (++i < nodes.length) {
	            node = nodes[i]
	            size = sizes[i]
	            xi = node.x + node.vx
	            x0 = bounds[0][0] - xi
	            x1 = bounds[1][0] - (xi + size[0])
	            yi = node.y + node.vy
	            y0 = bounds[0][1] - yi
	            y1 = bounds[1][1] - (yi + size[1])
	            if (x0 > 0 || x1 < 0) {
	                node.x += node.vx
	                node.vx = -node.vx
	                if (node.vx < x0) { node.x += x0 - node.vx }
	                if (node.vx > x1) { node.x += x1 - node.vx }
	            }
	            if (y0 > 0 || y1 < 0) {
	                node.y += node.vy
	                node.vy = -node.vy
	                if (node.vy < y0) { node.vy += y0 - node.vy }
	                if (node.vy > y1) { node.vy += y1 - node.vy }
	            }
	        }
	    }

	    force.initialize = function (_) {
	        sizes = (nodes = _).map(size)
	    }

	    force.bounds = function (_) {
	        return (arguments.length ? (bounds = _, force) : bounds)
	    }

	    force.size = function (_) {
	        return (arguments.length
	             ? (size = typeof _ === 'function' ? _ : constant(_), force)
	             : size)
	    }

	    return force
	}

	function ticked() {
	    rects
	        .attr('x', function (d) { return d.x })
	        .attr('y', function (d) { return d.y })

	    name
	        .attr('x', function (d) { return d.x + 15 })
	        .attr('y', function (d) { return d.y + 25 })

	    price
	        .attr('x', function (d) { return d.x + 15 })
	        .attr('y', function (d) { return d.y + 50 })

	    description
	        .attr('x', function (d) { return d.x + 15 })
	        .attr('y', function (d) { return d.y + 75 })

	    username
	        .attr('x', function (d) { return d.x + 15 })
	        .attr('y', function (d) { return d.y + 100 })
	}

	var px, py, vx, vy, offsetX, offsetY

	function dragStarted(d) {
	    vx = 0
	    vy = 0
	    offsetX = (px = d3.event.x) - (d.fx = d.x)
	    offsetY = (py = d3.event.y) - (d.fy = d.y)
	}

	function dragged(d) {
	    vx = d3.event.x - px
	    vy = d3.event.y - py
	    d.fx = Math.max(Math.min((px = d3.event.x) - offsetX, width - d.size), 0)
	    d.fy = Math.max(Math.min((py = d3.event.y) - offsetY, height - d.size), 0)
	}

	function dragEnded(d) {
	    var vScalingFactor = maxVelocity / Math.max(Math.sqrt(vx * vx + vy * vy), maxVelocity)
	    d.fx = null
	    d.fy = null
	    d.vx = vx * vScalingFactor
	    d.vy = vy * vScalingFactor
	}

	function constant(_) {
	    return function () { return _ }
	}

}