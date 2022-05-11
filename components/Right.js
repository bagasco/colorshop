import Link from "next/link";
import { useStateContext } from "../context/StateContext";
import React from 'react';
import { sanity } from "../lib/sanity";
import { getPaletteCollection } from "../lib/query";
import { useRouter } from "next/router";

export default function Right(){
    const { pathname } = useRouter();
    const { setCollection, collection, isLike, setIsLike, palettes, like, setLike, titleRight, descriptionRight } = useStateContext();
    const handleRemove = async (id) => {
        setCollection(collection.filter(col=>col._id!==id));
        setIsLike(isLike.filter(like=>like!==id));
        localStorage.setItem('myCollection', isLike.length>1 ?  JSON.stringify(isLike.filter(data=>data!==id).join(',')) : JSON.stringify(isLike.filter(data=>data!==id).join(' ')));
        const index = palettes.findIndex(pal=>pal._id==id);
        like[index] = like[index]-1;
        setLike(like);
        const res = await fetch('/api/like',{
            method: 'post',
            body: JSON.stringify({ _id: id, like: false })
        }).catch(error=>console.log(error))
    }
    function config(){
        if (process.browser) {
            const likePal = localStorage.getItem('myCollection')!=='""' && localStorage.getItem('myCollection')!== null ? JSON.stringify(localStorage.getItem('myCollection').replaceAll('"','').split(',')) : [];
            const dataLike = localStorage.getItem('myCollection') ? JSON.parse(localStorage.getItem('myCollection')).split(',') : [];
            if (like.length>0) {
                setIsLike(dataLike);
            }
            if (collection.length===0) {
                if (likePal.length>0) {
                    sanity.fetch(getPaletteCollection(likePal))
                    .then(data=>{
                        const dataCol = [];
                        dataLike.forEach(_id => {
                            dataCol.push(...data.filter(col=>col._id===_id))
                        });
                        setCollection(dataCol);
                    })
                }
            }
        }
    }
    React.useEffect((config=config)=>{
        config();
    },[palettes])
    return (
        <div className="fixed bg-white divide-y hidden lg:block w-[260px] top-[70px] px-4 right-0">
            {pathname!=='/palette/[id]' && (
            <div className="pb-5">
                <h1 className="font-medium text-lg mb-2">{titleRight}</h1>
                <p className="text-xs">{descriptionRight}</p>
            </div>
            )}
            {collection.length>0 && (
            <div className={`${pathname!=='/palette/[id]' && 'pt-5'}`}>
                <h1 className="text-lg mb-3 font-medium">Collection</h1>
                <div className="flex gap-2 flex-wrap">
                    {collection.slice(0,16).map(col=>(
                    <div key={col._id} className="relative group">
                        <Link href={`/palette/${col._id}`}>
                            <a className="w-[49px] block h-[49px] rounded-md overflow-hidden">
                                <div style={{backgroundColor: "#"+col.color[0]}} className="w-full h-[41%]"></div>
                                <div style={{backgroundColor: "#"+col.color[1]}} className="w-full h-[26%]"></div>
                                <div style={{backgroundColor: "#"+col.color[2]}} className="w-full h-[19%]"></div>
                                <div style={{backgroundColor: "#"+col.color[3]}} className="w-full h-[11%]"></div>
                            </a>
                        </Link>
                        <svg onClick={()=>handleRemove(col._id)} xmlns="http://www.w3.org/2000/svg" className="hidden group-hover:block h-3.5 w-3.5 p-0.5 bg-black rounded-full text-gray-300 cursor-pointer hover:text-white transition absolute top-0.5 right-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    ))}
                </div>
            </div>
            )}
        </div>
    )
}