"use strict";

var FlowEngine = (function () {

    // ── Element geometry lookup ───────────────────────────────────────────────

    function getElemData(id) {
        for (var i = 0; i < bpmnjson.length; i++) {
            if (bpmnjson[i].id === id) return bpmnjson[i];
        }
        return null;
    }

    // Returns the visual center of an element (canvas coordinates).
    function getCenter(elem) {
        if (elem.type === 'startEvent' || elem.type === 'endEvent') {
            return { x: elem.x, y: elem.y };
        }
        if (elem.type === 'task') {
            var w = elem.width  || 120;
            var h = elem.height || 80;
            return { x: elem.x + w / 2, y: elem.y + h / 2 };
        }
        if (elem.type === 'gateway') {
            return { x: elem.x, y: elem.y + 30 };
        }
        return { x: elem.x, y: elem.y };
    }

    // Returns the 4 connection ports for an element (canvas coordinates).
    // startEvent/endEvent: x,y = circle center (r=20)
    // task:                x,y = top-left corner; width/height from bpmnjson
    // gateway:             x,y = top diamond point; fixed ±30 offsets
    function getPorts(elem) {
        var x = elem.x, y = elem.y;

        if (elem.type === 'startEvent' || elem.type === 'endEvent') {
            return [
                { side: 'right',  x: x + 20, y: y      },
                { side: 'bottom', x: x,       y: y + 20 },
                { side: 'left',   x: x - 20,  y: y      },
                { side: 'top',    x: x,        y: y - 20 }
            ];
        }

        if (elem.type === 'task') {
            var w = elem.width  || 120;
            var h = elem.height || 80;
            return [
                { side: 'right',  x: x + w,    y: y + h / 2 },
                { side: 'bottom', x: x + w / 2, y: y + h    },
                { side: 'left',   x: x,          y: y + h / 2 },
                { side: 'top',    x: x + w / 2,  y: y         }
            ];
        }

        if (elem.type === 'gateway') {
            return [
                { side: 'right',  x: x + 30, y: y + 30 },
                { side: 'bottom', x: x,       y: y + 60 },
                { side: 'left',   x: x - 30,  y: y + 30 },
                { side: 'top',    x: x,        y: y      }
            ];
        }

        return [];
    }

    // Returns the port object for a named side.
    function getPortBySide(elem, side) {
        var ports = getPorts(elem);
        for (var i = 0; i < ports.length; i++) {
            if (ports[i].side === side) return ports[i];
        }
        return ports[0];
    }

    // Preference order when a particular side is preferred:
    // natural side first → perpendicular sides → opposite side.
    function sidePreferenceOrder(natural) {
        var orders = {
            'right':  ['right', 'top', 'bottom', 'left'],
            'left':   ['left',  'bottom', 'top',  'right'],
            'top':    ['top',   'right',  'left', 'bottom'],
            'bottom': ['bottom','right',  'left', 'top']
        };
        return orders[natural] || ['right', 'top', 'bottom', 'left'];
    }

    // ── Element bounding boxes + segment-obstacle checks ─────────────────────

    // Exact bounding box of an element (no routing margin).
    function getBBox(elem) {
        if (!elem) return null;
        if (elem.type === 'startEvent' || elem.type === 'endEvent') {
            return { xmin: elem.x-20, xmax: elem.x+20, ymin: elem.y-20, ymax: elem.y+20 };
        }
        if (elem.type === 'task') {
            var w = elem.width||120, h = elem.height||80;
            return { xmin: elem.x, xmax: elem.x+w, ymin: elem.y, ymax: elem.y+h };
        }
        if (elem.type === 'gateway') {
            return { xmin: elem.x-30, xmax: elem.x+30, ymin: elem.y, ymax: elem.y+60 };
        }
        return null;
    }

    // Collect bounding boxes for every non-deleted, non-flow element in bpmnjson.
    function getAllBBoxes() {
        var result = [];
        for (var i = 0; i < bpmnjson.length; i++) {
            var e = bpmnjson[i];
            if (e.type === 'flow' || !e.id || e.id === 0) continue;
            var b = getBBox(e);
            if (b) result.push(b);
        }
        return result;
    }

    // True when a vertical segment (x=mx, y spanning y1..y2) clears all boxes.
    // Strict inequalities: a segment endpoint sitting exactly on an element boundary is fine.
    function vertSegClear(mx, y1, y2, boxes) {
        var ylo = Math.min(y1,y2), yhi = Math.max(y1,y2);
        for (var i = 0; i < boxes.length; i++) {
            var b = boxes[i];
            if (mx <= b.xmin || mx >= b.xmax) continue;
            if (yhi <= b.ymin || ylo >= b.ymax) continue;
            return false;
        }
        return true;
    }

    // True when a horizontal segment (y=my, x spanning x1..x2) clears all boxes.
    function horizSegClear(x1, x2, my, boxes) {
        var xlo = Math.min(x1,x2), xhi = Math.max(x1,x2);
        for (var i = 0; i < boxes.length; i++) {
            var b = boxes[i];
            if (my <= b.ymin || my >= b.ymax) continue;
            if (xhi <= b.xmin || xlo >= b.xmax) continue;
            return false;
        }
        return true;
    }

    // Find the best midX for an HH path (sx,sy→midx,sy→midx,ey→ex,ey).
    // Tries natural midpoint first; if blocked, also tries positions at element
    // edge ±GAP, sorted by distance from natural. Fallback: natural midpoint.
    function findValidMidX(sx, sy, ex, ey, boxes) {
        var lo = Math.min(sx,ex), hi = Math.max(sx,ex);
        var nat = (sx+ex)/2;
        var GAP = 14;
        var cands = [nat];
        for (var i = 0; i < boxes.length; i++) {
            var b = boxes[i];
            var c1 = b.xmin - GAP, c2 = b.xmax + GAP;
            if (c1 > lo && c1 < hi) cands.push(c1);
            if (c2 > lo && c2 < hi) cands.push(c2);
        }
        cands.sort(function(a,b){ return Math.abs(a-nat)-Math.abs(b-nat); });
        for (var i = 0; i < cands.length; i++) {
            var mx = cands[i];
            if (horizSegClear(sx, mx, sy, boxes) &&
                vertSegClear( mx, sy, ey, boxes) &&
                horizSegClear(mx, ex, ey, boxes))
                return mx;
        }
        return nat; // best-effort fallback
    }

    // Find the best midY for a VV path (sx,sy→sx,midy→ex,midy→ex,ey).
    function findValidMidY(sx, sy, ex, ey, boxes) {
        var lo = Math.min(sy,ey), hi = Math.max(sy,ey);
        var nat = (sy+ey)/2;
        var GAP = 14;
        var cands = [nat];
        for (var i = 0; i < boxes.length; i++) {
            var b = boxes[i];
            var c1 = b.ymin - GAP, c2 = b.ymax + GAP;
            if (c1 > lo && c1 < hi) cands.push(c1);
            if (c2 > lo && c2 < hi) cands.push(c2);
        }
        cands.sort(function(a,b){ return Math.abs(a-nat)-Math.abs(b-nat); });
        for (var i = 0; i < cands.length; i++) {
            var my = cands[i];
            if (vertSegClear( sx, sy, my, boxes) &&
                horizSegClear(sx, ex, my, boxes) &&
                vertSegClear( ex, my, ey, boxes))
                return my;
        }
        return nat;
    }

    // ── Port conflict detection ───────────────────────────────────────────────

    // Find which side a given (x,y) is closest to among the element's ports.
    function sideOf(x, y, ports) {
        var best = null, bestDist = Infinity;
        for (var i = 0; i < ports.length; i++) {
            var dx = x - ports[i].x, dy = y - ports[i].y;
            var d = dx * dx + dy * dy;
            if (d < bestDist) { bestDist = d; best = ports[i].side; }
        }
        return best;
    }

    // Returns a {side: true} map of ports already used by existing flows on
    // element elemId. Entries with id === 0 (deleted) are skipped.
    function getUsedPorts(elemId) {
        var used = {};
        var elem = getElemData(elemId);
        if (!elem) return used;
        var ports = getPorts(elem);

        for (var i = 0; i < bpmnjson.length; i++) {
            var f = bpmnjson[i];
            if (f.type !== 'flow' || !f.id || f.id === 0) continue;

            if (f.start_id === elemId) {
                var s = sideOf(f.start_x, f.start_y, ports);
                if (s) used[s] = true;
            }
            if (f.end_id === elemId) {
                var s = sideOf(f.end_x, f.end_y, ports);
                if (s) used[s] = true;
            }
        }
        return used;
    }

    // ── Directional port selection ────────────────────────────────────────────

    // Returns true when the port's exit direction geometrically faces toCenter.
    // Prevents picking a port whose segment would immediately re-enter the element.
    function isPortValid(side, fromCenter, toCenter) {
        if (side === 'right')  return toCenter.x >= fromCenter.x;
        if (side === 'left')   return toCenter.x <= fromCenter.x;
        if (side === 'bottom') return toCenter.y >= fromCenter.y;
        if (side === 'top')    return toCenter.y <= fromCenter.y;
        return true;
    }

    // Select the outgoing port of fromElem that faces toElem.
    // 3-pass: (1) valid direction + unoccupied, (2) any unoccupied, (3) preferred regardless.
    function selectOutgoingPort(fromElem, toElem, usedPorts) {
        var fc = getCenter(fromElem);
        var tc = getCenter(toElem);
        var dx = tc.x - fc.x;
        var dy = tc.y - fc.y;

        var preferred;
        if (Math.abs(dx) >= Math.abs(dy)) {
            preferred = dx >= 0 ? 'right' : 'left';
        } else {
            preferred = dy >= 0 ? 'bottom' : 'top';
        }

        var order = sidePreferenceOrder(preferred);
        for (var i = 0; i < order.length; i++) {   // Pass 1: valid + free
            if (!usedPorts[order[i]] && isPortValid(order[i], fc, tc)) {
                return getPortBySide(fromElem, order[i]);
            }
        }
        for (var i = 0; i < order.length; i++) {   // Pass 2: any free port
            if (!usedPorts[order[i]]) {
                return getPortBySide(fromElem, order[i]);
            }
        }
        return getPortBySide(fromElem, preferred);  // Pass 3: fallback
    }

    // Select the incoming port of toElem that faces fromElem.
    // isPortValid(side, tc, fc): checks source (fc) is in the direction the port faces.
    function selectIncomingPort(fromElem, toElem, usedPorts) {
        var fc = getCenter(fromElem);
        var tc = getCenter(toElem);
        // direction from toElem toward fromElem
        var dx = fc.x - tc.x;
        var dy = fc.y - tc.y;

        var preferred;
        if (Math.abs(dx) >= Math.abs(dy)) {
            preferred = dx >= 0 ? 'right' : 'left';
        } else {
            preferred = dy >= 0 ? 'bottom' : 'top';
        }

        var order = sidePreferenceOrder(preferred);
        for (var i = 0; i < order.length; i++) {   // Pass 1: valid + free
            if (!usedPorts[order[i]] && isPortValid(order[i], tc, fc)) {
                return getPortBySide(toElem, order[i]);
            }
        }
        for (var i = 0; i < order.length; i++) {   // Pass 2: any free port
            if (!usedPorts[order[i]]) {
                return getPortBySide(toElem, order[i]);
            }
        }
        return getPortBySide(toElem, preferred);    // Pass 3: fallback
    }

    // ── Public API ────────────────────────────────────────────────────────────

    // Called from flowcreator() for newly created flows (eid === null).
    // Reads global startid/endid, selects ports directionally, and writes back:
    //   startx, starty, endx, endy  — chosen port coordinates
    //   flowPortASide               — portA's side ('left'|'right'|'top'|'bottom')
    //   midx or midy                — turning-point coordinate for H or V path
    function resolveFlowGlobals() {
        var elemA = getElemData(startid);
        var elemB = getElemData(endid);
        if (!elemA || !elemB) return;

        var usedA = getUsedPorts(startid);
        var usedB = getUsedPorts(endid);

        var portA = selectOutgoingPort(elemA, elemB, usedA);
        var portB = selectIncomingPort(elemA, elemB, usedB);

        startx = portA.x;
        starty = portA.y;
        endx   = portB.x;
        endy   = portB.y;

        flowPortASide = portA.side;
        flowPortBSide = portB.side;

        var isVA = (portA.side === 'top' || portA.side === 'bottom');
        var isVB = (portB.side === 'top' || portB.side === 'bottom');
        var boxes = getAllBBoxes();

        if (!isVA && !isVB) {
            // HH: horizontal exit → horizontal entry (Z-shaped 3-segment)
            midx = findValidMidX(startx, starty, endx, endy, boxes);
            midy = 0;
        } else if (isVA && isVB) {
            // VV: vertical exit → vertical entry (Z-shaped 3-segment)
            midy = findValidMidY(startx, starty, endx, endy, boxes);
            midx = 0;
        } else if (!isVA && isVB) {
            // HV: horizontal exit → vertical entry (L-shaped 1-bend)
            midx = 0;
            midy = findValidMidY(startx, starty, endx, endy, boxes);
        } else {
            // VH: vertical exit → horizontal entry (L-shaped 1-bend)
            midx = findValidMidX(startx, starty, endx, endy, boxes);
            midy = 0;
        }
    }

    // Called after an element is dragged.
    // Iterates dragFlows, recalculates each flow's ports using current element
    // positions from bpmnjson, redraws via flowcreator, then clears dragFlows.
    // Each reconnected flow occupies its port in bpmnjson before the next flow
    // is processed, so port-conflict avoidance works across multiple flows.
    function reconnectFlows() {
        for (var i = 0; i < dragFlows.length; i++) {
            var flow = dragFlows[i];
            startid   = flow.start_id;
            endid     = flow.end_id;
            starttype = flow.start_type;
            endtype   = flow.end_type;
            flowcreator(null);
        }
        dragFlows = [];
    }

    return {
        resolveFlowGlobals: resolveFlowGlobals,
        reconnectFlows:     reconnectFlows
    };

})();
