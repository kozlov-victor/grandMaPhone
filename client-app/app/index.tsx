import {VEngineTsxComponent} from "@engine/renderable/tsx/genetic/vEngineTsxComponent";
import {VirtualNode} from "@engine/renderable/tsx/genetic/virtualNode";
import {HtmlTsxDOMRenderer} from "@engine/renderable/tsx/dom/htmlTsxDOMRenderer";
import {HTMLElementWrap} from "@engine/renderable/tsx/dom/HTMLElementWrap";
import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {ReactiveMethod} from "@engine/renderable/tsx/genetic/reactiveMethod";
import {Battery} from "./components/battery";

const leadZero = (n: number): string => {
    if (n <= 9) return `0${n}`;
    else return `${n}`;
}

const formatTime = (date: Date): string => {
    const hh = leadZero(date.getHours());
    const mm = leadZero(date.getMinutes());
    return `${hh}:${mm}`;
}

export class App extends VEngineTsxComponent {

    private time: string;

    constructor() {
        super(new HtmlTsxDOMRenderer());

        this.nextTick();
        setInterval(() => {
            this.nextTick();
        }, 1000 * 30);
    }

    @ReactiveMethod()
    private nextTick(): void {
        this.time = formatTime(new Date());
    }

    public render(): VirtualNode {
        return (
            <>
                <div className='time'>
                    {this.time}
                </div>
                <div>
                    <Battery/>
                </div>
            </>
        );
    }

}

new App().mountTo(new HTMLElementWrap(document.body));
