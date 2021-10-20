import {VEngineTsxComponent} from "@engine/renderable/tsx/genetic/vEngineTsxComponent";
import {VirtualNode} from "@engine/renderable/tsx/genetic/virtualNode";
import {HtmlTsxDOMRenderer} from "@engine/renderable/tsx/dom/htmlTsxDOMRenderer";
import {HTMLElementWrap} from "@engine/renderable/tsx/dom/HTMLElementWrap";
import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {ReactiveMethod} from "@engine/renderable/tsx/genetic/reactiveMethod";
import {Battery} from "./components/battery";
import {Phone, PhoneStorage} from "./components/phone";
import {PhoneBook} from "./components/phoneBook";
import {Sms, SmsStorage} from "./components/sms";
import {Clock, ClockStorage} from "./components/clock";


export class App extends VEngineTsxComponent {

    private time: string;

    constructor() {
        super(new HtmlTsxDOMRenderer());

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
                <div className='verticalLayout alignItemsCenter' onclick={e=>{
                    SmsStorage.unreadSmsNumber+=1;
                    this.triggerRendering();
                }}>
                    <div className='horizontalLayout' style={{padding: '10px'}}>
                        <Clock/>
                        <div className='flex1'/>
                        <div>
                            <Battery/>
                        </div>
                    </div>
                    <div className="flex1">
                        <Phone/>
                    </div>
                    <div className="flex1">
                        <PhoneBook/>
                    </div>
                    <div className="flex1">
                        <Sms/>
                    </div>
                </div>
            </>
        );
    }

}

new App().mountTo(new HTMLElementWrap(document.body));
