/*
    1) Choose a starting point on maze
    2) Choose one of its neighboring nodes
       randomly
    3) If the neighbor has no been visited,
       the edge between the current node and
       the neighbor is a spanning tree edge. 
       Process moves to neighbor.
    4) If all adjacent nodes have been visited,
       back up to last node that has unvisited
       neighbors.
    5) Repeat process 2-4 until back at starting
       node.
*/
export function recursiveBacktrack(maze, startNode, numNodes) {
  var numNodesVisited = 0;
  var minSpanningTree = [];

  // I use a stack instread of recursion as it was simple enough here
  var stack = [];

  startNode.isVisited = true;
  stack.push(startNode);

  /*
    I include the numNodesVisited check just in case
    something goes wrong with the stack
  */
  while (numNodesVisited < numNodes && stack.length > 0) {
    var node = stack.pop();

    var unvisitedNeighbors = getUnivistedNeighbors(node, maze);

    // skip the loop if we don't have any unvisited neighbors
    if (unvisitedNeighbors.length > 0) {
      stack.push(node);
    } else {
      continue;
    }

    var neighbor =
      unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
    neighbor.isVisited = true;
    numNodesVisited++;
    addEdgeToMinSpanningTree(node, neighbor, maze, minSpanningTree);

    stack.push(neighbor);
  }

  return minSpanningTree;
}

function getUnivistedNeighbors(node, maze) {
  const { col, row } = node;

  var unvisitedNeighbors = [];
  if (row > 3 && !maze[row - 3][col].isVisited) {
    unvisitedNeighbors.push(maze[row - 3][col]);
  }

  if (row < maze.length - 3 && !maze[row + 3][col].isVisited) {
    unvisitedNeighbors.push(maze[row + 3][col]);
  }

  if (col > 3 && !maze[row][col - 3].isVisited) {
    unvisitedNeighbors.push(maze[row][col - 3]);
  }

  if (col < maze.length - 3 && !maze[row][col + 3].isVisited) {
    unvisitedNeighbors.push(maze[row][col + 3]);
  }

  return unvisitedNeighbors;
}

function addEdgeToMinSpanningTree(node, neighbor, maze, minSpanningTree) {
  const { col, row } = node;

  if (neighbor.col > col) {
    // edge from node to neighbor below
    var nodesBetween = [];
    nodesBetween.push(maze[row][col + 1]);
    nodesBetween.push(maze[row][col + 2]);
    var edge = new Edge(node, neighbor, nodesBetween);
    minSpanningTree.push(edge);
  } else if (neighbor.col < col) {
    // edge from node to neighbor above
    var nodesBetween = [];
    nodesBetween.push(maze[row][col - 1]);
    nodesBetween.push(maze[row][col - 2]);
    var edge = new Edge(node, neighbor, nodesBetween);
    minSpanningTree.push(edge);
  } else if (neighbor.row > row) {
    // edge from node to neighbor to the right
    var nodesBetween = [];
    nodesBetween.push(maze[row + 1][col]);
    nodesBetween.push(maze[row + 2][col]);
    var edge = new Edge(node, neighbor, nodesBetween);
    minSpanningTree.push(edge);
  } else {
    // edge from node to neighbor to the left
    var nodesBetween = [];
    nodesBetween.push(maze[row - 1][col]);
    nodesBetween.push(maze[row - 2][col]);
    var edge = new Edge(node, neighbor, nodesBetween);
    minSpanningTree.push(edge);
  }
}

class Edge {
  constructor(start, end, nodesBetween) {
    this.start = start;
    this.end = end;
    this.nodesBetween = nodesBetween;
  }
}
