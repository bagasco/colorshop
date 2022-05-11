import { Layout } from "../components/function";
import { Container, Content, Header, Right, Sidebar } from "../components";
import React from "react";
import { sanity } from "../lib/sanity";
import { getPalettes } from "../lib/query";
import { useStateContext } from "../context/StateContext";

export default function Home({ palettes }) {
  const { setPalettes, setLike, setLoadingPalettes, query, setQuery, setTitleRight, setDescriptionRight } = useStateContext();
  React.useEffect(()=>{
    setPalettes(palettes);
    setLoadingPalettes(false);
    setLike(palettes.map(pal=>pal.like));
    setTitleRight('Color Palettes for Designers and Artists');
    setDescriptionRight('Discover the newest hand-picked palettes of Color Shop');
    if (query.length>0) {
      setQuery([]);
    }
  },[])
  return (
    <Layout title="Color Palettes for Designers and Artists - Color Shop">
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
  const palettes = await sanity.fetch(getPalettes);
  return { props: { palettes } }
}