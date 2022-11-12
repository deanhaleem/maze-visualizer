export interface GraphNode {
    column: number;
    row: number;
    isVisited: boolean;
}

export interface GraphEdge {
    start: GraphNode;
    end: GraphNode;
    nodesBetween: GraphNode[];
}