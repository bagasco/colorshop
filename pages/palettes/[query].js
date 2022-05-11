import { Layout } from "../../components/function";
import { Container, Content, Header, Right, Sidebar } from "../../components";
import { useEffect, useState } from "react";
import { sanity } from "../../lib/sanity";
import { getPaletteQuery } from "../../lib/query";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from 'next/router';
import { tags } from "../../assets";

export default function Home({ palettes }) {
  const { tags, updatePalettes, setterLike, updateLoadingPalettes, setterQuery, setterTitleRight, setterDescriptionRight } = useStateContext();
  const router = useRouter();
  const [title, setTitle] = useState('');
  function config(){
    updatePalettes(palettes);
    setterLike(palettes);
    updateLoadingPalettes(false);
    const dataTag = [];
    router.query.query.split('-').forEach(q => {
      dataTag.push(...tags?.filter(tag=>tag.slug===q));
    });
    setterQuery(dataTag);
    const judul = [];
    dataTag.map(q=>q.title).forEach(el=>{
      if (el===dataTag[dataTag.length-1].title && dataTag.length>1) {
  
          judul.push(`and ${el}`);
      }else{
        judul.push(el);
      }
    })
    setTitle(judul.length > 2 ? judul.join(', ') : judul.join(' '));
    setterTitleRight(`${judul.length > 2 ? judul.join(', ') : judul.join(' ')} Color Palettes`);
    setterDescriptionRight("Find a great color palette from Color Shop's curated collections");
  }
  useEffect(()=>{
    config();
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
