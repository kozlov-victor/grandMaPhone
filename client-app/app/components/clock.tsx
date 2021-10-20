import {VirtualNode} from "@engine/renderable/tsx/genetic/virtualNode";
import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";

const leadZero = (n: number): string => {
    if (n <= 9) return `0${n}`;
    else return `${n}`;
}

const formatTime = (date: Date): string => {
    const hh = leadZero(date.getHours());
    const mm = leadZero(date.getMinutes());
    return `${hh}:${mm}`;
}

export const ClockStorage = {
    time: formatTime(new Date()),
    nextTick:()=>{
        ClockStorage.time = formatTime(new Date());
    }
}

export const Clock = ():VirtualNode=> {
    return (
        <div className='time'>
            {ClockStorage.time}
        </div>
    );
}