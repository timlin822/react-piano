import {useState,useEffect,useRef} from 'react';

import AUDIOS_DATA from 'data/AudiosData';

import './Piano.css';

const Piano=()=>{
    const keyRef=useRef(null);

    const [currentKey,setCurrentKey]=useState("");
    const [volume,setVolume]=useState(0.2);
    const [keyIsShow,setKeyIsShow]=useState(false);

    useEffect(()=>{
        keyRef.current.volume=volume;
    },[]);
    useEffect(()=>{
        if(currentKey){
            keyRef.current.play();
            
            const timeoutId=setTimeout(()=>{
                setCurrentKey("");
            },700);
    
            return ()=>{
                clearTimeout(timeoutId);
            }
        }
    },[currentKey]);

    const changeHandler=(e)=>{
        keyRef.current.volume=e.target.value;
        setVolume(e.target.value);
    };

    const clickHandler=(src)=>{
        setCurrentKey(src);
    };

    return (
        <div className="piano">
            <div className="piano-top">
                <h1 className="piano-title">PIANO</h1>
                <div className="input-group">
                    <span>Volume</span>
                    <input type="range" className="input" value={volume} min="0" max="1" step="any" onChange={changeHandler} />
                </div>
                <div className="input-group">
                    <span>Keys</span>
                    <input type="checkbox" className="input" value={keyIsShow} onChange={(e)=>setKeyIsShow(e.target.checked)} />
                </div>
            </div>
            <div className="piano-board">
                <audio src={currentKey} ref={keyRef} />
                {AUDIOS_DATA.map(audio=>(
                    <div key={audio.id} className={`key ${audio.css}`} onClick={()=>clickHandler(audio.src)}>{keyIsShow && audio.key}</div>
                ))}
            </div>
        </div>
    );
}

export default Piano;