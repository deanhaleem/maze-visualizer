import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Node from "./Node";
import { randomizedPrims } from "../Algorithms/randomizedPrims";
import { recursiveBacktrack } from "../Algorithms/recursiveBacktracker";

import "./MazeVisualizer.css";

const ROWS = 21;
const COLS = 21;

export default class MazeGenerationVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: []
    };
  }

  componentDidMount() {
    const maze = getInitialGrid();
    this.setState({ grid: maze });
  }

  reset() {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        document.getElementById(`node-${row}-${col}`).className = "node";
      }
    }

    const maze = getInitialGrid();
    this.setState({ grid: maze });
  }

  toggleGridLines() {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        document.getElementById(`node-${row}-${col}`).classList.toggle("toggle-grid");
      }
    }
  }

  visualizeRandomizedPrims() {
    const { grid: maze } = this.state;
    const startNode = maze[1][1];

    const minSpanning = randomizedPrims(
      maze,
      startNode,
      (ROWS / 3) * (COLS / 3)
    );
    var nodesInMinSpanningTree = [];
    this.animateMinSpanningAlgorithm(minSpanning, nodesInMinSpanningTree);

    document.getElementById(`node-${0}-${1}`).className = "node node-visited";
    document.getElementById(`node-${ROWS - 1}-${COLS - 2}`).className =
      "node node-visited";
  }

  visualizeRecursiveBacktrack() {
    const { grid: maze } = this.state;
    const startNode = maze[1][1];

    const minSpanning = recursiveBacktrack(
      maze,
      startNode,
      (ROWS / 3) * (COLS / 3)
    );
    var nodesInMinSpanningTree = [];
    this.animateMinSpanningAlgorithm(minSpanning, nodesInMinSpanningTree);

    document.getElementById(`node-${0}-${1}`).className = "node node-visited";
    document.getElementById(`node-${ROWS - 1}-${COLS - 2}`).className =
      "node node-visited";
  }

  animateMinSpanningAlgorithm(minSpanning, nodesInMinSpanningTree) {
    for (let i = 0; i < minSpanning.length; i++) {
      setTimeout(() => {
        const edge = minSpanning[i];
        nodesInMinSpanningTree.push(edge.start);
        nodesInMinSpanningTree.push(edge.nodesBetween[0]);
        nodesInMinSpanningTree.push(edge.nodesBetween[1]);
        nodesInMinSpanningTree.push(edge.end);
        this.destroyWall(edge);
      }, 50 * i);
    }
  }

  destroyWall(edge) {
    setTimeout(() => {
      const node = edge.start;
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-visited";
    }, 50 * 0);

    setTimeout(() => {
      const node = edge.end;
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-visited";
    }, 50 * 0);

    setTimeout(() => {
      const node = edge.nodesBetween[0];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-visited";
    }, 50 * 0);

    setTimeout(() => {
      const node = edge.nodesBetween[1];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-visited";
    }, 50 * 1);
  }

  render() {
    const { grid: maze } = this.state;

    return (
      <>
        <ButtonToolbar>
          <Button
            onClick={() => this.visualizeRandomizedPrims()}
            variant="primary"
            block
          >
            Visualize Randomized Prim's
          </Button>
          <Button
            onClick={() => this.visualizeRecursiveBacktrack()}
            variant="primary"
            block
          >
            Visualize Recursive Backtrack
          </Button>
          <Button
            onClick={() => this.reset()}
            variant="secondary"
            block
          >
            Reset
          </Button>
          <Button
            onClick={() => this.toggleGridLines()}
            variant="secondary"
            block
          >
            Toggle Grid Lines
          </Button>
        </ButtonToolbar>

        <div className="grid">
          {maze.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="grid-row">
                {row.map((node, nodeIdx) => {
                  const { row, col } = node;
                  return <Node key={nodeIdx} col={col} row={row}></Node>;
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < COLS; col++) {
      var node = createNode(col, row);
      currentRow.push(node);
    }
    grid.push(currentRow);
  }

  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isVisited: false
  };
};
