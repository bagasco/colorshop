import Link from "next/link";
import moment from 'moment';
import React from "react";
import PaletteBox from "./PaletteBox";
import LikeBtn from "./LikeBtn";
import { useStateContext } from "../context/StateContext";

export default function Palette({ palette, index }){
    const { isLike, setIsLike, setCollection, collection, like, setLike } = useStateContext();
    const handleLike = async () => {
        if (isLike.includes(palette._id)) {
            if (like[index]>0) {
                setIsLike(isLike.filter(data=>data!==palette._id));
                like[index] = like[index]-1;
                setLike(like);
                localStorage.setItem('myCollection', isLike.length>1 ?  JSON.stringify(isLike.filter(data=>data!==palette._id).join(',')) : JSON.stringify(isLike.filter(data=>data!==palette._id).join(' ')));
                setCollection(collection.filter(col=>col._id!==palette._id));
                const res = await fetch('/api/like',{
                    method: 'post',
                    body: JSON.stringify({ _id: palette._id, like: false })
                }).catch(error=>console.log(error))
            }
        }else{
            setIsLike([palette._id,...isLike]);
            like[index] = like[index]+1;
            setLike(like);
            localStorage.setItem('myCollection', JSON.stringify([palette._id,...isLike].length>1 ? [palette._id,...isLike].join(',') : [palette._id,...isLike].join('')));
            const logo = document.getElementById('logo');
            const div = logo.querySelectorAll('div');
            div.forEach(d=>d.classList.add('animate-bounce'));
            setCollection([{ _id: palette._id, color: palette.color },...collection]);
            setTimeout(()=>{
                div.forEach(d=>d.classList.remove('animate-bounce'));
            },500)
            const res = await fetch('/api/like',{
                method: 'post',
                body: JSON.stringify({ _id: palette._id, like: true })
            }).catch(error=>console.log(error))
        }
    }
    return (
        <section>
            <PaletteBox palette={palette}/>
            <div className="flex justify-between mt-4 items-center">
                <LikeBtn handleLike={handleLike} isLike={isLike} palette={palette} dataLike={like[index]}/>
                <p className="text-xs text-gray-500">{moment(palette._createdAt).fromNow()}</p>
            </div>
        </section>
    )
}