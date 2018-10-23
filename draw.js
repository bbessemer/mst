/*
 * Copyright (C) 2018 Brent Bessemer.
 * All rights reserved.
 */

(function() {
  var G;

  this.generate = () => {
    var n = parseInt(document.getElementById('order').value)
    var d = parseFloat(document.getElementById('density').value)
    if (d > 1) { d = 1 } else if (d < 0) { d = 0 }
    G = randomGraph(n, d)
    drawGraph(G)
  }

  this.doPrim = () => {
    var u = parseInt(document.getElementById('start-vertex').value)
    prim(G, u)
  }

  this.doKruskal = () => kruskal(G)
  this.reset = () => drawGraph(G)
})();

var circleCoords = (cx, cy, r, theta) => ({
  x: cx + r * Math.cos(theta),
  y: cy + r * Math.sin(theta)
})

function drawGraph (G, H) {
  var canvas = document.getElementById('canvas')
  var ctx = canvas.getContext('2d')

  var R = Math.min(canvas.width, canvas.height) * 0.4
  var r = R * 0.07
  var cx = canvas.width * 0.5
  var cy = canvas.height * 0.5

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = '#888'
  ctx.fillStyle = ctx.strokeStyle
  ctx.font = '12px sans-serif'
  ctx.lineWidth = 1
  for (var i = 0; i < G.E.length; i++) {
    var {v1, v2, w} = G.E[i]
    var {x: v1x, y: v1y} = circleCoords(cx, cy, R, 2 * Math.PI * v1 / G.n)
    var {x: v2x, y: v2y} = circleCoords(cx, cy, R, 2 * Math.PI * v2 / G.n)
    console.log(v1x, v1y, v2x, v2y)
    ctx.beginPath()
    ctx.moveTo(v1x, v1y)
    ctx.lineTo(v2x, v2y)
    ctx.stroke()

    ctx.fillText(w.toString(), (v1x + v2x) / 2, (v1y + v2y) / 2)
  }

  ctx.fillStyle = 'red'
  for (var i = 0; i < G.n; i++) {
    var {x, y} = circleCoords(cx, cy, R, 2 * Math.PI * i / G.n)
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill()
  }

  if (H != null) {
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 3
    for (var i = 0; i < H.length; i++) {
      var {v1, v2, w} = H[i]
      var {x: v1x, y: v1y} = circleCoords(cx, cy, R, 2 * Math.PI * v1 / G.n)
      var {x: v2x, y: v2y} = circleCoords(cx, cy, R, 2 * Math.PI * v2 / G.n)
      console.log(v1x, v1y, v2x, v2y)
      ctx.beginPath()
      ctx.moveTo(v1x, v1y)
      ctx.lineTo(v2x, v2y)
      ctx.stroke()
    }
  }
}
