import { defaultConfig } from "../config/default.config";
import VueEvent from "../message/eventBus";

export interface GizomoData {
    width: number;
    height: number;
    x: number;
    y: number;
    active: boolean;
    uuid: string;
}
export default class GizmoWorker {
    gizmoWorker: GizmoWorker | null = null;
    gizmoDataList: GizomoData[] = [];
    constructor() {
        if (this.gizmoWorker) {
            return this.gizmoWorker;
        }
    }

    // @ts-ignore
    createGizmo(node: cc.Node) {
        let gizmo = this.gizmoDataList.find((item) => {
            return item.uuid === node.uuid;
        })
        if (gizmo) {
            return;
        }
         // @ts-ignore
        let canvas = cc.find('Canvas');
        let sceneRatioX = defaultConfig.designResolution.width / canvas.width;
        let sceneRatioY = defaultConfig.designResolution.height / canvas.height;
        let gizmoData = {
            width: node.width * sceneRatioX,
            height: node.height * sceneRatioY,
            x: defaultConfig.designResolution.width / 2 - node.width * sceneRatioX / 2,
            y: defaultConfig.designResolution.height / 2 - node.height * sceneRatioX / 2,
            active: true,
            uuid: node.uuid
        }
        this.gizmoDataList.push(gizmoData);
        // @ts-ignore
        globalThis.gizmoDataList = this.gizmoDataList;

        // @ts-ignore
        VueEvent.emit('scene-gizmo-update', this.gizmoDataList);
    }

    onGizmoChange(action: string, item: Object, index: number) {
        console.log(action);
        
        // @ts-ignore
        let canvas = cc.find('Canvas');
        let sizer = document.getElementById(`sizer${index}`);
        if (!sizer) {
            return;
        }

        let x = sizer?.offsetLeft - defaultConfig.designResolution.width / 2 + sizer.offsetWidth / 2;
        let y = sizer?.offsetTop - defaultConfig.designResolution.height / 2 + sizer.offsetHeight / 2;

        let ratioX = x / defaultConfig.designResolution.width;
        let ratioY = y / defaultConfig.designResolution.height;

        let gizmo = this.gizmoDataList[index];
        // @ts-ignore
        let node = globalThis.nodeList[gizmo.uuid];
        node.setPosition(canvas.width * ratioX, - canvas.height * ratioY);


        let sceneRatioX = defaultConfig.designResolution.width / canvas.width;
        let sceneRatioY = defaultConfig.designResolution.height / canvas.height;
        // @ts-ignore
        node.setContentSize(item.width / sceneRatioX, item.height / sceneRatioY);

        if (action === 'activated') {
            // @ts-ignore
            globalThis.currentSelectNode = node;
            VueEvent.emit('scene-node-select');
        }

        if (action === 'deactivated') {
            // @ts-ignore
            if (globalThis.currentSelectNode === node) {
                // @ts-ignore
                globalThis.currentSelectNode = null;
                VueEvent.emit('scene-node-unselect');
            }
            
            
        }
    }
}

export let gizmoWorker = new GizmoWorker();