import { ApiPromise, WsProvider } from '@polkadot/api';
import type { EventRecord } from '@polkadot/types/interfaces';

async function main() {
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });


    api.query.system.events((events: any[]) => {
        console.log(`\nReceived ${events.length} events`);


        events.forEach((record: EventRecord) => {
            const { event } = record;
            if (api.events.balances.Transfer.is(event)) {
                console.log(event.toHuman());
            }
        });
    });

}


main().catch((error) => {
    console.error(error);
    process.exit(-1);
});
