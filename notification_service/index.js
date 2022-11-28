import Notify from "./src/services/notify.js";

async function start(){
    const notify = new Notify();
    await notify.init()
    notify.startConsumer((message) => {
        console.log(message)
    })
}

start();
