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
    console.log(this)
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
  var intervalID
  while (E_S.length > 0) {
    intervalID = setInterval(() => {
      primStep()
      drawGraph(G)
      drawHighlights(E_T)
    }, 500)
  }

  function primStep () {
    if (V_T.length < G.n) {
      var {e, i} = E_S.min()
      if (T_S.includes(e.v1) && !T_S.includes(e.v2)) {
        E_T.push(e)
        V_T.push(v2)
        E_S.splice(i, 1)
      } else if (!T_S.includes(e.v1) && T_S.includes(e.v2)) {
        E_T.push(e)
        V_T.push(v1)
        E_S.splice(i, 1)
      }
    }
  } else {
    clearInterval(intervalID)
  }
}
