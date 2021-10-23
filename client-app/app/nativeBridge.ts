
export namespace NativeBridge {

    const callBacks:Record<string, {cb:(payload:any)=>void, once:boolean}> = {};
    let nextId:number = 0;

    export const subscribeToEvent = (eventId:string,cb:(payload:any)=>void,once:boolean = true):void=> {
        callBacks[eventId] = {cb,once};
    }


    export const onEventReceivedFromHost = ({eventId,payload} : {eventId:string,payload:string}):void=> {
        console.log('onEventReceivedFromHost',eventId,JSON.stringify(payload));
        if (callBacks[eventId]) {
            callBacks[eventId].cb(payload);
            if (callBacks[eventId].once) delete callBacks[eventId];
        } else {
            console.log(`unknown host event`);
        }
    }

    export const callHostCommand = async <PAYLOAD>(commandName:string):Promise<PAYLOAD>=> {
        const eventId = nextId.toString();
        nextId++;
        let resolveFn:(payload:PAYLOAD)=>void = undefined!;
        const p = new Promise<PAYLOAD>((resolve, reject) =>{
            resolveFn = resolve;
        });
        subscribeToEvent(eventId,(payload:PAYLOAD)=>resolveFn(payload),true);
        setTimeout(()=>{
            (window as any).__host__.callHostCommand(commandName,eventId);
        },1);
        return p;
    }

}