import {VEngineTsxComponent} from "@engine/renderable/tsx/genetic/vEngineTsxComponent";
import {VirtualNode} from "@engine/renderable/tsx/genetic/virtualNode";
import {HtmlTsxDOMRenderer} from "@engine/renderable/tsx/dom/htmlTsxDOMRenderer";
import {HTMLElementWrap} from "@engine/renderable/tsx/dom/HTMLElementWrap";
import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {ReactiveMethod} from "@engine/renderable/tsx/genetic/reactiveMethod";
import {Battery, BatteryStorage} from "./components/battery";
import {MissedCallsStorage} from "./components/phone";
import {Clock, ClockStorage} from "./components/clock";
import {NativeBridge} from "./nativeBridge";
import {HomePage} from "./pages/homePage";
import {MissedCallsPage, MissedCallsStore} from "./pages/missedCallsPage";
import {Router} from "./router/router";
import {PhoneBookPage, PhoneBookStore} from "./pages/phoneBookPage";
import {SmsStorage} from "./components/sms";
import {SmsListPage, SmsListStore} from "./pages/SmsListPage";
import {ActiveCallPage, ActiveCallStorage} from "./pages/activeCallPage";


(window as any).__cb__ = (event:{eventId:string,payload:any})=>{
    NativeBridge.onEventReceivedFromHost(event);
}

// NativeBridge.subscribeToEvent('onResume',()=>{
//     Router.navigateTo('home');
// },false);

interface ICallStateChangedIfo {
    phoneCallState:'MISSED'|'FINISHED'|'STARTED',
    phoneNumber: string,
    address: string
}

NativeBridge.subscribeToEvent('onCallStateChanged', ({phoneCallState,phoneNumber,address}:ICallStateChangedIfo) => {
    console.log('phoneCallState ' + phoneCallState);
    switch (phoneCallState) {
        case 'MISSED': {
            MissedCallsStorage.missedCallsNumber++;
            MissedCallsStorage.onChanged();
            break;
        }
        case 'FINISHED':
            Router.navigateTo('home');
            break;
        case 'STARTED':
            ActiveCallStorage.phoneNumber = phoneNumber;
            ActiveCallStorage.address = address;
            Router.navigateTo('activeCall');
            break;
    }
}, false);


export class App extends VEngineTsxComponent {

    constructor() {
        super(new HtmlTsxDOMRenderer());
        BatteryStorage.onChanged        =
        MissedCallsStore.onChanged      =
        PhoneBookStore.onChanged        =
        SmsStorage.onChanged            =
        SmsListStore.onChanged          =
        ActiveCallStorage.onChanged     =
        MissedCallsStorage.onChanged    =
            ()=>this.triggerRendering();

        Router.onNavigated(()=>this.triggerRendering());
        Router.navigateTo('home');

        setInterval(() => {
            this.nextTimeTick();
        }, 1000 * 30);
    }

    @ReactiveMethod()
    private nextTimeTick(): void {
        ClockStorage.nextTick();
    }

    public render(): VirtualNode {
        return (
            <>
                <div className='verticalLayout alignItemsCenter'>
                    <div className='horizontalLayout' style={{padding: '10px', alignItems: 'center'}}>
                        <div className='flex1'>
                            <Clock/>
                        </div>
                        <div>
                            <Battery/>
                        </div>
                    </div>
                    {Router.getCurrentUrl()==='home' && <HomePage/>}
                    {Router.getCurrentUrl()==='missedCalls' && <MissedCallsPage/>}
                    {Router.getCurrentUrl()==='phoneBook' && <PhoneBookPage/>}
                    {Router.getCurrentUrl()==='smsList' && <SmsListPage/>}
                    {Router.getCurrentUrl()==='activeCall' && <ActiveCallPage/>}
                </div>
            </>
        );
    }

}

new App().mountTo(new HTMLElementWrap(document.body));
