
export namespace NativeBridgeListener {

    const callBacks:Record<string, {cb:(payload:any)=>void, once:boolean}> = {};

    export const subscribeToEvent = (eventId:string,cb:(payload:any)=>void,once:boolean = true):void=> {
        callBacks[eventId] = {cb,once};
    }


    export const onEventReceivedFromHost = ({eventId,payload} : {eventId:string,payload:any}):void=> {
        if (callBacks[eventId]) {
            callBacks[eventId].cb(payload);
            if (callBacks[eventId].once) delete callBacks[eventId];
        } else {
            console.log(`unknown host event: ${{eventId,payload}}`);
        }
    }

}