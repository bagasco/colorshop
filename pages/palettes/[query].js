import { Layout } from "../../components/function";
import { Container, Content, Header, Right, Sidebar } from "../../components";
import React from "react";
import { sanity } from "../../lib/sanity";
import { getPaletteQuery } from "../../lib/query";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from 'next/router';
import { tags } from "../../assets";

export default function Home({ palettes }) {
  const { setPalettes, setLike, setLoadingPalettes, tags, setQuery, setTitleRight, setDescriptionRight } = useStateContext();
  const router = useRouter();
  const [title, setTitle] = React.useState('');
  React.useEffect(()=>{
    setPalettes(palettes);
    setLike(palettes.map(pal=>pal.like));
    setLoadingPalettes(false);
    const dataTag = [];
    router.query.query.split('-').forEach(q => {
      dataTag.push(...tags.filter(tag=>tag.slug===q));
    });
    setQuery(dataTag.map(tag=>({ text: tag.title, color: tag.color })));
    const judul = [];
    dataTag.map(q=>q.title).forEach(el=>{
      if (el===dataTag[dataTag.length-1].title && dataTag.length>1) {

          judul.push(`and ${el}`);
      }else{
        judul.push(el);
      }
    })
    setTitle(judul.length > 2 ? judul.join(', ') : judul.join(' '));
    setTitleRight(`${judul.length > 2 ? judul.join(', ') : judul.join(' ')} Color Palettes`);
    setDescriptionRight("Find a great color palette from Color Shop's curated collections");
  },[palettes])
  return (
    <Layout title={`${title} Color Palettes - Color Shop`}>
      <Container>
        <Header/>
        <Sidebar/>
        <Content/>
        <Right/>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
    const query = params.query;
    const tagQuery = query.split('-');
    let tagSet = new Set();
    tagQuery.forEach(text=>{
      tagSet.add(...tags.filter(tag=>tag.slug===text))
    })
    tagSet = [...tagSet];
    tagSet = tagSet.filter(Boolean);
    tagSet = tagSet.map(tag=>tag.slug);
    const queryArray = JSON.stringify(tagSet);
    const palettes = await sanity.fetch(getPaletteQuery(queryArray));
    return { props: { palettes } }
}
