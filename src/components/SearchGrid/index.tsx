import { FunctionComponent } from "react";
import { useContext } from "react";
import { SearchAlgorithms } from "../../contexts/SearchContext";
import { Node } from "../Node";
import { Node as NodeProps } from "../../contexts/SearchContext";
import { DivRow } from "./styles";


export const SearchGrid: FunctionComponent = () => {
  const { grid } = useContext(SearchAlgorithms);
  return (
    <div>
        {grid?(
            grid.map((row, index) => {
                return (
                  <DivRow key={`row-${index}`}>
                    {row.map((node: NodeProps) => {
                      return (
                        <Node
                          key={node.id}
                          id={node.id}
                          coordinates={node.coordinates}
                          cost={node.cost}
                          varient={node.varient}
                        />
                      );
                    })}
                  </DivRow>
                );
              })
        ):(<span>Grid Vazio</span>)}
      
    </div>
  );
};
