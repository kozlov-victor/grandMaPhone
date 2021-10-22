import {VEngineTsxComponent} from "@engine/renderable/tsx/genetic/vEngineTsxComponent";
import {VirtualNode} from "@engine/renderable/tsx/genetic/virtualNode";
import {HtmlTsxDOMRenderer} from "@engine/renderable/tsx/dom/htmlTsxDOMRenderer";
import {HTMLElementWrap} from "@engine/renderable/tsx/dom/HTMLElementWrap";
import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {ReactiveMethod} from "@engine/renderable/tsx/genetic/reactiveMethod";
import {Battery, BatteryStorage} from "./components/battery";
import {PhoneStorage} from "./components/phone";
import {Clock, ClockStorage} from "./components/clock";
import {NativeBridgeListener} from "./nativeBridgeListener";
import {Home} from "./pages/home";
import {MissedCalls} from "./pages/missedCalls";
import {Router} from "./router/router";


(window as any).__cb__ = (event:{eventId:string,payload:any})=>{
    NativeBridgeListener.onEventReceivedFromHost(event);
}


export class App extends VEngineTsxComponent {

    constructor() {
        super(new HtmlTsxDOMRenderer());
        BatteryStorage.onChanged  =
        PhoneStorage.onChanged =
            ()=>{
            this.triggerRendering();
        }
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
                    {Router.getCurrentUrl()==='home' && <Home/>}
                    {Router.getCurrentUrl()==='missedCalls' && <MissedCalls/>}
                </div>
            </>
        );
    }

}

new App().mountTo(new HTMLElementWrap(document.body));
