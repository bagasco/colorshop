import { Layout } from "../../components/function";
import { Container, Content, Header, Right, Sidebar } from "../../components";
import { useEffect, useState } from "react";
import { sanity } from "../../lib/sanity";
import { getPaletteQuery } from "../../lib/query";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from 'next/router';
import { tags } from "../../assets";
import InfiniteScroll  from "react-infinite-scroller";

export default function Home({ palettes, queryArray }) {
  const { tags, updatePalettes, setterLike, updateLoadingPalettes, setterQuery, setterTitleRight, setterDescriptionRight, setPalettes } = useStateContext();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [count, setCount] = useState(20);
  const [more, setMore] = useState(false);
  const fetchData = () => {
    setMore(false);
    sanity.fetch(getPaletteQuery(queryArray,count,count+20))
    .then(data=>{
        if (data.length>0) {
            setPalettes(old=>[...old,...data])
            setCount(count+20);
            setMore(true);
        }else{
            setMore(false);
        }
    });
  }
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
    setMore(true);
  },[palettes])
  return (
    <Layout title={`${title} Color Palettes - Color Shop`}>
      <Container>
        <Header/>
        <Sidebar/>
        <InfiniteScroll
            pageStart={0}
            loadMore={fetchData}
            hasMore={more}
        >
          <Content/>
        </InfiniteScroll>
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
    const palettes = await sanity.fetch(getPaletteQuery(queryArray,0,20));
    return { props: { palettes, queryArray } }
}
