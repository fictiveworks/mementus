import IncidenceList from "./structure/incidence-list";
import IntegerId from "./integer-id";
import Mutators from "./mutators";

class GraphBuilder {
  constructor() {
    this.structure = new IncidenceList();
    this.nodeIds = new IntegerId();
    this.edgeIds = new IntegerId();
  }

  nextNodeId() {
    return this.nodeIds.nextId();
  }

  nextEdgeId() {
    return this.edgeIds.nextId();
  }

  graph() {
    return this.structure;
  }
}

Object.assign(GraphBuilder.prototype, Mutators);

export default GraphBuilder;
