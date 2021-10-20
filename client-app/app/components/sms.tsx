import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {PhoneStorage} from "./phone";

export const SmsStorage = {
    unreadSmsNumber: 0,
}

const getFillColor = ()=>{
    if (SmsStorage.unreadSmsNumber>0) return '#d70000';
    else return '#ffc513';
}

export const Sms = () => {
    const fillColor = getFillColor();
    return (
        <>
            <div style={{display:'inlineBlock',position:'relative'}}>
                <svg width="180" height="180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.55 30.97"><title>sms</title>
                    <path
                        d="M15,0,.28,11.18H.21v19H29.94v-19H30ZM27.51,12.47,15.08,22.83,2.64,12.47Zm1.14,16.46H1.5V13.2L15.08,24.51,28.65,13.2Z"
                        transform="translate(0.16 0.38)"
                        style={`fill:${fillColor};stroke:#231f20;stroke-linecap:square;stroke-linejoin:round;stroke-width:0.75px`}/>
                </svg>
                {
                    SmsStorage.unreadSmsNumber>0 &&
                    <div className="badge" style={{bottom:'10px',right:'20px'}}>{SmsStorage.unreadSmsNumber}</div>
                }
            </div>
        </>
    );
}