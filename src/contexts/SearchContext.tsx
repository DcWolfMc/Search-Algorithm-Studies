import { createContext, ReactNode, useState, useEffect } from "react";
export interface Node {
  id: string;
  coordinates: [number, number];
  parent?: Node;
  varient: "visited" | "path" | "wall" | "normal" | "start" | "finish";
  cost: number;
}
interface SearchAlgorithmsContextType {
  grid: Node[][];
  nRows: number;
  nCols: number;
  finishNode?: Node;
  startNode?: Node;
  typesOfSearch:
    | "Busca em Largura"
    | "Busca em Profundidade"
    | "Custo Uniforme"
    | "Best First"
    | "A Estrela";
  setTypesOfSearch: React.Dispatch<
    React.SetStateAction<
      | "Busca em Largura"
      | "Busca em Profundidade"
      | "Custo Uniforme"
      | "Best First"
      | "A Estrela"
    >
  >;
  handleSearch(): void;
  handleChangeSerchType(type: string): void;
  handleNewGrid(nRows: number, nCols: number): void;
  handleStartNFinish: (
    start: [number, number],
    finish: [number, number]
  ) => void;
}
interface SearchAlgorithmsProviderProps {
  children: ReactNode;
}

export const SearchAlgorithms = createContext(
  {} as SearchAlgorithmsContextType
);

export const SearchAlgorithmsProvider = ({
  children,
}: SearchAlgorithmsProviderProps) => {
  const [grid, setGrid] = useState<Node[][]>([[]]);
  const [nRows, setNRows] = useState<number>(2);
  const [nCols, setNCols] = useState<number>(2);
  const [startNode, setStartNode] = useState<Node | undefined>();
  const [finishNode, setFinishNode] = useState<Node | undefined>();
  const [typesOfSearch, setTypesOfSearch] = useState<
    | "Busca em Largura"
    | "Busca em Profundidade"
    | "Custo Uniforme"
    | "Best First"
    | "A Estrela"
  >("Busca em Largura");

  useEffect(() => {
    handleNewGrid(nRows, nCols);
  }, [typesOfSearch]);

  function heuristicaLinhaReta(aux: Node, destination: Node) {
    let cateto1 = Math.abs(aux.coordinates[0] - destination.coordinates[0]);
    let cateto2 = Math.abs(aux.coordinates[0] - destination.coordinates[0]);
    return Math.sqrt(Math.pow(cateto1, 2) + Math.pow(cateto2, 2));
  }
  function getNeighbors(Node: Node) {
    const [x, y] = Node.coordinates;
    const neighbors: (typeof Node.coordinates)[] = [];
    //Checa se o numero é expansivo dentro do grid e se não é uma parede nas 4 direções
    if (
      x > 0 &&
      grid[x - 1][y].varient != "wall" &&
      grid[x - 1][y].coordinates != Node.parent?.coordinates
    ) {
      neighbors.push([x - 1, y]);
    }
    if (
      x < grid.length - 1 &&
      grid[x + 1][y].varient != "wall" &&
      grid[x + 1][y].coordinates != Node.parent?.coordinates
    ) {
      neighbors.push([x + 1, y]);
    }
    if (
      y > 0 &&
      grid[x][y - 1].varient != "wall" &&
      grid[x][y - 1].coordinates != Node.parent?.coordinates
    ) {
      neighbors.push([x, y - 1]);
    }
    if (
      y < grid[0].length - 1 &&
      grid[x][y + 1].varient != "wall" &&
      grid[x][y + 1].coordinates != Node.parent?.coordinates
    ) {
      neighbors.push([x, y + 1]);
    }

    return neighbors;
  }
  function BuscaEmLargura(startNode: Node, finshNode: Node) {
    let fila: Node[] = [];
    let node: Node = startNode;
    let aux: Node = startNode;
    console.log("finshNode",finshNode);
    
    fila.push(node);
    while (fila.length > 0) {
      let arrayfila:Node[] = [...fila]
      console.log("arrayfila:",arrayfila);
      aux = fila.shift()!;

      //Teste de Objetivo
      if (aux.id === finshNode.id) {
        return getPath({...aux,varient:"finish"});
        
      }
      //Teste de Objetivo

      //Expansão de vizinhos
      console.log("Expansão de vizinhos");
      
      let vizinhos = getNeighbors(aux);
      vizinhos.forEach((vizinho) => {
        node = {
          ...grid[vizinho[0]][vizinho[1]],
          parent: aux,
          varient: "visited",
        };
        fila.push(node);
      });
      // Expansão de vizinhos
    }
    return getPath({...aux,varient:"finish"});
  }
  function BuscaEmProfundidade(startNode: Node, finshNode: Node) {
    let pilha: Node[] = [];
    let node: Node = startNode;
    let aux: Node = startNode;

    pilha.push(node);

    while (pilha.length > 0) {
      aux = pilha.pop()!;

      //Teste de Objetivo
      if (aux.id === finshNode.id) {
        return getPath({...aux,varient:"finish"});
      }
      //Teste de Objetivo

      //Expansão de vizinhos
      const vizinhos = getNeighbors(aux);
      vizinhos.forEach((vizinho) => {
        node = {
          ...grid[vizinho[0]][vizinho[1]],
          parent: aux,
          varient: "visited",
        };
        pilha.push(node);
      });
      // Expansão de vizinhos
    }
    return getPath({...aux,varient:"finish"});
  }
  function buscaCustoUniforme(startNode: Node, finshNode: Node) {
    let fila: Node[] = [];
    let node: Node = startNode;
    let aux: Node = startNode;
    console.log("finshNode",finshNode);
    fila.push(node);

    while (fila.length > 0) {
      let arrayfila:Node[] = [...fila]
      console.log("arrayfila:",arrayfila);
      aux = fila.shift()!;
      //Teste de Objetivo
      if (aux.id === finshNode.id) {
        return getPath({...aux,varient:"finish"});
      }
      //Teste de Objetivo

      //Expansão de vizinhos
      console.log("Expansão de vizinhos");
      const vizinhos = getNeighbors(aux);
      vizinhos.forEach((vizinho) => {
        node = {
          ...grid[vizinho[0]][vizinho[1]],
          parent: aux,
          varient: "visited",
          cost: grid[vizinho[0]][vizinho[1]].cost + aux.cost,
        };
        fila.push(node);
      });
      // Expansão de vizinhos
      
      console.log("fila.sort");
      
      fila.sort((a, b) => {
        return a.cost - b.cost;
      });
    }
    return getPath({...aux,varient:"finish"});
  }
  function buscaMelhorEscolha(startNode: Node, finshNode: Node) {
    let fila: Node[] = [];
    let node: Node = {
      ...startNode,
      cost: heuristicaLinhaReta(startNode, finshNode),
    }; // custo é a heuristica;
    let aux: Node = startNode;
    console.log("finshNode",finshNode);

    fila.push(node);

    while (fila.length > 0) {
      let arrayfila:Node[] = [...fila]
      console.log("arrayfila:",arrayfila);
      aux = fila.shift()!;

      //Teste de Objetivo
      if (aux.id === finshNode.id) {
        return getPath({...aux,varient:"finish"});
      }
      //Teste de Objetivo

      //Expansão de vizinhos
      console.log("Expansão de vizinhos");
      const vizinhos = getNeighbors(aux);
      vizinhos.forEach((vizinho) => {
        node = {
          ...grid[vizinho[0]][vizinho[1]],
          parent: aux,
          varient: "visited",
          cost: heuristicaLinhaReta(grid[vizinho[0]][vizinho[1]], finshNode),
        };
        fila.push(node);
      });
      // Expansão de vizinhos
      console.log("fila.sort");
      fila.sort((a, b) => {
        return a.cost - b.cost;
      });
    }
    return getPath({...aux,varient:"finish"});
  }
  function buscaAEstrela(startNode: Node, finshNode: Node) {
    let fila: Node[] = [];
    let node: Node = startNode; // custo é o seu custo acumulado + a heuristica. A heuristica será eplicada no ordenar.
    let aux: Node = startNode;
    console.log("finshNode",finshNode);
    fila.push(node);

    while (fila.length > 0) {
      
      let arrayfila:Node[] = [...fila]
      console.log("arrayfila:",arrayfila);
      aux = fila.shift()!;

      //Teste de Objetivo
      if (aux.id === finshNode.id) {
        return getPath({...aux,varient:"finish"});
      }
      //Teste de Objetivo

      //Expansão de vizinhos
      console.log("Expansão de vizinhos");
      const vizinhos = getNeighbors(aux);
      vizinhos.forEach((vizinho) => {
        node = {
          ...grid[vizinho[0]][vizinho[1]],
          parent: aux,
          varient: "visited",
          cost: grid[vizinho[0]][vizinho[1]].cost + aux.cost,
        };
        fila.push(node);
      });
      // Expansão de vizinhos
      console.log("fila.sort");
      fila.sort((a, b) => {
        return (
          a.cost +
          heuristicaLinhaReta(a, finshNode) -
          (b.cost + heuristicaLinhaReta(b, finshNode))
        );
      });
    }
    return getPath({...aux,varient:"finish"});
  }
  function getPath(lastNode:Node) {
    const path: Node[] = [];
    let aux:Node = lastNode;
    while (aux.varient !== "start") {
      console.log("in while");
      if(aux.varient !== "finish"){
        path.unshift(aux);
      }
      aux = aux.parent!
    }
    console.log("path",path);
    
    return path
  }
  function ShowPathOnGrid(path:Node[]) {
    let newGrid:Node[][] = [[]]
    grid.forEach((row,rowIndex)=>{
      newGrid.push([]);
      row.forEach((node)=>{
        let pathitemIndex = path.findIndex((pathNode=>pathNode.id === node.id))
        if(pathitemIndex != -1){
          newGrid[rowIndex].push({...path[pathitemIndex],varient:"path" })

        }else{
          newGrid[rowIndex].push(node);
        }
      })
    })
    
    newGrid.pop()
    setGrid(newGrid)
  }

  function handleSearch() {
    if (startNode !== undefined && finishNode !== undefined) {
      switch (typesOfSearch) {
        case "Busca em Largura":
          return (
             (ShowPathOnGrid(BuscaEmLargura(startNode, finishNode))) 
            
            )
        case "Busca em Profundidade":
          return ShowPathOnGrid(BuscaEmProfundidade(startNode, finishNode));

        case "Custo Uniforme":
          return ShowPathOnGrid(buscaCustoUniforme(startNode, finishNode));

        case "Best First":
          return ShowPathOnGrid(buscaMelhorEscolha(startNode, finishNode));

        case "A Estrela":
          return ShowPathOnGrid(buscaAEstrela(startNode, finishNode));

        default:
          return console.log("Algo deu errado!");
      }
    } else {
      alert(
        "Algo deu errado. Defina um tipo de Busca ou Defina os pontos de Começo e fim."
      );
    }
  }

  function handleChangeSerchType(type: typeof typesOfSearch) {
    setTypesOfSearch(type);
  }

  function handleNewGrid(nRows: number, nCols: number) {
    let row: number = 0;
    let newGrid: Node[][] = [[]];

    for (row; row < nRows; row++) {
      newGrid.push([]);
      for (let col = 0; col < nCols; col++) {
        newGrid[row].push({
          id: `${row}-${col}`,
          varient: "normal",
          coordinates: [row, col],
          cost: 1,
        });
      }
    }
    newGrid.pop();
    startNode?.coordinates &&
      newGrid[startNode.coordinates[0]].splice(
        startNode.coordinates[1],
        1,
        startNode
      );
    finishNode?.coordinates &&
      newGrid[finishNode.coordinates[0]].splice(
        finishNode.coordinates[1],
        1,
        finishNode
      );
    setNRows(nRows);
    setNCols(nCols);
    setGrid(newGrid);
  }
  function handleStartNFinish(
    start: [number, number],
    finish: [number, number]
  ) {
    let newStart: Node = { ...grid[start[0]][start[1]], varient: "start" };
    let newFinish: Node = { ...grid[finish[0]][finish[1]], varient: "finish" };
    let newGrid: Node[][] = [[]];

    for (let row = 0; row < nRows; row++) {
      newGrid.push([]);
      for (let col = 0; col < nCols; col++) {
        newGrid[row].push({
          id: `${row}-${col}`,
          varient: "normal",
          coordinates: [row, col],
          cost: 1,
        });
      }
    }
    console.log("beforePop", newGrid);

    newGrid.pop();

    console.log("afterPop", newGrid);
    newGrid[start[0]][start[1]] = newStart;
    newGrid[finish[0]][finish[1]] = newFinish;
    console.log("newGrid", newGrid);

    setStartNode(newStart);
    setFinishNode(newFinish);
    setGrid(newGrid);
  }

  return (
    <SearchAlgorithms.Provider
      value={{
        grid,
        nCols,
        nRows,
        finishNode,
        startNode,
        typesOfSearch,
        setTypesOfSearch,
        handleChangeSerchType,
        handleNewGrid,
        handleStartNFinish,
        handleSearch,
      }}
    >
      {children}
    </SearchAlgorithms.Provider>
  );
};
