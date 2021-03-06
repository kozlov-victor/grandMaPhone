import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {StatelessPhone} from "../components/phone";
import {NativeBridge} from "../nativeBridge";
import {Home} from "../components/home";
import {Router} from "../router/router";
import {formatDate} from "../utils/timeUtil";
import {DialNumberStorage} from "./dialNumberPage";
import {MobileOperatorInfoStorage} from "./homePage";
import {initializeCall} from "./_fns";

interface IMissedCall {
    nameFromPhoneBook?: string;
    phone: string;
    callDate: number;
}

export const MissedCallsStore = {
    pending: false,
    missedCalls: [] as IMissedCall[],
    loadMissedPhoneList: async ()=>{
        MissedCallsStore.pending = true;
        MissedCallsStore.onChanged();
        MissedCallsStore.missedCalls = await NativeBridge.callHostCommand<IMissedCall[]>('getMissedCalls');
        MissedCallsStore.pending = false;
        MissedCallsStore.onChanged();
    },
    onChanged: () => {
    },
};


const navigateToHome = ()=>{
    Router.navigateTo('home');
}

const navigateToDialNumber = ()=>{
    DialNumberStorage.number = '';
    Router.navigateTo('dialNumber');
}


export const MissedCallsPage = ()=>{
    return (
        <>
            <h3>Пропущенные звонки</h3>
            <div className="list">
                <ul>
                    {
                        MissedCallsStore.pending &&
                        <li style={{background: 'none'}}>
                            Загрузка...
                        </li>
                    }
                    {
                        !MissedCallsStore.pending && MissedCallsStore.missedCalls.length === 0 &&
                        <li style={{background: 'none'}}>
                            Нет пропущенных звонков
                        </li>
                    }
                    {
                        !MissedCallsStore.pending && MissedCallsStore.missedCalls.map(it=>
                            <li  onclick={_=> initializeCall(it.phone,it.nameFromPhoneBook)}>
                                <div className="list_item_title">{it.nameFromPhoneBook || it.phone}</div>
                                <div className="list_item_text">{formatDate(it.callDate)}</div>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className='horizontalLayout'>
                <div className="flex1" style={{textAlign: 'center'}} onclick={navigateToHome}>
                    <Home height={100}/>
                </div>
                <div className="flex1" style={{textAlign: 'center'}} onclick={navigateToDialNumber}>
                    <StatelessPhone height={100}/>
                </div>
            </div>
        </>
    );
}