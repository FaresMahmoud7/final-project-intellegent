/**
 * AI Algorithms Library for Smart Farming
 * Includes Search, Optimization, and Greedy algorithms
 */

// --- 1. Graph Search Algorithms (Pathfinding) ---

export type GridPoint = { x: number; y: number };

/**
 * Breadth-First Search (BFS)
 * Finds the shortest path in an unweighted grid
 */
export function bfs(grid: number[][], start: GridPoint, end: GridPoint): GridPoint[] {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue: [GridPoint, GridPoint[]][] = [[start, [start]]];
  const visited = new Set<string>();
  visited.add(`${start.x},${start.y}`);

  const directions = [{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}];

  while (queue.length > 0) {
    const [current, path] = queue.shift()!;
    if (current.x === end.x && current.y === end.y) return path;

    for (const dir of directions) {
      const next = { x: current.x + dir.x, y: current.y + dir.y };
      const key = `${next.x},${next.y}`;

      if (
        next.x >= 0 && next.x < rows &&
        next.y >= 0 && next.y < cols &&
        grid[next.x][next.y] === 0 &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push([next, [...path, next]]);
      }
    }
  }
  return [];
}

/**
 * Depth-First Search (DFS)
 * Explores as far as possible along each branch
 */
export function dfs(grid: number[][], start: GridPoint, end: GridPoint): GridPoint[] {
  const rows = grid.length;
  const cols = grid[0].length;
  const stack: [GridPoint, GridPoint[]][] = [[start, [start]]];
  const visited = new Set<string>();

  const directions = [{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}];

  while (stack.length > 0) {
    const [current, path] = stack.pop()!;
    if (current.x === end.x && current.y === end.y) return path;

    const key = `${current.x},${current.y}`;
    if (visited.has(key)) continue;
    visited.add(key);

    for (const dir of directions) {
      const next = { x: current.x + dir.x, y: current.y + dir.y };
      if (
        next.x >= 0 && next.x < rows &&
        next.y >= 0 && next.y < cols &&
        grid[next.x][next.y] === 0 &&
        !visited.has(`${next.x},${next.y}`)
      ) {
        stack.push([next, [...path, next]]);
      }
    }
  }
  return [];
}

/**
 * A* Search Algorithm
 * Uses heuristics to find the shortest path efficiently.
 * Supports weighted grids where grid value represents additional cost.
 */
export function aStar(grid: number[][], start: GridPoint, end: GridPoint): GridPoint[] {
  const rows = grid.length;
  const cols = grid[0].length;
  
  const heuristic = (a: GridPoint, b: GridPoint) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  
  const openSet: GridPoint[] = [start];
  const cameFrom = new Map<string, GridPoint>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();

  gScore.set(`${start.x},${start.y}`, 0);
  fScore.set(`${start.x},${start.y}`, heuristic(start, end));

  while (openSet.length > 0) {
    let current = openSet[0];
    let currentIndex = 0;
    for (let i = 1; i < openSet.length; i++) {
      if ((fScore.get(`${openSet[i].x},${openSet[i].y}`) ?? Infinity) < (fScore.get(`${current.x},${current.y}`) ?? Infinity)) {
        current = openSet[i];
        currentIndex = i;
      }
    }

    if (current.x === end.x && current.y === end.y) {
      const path = [current];
      let currKey = `${current.x},${current.y}`;
      while (cameFrom.has(currKey)) {
        current = cameFrom.get(currKey)!;
        path.unshift(current);
        currKey = `${current.x},${current.y}`;
      }
      return path;
    }

    openSet.splice(currentIndex, 1);
    
    const directions = [{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}];
    for (const dir of directions) {
      const neighbor = { x: current.x + dir.x, y: current.y + dir.y };
      const nKey = `${neighbor.x},${neighbor.y}`;

      if (neighbor.x >= 0 && neighbor.x < rows && neighbor.y >= 0 && neighbor.y < cols && grid[neighbor.x][neighbor.y] !== 1) {
        // Cost is 1 + the value in the grid (e.g., 0 for road, higher for rough field)
        const weight = grid[neighbor.x][neighbor.y] || 0;
        const tentativeGScore = (gScore.get(`${current.x},${current.y}`) || 0) + 1 + weight;
        
        if (tentativeGScore < (gScore.get(nKey) ?? Infinity)) {
          cameFrom.set(nKey, current);
          gScore.set(nKey, tentativeGScore);
          fScore.set(nKey, tentativeGScore + heuristic(neighbor, end));
          if (!openSet.some(p => p.x === neighbor.x && p.y === neighbor.y)) {
            openSet.push(neighbor);
          }
        }
      }
    }
  }
  return [];
}

/**
 * Greedy Best-First Search
 * Purely heuristic-driven search, faster but not always shortest
 */
export function greedyBestFirstSearch(grid: number[][], start: GridPoint, end: GridPoint): GridPoint[] {
  const rows = grid.length;
  const cols = grid[0].length;
  const heuristic = (a: GridPoint, b: GridPoint) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  
  const openSet: GridPoint[] = [start];
  const cameFrom = new Map<string, GridPoint>();
  const visited = new Set<string>();

  while (openSet.length > 0) {
    let current = openSet[0];
    let currentIndex = 0;
    for (let i = 1; i < openSet.length; i++) {
      if (heuristic(openSet[i], end) < heuristic(current, end)) {
        current = openSet[i];
        currentIndex = i;
      }
    }

    if (current.x === end.x && current.y === end.y) {
      const path = [current];
      let currKey = `${current.x},${current.y}`;
      while (cameFrom.has(currKey)) {
        current = cameFrom.get(currKey)!;
        path.unshift(current);
        currKey = `${current.x},${current.y}`;
      }
      return path;
    }

    openSet.splice(currentIndex, 1);
    visited.add(`${current.x},${current.y}`);

    const directions = [{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}];
    for (const dir of directions) {
      const neighbor = { x: current.x + dir.x, y: current.y + dir.y };
      const nKey = `${neighbor.x},${neighbor.y}`;

      if (
        neighbor.x >= 0 && neighbor.x < rows && 
        neighbor.y >= 0 && neighbor.y < cols && 
        grid[neighbor.x][neighbor.y] !== 1 && 
        !visited.has(nKey) &&
        !openSet.some(p => p.x === neighbor.x && p.y === neighbor.y)
      ) {
        cameFrom.set(nKey, current);
        openSet.push(neighbor);
      }
    }
  }
  return [];
}

// --- 2. Greedy Algorithms ---

/**
 * Activity Selection Problem
 * Selects maximum number of non-overlapping activities
 */
export function activitySelection(activities: { start: number; end: number; id: string }[]) {
  const sorted = [...activities].sort((a, b) => a.end - b.end);
  const selected = [sorted[0]];
  let lastEnd = sorted[0].end;

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].start >= lastEnd) {
      selected.push(sorted[i]);
      lastEnd = sorted[i].end;
    }
  }
  return selected;
}

/**
 * Job Sequencing with Deadlines
 * Maximize profit given jobs with deadlines and profits
 */
export function jobSequencing(jobs: { id: string; deadline: number; profit: number }[]) {
  const sorted = [...jobs].sort((a, b) => b.profit - a.profit);
  const maxDeadline = Math.max(...jobs.map(j => j.deadline));
  const schedule = new Array(maxDeadline).fill(null);
  let totalProfit = 0;

  for (const job of sorted) {
    for (let j = Math.min(maxDeadline, job.deadline) - 1; j >= 0; j--) {
      if (schedule[j] === null) {
        schedule[j] = job;
        totalProfit += job.profit;
        break;
      }
    }
  }
  return { schedule: schedule.filter(j => j !== null), totalProfit };
}

/**
 * Fractional Knapsack Problem (Greedy)
 * Maximize value in a knapsack with capacity
 */
export function knapsackGreedy(items: { name: string; value: number; weight: number }[], capacity: number) {
  const sorted = [...items].sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
  let currentWeight = 0;
  let totalValue = 0;
  const selected: { name: string; fraction: number }[] = [];

  for (const item of sorted) {
    if (currentWeight + item.weight <= capacity) {
      currentWeight += item.weight;
      totalValue += item.value;
      selected.push({ name: item.name, fraction: 1 });
    } else {
      const remaining = capacity - currentWeight;
      totalValue += item.value * (remaining / item.weight);
      selected.push({ name: item.name, fraction: remaining / item.weight });
      break;
    }
  }
  return { totalValue, selected };
}

/**
 * Huffman Coding
 * Data compression algorithm
 */
export function huffmanCoding(data: string) {
  const freq: Record<string, number> = {};
  for (const char of data) freq[char] = (freq[char] || 0) + 1;

  interface Node {
    char?: string;
    freq: number;
    left?: Node;
    right?: Node;
  }

  const nodes: Node[] = Object.entries(freq).map(([char, f]) => ({ char, freq: f }));
  
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const left = nodes.shift()!;
    const right = nodes.shift()!;
    nodes.push({ freq: left.freq + right.freq, left, right });
  }

  const codes: Record<string, string> = {};
  const generateCodes = (node: Node, code: string) => {
    if (node.char) codes[node.char] = code;
    if (node.left) generateCodes(node.left, code + '0');
    if (node.right) generateCodes(node.right, code + '1');
  };

  if (nodes.length > 0) generateCodes(nodes[0], "");
  
  const encoded = data.split('').map(c => codes[c]).join('');
  return { codes, encoded, originalSize: data.length * 8, compressedSize: encoded.length };
}

// --- 3. Optimization Algorithms ---

/**
 * Hill Climbing
 * Local search for finding local maxima
 */
export function hillClimbing(fn: (x: number) => number, start: number, step: number = 0.1, maxIter: number = 100) {
  let current = start;
  let currentVal = fn(current);

  for (let i = 0; i < maxIter; i++) {
    const nextPlus = current + step;
    const nextMinus = current - step;
    const valPlus = fn(nextPlus);
    const valMinus = fn(nextMinus);

    if (valPlus > currentVal && valPlus >= valMinus) {
      current = nextPlus;
      currentVal = valPlus;
    } else if (valMinus > currentVal) {
      current = nextMinus;
      currentVal = valMinus;
    } else {
      break; // Local maximum reached
    }
  }
  return { x: current, value: currentVal };
}

/**
 * Genetic Algorithm
 * Global optimization based on natural selection
 */
export function geneticAlgorithm(
  popSize: number, 
  geneLength: number, 
  fitnessFn: (genes: number[]) => number,
  generations: number = 50
) {
  let population = Array.from({ length: popSize }, () => 
    Array.from({ length: geneLength }, () => Math.random())
  );

  for (let g = 0; g < generations; g++) {
    const scores = population.map(genes => ({ genes, score: fitnessFn(genes) }));
    scores.sort((a, b) => b.score - a.score);

    const nextGen = scores.slice(0, popSize / 2).map(s => s.genes);
    
    while (nextGen.length < popSize) {
      const parent1 = nextGen[Math.floor(Math.random() * (popSize / 2))];
      const parent2 = nextGen[Math.floor(Math.random() * (popSize / 2))];
      const midpoint = Math.floor(Math.random() * geneLength);
      
      const child = [
        ...parent1.slice(0, midpoint),
        ...parent2.slice(midpoint)
      ].map(gene => Math.random() < 0.05 ? Math.random() : gene); // 5% mutation
      
      nextGen.push(child);
    }
    population = nextGen;
  }

  const finalScores = population.map(genes => ({ genes, score: fitnessFn(genes) }));
  finalScores.sort((a, b) => b.score - a.score);
  return finalScores[0];
}
