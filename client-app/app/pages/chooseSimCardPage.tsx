import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {MobileOperatorInfoStorage} from "./homePage";
import {NativeBridge} from "../nativeBridge";
import {Router} from "../router/router";
import {DialNumberStorage} from "./dialNumberPage";
import {Home} from "../components/home";

const SimCard = (props:{index:number}) => {
    const fillColor = props.index===0?'#02b430':'#4f44f8';
    return (
        <svg width="100px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 91.7 122.88">
            <g>
                <path fill={fillColor} d="M27.3,56.77h36.47c2.41,0,4.61,0.99,6.2,2.58c1.59,1.59,2.58,3.78,2.58,6.2V99c0,2.41-0.99,4.61-2.58,6.2 c-1.59,1.59-3.78,2.58-6.2,2.58H27.3c-2.41,0-4.61-0.99-6.2-2.58c-1.59-1.59-2.58-3.78-2.58-6.2V65.54c0-2.42,0.99-4.61,2.58-6.2 C22.69,57.76,24.89,56.77,27.3,56.77L27.3,56.77z M8.56,0.02h43.08c1.64,0,1.8,0,1.96,0c2.25-0.03,3.37-0.04,4.7,0.51 c1.34,0.56,2.13,1.37,3.72,3.01c0.39,0.41,0.85,0.87,1.35,1.38c4.14,4.16,7.94,8.09,11.75,12.01c3.7,3.82,7.4,7.64,11.36,11.62 c0.7,0.7,1.31,1.29,1.82,1.78c1.48,1.42,2.25,2.16,2.82,3.46c0.61,1.4,0.6,2.62,0.58,5.19c0,0.26,0-0.64,0,1.66v73.69 c0,2.36-0.96,4.5-2.51,6.05c-1.55,1.55-3.69,2.51-6.05,2.51H8.56c-2.36,0-4.5-0.96-6.05-2.51C0.96,118.82,0,116.67,0,114.32V8.58 c0-2.36,0.96-4.5,2.51-6.05C4.06,0.98,6.21,0.02,8.56,0.02L8.56,0.02z M51.64,5.9H8.56c-0.74,0-1.41,0.3-1.89,0.79 C6.18,7.17,5.88,7.85,5.88,8.58v105.74c0,0.74,0.3,1.41,0.79,1.89C7.16,116.7,7.83,117,8.56,117h74.57c0.73,0,1.41-0.3,1.89-0.79 c0.49-0.49,0.79-1.16,0.79-1.89V40.62c0-1.06,0.01-0.43,0.02-1.68c0.01-1.73,0.02-2.55-0.1-2.82c-0.09-0.22-0.58-0.68-1.51-1.57 c-0.51-0.49-1.13-1.09-1.91-1.87c-4.01-4.04-7.71-7.85-11.4-11.67c-3.81-3.93-7.61-7.86-11.7-11.97c-0.56-0.56-1.01-1.02-1.39-1.42 c-1.02-1.05-1.53-1.58-1.77-1.67c-0.24-0.1-0.95-0.09-2.38-0.07C52.69,5.88,51.74,5.9,51.64,5.9L51.64,5.9z M55.45,61.18v0.01v12.1 h12.68v-7.75c0-1.2-0.49-2.29-1.28-3.08c-0.79-0.79-1.88-1.28-3.08-1.28H55.45L55.45,61.18z M68.14,77.88H55.45v8.27h12.68V77.88 L68.14,77.88z M68.14,90.73H55.45v12.63h8.32c1.2,0,2.29-0.49,3.08-1.28c0.79-0.79,1.28-1.88,1.28-3.08V90.73L68.14,90.73z M51.04,103.36V89.09c-0.06-0.21-0.09-0.42-0.09-0.65c0-0.23,0.03-0.44,0.09-0.65V76.24c-0.06-0.21-0.09-0.42-0.09-0.65 c0-0.23,0.03-0.44,0.09-0.65V61.2v-0.01H27.3c-1.2,0-2.29,0.49-3.08,1.28c-0.79,0.79-1.28,1.88-1.28,3.08v7.77h14.39 c1.22,0,2.21,0.99,2.21,2.21V87.6c0.04,0.17,0.07,0.36,0.07,0.55c0,0.19-0.02,0.37-0.07,0.55v14.67H51.04L51.04,103.36z M22.94,77.72v8.13h12.18v-8.13H22.94L22.94,77.72z M22.94,90.44V99c0,1.2,0.49,2.29,1.28,3.08c0.79,0.79,1.88,1.28,3.08,1.28h7.82 V90.44H22.94L22.94,90.44z"/>
            </g>
        </svg>
    );
}

const dialNumber = async (operatorId:number)=>{
    await NativeBridge.callHostCommand('dialNumber',{number:DialNumberStorage.number,operatorId});
}

const navigateToHome = ()=>{
    Router.navigateTo('home');
}

export const ChooseSimCardPage = () => {
    return (
        <>
            <div className="flex1">
                <h1 style={{textAlign: 'center'}}>
                    {DialNumberStorage.name && <div>{DialNumberStorage.name}</div>}
                    <div>{DialNumberStorage.number}</div>
                </h1>
                {
                    [0,1].map(it=>
                        <div onclick={()=>dialNumber(MobileOperatorInfoStorage.operatorInfo[it].operatorId)}>
                            <div className="horizontalLayout" style={{alignItems:'center',justifyContent:'center'}}>
                                <div style={{padding:'10px'}}>
                                    <SimCard index={it}/>
                                </div>
                                <h3 className="flex1" style={{textAlign:'left',padding:'5px'}}>
                                    {MobileOperatorInfoStorage.operatorInfo[it]?.operatorName ?? '?'}
                                </h3>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className='horizontalLayout'>
                <div className="flex1" style={{textAlign: 'center'}} onclick={navigateToHome}>
                    <Home height={100}/>
                </div>
            </div>
        </>
    );
}