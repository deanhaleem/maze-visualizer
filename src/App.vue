<template>
    <div>
        <button @click="visualizeRandomizedPrims">Randomized Prim's</button>
        <button @click="visualizeRecursiveBacktrack">Recursive Backtrack</button>
        <button @click="reset">Reset</button>
    </div>

    <div class="grid">
        <div v-for="(row, rowIdx) in grid" :key="rowIdx" class="grid-row">
            <Node v-for="(node, nodeIdx) in row" :key="`${rowIdx}-${nodeIdx}`" :column="node.column" :row="node.row" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { randomizedPrims } from './algorithms/randomized-prims';
import { recursiveBacktrack } from './algorithms/recursive-backtracker';
import type { GraphEdge, GraphNode } from './algorithms/types';
import Node from './components/Node.vue';

const ROWS = 21;
const COLS = 21;

const grid: Ref<GraphNode[][]> = ref([])

onMounted(() => {
    grid.value = getInitialGrid()
})

function getInitialGrid(): GraphNode[][] {
    const grid = [];
    for (let row = 0; row < ROWS; row++) {
        const currentRow: GraphNode[] = [];
        for (let col = 0; col < COLS; col++) {
            currentRow.push({
                column: col,
                row,
                isVisited: false
            });
        }
        grid.push(currentRow);
    }

    return grid;
};

function visualizeRandomizedPrims() {
    const startNode = grid.value[1][1];

    const minSpanning = randomizedPrims(
        grid.value,
        startNode,
        (ROWS / 3) * (COLS / 3)
    );

    const nodesInMinSpanningTree: GraphNode[] = [];
    animateMinSpanningAlgorithm(minSpanning, nodesInMinSpanningTree);

    const firstNode = document.getElementById(`node-${0}-${1}`);
    if (firstNode) {
        firstNode.className = "node node-visited";
    }

    const lastNode = document.getElementById(`node-${ROWS - 1}-${COLS - 2}`);
    if (lastNode) {
        lastNode.className = "node node-visited";
    }
}

function visualizeRecursiveBacktrack() {
    const startNode = grid.value[1][1];

    const minSpanning = recursiveBacktrack(
        grid.value,
        startNode,
        (ROWS / 3) * (COLS / 3)
    );

    const nodesInMinSpanningTree: GraphNode[] = [];
    animateMinSpanningAlgorithm(minSpanning, nodesInMinSpanningTree);

    const firstNode = document.getElementById(`node-${0}-${1}`);
    if (firstNode) {
        firstNode.className = "node node-visited";
    }

    const lastNode = document.getElementById(`node-${ROWS - 1}-${COLS - 2}`);
    if (lastNode) {
        lastNode.className = "node node-visited";
    }
}

function animateMinSpanningAlgorithm(minSpanning: GraphEdge[], nodesInMinSpanningTree: GraphNode[]) {
    for (let i = 0; i < minSpanning.length; i++) {
        setTimeout(() => {
            const edge = minSpanning[i];
            nodesInMinSpanningTree.push(edge.start);
            nodesInMinSpanningTree.push(edge.nodesBetween[0]);
            nodesInMinSpanningTree.push(edge.nodesBetween[1]);
            nodesInMinSpanningTree.push(edge.end);
            destroyWall(edge);
        }, 50 * i);
    }
}

function destroyWall(edge: GraphEdge) {
    setTimeout(() => {
        const node = edge.start;
        const node1 = document.getElementById(`node-${node.row}-${node.column}`);
        if (node1) {
            node1.className = "node node-visited";
        }
    }, 50 * 0);


    setTimeout(() => {
        const { row, column } = edge.end;
        const node = document.getElementById(`node-${row}-${column}`);
        if (node) {
            node.className = "node node-visited";
        }
    }, 50 * 0);

    setTimeout(() => {
        const { row, column } = edge.nodesBetween[0];
        const node = document.getElementById(`node-${row}-${column}`);
        if (node) {
            node.className = "node node-visited";
        }
    }, 50 * 0);

    setTimeout(() => {
        const { row, column } = edge.nodesBetween[1];
        const node = document.getElementById(`node-${row}-${column}`);
        if (node) {
            node.className = "node node-visited";
        }
    }, 50 * 1);
}

function reset() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const node = document.getElementById(`node-${row}-${col}`);
            if (node) {
                node.className = "node";
            }
        }
    }

    grid.value = getInitialGrid();
}
</script>
  
<style scoped>
.grid {
    margin: 25px 0 0;
}

.grid-row {
    height: 25px;
}
</style>
  