/*
 * Copyright (C) 2018 Brent Bessemer.
 * All rights reserved.
 */

function randomGraph (n, d) {
  var E = [];
  for (var i = 0; i < n; i++) {
    for (var j = i + 1; j < n; j++) {
      if (Math.random() < d) {
        E.push({v1: i, v2: j, w: Math.round(Math.random() * 20)})
      }
    }
  }

  E.min = function () {
    var min = {w: Infinity}
    var i = Infinity
    for (var j = 0; j < this.length; j++) {
      if (this[j].w < min.w) {
        min = this[j]
        i = j
      }
    }
    return {e: min, i}
  }

  return {n, E};
}

function prim (G, u) {
  var V_T = [u]
  var E_T = []
  var E_S = G.E
  var intervalID = setInterval(() => {
    primStep()
    //drawGraph(G, E_T)
  }, 500)

  function primStep () {
    console.log(V_T)
    if (V_T.length < G.n) {
      var {e, i} = E_S.min()
      if (V_T.includes(e.v1) && !V_T.includes(e.v2)) {
        E_T.push(e)
        V_T.push(v2)
        E_S.splice(i, 1)
      } else if (!V_T.includes(e.v1) && V_T.includes(e.v2)) {
        E_T.push(e)
        V_T.push(v1)
        E_S.splice(i, 1)
      }
      console.log(E_T)
    } else {
      clearInterval(intervalID)
      console.log(E_T)
    }
  }
}

function kruskal (G) {
  var componentIDs = []
  for (var v = 0; v < G.n; v++) {
    componentIDs.push(v)
  }
  var E_T = []
  var E_S = G.E
  var n_T = 1
  var intervalID = setInterval(() => {
    kruskalStep()
    drawGraph(G, E_T)
  }, 500)

  function kruskalStep () {
    if (n_T < G.n) {
      var {e, i} = E_S.min()
      if (componentIDs[e.v1] != componentIDs[e.v2]) {
        E_T.push(e)
        componentIDs[e.v2] = componentIDs[e.v2]
        E_S.splice(i, 1)
        n_T++
      }
    } else {
      clearInterval(intervalID)
      console.log(E_T)
    }
  }
}
