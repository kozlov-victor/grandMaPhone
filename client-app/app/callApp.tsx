import {VEngineTsxComponent} from "@engine/renderable/tsx/genetic/vEngineTsxComponent";
import {VirtualNode} from "@engine/renderable/tsx/genetic/virtualNode";
import {HtmlTsxDOMRenderer} from "@engine/renderable/tsx/dom/htmlTsxDOMRenderer";
import {HTMLElementWrap} from "@engine/renderable/tsx/dom/HTMLElementWrap";
import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {NativeBridge} from "./nativeBridge";
import {ActiveCallPage, ActiveCallStorage} from "./pages/activeCallPage";
import {Router} from "./router/router";
import {waitFor} from "./utils/timeUtil";
import {forceLoudModeOn} from "./pages/_fns";


(window as any).__cb__ = (event:{eventId:string,payload:any})=>{
    NativeBridge.onEventReceivedFromHost(event);
}

interface ICallStateChangedIfo {
    phoneCallState:'MISSED'|'FINISHED'|'STARTED'|'RINGING',
    phoneNumber: string,
    address: string
}

NativeBridge.subscribeToEvent('onCallStateChanged', ({phoneCallState,phoneNumber,address}:ICallStateChangedIfo) => {
    console.log('phoneCallState ' + phoneCallState);
    switch (phoneCallState) {
        case 'MISSED':
        case 'FINISHED':
            break;
        case 'RINGING':
        case 'STARTED':
            ActiveCallStorage.phoneNumber = phoneNumber;
            ActiveCallStorage.address = address;
            ActiveCallStorage.phoneCallState = phoneCallState;
            Router.navigateTo('activeCall');
            break;
    }
}, false);

const urlPayload = location.search;
if (urlPayload) {
    const payload = urlPayload.replace('?payload=','');
    try {
        const parsed = JSON.parse(decodeURIComponent(payload)) as ICallStateChangedIfo;
        ActiveCallStorage.phoneNumber = parsed.phoneNumber;
        ActiveCallStorage.address = parsed.address;
        ActiveCallStorage.phoneCallState = parsed.phoneCallState;
    } catch (e) {
        console.log(e);
    }
}

export class App extends VEngineTsxComponent {

    constructor() {
        super(new HtmlTsxDOMRenderer());
        ActiveCallStorage.onChanged = ()=>this.triggerRendering();
        Router.onNavigated(()=>this.triggerRendering());
        Router.navigateTo('activeCall');
        (async ()=>{
            await waitFor(1000);
            await forceLoudModeOn();
        })();
    }

    public render(): VirtualNode {
        return (
            <>
                <div className='verticalLayout alignItemsCenter'>
                    {
                        Router.getCurrentUrl()==='activeCall' && <ActiveCallPage/>
                    }
                </div>
            </>
        );
    }

}

new App().mountTo(new HTMLElementWrap(document.body));
