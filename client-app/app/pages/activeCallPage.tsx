import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {NativeBridge} from "../nativeBridge";
import {Router} from "../router/router";
import {waitFor} from "../utils/timeUtil";
import {forceLoudModeOn} from "./_fns";

export const ActiveCallStorage = {
    phoneNumber: '042',
    address: 'test test',
    isLoudMode: false,
    phoneCallState: '' as 'MISSED' | 'FINISHED' | 'STARTED' | 'RINGING' | '',
    onChanged: () => {
    },
}

const acceptCall = async () => {
    await NativeBridge.callHostCommand<void>('acceptCall');
    await waitFor(500);
    await forceLoudModeOn();
    ActiveCallStorage.phoneCallState = 'STARTED';
    ActiveCallStorage.onChanged();
}

const endCall = async () => {
    await NativeBridge.callHostCommand<void>('endCall');
    ActiveCallStorage.phoneCallState = '';
    setTimeout(() => {
        Router.navigateTo('home');
    }, 1000);
}

const triggerLoudMode = async () => {
    await NativeBridge.callHostCommand<void>('triggerLoudMode', {loudMode: !ActiveCallStorage.isLoudMode});
    ActiveCallStorage.isLoudMode = !ActiveCallStorage.isLoudMode;
    ActiveCallStorage.onChanged();
}

const AcceptOrRejectButton = (props: { type: 'accept' | 'reject', onclick: () => void }) => {
    const fillColor = props.type === 'reject' ? '#d22a27' : '#27bb00';
    return (
        <svg onclick={() => props.onclick()} xmlns="http://www.w3.org/2000/svg" height="160" viewBox="0 0 58.43 58.43">
            <path
                d="M24.19,22.5C18.74,25.64,27.05,41.22,33,37.78l5.53,9.57c-2.52,1.46-4.65,2.37-7.56.7-8.1-4.62-17-20-16.75-29.25.08-3.2,2-4.45,4.43-5.87l5.53,9.57Z"
                transform="translate(0.07 0.07)"
                style={`fill:${fillColor};stroke:#000;stroke-miterlimit:10;stroke-width:0.75px;fill-rule:evenodd`}/>
            <path
                d="M26.47,22.24a1.24,1.24,0,0,1-1.69-.45l-5.21-9A1.25,1.25,0,0,1,20,11.08L22.76,9.5a1.24,1.24,0,0,1,1.69.45l5.21,9a1.24,1.24,0,0,1-.45,1.69l-2.74,1.58Z"
                transform="translate(0.07 0.07)"
                style={`fill:${fillColor};stroke:#000;stroke-miterlimit:10;stroke-width:0.75px;fill-rule:evenodd`}/>
            <path
                d="M40.7,46.89A1.23,1.23,0,0,1,39,46.44l-5.21-9a1.24,1.24,0,0,1,.45-1.69L37,34.15a1.23,1.23,0,0,1,1.68.45l5.21,9a1.24,1.24,0,0,1-.45,1.69L40.7,46.89Z"
                transform="translate(0.07 0.07)"
                style={`fill:${fillColor};stroke:#000;stroke-miterlimit:10;stroke-width:0.75px;fill-rule:evenodd`}/>
            <path
                d="M29.14,0h0A29.11,29.11,0,0,1,58.27,29.14h0A29.11,29.11,0,0,1,29.14,58.28h0A29.12,29.12,0,0,1,0,29.14H0A29.12,29.12,0,0,1,29.14,0Zm0,3.48h0A25.67,25.67,0,0,0,3.48,29.14h0A25.69,25.69,0,0,0,29.14,54.81h0A25.71,25.71,0,0,0,54.81,29.14h0A25.69,25.69,0,0,0,29.14,3.48Z"
                transform="translate(0.07 0.07)"
                style={`fill:${fillColor};stroke:#000;stroke-miterlimit:10;stroke-width:0.75px`}/>
        </svg>
    );
};


const LoudModeButton = () => {
    return (
        <div
            onclick={() => triggerLoudMode()}
            style={{textAlign: 'center', padding: '20px', margin: '20px'}}>
            {
                <svg xmlns="http://www.w3.org/2000/svg" height="160" viewBox="0 0 980.75 871.71">
                    <path
                        d="M811.7,869.3a43.25,43.25,0,0,1-30.6-73.8,417.9,417.9,0,0,0,0-591,43.2,43.2,0,0,1,61.1-61.1C937.5,238.6,990,365.3,990,500S937.5,761.4,842.3,856.7a43.31,43.31,0,0,1-30.6,12.6ZM658.1,787.8A43.25,43.25,0,0,1,627.5,714c118-118,118-310,0-428a43.2,43.2,0,1,1,61.1-61.1c73.5,73.5,114,171.2,114,275.1s-40.5,201.7-114,275.1a42.61,42.61,0,0,1-30.5,12.7ZM504.5,706.3a43.25,43.25,0,0,1-30.6-73.8c73-73,73-191.9,0-265A43.2,43.2,0,0,1,535,306.4c106.8,106.8,106.8,280.5,0,387.2A42.44,42.44,0,0,1,504.5,706.3Z"
                        transform="translate(-9.63 -54.65)"
                        style="fill:#0a0459;stroke:#4dab47;stroke-miterlimit:10;stroke-width:0.75px"/>
                    <path
                        d="M384.7,903.5a28.84,28.84,0,0,1-20.4-8.4L142.2,672.9H38.8A28.81,28.81,0,0,1,10,644.1V355.9a28.81,28.81,0,0,1,28.8-28.8H142.2L364.3,105a28.85,28.85,0,0,1,49.2,20.4V874.8a28.64,28.64,0,0,1-17.8,26.6A29.86,29.86,0,0,1,384.7,903.5Z"
                        transform="translate(-9.63 -54.65)"
                        style="fill:#0a0459;stroke:#000;stroke-miterlimit:10;stroke-width:0.75px"/>
                    <path d="M977.74,190.08" transform="translate(-9.63 -54.65)"
                          style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:79px"/>
                    <path d="M32.26,892.92" transform="translate(-9.63 -54.65)"
                          style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:79px"/>
                    <path d="M80,67" transform="translate(-9.63 -54.65)"
                          style="fill:#0a0459;stroke:#000;stroke-miterlimit:10;stroke-width:0.75px"/>
                    {
                        !ActiveCallStorage.isLoudMode &&
                            <line x1="70.38" y1="12.35" x2="869.59" y2="859.35" style="fill:none;stroke:#ed1e2d;stroke-miterlimit:10;stroke-width:36px"/>
                    }
                </svg>
            }
        </div>
    );
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
                    {
                        ActiveCallStorage.phoneCallState === 'STARTED' && <LoudModeButton/>
                    }
                </div>
                <div className="horizontalLayout">
                    {
                        ActiveCallStorage.phoneCallState === 'RINGING' &&
                        <div className="flex1" style={{textAlign: 'center', paddingBottom: '20px'}}>
                            <AcceptOrRejectButton type='accept' onclick={acceptCall}/>
                        </div>
                    }
                    <div className="flex1" style={{textAlign: 'center', paddingBottom: '20px'}}>
                        <AcceptOrRejectButton type='reject' onclick={endCall}/>
                    </div>
                </div>
            </div>
        </>
    );
}