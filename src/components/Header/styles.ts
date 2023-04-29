import styled from "styled-components"

export const Sidebar = styled.aside`
height: 100%;
min-width: 12rem;
max-width: 20rem;
padding: 1rem 0.75rem;
display: flex;
flex-direction: column;
align-items: center;
justify-content: start;
gap: 1rem;
background-color: ${props=> props.theme["gray-600"]};
border-right: 2px solid ${props=>props.theme["gray-600"]};
`
export const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 1rem;
`

const MenuSection = styled.div`
width: 100%;
display: flex;
gap:0.5rem;
`

export const MenuSectionRow = styled(MenuSection)`
flex-direction: row;
justify-content: center;
align-items: center;

`
export const MenuSectionCol = styled(MenuSection)`
flex-direction: column;
justify-content: center;
align-items: center;
`

export const Instructions = styled(MenuSection)`
padding: 0.75rem 1rem;
border-radius: 8px;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: ${props=>props.theme["gray-600"]};
color: ${props=>props.theme["gray-100"]};
`
export const InstructionsItens = styled(MenuSection)`
padding: 0.75rem 0;
border-radius: 8px;
flex-direction: column;
justify-content: center;
align-items: center;
color: ${props=>props.theme["gray-100"]};
div{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
}p{
    width: 100%;
    color: inherit;
    text-align: start;

}
`

const BaseInput = styled.input`
background: transparent;
height: 2.5rem;
border:0;
border-bottom: 2px solid ${props => props.theme["gray-500"]};
font-weight: bold;
font-size: inherit;
padding: 0 0.5rem;
color: ${props => props.theme["gray-100"]};
&::-webkit-calendar-picker-indicator{
        display: none !important;
    }
&:focus{
    box-shadow: none;
    border-color: ${props=>props.theme["green-500"]};
}

&::placeholder{
    color: ${props=>props.theme["gray-500"]}
}
`

export const TextInput = styled(BaseInput)`
    border-radius: 6px;
    flex: 1;
    background-color: ${props=> props.theme["gray-500"]};

`
const BaseButton = styled.button`
width: 100%;
height: 50px;
padding: 0 1.25rem;
border: 0;
color: ${props=>props.theme.white};
border-radius: 6px;
cursor: pointer;
&:disabled{
    opacity: 50%;
    cursor:not-allowed;
}
&:hover{
   transition: background-color 0.2s;
}
`

export const SearchButton = styled(BaseButton)`
background: ${props=>props.theme["green-500"]};
font-weight: bold;
&:hover{
    background-color: ${props=>props.theme["green-700"]};
}
`
export const OthersButton = styled(BaseButton)`
background: ${props=>props.theme["yellow-500"]};
font-weight: bold;
&:hover{
    background-color: ${props=>props.theme["yellow-700"]};
}
`
