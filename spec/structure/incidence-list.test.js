import test from "ava";
import IncidenceList from "../../src/structure/incidence-list";
import Node from "../../src/node";
import Edge from "../../src/edge";
import directedGraphMacros from "./directed-graph-macros";
import indexedGraphMacros from "./indexed-graph-macros";
import mutableGraphMacros from "./mutable-graph-macros";

test(directedGraphMacros, IncidenceList);
test(indexedGraphMacros, IncidenceList);
test(mutableGraphMacros, IncidenceList);
