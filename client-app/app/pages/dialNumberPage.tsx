import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {Home} from "../components/home";
import {StatelessPhone} from "../components/phone";
import {Router} from "../router/router";
import {NativeBridge} from "../nativeBridge";

const navigateToHome = ()=>{
    Router.navigateTo('home');
}

export const DialNumberStorage = {
    number: '',
    onChanged: () => {
    },
}

const dialNumber = async ()=>{
    if (!DialNumberStorage.number) return;
    await NativeBridge.callHostCommand('dialNumber',{number:DialNumberStorage.number});
}

const onButtonPress = (char:string)=>{
    if (DialNumberStorage.number.length>0 && char==='+') return;
    else if (char==='<') DialNumberStorage.number = DialNumberStorage.number.substring(0,DialNumberStorage.number.length-1);
    else DialNumberStorage.number+=char;
    DialNumberStorage.onChanged();
}

export const DialNumberPage = ()=>{
    return (
        <div className="verticalLayout">
            <div className="flex1">
                <h1 style={{textAlign: 'center'}}>{DialNumberStorage.number}</h1>
            </div>
            <div>
                <div className="horizontalLayout">
                    <div className="button flex1" onclick={_=>onButtonPress('1')}>1</div>
                    <div className="button flex1" onclick={_=>onButtonPress('2')}>2</div>
                    <div className="button flex1" onclick={_=>onButtonPress('3')}>3</div>
                </div>
                <div className="horizontalLayout">
                    <div className="button flex1" onclick={_=>onButtonPress('4')}>4</div>
                    <div className="button flex1" onclick={_=>onButtonPress('5')}>5</div>
                    <div className="button flex1" onclick={_=>onButtonPress('6')}>6</div>
                </div>
                <div className="horizontalLayout">
                    <div className="button flex1" onclick={_=>onButtonPress('7')}>7</div>
                    <div className="button flex1" onclick={_=>onButtonPress('8')}>8</div>
                    <div className="button flex1" onclick={_=>onButtonPress('9')}>9</div>
                </div>
                <div className="horizontalLayout">
                    <div className="button flex1" onclick={_=>onButtonPress('*')}>*</div>
                    <div className="button flex1" onclick={_=>onButtonPress('0')}>0</div>
                    <div className="button flex1" onclick={_=>onButtonPress('#')}>#</div>
                </div>
                <div className="horizontalLayout">
                    <div className="button flex1" onclick={_=>onButtonPress('+')}>+</div>
                    <div className="flex1"/>
                    <div className="button flex1" onclick={_=>onButtonPress('<')}>&lt;</div>
                </div>
            </div>
            <div className='horizontalLayout'>
                <div className="flex1" style={{textAlign: 'center'}} onclick={navigateToHome}>
                    <Home height={100}/>
                </div>
                <div className="flex1" style={{textAlign: 'center'}} onclick={dialNumber}>
                    <StatelessPhone height={100}/>
                </div>
            </div>
        </div>
    );
}