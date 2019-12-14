/*
    1) Start with empty edge list set (EL)
    2) Choose random starting node (not random in this case)
    3) Add all adjacent edges of the current node to EL if they
       have no already been added
    4) Choose random edge from EL and remove it from EL
    5) If the edge if not between two visited nodes, it becomes
       a spanning tree edge, and the process moves to the
       neighboring node.
    6) Repeat steps 3-5 until spanning tree or empty EL
*/
export function randomizedPrims(maze, startNode, numNodes) {
  var numNodesVisited = 0;
  var minSpanningTree = [];
  var edgeList = [];

  addAdjacentEdgesToEL(edgeList, maze, startNode);
  startNode.isVisited = true;

  while (numNodesVisited < numNodes && edgeList.length > 0) {
    // get random edge
    var edge = edgeList[Math.floor(Math.random() * edgeList.length)];

    /*
        The start of an edge will always be
        visited. Otherwise, there's no way
        it could be in the EL.
    */
    if (!edge.end.isVisited) {
      edge.end.isVisited = true;
      numNodesVisited++;
      minSpanningTree.push(edge);

      addAdjacentEdgesToEL(edgeList, maze, edge.end);
    }

    // remove edge
    var index = edgeList.indexOf(edge);
    if (index > -1) {
      edgeList.splice(index, 1);
    }
  }

  return minSpanningTree;
}

/*
    This won't add the edge if it is already in
    edgeList.
*/
function addAdjacentEdgesToEL(edgeList, maze, node) {
  const { col, row } = node;

  if (
    row > 3 &&
    !edgeList.includes(e => e.start == node && e.end.col == maze[row - 3][col])
  ) {
    // edge from node to neighbor above
    var nodesBetween = [];
    nodesBetween.push(maze[row - 1][col]);
    nodesBetween.push(maze[row - 2][col]);
    var edge = new Edge(node, maze[row - 3][col], nodesBetween);
    edgeList.push(edge);
  }
  if (
    row < maze.length - 3 &&
    !edgeList.includes(
      e => e.start.col == node && e.end.col == maze[row + 3][col]
    )
  ) {
    // edge from node to neighbor below
    var nodesBetween = [];
    nodesBetween.push(maze[row + 1][col]);
    nodesBetween.push(maze[row + 2][col]);
    var edge = new Edge(node, maze[row + 3][col], nodesBetween);
    edgeList.push(edge);
  }
  if (
    col > 3 &&
    !edgeList.includes(
      e => e.start.col == node && e.end.col == maze[row][col - 3]
    )
  ) {
    // edge from node to neighbor to the left
    var nodesBetween = [];
    nodesBetween.push(maze[row][col - 1]);
    nodesBetween.push(maze[row][col - 2]);
    var edge = new Edge(node, maze[row][col - 3], nodesBetween);
    edgeList.push(edge);
  }
  if (
    col < maze.length - 3 &&
    !edgeList.includes(
      e => e.start.col == node && e.end.col == maze[row][col + 3]
    )
  ) {
    // edge from node to neighbor to the right
    var nodesBetween = [];
    nodesBetween.push(maze[row][col + 1]);
    nodesBetween.push(maze[row][col + 2]);
    var edge = new Edge(node, maze[row][col + 3], nodesBetween);
    edgeList.push(edge);
  }
}

/*
    Keeping track of the nodes between makes it 
    slightly easier to animate the spanning tree
*/
class Edge {
  constructor(start, end, nodesBetween) {
    this.start = start;
    this.end = end;
    this.nodesBetween = nodesBetween;
  }
}
