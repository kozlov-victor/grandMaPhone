import {VEngineTsxFactory} from "@engine/renderable/tsx/genetic/vEngineTsxFactory.h";
import {NativeBridge} from "../nativeBridge";

export interface IGrantedPermissionInfo {
    permission: string;
    granted: boolean;
}

export const SettingsStorage = {
    permissionsInfo: [] as IGrantedPermissionInfo[],
    onChanged: () => {
    },
}

const requestPermission = async (permission:string)=> {
    await NativeBridge.callHostCommand('requestPermission',{permission});
}

export const SettingsPage = ()=>{
    return (
        <>
            <div className="list">
                <ul>
                    {
                        SettingsStorage.permissionsInfo.map(it=>
                            <li onclick={e=>!it.granted && requestPermission(it.permission)}
                                style={{backgroundColor:it.granted?'green':'red'}}>
                                {it.permission}
                            </li>
                        )
                    }
                </ul>
            </div>
        </>
    );
}