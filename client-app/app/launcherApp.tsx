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
import {HomePage, MobileOperatorInfoStorage} from "./pages/homePage";
import {MissedCallsPage, MissedCallsStore} from "./pages/missedCallsPage";
import {Router} from "./router/router";
import {PhoneBookPage, PhoneBookStore} from "./pages/phoneBookPage";
import {SmsStorage} from "./components/sms";
import {SmsListPage, SmsListStore} from "./pages/SmsListPage";
import {ActiveCallPage, ActiveCallStorage} from "./pages/activeCallPage";
import {IGrantedPermissionInfo, SettingsPage, SettingsStorage} from "./pages/settingsPage";
import {DialNumberPage, DialNumberStorage} from "./pages/dialNumberPage";
import {ChooseSimCardPage} from "./pages/chooseSimCardPage";


(window as any).__cb__ = (event:{eventId:string,payload:any})=>{
    NativeBridge.onEventReceivedFromHost(event);
}

interface ICallStateChangedIfo {
    phoneCallState:'MISSED'|'FINISHED'|'STARTED'|'RINGING',
    phoneNumber: string,
    address: string
}

export interface ISimOperatorInfo {
    operatorName:string;
    operatorId:number;
}

NativeBridge.subscribeToEvent('onResume', async () => {
    BatteryStorage.chargeValue = await NativeBridge.callHostCommand('getBatteryLevel');
    BatteryStorage.onChanged();
});

NativeBridge.subscribeToEvent('onCallStateChanged', ({phoneCallState,phoneNumber,address}:ICallStateChangedIfo) => {
    console.log('phoneCallState ' + phoneCallState);
    switch (phoneCallState) {
        case 'MISSED': {
            MissedCallsStorage.missedCallsNumber++;
            Router.navigateTo('home');
            MissedCallsStorage.onChanged();
            break;
        }
        case 'FINISHED': // dont interest, the are for callApp
        case 'RINGING':
        case 'STARTED':
            break;
    }
}, false);

NativeBridge.subscribeToEvent('onPermissionGranted', async () => {
    await requestPermissionsInfo();
}, false);


const requestPermissionsInfo = async ()=>{
    const permissions = await NativeBridge.callHostCommand<IGrantedPermissionInfo[]>('getPermissionsInfo');
    SettingsStorage.permissionsInfo = permissions;
    SettingsStorage.onChanged();
    const hasNotGranted = permissions.filter(it=>!it.granted).length>0;
    if (hasNotGranted) Router.navigateTo('settings');
    else Router.navigateTo('home');
}

requestPermissionsInfo().catch(e=>console.log(e));


export class App extends VEngineTsxComponent {

    constructor() {
        super(new HtmlTsxDOMRenderer());
        BatteryStorage.onChanged                    =
        MissedCallsStore.onChanged                  =
        PhoneBookStore.onChanged                    =
        MobileOperatorInfoStorage.onChanged         =
        SmsStorage.onChanged                        =
        SmsListStore.onChanged                      =
        ActiveCallStorage.onChanged                 =
        MissedCallsStorage.onChanged                =
        SettingsStorage.onChanged                   =
        DialNumberStorage.onChanged                 =
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
                    {Router.getCurrentUrl()==='settings' && <SettingsPage/>}
                    {Router.getCurrentUrl()==='home' && <HomePage/>}
                    {Router.getCurrentUrl()==='missedCalls' && <MissedCallsPage/>}
                    {Router.getCurrentUrl()==='phoneBook' && <PhoneBookPage/>}
                    {Router.getCurrentUrl()==='smsList' && <SmsListPage/>}
                    {Router.getCurrentUrl()==='activeCall' && <ActiveCallPage/>}
                    {Router.getCurrentUrl()==='dialNumber' && <DialNumberPage/>}
                    {Router.getCurrentUrl()==='chooseSimCard' && <ChooseSimCardPage/>}
                </div>
            </>
        );
    }

}

new App().mountTo(new HTMLElementWrap(document.body));
