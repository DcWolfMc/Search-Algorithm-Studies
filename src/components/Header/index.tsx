import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FormEvent, FunctionComponent, useContext, useState } from "react";
import { SearchAlgorithms } from "../../contexts/SearchContext";
import { Dot } from "@phosphor-icons/react";
import { defaultTheme } from "../../styles/themes/default";
import {
  Form,
  Instructions,
  InstructionsItens,
  MenuSectionCol,
  MenuSectionRow,
  OthersButton,
  SearchButton,
  Sidebar,
  TextInput,
} from "./styles";

export const Header: FunctionComponent = () => {
  const {
    typesOfSearch,
    nCols,
    nRows,
    finishNode,
    startNode,
    handleChangeSerchType,
    handleSearch,
    handleNewGrid,
    handleStartNFinish,
  } = useContext(SearchAlgorithms);

  const [rows, setRows] = useState<number>(nRows);
  const [cols, setCols] = useState<number>(nCols);
  const [startCoordinates, setStartCoordinates] = useState<[number, number]>(
    startNode?.coordinates ? startNode.coordinates : [0, 0]
  );
  const [finishCoordinates, setFinishCoordinates] = useState<[number, number]>(
    finishNode?.coordinates ? finishNode.coordinates : [nCols - 1, nRows - 1]
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    handleSearch();
  }
  function isChangeGridSizeDisable() {
    return rows || cols ? false : true;
  }
  function isChangeStartNFinishDisable() {
    return startCoordinates || finishCoordinates ? false : true;
  }
  return (
    <Sidebar>
      <Form onSubmit={handleSubmit}>
        <h2>Comandos</h2>
        <FormControl fullWidth>
          <InputLabel
            id="typesOfSearchLabel"
            style={{ color: defaultTheme["gray-100"] }}
          >
            Tipo de Busca:
          </InputLabel>
          <Select
            labelId="typesOfSearchLabel"
            id="typesOfSearch"
            style={{
              color: defaultTheme["gray-100"],
              borderColor: defaultTheme["gray-100"],
              backgroundColor: defaultTheme["gray-500"],
            }}
            value={typesOfSearch}
            label="Tipo de Busca"
            onChange={(e) => handleChangeSerchType(e.target.value)}
          >
            <MenuItem value={"Busca em Largura"}>Busca em Largura</MenuItem>
            <MenuItem value={"Busca em Profundidade"}>
              Busca em Profundidade
            </MenuItem>
            <MenuItem value={"Custo Uniforme"}>Custo Uniforme</MenuItem>
            <MenuItem value={"Best First"}>Best First</MenuItem>
            <MenuItem value={"A Estrela"}>A Estrela</MenuItem>
          </Select>
        </FormControl>
        <MenuSectionCol id="gridSize">
          <MenuSectionRow id="rowSize-div">
            <label htmlFor="rowSize">Número de Linhas:</label>
            <TextInput
              id="rowSize"
              type="number"
              step={1}
              min={2}
              max={50}
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
            />
          </MenuSectionRow>

          <MenuSectionRow id="colSize-div">
            <label htmlFor="colSize">Número de Colunas:</label>
            <TextInput
              id="colSize"
              type="number"
              step={1}
              min={2}
              max={50}
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
            />
          </MenuSectionRow>
          <OthersButton
            type="button"
            onClick={() => handleNewGrid(rows, cols)}
            disabled={isChangeGridSizeDisable()}
          >
            Redefinir Grid
          </OthersButton>
        </MenuSectionCol>

        <MenuSectionCol id="startNFinish-div">
          <MenuSectionCol id="startSearch-div">
            <label htmlFor="startSearch">Ponto de início:</label>
            <MenuSectionRow id="startSearch">
              <label htmlFor="startSearch-1">x:</label>
              <TextInput
                placeholder="0"
                type="number"
                step={1}
                min={0}
                max={nRows}
                id="startSearch-1"
                value={startCoordinates && startCoordinates[0]}
                onChange={(e) =>
                  setStartCoordinates((last) => [
                    Number(e.target.value),
                    last ? last[1] : 0,
                  ])
                }
              />
              <label htmlFor="startSearch-2">y:</label>
              <TextInput
                id="startSearch-2"
                type="number"
                step={1}
                min={0}
                max={nCols}
                value={startCoordinates && startCoordinates[1]}
                onChange={(e) =>
                  setStartCoordinates((last) => [
                    last ? last[0] : 0,
                    Number(e.target.value),
                  ])
                }
              />
            </MenuSectionRow>
          </MenuSectionCol>

          <MenuSectionCol id="finishSearch-div">
            <label htmlFor="finishSearch">Ponto de fim:</label>
            <MenuSectionRow id="finishSearch">
              <label htmlFor="finishSearch-1">x:</label>
              <TextInput
                id="finishSearch"
                type="number"
                step={1}
                min={0}
                max={nRows - 1}
                value={finishCoordinates && finishCoordinates[0]}
                onChange={(e) =>
                  setFinishCoordinates((last) => [
                    Number(e.target.value),
                    last ? last[1] : nCols - 1,
                  ])
                }
              />
              <label htmlFor="finishSearch-2">y:</label>
              <TextInput
                id="finishSearch-2"
                type="number"
                step={1}
                min={0}
                max={nCols - 1}
                value={finishCoordinates && finishCoordinates[1]}
                onChange={(e) =>
                  setFinishCoordinates((last) => [
                    last ? last[0] : nRows - 1,
                    Number(e.target.value),
                  ])
                }
              />
            </MenuSectionRow>
          </MenuSectionCol>
          <OthersButton
            type="button"
            onClick={() =>
              handleStartNFinish(startCoordinates, finishCoordinates)
            }
            disabled={isChangeStartNFinishDisable()}
          >
            Definir Pontos
          </OthersButton>
        </MenuSectionCol>
        <SearchButton type="submit">Buscar</SearchButton>
      </Form>
      <MenuSectionCol>
        <Instructions>
          <h2>Instruções</h2>
          <InstructionsItens>
            <div>
              <Dot size={24} />
              <p> Escolha o tipo de Busca.</p>
            </div>
            <div>
              <Dot size={24} />
              <p>
                Escolha o ponto de inicio e o final colocando as suas
                coordenadas x e y.
              </p>
            </div>
            <div>
              <Dot size={24} />
              <p>
                As coordenadas x e y vão de 0 ao máximo número de linhas ou
                colunas.
              </p>
            </div>
            <div>
              <Dot size={24} />
              <p>
                {" "}
                Você pode redefinir a quantidade de colunas e de linhas.
                <br /> Máximo: 50 Mínimo: 10
              </p>
            </div>
          </InstructionsItens>
        </Instructions>
      </MenuSectionCol>
    </Sidebar>
  );
};
