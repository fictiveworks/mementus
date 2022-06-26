import test from "ava";
import IncidenceList from "../../src/structure/incidence-list.js";
import directedGraphMacros from "./directed-graph-macros.js";
import indexedGraphMacros from "./indexed-graph-macros.js";
import mutableGraphMacros from "./mutable-graph-macros.js";

for (const directedGraphMacro of directedGraphMacros) {
  test(directedGraphMacro.title(), test.macro(directedGraphMacro), IncidenceList);
}

for (const indexedGraphMacro of indexedGraphMacros) {
  test(indexedGraphMacro, IncidenceList);
}

for (const mutableGraphMacro of mutableGraphMacros) {
  test(mutableGraphMacro.title(), test.macro(mutableGraphMacro), IncidenceList);
}
