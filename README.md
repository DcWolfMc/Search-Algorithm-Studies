# Search-Algorithm-Studies
Aplicação web que visualiza o funcionamento de 5 tipos de busca sendo realizadas em um grid. Busca em Largura, Busca em Profundidade,  Busca de Custo Uniforme, Best First e A Estrela

Trabalho realizado enquanto cursava "T296-26 Intel artificial computacional" na UNIFOR no semestre de 2023.1.

Tipos de buscas que a aplicação realiza:
[x] Busca em Largura
[x] Busca em Profundidade
[x] Busca de Custo Uniforme
[x] Busca Best First
[x] Busca A Estrela (A*)

Essa aplicação é web. Para rodar ela, basta fazer um clone do repositório, e seguir os passo:
- Rodar no Terminal o comando `npm i` ou `npm install` dentro do repositório.
- Rodar no Terminal o comando `npm run dev` ou gerar um build da aplicação com `npm run build`

# Tecnologias Utilizadas

- React.ts
- Vite
- styled-components
- Typescript


# Sobre a Aplicação

- Nela, o usuário pode redefinir um grid de "Node" pelo seu número de Linhas e Colunas,
- Pode definir os "Nodes" de começo (cor "Verde") e de fim (cor "Vermelha").
- Pode Escolher qual algorítmo de busca deseja utilizar.
- Pode Realizar a busca com os padrões escolhidos.

Ao realizar a busca:

- É exibido em cores "Amarelas" o caminho que a busca achou.


Possíveis melhorias:

- Melhorar alguns "bugs" e "crashs" da aplicação.
- Colocar em alguma cor todos os "Nodes" que foram "Expandidos" durante cada tipo de busca, para melhor visualizar as caracteristicas de cada uma.
