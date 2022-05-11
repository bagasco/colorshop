import React from "react";
import { Container, EmptyCollection, Header, PaletteBox, Sidebar } from "../components";
import { Layout } from "../components/function";
import { useStateContext } from "../context/StateContext";
import { getPaletteCollection } from "../lib/query";
import { sanity } from "../lib/sanity";

export default function Collection(){
    const { collection, setCollection, isLike, setIsLike, query, setQuery } = useStateContext();
    const [loading, setLoading] = React.useState(false);
    const handleLike = async (palette) => {
        setIsLike(isLike.filter(data=>data!==palette._id));
        localStorage.setItem('myCollection', isLike.length>1 ?  JSON.stringify(isLike.filter(data=>data!==palette._id).join(',')) : JSON.stringify(isLike.filter(data=>data!==palette._id).join(' ')));
        setCollection(collection.filter(col=>col._id!==palette._id));
        const res = await fetch('/api/like',{
            method: 'post',
            body: JSON.stringify({ _id: palette._id, like: false })
        }).catch(error=>console.log(error))
    }
    function config(){
        const data = localStorage.getItem('myCollection')!=='""' && localStorage.getItem('myCollection')!== null ? JSON.stringify(localStorage.getItem('myCollection').replaceAll('"','').split(',')) : [];
        const like = localStorage.getItem('myCollection') ? JSON.parse(localStorage.getItem('myCollection')).split(',') : [];
        if (like.length>0) {
            setIsLike(like);
        }
        if (collection.length===0) {
            if (data.length>0) {
                setLoading(true);
                sanity.fetch(getPaletteCollection(data))
                .then(data=>{
                    setLoading(false);
                    const dataCol = [];
                    like.forEach(_id => {
                        dataCol.push(...data.filter(col=>col._id===_id))
                    });
                    setCollection(dataCol);
                })
            }
        }
        if (query.length>0) {
            setQuery([]);
        }
    }
    React.useEffect((config=config)=>{
        config();
    },[]);
    return (
        <Layout title="My collection of color palettes on Color Shop">
            <Header/>
            <Container>
                <Sidebar/>
                {!loading&&(
                <div className="sm:ml-[200px] pr-3 pl-3 sm:pl-0 lg:pl-8 sm:pr-8 mt-[70px] sm:mt-[90px] divide-y divide-gray-100">
                    <div className="flex justify-between items-center pb-3">
                        <h1 className="font-medium text-lg">My collection</h1>
                        <p className="text-xs text-gray-500">{collection.length} palette</p>
                    </div>
                    {collection.length>0 ? (
                    <>
                    <div className="gap-4 pt-4 sm:gap-5 xl:gap-7 grid grid-cols-2 xl:grid-cols-3">
                        {collection.map(palette=>(
                            <div key={palette._id}>
                                <PaletteBox palette={palette}/>
                                <div className="flex justify-between mt-4 items-center">
                                    <div onClick={()=>handleLike(palette)} className={`flex items-center border rounded-lg cursor-pointer transition gap-1.5 px-3 py-1 ${isLike.includes(palette._id) ? 'bg-gray-100 hover:bg-gray-200' : 'hover:bg-gray-50'}`}>
                                        {isLike.includes(palette._id) ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                        ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        )}
                                        <span className="text-sm">Like</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </>
                    ) : (
                    <EmptyCollection/>
                    )}
                </div>
                )}
            </Container>
        </Layout>
    )
}
