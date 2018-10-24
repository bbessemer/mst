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

  E.min = function (P) {
    var min = {w: Infinity}
    var i = Infinity
    for (var j = 0; j < this.length; j++) {
      if (this[j].w < min.w && P(this[j])) {
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
    drawGraph(G, E_T)
  }, 500)

  function primStep () {
    if (V_T.length < G.n) {
      var {e, i} = E_S.min((e) => V_T.includes(e.v1) ^ V_T.includes(e.v2))
      if (V_T.includes(e.v1) && !V_T.includes(e.v2)) {
        E_T.push(e)
        V_T.push(e.v2)
        E_S.splice(i, 1)
      } else if (!V_T.includes(e.v1) && V_T.includes(e.v2)) {
        E_T.push(e)
        V_T.push(e.v1)
        E_S.splice(i, 1)
      }
    } else {
      clearInterval(intervalID)
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
      var {e, i} = E_S.min((e) => componentIDs[e.v1] != componentIDs[e.v2])
      if (true) {
        E_T.push(e)
        c1 = componentIDs[e.v1]
        c2 = componentIDs[e.v2]
        for (var j = 0; j < componentIDs.length; j++) {
          if (componentIDs[j] == c2) {
            componentIDs[j] = c1
          }
        }
        E_S.splice(i, 1)
        n_T++
      }
    } else {
      clearInterval(intervalID)
    }
  }
}
