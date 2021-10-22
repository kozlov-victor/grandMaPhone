import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {NativeBridgeListener} from "../nativeBridgeListener";

export const PhoneStorage = {
    missedCallsNumber: 0,
    onChanged: () => {
    },
}

NativeBridgeListener.subscribeToEvent('onCallMissed', () => {
    PhoneStorage.missedCallsNumber++;
    PhoneStorage.onChanged();
}, false);

const getFillColor = ()=>{
    if (PhoneStorage.missedCallsNumber>0) return '#d70000';
    else return '#007000';
}

export const Phone = (props:{height?:number} = {}) => {
    console.log(props);
    props.height??=180;
    const fillColor = getFillColor();
    return (
        <div style={{display:'inlineBlock',position:'relative'}}>
            <svg width="180" height={`${props.height}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.94 58.94"><title>phone</title>
                <path
                    d="M44.08,37.82A5.58,5.58,0,0,0,41.37,37a3.35,3.35,0,0,0-3,1.68,34.06,34.06,0,0,1-2.59,2.86C33.39,43.2,31.53,43,29.47,41L18,29.47c-2-2-2.24-3.93-.64-6.29a34.14,34.14,0,0,1,2.87-2.6,3.29,3.29,0,0,0,1.55-2,5,5,0,0,0-.65-3.73C21,14.56,16.83,7.58,13,5.58A4.85,4.85,0,0,0,10.73,5,4.91,4.91,0,0,0,7.24,6.45L4.7,9C.69,13-.77,17.55.38,22.51c1,4.13,3.74,8.52,8.28,13.06L23.37,50.28c5.74,5.74,11.22,8.66,16.28,8.66h0c3.72,0,7.19-1.58,10.3-4.7l2.54-2.54a4.9,4.9,0,0,0,.87-5.79C51.36,42.11,44.38,38,44.08,37.82Z"
                    transform="translate(0.5 -0.5)" style={`fill:${fillColor};stroke:#000;stroke-miterlimit:10`}/>
                <path
                    d="M58.94,38a6.7,6.7,0,0,1-6.69-6.69,1,1,0,0,0-2,0A8.7,8.7,0,0,0,58.94,40a1,1,0,0,0,1-1A1,1,0,0,0,58.94,38Z"
                    transform="translate(0.5 -0.5)" style={`fill:${fillColor};stroke:#000;stroke-miterlimit:10`}/>
                <path d="M58.2,35.66a1,1,0,0,0,0-2,1.61,1.61,0,0,1-1.61-1.6,1,1,0,1,0-2,0A3.61,3.61,0,0,0,58.2,35.66Z"
                      transform="translate(0.5 -0.5)" style={`fill:${fillColor};stroke:#000;stroke-miterlimit:10`}/>
                <path d="M19.94,3a6.7,6.7,0,0,1,6.69,6.7,1,1,0,0,0,2,0A8.7,8.7,0,0,0,19.94,1a1,1,0,0,0,0,2Z"
                      transform="translate(0.5 -0.5)" style={`fill:${fillColor};stroke:#000;stroke-miterlimit:10`}/>
                <path
                    d="M19.69,6.34a1,1,0,0,0,1,1A1.61,1.61,0,0,1,22.29,9a1,1,0,0,0,2,0,3.61,3.61,0,0,0-3.6-3.61A1,1,0,0,0,19.69,6.34Z"
                    transform="translate(0.5 -0.5)" style={`fill:${fillColor};stroke:#000;stroke-miterlimit:10`}/>
            </svg>
            {
                PhoneStorage.missedCallsNumber>0 &&
                <div className="badge" style={{bottom:'10px',right:'20px'}}>{PhoneStorage.missedCallsNumber}</div>
            }
        </div>
    );
}