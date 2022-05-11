import React from "react";
import { tags } from "../assets";
import { getPaletteCollection } from "../lib/query";
import { sanity } from "../lib/sanity";

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
    const [loadingCollection, setLoadingCollection] = React.useState(false);
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
    const updatePalettes = (newPalettes) => {
        setPalettes(newPalettes);
    }
    const updateLoadingPalettes = (bool) => {
        setLoadingPalettes(bool);
    }
    const setterLike = (param) => {
        setLike(param.map(pal=>pal.like));
    }
    const setterTitleRight = (text) => {
        setTitleRight(text);
    }
    const setterDescriptionRight = (text) => {
        setDescriptionRight(text);
    }
    const checkQueryEmpty = () => {
        if (query.length>0) {
            setQuery([]);
        }
    }
    const setterCollection = (likePal, arrayLike) => {
        if (collection.length===0) {
            if (likePal.length>0) {
                setLoadingCollection(true);
                sanity.fetch(getPaletteCollection(likePal))
                .then(data=>{
                    const dataCol = [];
                    arrayLike.forEach(_id => {
                        dataCol.push(...data.filter(col=>col._id===_id))
                    });
                    setCollection(dataCol);
                    setLoadingCollection(false);
                })
            }
        }
    }
    const setterIsLike = (dataL) => {
        if (like.length>0) {
            setIsLike(dataL);
        }
    }
    const setterQuery = (dataTag) => {
        setQuery(dataTag.map(tag=>({ text: tag.title, color: tag.color })));
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
                handleCopyHexAndRgb,
                updatePalettes,
                updateLoadingPalettes,
                setterLike,
                setterTitleRight,
                setterDescriptionRight,
                checkQueryEmpty,
                setterCollection,
                setterIsLike,
                loadingCollection,
                setterQuery,
            }}
        >
            {children}
        </Context.Provider>
    )
}  

export const useStateContext = () => React.useContext(Context);

