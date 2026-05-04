# AI Algorithms Integration Report

The following algorithms have been implemented and integrated into the Smart Farming Platform.

## 1. Graph Search (Pathfinding)
- **Algorithms**: DFS, BFS, A*
- **Location**: `src/components/Imagery.tsx`
- **Application**: **Drone Path Optimization**. 
    - Used to calculate optimal scouting routes for drones across the field.
    - **BFS**: Finds the shortest path in an unweighted grid.
    - **DFS**: Explores deep paths for terrain coverage.
    - **A***: Uses heuristics to find the most efficient path avoiding obstacles.

## 2. Greedy Algorithms
- **Location**: `src/components/Dashboard.tsx`
- **Application**: **Smart Resource & Task Optimizer**.
    - **Activity Selection**: Optimizes the "Smart Task Schedule" by selecting non-overlapping activities (e.g., Spraying vs. Irrigation).
    - **Job Sequencing**: Prioritizes urgent tasks (e.g., Repairs vs. Seeding) based on deadlines and profit/value.
    - **Knapsack Problem**: Optimizes "Resource Allocation" (seeds, fertilizer) given a weight/budget capacity.
    - **Huffman Coding**: Simulates "Data Compression" for satellite/drone telemetry data to reduce transmission bandwidth.

## 3. Optimization Algorithms
- **Algorithms**: Hill Climbing, Genetic Algorithm
- **Location**: `src/components/Simulation.tsx`
- **Application**: **Yield Factor Optimization**.
    - **Hill Climbing**: Iteratively improves specific growth parameters to reach a local maximum yield.
    - **Genetic Algorithm**: Evolves a population of "configurations" (seed variety, water, fertilizer mix) to find the globally optimal strategy for the AI simulation.

## Library Location
All core algorithm logic is contained in:
- `src/lib/algorithms.ts`

## UI Updates
- **Dashboard**: Added "Smart Resource & Task Optimizer" section.
- **Imagery**: Added "Path Optimization" control panel and SVG map overlay.
- **Simulation**: AI Strategy now uses dynamic optimization results for yield predictions.
