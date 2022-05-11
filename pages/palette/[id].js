import React from "react";
import { Container, Header, LikeBtn, Palette, Right, Sidebar } from "../../components";
import { Layout, ConvertHex } from "../../components/function"
import { useStateContext } from "../../context/StateContext";
import { getPaletteById } from "../../lib/query";
import { sanity } from "../../lib/sanity";
import moment from "moment";
import Link from 'next/link';

export default function PaletteView({ palette }){
    const { collection, setCollection, copy, handleCopy, isLike, setIsLike, setPalettes, setLike, like, setQuery, query, copyHexAndRgb, handleCopyHexAndRgb } = useStateContext();
    const handleLike = async () => {
        if (isLike.includes(palette._id)) {
            if (like[palette.related.length]>0) {
                setIsLike(isLike.filter(data=>data!==palette._id));
                like[palette.related.length] = like[palette.related.length]-1;
                setLike(like);
                localStorage.setItem('myCollection', isLike.length>1 ?  JSON.stringify(isLike.filter(data=>data!==palette._id).join(',')) : JSON.stringify(isLike.filter(data=>data!==palette._id).join(' ')));
                setCollection(collection.filter(col=>col._id!==palette._id));
                const res = await fetch('/api/like',{
                    method: 'post',
                    body: JSON.stringify({ _id: palette._id, like: false })
                }).catch(error=>console.log(error))
            }
        }else{
            setIsLike([...isLike,palette._id]);
            like[palette.related.length] = like[palette.related.length]+1;
            setLike(like);
            localStorage.setItem('myCollection', JSON.stringify([palette._id,...isLike].length>1 ? [palette._id,...isLike].join(',') : [palette._id,...isLike].join('')));
            const logo = document.getElementById('logo');
            logo.classList.add('animate-bounce');
            setCollection([{ _id: palette._id, color: palette.color },...collection]);
            setTimeout(()=>{
                logo.classList.remove('animate-bounce');
            },500)
            const res = await fetch('/api/like',{
                method: 'post',
                body: JSON.stringify({ _id: palette._id, like: true })
            }).catch(error=>console.log(error))
        }
    }
    function config(){
        if (palette) {
            const palettes = [...palette?.related,palette];
            setPalettes([...palettes]);
            setLike(palettes?.map(pal=>pal.like));
        }else{
            
        }
        if (query.length>0) {
            setQuery([]);
        }
    }
    React.useEffect((config=config)=>{
        config();
    },[palette])
    return (
        <Layout title={`Color Palette: ${palette?.color.map(col=>`#${col}`).join(' ')} - Color Shop`}>
            <Container>
                <Header/>
                <Sidebar/>
                {palette && (
                <div className="w-content gap-4 sm:gap-5 xl:gap-7 pr-3 pl-3 sm:pl-0 lg:pl-5 sm:pr-5 sm:ml-[200px]">
                    <div className="max-w-[56vh] sm:pt-7 mx-auto">
                        <div className="flex flex-col aspect-[1/1] rounded-xl overflow-hidden">
                            <div style={{backgroundColor: `#${palette?.color[0].toUpperCase()}`}} className="w-full h-[41%] relative group">
                                <div onClick={()=>handleCopy(palette?.color[0].toUpperCase())} className="transition text-white w-max absolute bottom-0 left-0 rounded-tr-md text-sm opacity-0 group-hover:opacity-100 overflow-hidden cursor-pointer bg-black/10 hover:bg-black/20 py-1 px-2">
                                #{palette?.color[0].toUpperCase()}
                                {copy===palette?.color[0].toUpperCase() && (
                                    <span className="absolute left-0 top-0 w-full flex justify-center items-center bg-black h-full">Copied</span>
                                )}
                                </div>
                            </div>
                            <div style={{backgroundColor: `#${palette?.color[1].toUpperCase()}`}} className="w-full h-[26%] relative group">
                                <div onClick={()=>handleCopy(palette?.color[1].toUpperCase())} className="transition text-white w-max absolute bottom-0 left-0 rounded-tr-md text-sm overflow-hidden opacity-0 group-hover:opacity-100 cursor-pointer bg-black/10 hover:bg-black/20 py-1 px-2">
                                #{palette?.color[1].toUpperCase()}
                                {copy===palette?.color[1].toUpperCase() && (
                                    <span className="absolute left-0 top-0 w-full flex justify-center items-center bg-black h-full">Copied</span>
                                )}
                                </div>
                            </div>
                            <div style={{backgroundColor: `#${palette?.color[2].toUpperCase()}`}} className="w-full h-[18%] relative group">
                                <div onClick={()=>handleCopy(palette?.color[2].toUpperCase())} className={`transition text-white w-max absolute bottom-0 left-0 rounded-tr-md text-sm opacity-0 group-hover:opacity-100 overflow-hidden cursor-pointer bg-black/10 hover:bg-black/20 py-1 px-2`}>
                                #{palette?.color[2].toUpperCase()}
                                {copy===palette?.color[2].toUpperCase() && (
                                    <span className="absolute left-0 top-0 w-full flex justify-center items-center bg-black h-full">Copied</span>
                                )}
                                </div>
                            </div>
                            <div style={{backgroundColor: `#${palette?.color[3].toUpperCase()}`}} className="w-full h-[12%] flex-1 relative group">
                                <div onClick={()=>handleCopy(palette?.color[3].toUpperCase())} className={`transition text-white w-max absolute bottom-0 left-0 rounded-tr-md text-sm opacity-0 group-hover:opacity-100 cursor-pointer bg-black/10 hover:bg-black/20 py-1 px-2 overflow-hidden`}>
                                #{palette?.color[3].toUpperCase()}
                                {copy===palette?.color[3].toUpperCase() && (
                                    <span className="absolute left-0 top-0 w-full flex justify-center items-center bg-black h-full">Copied</span>
                                )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex gap-2">
                                <LikeBtn handleLike={handleLike} palette={palette} isLike={isLike} dataLike={like[palette.related.length]}/>
                                <div onClick={()=>handleCopy(window.location.href)} className="flex hover:bg-gray-50 cursor-pointer transition items-center overflow-hidden gap-2 border px-3 py-1 rounded-lg relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    <span className="text-sm">Link</span>
                                    {process.browser && (
                                        copy===window?.location.href&&(
                                        <span className="absolute bg-black flex justify-center items-center text-xs top-0 left-0 h-full w-full text-white">Copied</span>
                                        )
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">{moment(palette._createdAt).fromNow()}</p>
                        </div>
                    </div>
                    <div className="mt-16 divide-y ">
                        <div className="grid max-w-[520px] mx-auto grid-cols-4 justify-items-center pb-3">
                            {palette.color.map((color,i)=>(
                                <div key={i} style={{backgroundColor: `#${color}`}} className="w-7 h-7 rounded-full"></div>
                            ))}
                        </div>
                        <div className="grid max-w-[520px] mx-auto grid-cols-4 justify-items-center py-3.5">
                            {palette.color.map((color,i)=>(
                                <div onClick={()=>handleCopyHexAndRgb(color.toUpperCase())} key={i} className="text-sm cursor-pointer hover:bg-gray-100 overflow-hidden relative transition px-3 py-1 rounded-lg">
                                    #{color.toUpperCase()}
                                    {copyHexAndRgb===color.toUpperCase() && (
                                    <span className="absolute flex items-center justify-center left-0 z-10 text-xs h-full top-0 bg-black w-full text-white">Copied</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mx-auto pt-3 mb-10">
                            <div className="mb-4 hidden sm:grid mx-auto max-w-[520px] grid-cols-4 justify-items-center">
                                {ConvertHex(palette.color)?.map((rgb,i)=>(
                                    <div key={i} onClick={()=>handleCopyHexAndRgb(`rgb(${rgb.join(',')})`)} className="text-xs cursor-pointer hover:bg-gray-100 overflow-hidden relative transition px-3 py-1.5 rounded-lg">
                                        rgb({rgb.join(',')})
                                        {copyHexAndRgb===`rgb(${rgb.join(',')})` && (
                                        <span className="absolute flex items-center justify-center left-0 z-10 h-full top-0 bg-black w-full text-white">Copied</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap justify-center mt-11 gap-2">
                                {palette.tag?.map((tag,i)=>(
                                    <Link key={i} href={`/palettes/${tag?.slug}`}>
                                        {tag?.color ? (
                                            <a className="flex hover:bg-gray-50 transition items-center rounded-full px-2.5 py-1 gap-1.5 border">
                                                <div style={{backgroundColor: tag?.color}} className="w-3.5 h-3.5 rounded-full"></div>
                                                <span className="text-xs">{tag?.title}</span>
                                            </a>
                                        ) : (
                                            <a className="text-xs hover:bg-gray-50 transition border rounded-full px-2.5 py-1">{tag?.title}</a>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        {palette.related.length>0 && (
                            <div className="pt-10">
                                <h1 className="text-center font-medium text-lg mb-10">Related palettes</h1>
                                <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:gap-7 xl:grid-cols-3">
                                    {palette.related.map((palette,i)=>(
                                        <Palette key={palette._id} index={i} palette={palette}/>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                )}
                <Right/>
            </Container>
        </Layout>
    )
}

export async function getServerSideProps(params){
    const { id } = params.query;
    const palette = await sanity.fetch(getPaletteById(id));
    return { props: { palette } }
}