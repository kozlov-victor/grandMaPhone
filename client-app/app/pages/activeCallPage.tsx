import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {NativeBridge} from "../nativeBridge";

export const ActiveCallStorage = {
    phoneNumber: '98098098098',
    address: 'test test',
    onChanged: () => {
    },
}

const endCall = async () => {
    await NativeBridge.callHostCommand<void>('endCall');
}

export const ActiveCallPage = () => {
    return (
        <>
            <div className="verticalLayout active-call">
                <div className="flex1" style={{textAlign: 'center'}}>
                    <h3>
                        {ActiveCallStorage.address}
                    </h3>
                    <h2>
                        {ActiveCallStorage.phoneNumber}
                    </h2>
                </div>
                <div className="flex1" style={{textAlign:'center'}}>
                    <svg onclick={endCall} xmlns="http://www.w3.org/2000/svg" height="200" viewBox="0 0 58.43 58.43">
                        <path
                            d="M24.19,22.5C18.74,25.64,27.05,41.22,33,37.78l5.53,9.57c-2.52,1.46-4.65,2.37-7.56.7-8.1-4.62-17-20-16.75-29.25.08-3.2,2-4.45,4.43-5.87l5.53,9.57Z"
                            transform="translate(0.07 0.07)"
                            style="fill:#d22a27;stroke:#000;stroke-miterlimit:10;stroke-width:0.75px;fill-rule:evenodd"/>
                        <path
                            d="M26.47,22.24a1.24,1.24,0,0,1-1.69-.45l-5.21-9A1.25,1.25,0,0,1,20,11.08L22.76,9.5a1.24,1.24,0,0,1,1.69.45l5.21,9a1.24,1.24,0,0,1-.45,1.69l-2.74,1.58Z"
                            transform="translate(0.07 0.07)"
                            style="fill:#d22a27;stroke:#000;stroke-miterlimit:10;stroke-width:0.75px;fill-rule:evenodd"/>
                        <path
                            d="M40.7,46.89A1.23,1.23,0,0,1,39,46.44l-5.21-9a1.24,1.24,0,0,1,.45-1.69L37,34.15a1.23,1.23,0,0,1,1.68.45l5.21,9a1.24,1.24,0,0,1-.45,1.69L40.7,46.89Z"
                            transform="translate(0.07 0.07)"
                            style="fill:#d22a27;stroke:#000;stroke-miterlimit:10;stroke-width:0.75px;fill-rule:evenodd"/>
                        <path
                            d="M29.14,0h0A29.11,29.11,0,0,1,58.27,29.14h0A29.11,29.11,0,0,1,29.14,58.28h0A29.12,29.12,0,0,1,0,29.14H0A29.12,29.12,0,0,1,29.14,0Zm0,3.48h0A25.67,25.67,0,0,0,3.48,29.14h0A25.69,25.69,0,0,0,29.14,54.81h0A25.71,25.71,0,0,0,54.81,29.14h0A25.69,25.69,0,0,0,29.14,3.48Z"
                            transform="translate(0.07 0.07)"
                            style="fill:#d22a27;stroke:#000;stroke-miterlimit:10;stroke-width:0.75px"/>
                    </svg>
                </div>
            </div>
        </>
    );
}