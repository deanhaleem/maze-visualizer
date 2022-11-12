import type { GraphEdge, GraphNode } from "./types";

export function recursiveBacktrack(maze: GraphNode[][], startNode: GraphNode, numNodes: number): GraphEdge[] {
    let numNodesVisited = 0;
    const minSpanningTree: GraphEdge[] = [];

    // Stack instead of recursion as it was simple here
    const stack = [];

    // 1) Choose a starting point on maze
    startNode.isVisited = true;
    stack.push(startNode);

    while (numNodesVisited < numNodes && stack.length > 0) {
        const node = stack.pop();

        if (!node) {
            continue;
        }

        const unvisitedNeighbors = getUnivistedNeighbors(node, maze);

        if (unvisitedNeighbors.length > 0) {
            stack.push(node);
        } else {
            // 4) If all adjacent nodes have been visited, back up to last node
            continue;
        }

        // 2) Choose one of its neighboring nodes randomly
        const neighbor =
            unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
        neighbor.isVisited = true;
        numNodesVisited++;

        // 3) Add edges to minimum spanning tree
        addEdgeToMinSpanningTree(node, neighbor, maze, minSpanningTree);

        stack.push(neighbor);
    }

    return minSpanningTree;
}

function getUnivistedNeighbors(node: GraphNode, maze: GraphNode[][]): GraphNode[] {
    const { column, row } = node;

    const unvisitedNeighbors = [];
    if (row > 3 && !maze[row - 3][column].isVisited) {
        unvisitedNeighbors.push(maze[row - 3][column]);
    }

    if (row < maze.length - 3 && !maze[row + 3][column].isVisited) {
        unvisitedNeighbors.push(maze[row + 3][column]);
    }

    if (column > 3 && !maze[row][column - 3].isVisited) {
        unvisitedNeighbors.push(maze[row][column - 3]);
    }

    if (column < maze.length - 3 && !maze[row][column + 3].isVisited) {
        unvisitedNeighbors.push(maze[row][column + 3]);
    }

    return unvisitedNeighbors;
}

function addEdgeToMinSpanningTree(node: GraphNode, neighbor: GraphNode, maze: GraphNode[][], minSpanningTree: GraphEdge[]): void {
    const { column, row } = node;

    if (neighbor.column > column) { // Edge from node to neighbor below
        const nodesBetween: GraphNode[] = [];
        nodesBetween.push(maze[row][column + 1]);
        nodesBetween.push(maze[row][column + 2]);
        minSpanningTree.push({
            start: node,
            end: neighbor,
            nodesBetween
        });
    } else if (neighbor.column < column) { // Edge from node to neighbor above

        const nodesBetween: GraphNode[] = [];
        nodesBetween.push(maze[row][column - 1]);
        nodesBetween.push(maze[row][column - 2]);
        minSpanningTree.push({
            start: node,
            end: neighbor,
            nodesBetween
        });
    } else if (neighbor.row > row) { // Edge from node to neighbor to the right
        const nodesBetween: GraphNode[] = [];
        nodesBetween.push(maze[row + 1][column]);
        nodesBetween.push(maze[row + 2][column]);
        minSpanningTree.push({
            start: node,
            end: neighbor,
            nodesBetween
        });
    } else { // edge from node to neighbor to the left
        const nodesBetween: GraphNode[] = [];
        nodesBetween.push(maze[row - 1][column]);
        nodesBetween.push(maze[row - 2][column]);
        minSpanningTree.push({
            start: node,
            end: neighbor,
            nodesBetween
        });
    }
}