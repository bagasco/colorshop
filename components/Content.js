import React from "react";
import { useStateContext } from "../context/StateContext";
import EmptyPalette from "./EmptyPalette";
import Palette from "./Palette";

export default function Content(){
    const { palettes, loadingPalettes } = useStateContext();
    return (
        <div className={`sm:ml-[200px] pr-3 pl-3 sm:pl-0 lg:pl-5 sm:pr-5 w-content ${palettes.length>0 && 'gap-4 sm:gap-5 xl:gap-7 grid grid-cols-2 xl:grid-cols-3'}`}>
            {!loadingPalettes && (
                palettes.length!==0 && !loadingPalettes ? (
                    palettes?.map((palette,i)=>(
                        <Palette key={palette._id} index={i} palette={palette}/>
                    ))
                ) : (
                    <EmptyPalette/>
                )
            )}
        </div>
    )
}