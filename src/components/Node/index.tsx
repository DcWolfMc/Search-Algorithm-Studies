import { FunctionComponent } from "react";
import {NodeBox} from"./styles"
interface NodeProps {
  id: string;
  coordinates: [number, number]
  varient: "visited" | "path" | "wall" | "normal" | "start" | "finish";
  cost?: number;
}
export const Node: FunctionComponent<NodeProps> = ({
  cost,
  varient = "normal",
}) => {
  return (
    <NodeBox varient={varient}>
      <span>{cost == 0 || cost == undefined && cost}</span>
    </NodeBox>
  );
};
