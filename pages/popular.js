import { Layout } from "../components/function";
import { Container, Content, Header, Right, Sidebar } from "../components";
import React from "react";
import { sanity } from "../lib/sanity";
import { getPalettePopular } from "../lib/query";
import { useStateContext } from "../context/StateContext";

export default function Home({ palettes }) {
  const { setPalettes, setLike, setLoadingPalettes, query, setQuery, setTitleRight, setDescriptionRight } = useStateContext();
  function config(){
    setPalettes(palettes);
    setLoadingPalettes(false);
    setLike(palettes.map(pal=>pal.like));
    setTitleRight('Most Popular Palettes of Color Shop');
    setDescriptionRight("The community's favorite color palettes");
    if (query.length>0) {
      setQuery([]);
    }
  }
  React.useEffect((config=config)=>{
    config();
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
