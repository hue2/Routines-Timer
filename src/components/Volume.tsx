import * as React from 'react';
//@ts-ignore;
import sound from '../assets/sound/sony_beep_beep_alarm.mp3';
import { adjustVolume } from '../helpers/Helper';

export default function Volume(props : MuteProps) {
    const { isMuted, toggleVolume, notify, setVolume, volume } = props;

    return (
        <div id="volume-wrapper">     
            <audio src={notify && adjustVolume(volume) ? sound : ''} id="player" autoPlay/>      
            <div>
                <div onClick={toggleVolume} id="volume-icon">
                    <i className={isMuted ? "fa fa-volume-off" : "fa fa-volume-up"}></i> 
                </div>
                <input 
                    type="range" 
                    id="volume-slider" 
                    name="volume"
                    min="0" 
                    max="1" 
                    step={0.1} 
                    onChange={setVolume} 
                    value={volume}
                    disabled={isMuted}
                />
            </div>        
        </div>
    )
}

interface MuteProps {
    toggleVolume: () => void,
    isMuted: boolean,
    notify: boolean,
    volume: number,
    setVolume: (event : any) => void,
}
