import styled from "styled-components";
interface NodeBoxProps {
    varient: "visited" | "path" | "wall" | "normal" | "start" | "finish";
}
export const NodeBox = styled.div<NodeBoxProps>`
padding: 0.5rem;
border: 1px solid ${props => props.theme["green-700"]};
display: flex;
justify-content: center;
align-items: center;
background-color: ${props => props.varient === "start" ?
 props.theme["green-300"] : props.varient === "finish" ?
  props.theme["red-300"] : props.varient === "path" ?
   props.theme["yellow-500"] : props.varient === "visited" ?
    props.theme["blue-500"] : props.varient === "wall" ?
     props.theme["gray-900"] : props.theme["gray-300"]};

span {
    font-size: 0.75rem;
    color: ${props => props.varient === "normal" ? props.theme["gray-900"] : props.theme.white};
    font-weight: bold;
}
`