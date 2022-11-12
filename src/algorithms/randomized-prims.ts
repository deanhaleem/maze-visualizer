import type { GraphEdge, GraphNode } from "./types";

export function randomizedPrims(maze: GraphNode[][], startNode: GraphNode, numNodes: number): GraphEdge[] {
    let numNodesVisited = 0;
    const minSpanningTree: GraphEdge[] = [];

    // 1) Start with empty edge list set (EL).
    const edgeList: GraphEdge[] = [];

    // 2) Choose random starting node (not random in this case).

    // 3) Add all adjacent edges of the current node to EL if they have not already been added.
    addAdjacentEdgesToEL(edgeList, maze, startNode);
    startNode.isVisited = true;

    while (numNodesVisited < numNodes && edgeList.length > 0) {
        // 4) Choose random edge from EL and remove it from EL.
        const edge = edgeList[Math.floor(Math.random() * edgeList.length)];

        // 5) If the edge if not between two visited nodes, it becomes a spanning tree edge 
        // Start of the edge will always be visited since it is in the EL
        if (!edge.end.isVisited) {
            edge.end.isVisited = true;
            numNodesVisited++;
            minSpanningTree.push(edge);

            addAdjacentEdgesToEL(edgeList, maze, edge.end);
        }

        const index = edgeList.indexOf(edge);
        if (index > -1) {
            edgeList.splice(index, 1);
        }
    }

    return minSpanningTree;
}

function addAdjacentEdgesToEL(edgeList: GraphEdge[], maze: GraphNode[][], node: GraphNode): void {
    const { column, row } = node;

    // Edge from node to neighbor above
    if (
        row > 3 &&
        !edgeList.some(edge => edge.start.column === node.column && edge.end.column === maze[row - 3][column].column)
    ) {
        const nodesBetween: GraphNode[] = [];
        nodesBetween.push(maze[row - 1][column]);
        nodesBetween.push(maze[row - 2][column]);
        edgeList.push({
            start: node,
            end: maze[row - 3][column],
            nodesBetween
        });
    }

    // Edge from node to neighbor below
    if (
        row < maze.length - 3 &&
        !edgeList.some(
            e => e.start === node && e.end.column === maze[row + 3][column].column
        )
    ) {

        const nodesBetween: GraphNode[] = [];
        nodesBetween.push(maze[row + 1][column]);
        nodesBetween.push(maze[row + 2][column]);
        edgeList.push({
            start: node,
            end: maze[row + 3][column],
            nodesBetween
        });
    }

    // Edge from node to neighbor to the left
    if (
        column > 3 &&
        !edgeList.some(
            e => e.start === node && e.end.column === maze[row][column - 3].column
        )
    ) {

        const nodesBetween: GraphNode[] = [];
        nodesBetween.push(maze[row][column - 1]);
        nodesBetween.push(maze[row][column - 2]);
        edgeList.push({
            start: node,
            end: maze[row][column - 3],
            nodesBetween
        });
    }

    // Edge from node to neighbor to the right
    if (
        column < maze.length - 3 &&
        !edgeList.some(
            e => e.start === node && e.end.column === maze[row][column + 3].column
        )
    ) {

        const nodesBetween: GraphNode[] = [];
        nodesBetween.push(maze[row][column + 1]);
        nodesBetween.push(maze[row][column + 2]);
        edgeList.push({
            start: node,
            end: maze[row][column + 3],
            nodesBetween
        });
    }
}