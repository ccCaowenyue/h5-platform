import * as _ from "lodash";
import { ref, unref } from "vue";
import { defaultConfig } from "../config/default.config";
import VueEvent from './../message/eventBus';
import { nodeDataWorker } from "./nodeDataWorker";
import { nodeOperation } from "./nodeOperation";
const MessageOrigin = 'scene';
interface EventList {
    [params: string]: Function;
}
export default class SceneWorker {
    sceneWorker: SceneWorker | null = null;
    eventList: EventList = {
        'insert-asset': (origin: string) => {
            VueEvent.off(`${origin}-insert-asset`, this.insertAsset);
            VueEvent.on(`${origin}-insert-asset`, this.insertAsset);
        },
        'save': (origin: string) => {
            VueEvent.off(`${origin}-save`, this.save);
            VueEvent.on(`${origin}-save`, this.save);
        }
    };
    constructor() {
        if (this.sceneWorker) {
            return this.sceneWorker;
        }
    }
    init(contentWindow: any) {
        this.initEvent();
        // @ts-expect-error
        globalThis.cc = contentWindow.cc || {};
        console.log('Scene start loading ...');
        // @ts-expect-error
        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, () => {
            // @ts-expect-error
            let canvas = cc.find('Canvas');
            // @ts-expect-error
            let component = canvas.getComponent(cc.Canvas);
            console.log(component);
            
            // canvas.designResolution
            component.designResolution.width = defaultConfig.designResolution.width;
            component.designResolution.height = defaultConfig.designResolution.height;
        })
    }

    initEvent() {
        // @ts-expect-error
        globalThis.VueEvent = VueEvent;
        for (const key in this.eventList) {
            this.eventList[key](MessageOrigin);
        }
    }



    insertAsset(data: any): any {
        if (!data) {
            return;
        }
        nodeOperation.insertAsset(unref(data.data));
    }

    save(data: any) {
        nodeDataWorker.generateDumpData();
    }
}

export let sceneWorker = new SceneWorker();