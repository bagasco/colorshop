import { Layout } from "../components/function";
import { Container, Content, Header, Right, Sidebar } from "../components";
import { useEffect } from "react";
import { sanity } from "../lib/sanity";
import { getPalettePopular } from "../lib/query";
import { useStateContext } from "../context/StateContext";

export default function Home({ palettes }) {
  const { updatePalettes, updateLoadingPalettes, setterLike, setterTitleRight, setterDescriptionRight, checkQueryEmpty } = useStateContext();
  useEffect(()=>{
    updatePalettes(palettes);
    setterLike(palettes);
    updateLoadingPalettes(false);
    setterTitleRight('Color Palettes for Designers and Artists');
    setterDescriptionRight('Discover the newest hand-picked palettes of Color Shop');
    checkQueryEmpty();
  },[])
  return (
    <Layout title="The Most Popular Color Palettes of 2022 - Color Shop">
      <Container>
        <Header/>
        <Sidebar/>
        <Content/>
        <Right/>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps() {
  const palettes = await sanity.fetch(getPalettePopular);
  return { props: { palettes } }
}
