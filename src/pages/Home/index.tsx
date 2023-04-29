import { Header } from "../../components/Header"
import { SearchGrid } from "../../components/SearchGrid"
import { GridContainer,MainLayout } from "./styles"

export const Home = ()=>{
    return(
    <MainLayout>
    <Header/>
    <GridContainer>
    <SearchGrid/>
    </GridContainer>
    </MainLayout>)

}