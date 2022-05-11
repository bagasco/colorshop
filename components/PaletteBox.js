import Link from "next/link";
import React from "react";
import { useStateContext } from "../context/StateContext";

export default function PaletteBox({ palette }){
    const { copy, handleCopy } = useStateContext();
    return (
        <div className="flex flex-col aspect-[1/1] rounded-xl overflow-hidden">
            <div style={{backgroundColor: `#${palette.color[0].toUpperCase()}`}} className="w-full animate-pal-c1 h-[41%] relative group">
                <Link href={`/palette/${palette._id}`}>
                    <a className="w-full absolute h-full"></a>
                </Link>
                <div onClick={()=>handleCopy(palette.color[0].toUpperCase())} className="transition text-white w-max absolute bottom-0 left-0 rounded-tr-md text-sm opacity-0 group-hover:opacity-100 overflow-hidden cursor-pointer bg-black/10 hover:bg-black/20 py-1 px-2">
                 #{palette.color[0].toUpperCase()}
                 {copy===palette.color[0].toUpperCase() && (
                     <span className="absolute left-0 top-0 w-full text-xs flex justify-center items-center bg-black h-full">Copied</span>
                 )}
                </div>
            </div>
            <div style={{backgroundColor: `#${palette.color[1].toUpperCase()}`}} className="w-full animate-pal-c2 h-[26%] relative group">
                <Link href={`/palette/${palette._id}`}>
                    <a className="w-full absolute h-full"></a>
                </Link>
                <div onClick={()=>handleCopy(palette.color[1].toUpperCase())} className="transition text-white w-max absolute bottom-0 left-0 rounded-tr-md text-sm overflow-hidden opacity-0 group-hover:opacity-100 cursor-pointer bg-black/10 hover:bg-black/20 py-1 px-2">
                #{palette.color[1].toUpperCase()}
                {copy===palette.color[1].toUpperCase() && (
                     <span className="absolute text-xs left-0 top-0 w-full flex justify-center items-center bg-black h-full">Copied</span>
                 )}
                </div>
            </div>
            <div style={{backgroundColor: `#${palette.color[2].toUpperCase()}`}} className="w-full animate-pal-c3 h-[18%] relative group">
                <Link href={`/palette/${palette._id}`}>
                    <a className="w-full absolute h-full"></a>
                </Link>
                <div onClick={()=>handleCopy(palette.color[2].toUpperCase())} className={`transition text-white w-max absolute bottom-0 left-0 rounded-tr-md text-sm opacity-0 group-hover:opacity-100 overflow-hidden cursor-pointer bg-black/10 hover:bg-black/20 py-1 px-2`}>
                #{palette.color[2].toUpperCase()}
                {copy===palette.color[2].toUpperCase() && (
                     <span className="absolute left-0 top-0 w-full flex justify-center items-center bg-black text-xs h-full">Copied</span>
                 )}
                </div>
            </div>
            <div style={{backgroundColor: `#${palette.color[3].toUpperCase()}`}} className="w-full animate-pal-c4 h-[12%] flex-1 relative group">
                <Link href={`/palette/${palette._id}`}>
                    <a className="w-full absolute h-full"></a>
                </Link>
                <div onClick={()=>handleCopy(palette.color[3].toUpperCase())} className={`transition text-white w-max absolute bottom-0 left-0 rounded-tr-md text-sm opacity-0 group-hover:opacity-100 cursor-pointer bg-black/10 hover:bg-black/20 py-1 px-2 overflow-hidden`}>
                #{palette.color[3].toUpperCase()}
                {copy===palette.color[3].toUpperCase() && (
                     <span className="absolute left-0 top-0 w-full flex justify-center items-center text-xs bg-black h-full">Copied</span>
                 )}
                </div>
            </div>
        </div>
    )
}