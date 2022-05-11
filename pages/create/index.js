import { Container } from "../../components";
import { Layout } from "../../components/function";
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useStateContext } from "../../context/StateContext";
import { ChromePicker } from 'react-color';
import { sanity } from '../../lib/sanity';

export default function CreatePalette(){
    const [menuActive, setMenuActive] = React.useState(false);
    const { tagColor, tagCollection, setTagColor, setTagCollection, tags } = useStateContext();
    const [showTags, setShowTags] = React.useState(false);
    const [tagsPal, setTagsPal] = React.useState([]);
    const [colorPalette, setColorPalette] = React.useState({ c1: '#BBBBBB', c2: '#CCCCCC', c3: '#DDDDDD', c4: '#EEEEEE' });
    const [colorPicker, setColorPicker] = React.useState('#ddd');
    const [showPicker, setShowPicker] = React.useState(false);
    const [activeBg, setActiveBg] = React.useState(null);
    const [showSubmit, setShowSubmit] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [searchVal, setSearchVal] = React.useState('');
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
    const router = useRouter();
    const menuClick = () => {
        setMenuActive(!menuActive);
    }
    const eventClick = (e) => {
        if (e.target.id!=='menu') {
            if (menuActive) {
                setMenuActive(false);
            }
            if (!e.target.closest('#search')){
                if (showTags) {
                    setShowTags(false);
                }
            }
        }
        if (!e.target.closest('#palette')) {
            if (showPicker) {
                setShowPicker(false);
            }
        }
    }
    if (process.browser) {
        document.addEventListener('click',eventClick);
    }
    const showInput = (bg) => {
        setShowPicker(true);
        setActiveBg(bg);
        setColorPicker(colorPalette[bg]);
    }
    const addTags = (text,color,_id) => {
        if (!tagsPal.map(t=>t.text).includes(text)) {
            setTagsPal([...tagsPal,{text, color, _id}]);
        }else{
            setTagsPal(tagsPal.filter(t=>t.text!==text));
        }
    }
    const delTags = (i) => {
        delete tagsPal[i];
        setTagsPal([...tagsPal.filter(Boolean)]);
    }
    const onChangeComplete = () => {
        if (!showSubmit) {
            setShowSubmit(true);
        }
    }
    const onChange = (color) => {
        const { hex } = color;
        setColorPicker(hex);
        colorPalette[activeBg] = hex;
        setColorPalette({...colorPalette});
    }
    const onSubmit = () => {
        const tagId = tagsPal.map(t=>t._id);
        const tagList = [];
        tagId.forEach(_id=>{
            tagList.push({ 
                _key: generateString(40),
                _ref: _id,
                _type: 'reference',
             })
        });
        const doc = {
            _type: 'palette',
            color: [colorPalette.c1.replace('#','').toUpperCase(),colorPalette.c2.replace('#','').toUpperCase(),colorPalette.c3.replace('#','').toUpperCase(),colorPalette.c4.replace('#','').toUpperCase()],
            like: 0,
            tag: tagList,
        }
        if (!loading) {
            setLoading(true);
            sanity.create(doc)
            .then(palette=>{
                router.push(`/palette/${palette._id}`);
            })
        }
    }
    const handleSort = (e) => {
        if (e.target.value) {
            const searchColor = tagColor.map(tag=>tag.slug).filter(text=>text.includes(e.target.value))
            setTagColor(tagColor.filter(tag=>searchColor.includes(tag.slug)));
            const searchCol = tagCollection.map(tag=>tag.slug).filter(text=>text.includes(e.target.value))
            setTagCollection(tagCollection.filter(tag=>searchCol.includes(tag.slug)));
            
        }else {
            setTagColor(tags.filter(tag=>tag.color));
            setTagCollection(tags.filter(tag=>!tag.color));
        }
        setSearchVal(e.target.value);
    }
    React.useEffect(()=>{
        if (searchVal==='') {
            setTagColor(tags.filter(tag=>tag.color));
            setTagCollection(tags.filter(tag=>!tag.color));
        }
    },[searchVal])
    return (
        <Layout title="Create a new color palette for Color Shop's collection">
            <Container>
                <div className="px-4">
                    <div className="border-b fixed z-20 bg-white w-full top-0 left-0 border-gray-100 px-3 sm:px-6 justify-between items-center flex py-1.5 sm:py-2">
                        <Link href='/'>
                            <a>
                                <div className="flex gap-2 items-center">
                                    <div id="logo" className="flex gap-1 items-center bg-white rounded-full py-2 px-1">
                                        <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                                        <div className="w-4 h-4 bg-yellow-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                                    </div>
                                    <h1 className="hidden sm:block font-medium md:text-xl whitespace-nowrap">Color Shop</h1>
                                </div>
                            </a>
                        </Link>
                        <div className="sm:flex sm:items-center sm:gap-4 md:gap-5">
                            <a href="http://instagram.com/bagas.co" target="_blank" rel="noopener noreferrer" className="hidden lg:flex border rounded-lg sm:items-center text-sm sm:gap-1.5 px-4 py-1.5 text-gray-500 hover:bg-gray-50 whitespace-nowrap transition hover:text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="fill-red-400" viewBox="0 0 24 24"><path d="M11.984 16.815c2.596 0 4.706-2.111 4.706-4.707 0-1.409-.623-2.674-1.606-3.538-.346-.303-.735-.556-1.158-.748-.593-.27-1.249-.421-1.941-.421s-1.349.151-1.941.421c-.424.194-.814.447-1.158.749-.985.864-1.608 2.129-1.608 3.538 0 2.595 2.112 4.706 4.706 4.706zm.016-8.184c1.921 0 3.479 1.557 3.479 3.478 0 1.921-1.558 3.479-3.479 3.479s-3.479-1.557-3.479-3.479c0-1.921 1.558-3.478 3.479-3.478zm5.223.369h6.777v10.278c0 2.608-2.114 4.722-4.722 4.722h-14.493c-2.608 0-4.785-2.114-4.785-4.722v-10.278h6.747c-.544.913-.872 1.969-.872 3.109 0 3.374 2.735 6.109 6.109 6.109s6.109-2.735 6.109-6.109c.001-1.14-.327-2.196-.87-3.109zm2.055-9h-12.278v5h-1v-5h-1v5h-1v-4.923c-.346.057-.682.143-1 .27v4.653h-1v-4.102c-1.202.857-2 2.246-2 3.824v3.278h7.473c1.167-1.282 2.798-2 4.511-2 1.722 0 3.351.725 4.511 2h7.505v-3.278c0-2.608-2.114-4.722-4.722-4.722zm2.722 5.265c0 .406-.333.735-.745.735h-2.511c-.411 0-.744-.329-.744-.735v-2.53c0-.406.333-.735.744-.735h2.511c.412 0 .745.329.745.735v2.53z"/></svg>
                                <span>Made by Bagas</span>
                            </a>
                            <div id="menu" onClick={menuClick} className={`group transition cursor-pointer gap-0.5 px-2 py-4 rounded-full flex ${menuActive ? 'bg-gray-100' : 'sm:hover:bg-gray-50'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full pointer-events-none border border-black ${menuActive ? 'bg-black' : 'bg-transparent'}`}></div>
                                <div className={`w-1.5 h-1.5 rounded-full pointer-events-none border border-black ${menuActive ? 'bg-black' : 'bg-transparent'}`}></div>
                                <div className={`w-1.5 h-1.5 rounded-full pointer-events-none border border-black ${menuActive ? 'bg-black' : 'bg-transparent'}`}></div>
                            </div>
                        </div>
                        {menuActive && (
                            <div className="absolute scaleY top-full text-xs right-6 border border-gray-50 bg-white w-[140px] shadow-sm p-1 divide-y">
                                <section>
                                    <Link href='/'>
                                        <a className={`block px-4 py-1 rounded-lg mb-1 transition text-gray-500 ${router.pathname==='/' ? 'hover:bg-gray-200 bg-gray-100 text-black' : 'hover:bg-gray-50'}`}>Palettes</a>
                                    </Link>
                                    <Link href='/create'>
                                        <a className={`block px-4 py-1 rounded-lg mb-1 transition text-gray-500 ${router.pathname==='/create' ? 'hover:bg-gray-200 bg-gray-100 text-black' : 'hover:bg-gray-50'}`}>Create</a>
                                    </Link>
                                    <Link href='/collection'>
                                        <a className={`block px-4 py-1 mb-1 rounded-lg transition text-gray-500 ${router.pathname==='/collection' ? 'hover:bg-gray-200 bg-gray-100 text-black' : 'hover:bg-gray-50'}`}>Collection</a>
                                    </Link>
                                </section>
                                <section>
                                    <Link href='/about'>
                                        <a className={`block px-4 py-1 mt-1 rounded-lg transition text-gray-500 ${router.pathname==='/about' ? 'hover:bg-gray-200 bg-gray-100 text-black' : 'hover:bg-gray-50'}`}>About</a>
                                    </Link>
                                    <a href="http://" target="_blank" rel="noopener noreferrer" className="block px-4 py-1 rounded-lg transition text-gray-500 hover:bg-gray-50">Instagram</a>
                                </section>
                            </div>
                        )}
                    </div>
                    <div className="pt-5">
                        <h1 className="text-lg font-medium text-center mb-2">New Color Palette</h1>
                        <p className="text-xs text-center">Create a new palette and contribute to Color Shop’s collection</p>
                        <div id="palette" className="max-w-[400px] mx-auto relative">
                            {showPicker && (
                            <ChromePicker width="200px" className="absolute z-10 lg:left-full top-0 lg:ml-10" color={colorPicker} onChangeComplete={onChangeComplete} onChange={onChange}/>
                            )}
                            <div className="mt-10 aspect-[1/1] rounded-xl overflow-hidden">
                                <div onClick={()=>showInput('c1')} style={{backgroundColor: `${colorPalette.c1}`}} className="w-full cursor-pointer h-[41%] relative group"></div>
                                <div onClick={()=>showInput('c2')} style={{backgroundColor: `${colorPalette.c2}`}} className="w-full cursor-pointer h-[26%] relative group"></div>
                                <div onClick={()=>showInput('c3')} style={{backgroundColor: `${colorPalette.c3}`}} className="w-full cursor-pointer h-[19%] relative group"></div>
                                <div onClick={()=>showInput('c4')} style={{backgroundColor: `${colorPalette.c4}`}} className="w-full cursor-pointer h-[14%] flex-1 relative group"></div>
                            </div>
                        </div>
                        <div id="search" className="mx-auto border rounded-full max-w-[600px] mt-10 relative">
                            <div className="flex relative rounded-full overflow-hidden h-[32px] sm:h-[36px] items-center">
                                <div className="flex gap-0.5 items-center w-full p-0.5 left-0 absolute -top-0.5 sm:top-0">
                                    {tagsPal.length>0&&(
                                        tagsPal.map((tag,i)=>(
                                            tag.color ? (
                                            <div onClick={()=>delTags(i)} key={i} className="flex sm:divide-x rounded-full px-2 py-1.5 items-center bg-gray-100">
                                                <div className="flex items-center gap-1 sm:pr-1.5">
                                                    <div style={{backgroundColor: tag.color}} className={`w-3 sm:w-4 h-3 sm:h-4 rounded-full`}></div>
                                                    <span className="text-xs sm:text-sm">{tag.text}</span>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 hidden sm:block w-5 pl-1 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" className="pointer-events-none" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            ) : (
                                            <div key={i} onClick={()=>delTags(i)} className="flex sm:divide-x rounded-full px-2 py-0.5 sm:py-1 items-center bg-gray-100">
                                                <div className="sm:pr-1.5">
                                                    <span className="text-xs sm:text-sm">{tag.text}</span>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hidden sm:block pl-1 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" className="pointer-events-none" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            )
                                        ))
                                    )}
                                    <input value={searchVal} onChange={handleSort} type="text" onFocus={()=>setShowTags(true)} autoComplete="off" placeholder="Add tags" className={`peer py-1 w-full bg-transparent outline-none placeholder:text-sm ${tagsPal.length===0 ? 'focus:pl-4 pl-9 transition-all' : 'pl-2'}`}/>
                                    {tagsPal.length===0&&(
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition absolute left-3 text-gray-500 top-2 peer-focus:opacity-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    )}
                                </div>
                            </div>
                            {showTags && (
                            <div className="absolute z-10 scaleY left-0 sm:left-[20px] divide-y top-full px-5 py-6 rounded-br-xl rounded-bl-xl bg-white w-tags-box border shadow-sm">
                                <div className="mb-5">
                                    <h1 className="text-sm font-medium">Colors</h1>
                                    <div id="color_box" className="mt-3 flex text-xs flex-wrap gap-1">
                                        {tagColor?.map(tag=>(
                                            <div key={tag._id} onClick={()=>addTags(tag.title,tag.color,tag._id)} className={`flex cursor-pointer transition border w-max items-center gap-1.5 px-2 py-1.5 rounded-full ${tagsPal.map(q=>q.text).includes(tag.title) ? 'bg-gray-100 hover:bg-gray-200' : 'hover:bg-gray-50'}`}>
                                                <div style={{backgroundColor: tag.color}} className={`w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-full ${tag.color==='#FFFFFF'&&'border border-gray-100'}`}></div>
                                                <span>{tag.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-5">
                                    <h1 className="font-medium text-sm">Collections</h1>
                                    <div id="collection_box" className="mt-3 flex flex-wrap gap-1 text-xs">
                                        {tagCollection?.map(tag=>(
                                            <div key={tag._id} onClick={()=>addTags(tag.title,tag.color,tag._id)} className={`flex cursor-pointer transition border w-max items-center gap-1.5 px-3 py-1.5 rounded-full ${tagsPal.map(q=>q.text).includes(tag.title) ? 'bg-gray-100 hover:bg-gray-200' : 'hover:bg-gray-50'}`}>
                                                <span>{tag.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                    {showSubmit && (
                    <button onClick={onSubmit} className={`flex mx-auto mt-12 gap-2 transition border items-center px-4 py-2 rounded-xl ${loading ?'cursor-not-allowed':'hover:bg-gray-50'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span className="text-sm font-medium">Submit Palette</span>
                    </button>
                    )}
                </div>
            </Container>
        </Layout>
    )
}