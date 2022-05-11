import React from "react";
import { tags } from "../assets";

const Context = React.createContext();

export function StateContext({ children }){
    const [collection, setCollection] = React.useState([]);
    const [copy, setCopy] = React.useState(null);
    const [isLike, setIsLike] = React.useState([]);
    const [dataLike, setDataLike] = React.useState([]);
    const [palettes, setPalettes] = React.useState([]);
    const [like, setLike] = React.useState([]);
    const [tagColor, setTagColor] = React.useState(tags?.filter(tag=>tag.color));
    const [tagCollection, setTagCollection] = React.useState(tags?.filter(tag=>!tag.color));
    const [loadingPalettes, setLoadingPalettes] = React.useState(true);
    const [query, setQuery] = React.useState([]);
    const [titleRight, setTitleRight] = React.useState('');
    const [descriptionRight, setDescriptionRight] = React.useState('');
    const [copyHexAndRgb, setCopyHexAndRgb] = React.useState(null);
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopy(text);
        setTimeout(()=>{
            setCopy(null);
        },1000)
    }
    const handleCopyHexAndRgb = (text) => {
        navigator.clipboard.writeText(text);
        setCopyHexAndRgb(text);
        setTimeout(()=>{
            setCopyHexAndRgb(null);
        },1000)
    }
    return (
        <Context.Provider
            value={{
                collection,
                setCollection,
                copy,
                handleCopy,
                isLike,
                setIsLike,
                dataLike,
                setDataLike,
                palettes,
                setPalettes,
                like,
                setLike,
                tagColor,
                tagCollection,
                setTagColor,
                setTagCollection,
                loadingPalettes,
                setLoadingPalettes,
                query,
                setQuery,
                tags,
                titleRight,
                setTitleRight,
                descriptionRight,
                setDescriptionRight,
                copyHexAndRgb,
                handleCopyHexAndRgb
            }}
        >
            {children}
        </Context.Provider>
    )
}  

export const useStateContext = () => React.useContext(Context);

