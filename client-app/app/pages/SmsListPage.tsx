import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {NativeBridge} from "../nativeBridge";
import {Home} from "../components/home";
import {Router} from "../router/router";
import {SmsStorage} from "../components/sms";
import {formatDate} from "../utils/timeUtil";

interface ISms {
    id: string;
    address: string;
    msg: string;
    readState: string; //"0" for have not read sms and "1" for have read sms
    time: number;
}

export const SmsListStore = {
    pending: false,
    records: [] as ISms[],
    loadList: async ()=>{
        SmsStorage.unreadSmsNumber = 0;
        SmsListStore.pending = true;
        SmsListStore.onChanged();
        SmsListStore.records = await NativeBridge.callHostCommand<ISms[]>('getSmsList');
        SmsListStore.pending = false;
        SmsListStore.onChanged();
    },
    onChanged: () => {
    },
};


const navigateToHome = ()=>{
    Router.navigateTo('home');
}

export const SmsListPage = ()=>{
    return (
        <>
            <h3>SMS сообщения</h3>
            <div className="list">
                <ul>
                    {
                        SmsListStore.pending &&
                        <li style={{background: 'none'}}>
                            Загрузка...
                        </li>
                    }
                    {
                        !SmsListStore.pending && SmsListStore.records.length === 0 &&
                        <li style={{background: 'none'}}>
                            Нет сообщений
                        </li>
                    }
                    {
                        !SmsListStore.pending && SmsListStore.records.map(it=>
                            <li>
                                <div>{formatDate(it.time)} {it.address}</div>
                                <div>{it.msg}</div>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className='horizontalLayout'>
                <div className="flex1" style={{textAlign: 'center'}} onclick={navigateToHome}>
                    <Home height={100}/>
                </div>
            </div>
        </>
    );
}