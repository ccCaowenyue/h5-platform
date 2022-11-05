import * as _ from "lodash";
import type { CCNode } from "../config/dump.config";
import { scriptConfig } from "../config/script.config";
import { nodeOperation } from "./nodeOperation";
const IgnoreNodeList = ['Main Camera','Light'];
export default class NodeDataWorker {
    nodeDataWorker: NodeDataWorker | null = null;
    constructor() {
        if (this.nodeDataWorker) {
            return this.nodeDataWorker;
        }
    }

    rebuildNode(data:any) {
        let parseData = JSON.parse(data);
        // @ts-expect-error
        let canvas = cc.find('Canvas');
        function deepNodeData(nodeData: any,parentNode:any) {
            if (nodeData.name !== 'Canvas') {
                let node = nodeOperation.createNode();
                node = nodeOperation.initNode(node, nodeData);
                for (let index = 0; index < nodeData.children.length; index++) {
                    deepNodeData(nodeData.children[index], node);
                }
            } else {
                for (let index = 0; index < nodeData.children.length; index++) {
                    deepNodeData(nodeData.children[index], canvas);
                }
            }
        }
        deepNodeData(parseData, canvas);
    }

    generateDumpData() {
        // @ts-expect-error
        let canvas = cc.find('Canvas');
        let dumpData: any = [];

        function genereteNodeData(node: any) {

            let data = {
                name: node.name,
                opacity: node.opacity,
                uuid: node.uuid,
                contentSize: {
                    width: node.width,
                    height: node.height
                },
                position: {
                    x: node.x,
                    y: node.y
                },
                color: {
                    r: node.color.r,
                    g: node.color.g,
                    b: node.color.b,
                    a: node.color.a,
                },
                children: [],
                active: node.active,
                activeInHierarchy: node.activeInHierarchy,
                anchorPoint: node.anchorPoint,
                _objFlags: node._objFlags,
                _id: node.id,
                zIndex: node.zIndex,
                isValid: node.isValid,
                groupIndex: node.groupIndex,
                group: node.group,
                angle: node.angle,
                nodeType:'node',
            }
            for (const key in scriptConfig.script) {
                if (Object.prototype.hasOwnProperty.call(scriptConfig.script, key)) {
                    if (node.getComponent(scriptConfig.script[key])) {
                        data['nodeType'] = scriptConfig.script[key];
                    }
                }
            }
            return data;
        }

        // @ts-expect-error
        function deepNode(node: cc.Node, data: any) {
            let nodeData: CCNode = genereteNodeData(node);
            data = nodeData;
            if (node.children.length > 0) {
                for (let index = 0; index < node.children.length; index++) {
                    const element = node.children[index];
                    if (IgnoreNodeList.includes(element.name)) {
                        continue;
                    } else {
                        if (!data.children[index]) {
                            data.children[index] = [];
                        }
                        let dataTemp = data.children[index];
                        data.children[index] = deepNode(element, dataTemp);
                    }
                }
                data.children = data.children.filter((s:any) => { return s;})
            }
            return data;

        }
        dumpData = deepNode(canvas, dumpData);
        console.log(JSON.stringify(dumpData));
    }
}

export let nodeDataWorker = new NodeDataWorker();