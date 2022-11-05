import * as _ from "lodash";
import { unref } from "vue";
import type { CCNode } from "../config/dump.config";
import { gizmoWorker } from "./gizmoWorker";
const IgnoreNodeList = ['Main Camera', 'Light'];
export interface NodeList {
    // @ts-ignore
    [params: string]: cc.Node
}
export default class NoedeOperation {
    nodeOperation: NoedeOperation | null = null;
    nodeList: NodeList[] = [];
    operationFunList: any = {
        'sprite': this.createSprite.bind(this),
        'text': this.createText.bind(this),
        'graphics': this.createGraphics.bind(this),
        'component': this.createComponent.bind(this),
        'background': this.changeBackground.bind(this)
    };
    constructor() {
        if (this.nodeOperation) {
            return this.nodeOperation;
        }
    }

    // @ts-ignore
    createGizmo(node: cc.Node) {
        gizmoWorker.createGizmo(node);
        this.nodeList[node.uuid] = node;
        // @ts-ignore
        globalThis.nodeList = this.nodeList;
    }

    // @ts-ignore
    initNode(node: cc.Node, data: CCNode) {
        if (data.contentSize) {
            node.setContentSize(data.contentSize.width, data.contentSize.height);
        }
        if (data.position) {
            node.setPosition(data.position.x, data.position.y);
        }
        if (data.anchorPoint) {
            node.anchorPoint.x = data.anchorPoint.x;
            node.anchorPoint.y = data.anchorPoint.y;
        }
        if (data.color) {
            // @ts-ignore
            node.color = new cc.Color(data.color);
        }
        node.active = data.active;

        node.name = data.name;

        node.opacity = data.opacity;
        node._objFlags = data._objFlags;
        node._id = data._id;
        node.zIndex = data.zIndex;
        node.group = data.group;
        node.groupIndex = data.groupIndex;
        node.angle = data.angle;

        if (data.nodeType) {
            node.addComponent(data.nodeType);
        }
        return node;
    }

    insertAsset(data: any) {
        if (!data || !data.data) {
            return;
        }
        this.operationFunList[data.data] && this.operationFunList[data.data](data);
    }

    /**
     *  创建普通节点
     * @returns 
     */
    createNode() {
        // @ts-ignore
        let canvas = cc.find('Canvas');
        // @ts-ignore
        let node = new cc.Node('New Node');
        node.setContentSize(100, 100);
        node.setPosition(0, 0);
        node.parent = canvas;
        this.createGizmo(node);
        return node;
    }

    /**
     * 创建文字
     * @param data 
     * @returns 
     */
    async createText(data: any) {
        // @ts-ignore
        let node = await this.loadAssets('component/text', cc.Prefab);
        if (!node) {
            return;
        }
        let label = node.getComponent(cc.Label);
        if (!label) {
            return;
        }
        if (data) {
            label.string = `文字 ${data.params}`;
        }

    }

    /**
     * 创建图片
     */
    createSprite(data: any) {
        // @ts-ignore
        this.loadAssets('component/sprite', cc.Prefab);
    }

    /**
     * 创建元素
     * @param data 
     * @returns 
     */
    async createGraphics(data: any) {
        // @ts-ignore
        let node = await this.loadAssets('component/graphics', cc.Prefab);
        if (!node) {
            return;
        }
        let label = node.getComponentInChildren(cc.Label);
        if (!label) {
            return;
        }
        if (data) {
            label.string = `元素 ${data.params}`;
        }
    }
    /**
     * 创建组件
     */
    createComponent(data: any) {
        // @ts-ignore
        this.loadAssets('component/component', cc.Prefab);
    }

    /**
     * 修改背景
     */
    changeBackground(data: any) {
        console.log(data);
        let background = cc.find('Canvas/background');
        if (!background) {
            return;
        }
        let params = unref(data.params);
        let color = this.hexToRgb(params.color);
        background.color = color;
        // let sprite = background.getComponent(cc.Sprite);
        // if (!sprite) {
        //     return;
        // }
        // sprite.node.
    }

    hexToRgb(hex: string) {
        let alpha = false;
        let h: string | number = hex.slice(hex.startsWith('#') ? 1 : 0);
        if (h.length === 3) h = [...h].map(x => x + x).join('');
        else if (h.length === 8) alpha = true;
        h = parseInt(h, 16);
        let color = new cc.Color(
            h >>> (alpha ? 24 : 16),
            (h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8),
            (h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0),
            h & 0x000000ff
        );
        return color;
    }


    /**
     * 加载资源
     * @param path 资源路径
     * @param type 资源类型
     * @param cb 完成回调
     * @returns node ｜ Error
     */
    // @ts-ignore
    loadAssets(path: string, type: any = cc.Prefab) {
        if (!path) {
            console.warn(`Error path: ${path}`);
            return false;
        }

        return new Promise((rs, rj) => {
            // @ts-ignore
            cc.resources.load(path, type, (error: any, res: cc.Prefab) => {
                if (error) {
                    rj(error);
                } else if (res) {
                    // @ts-ignore
                    let canvas = cc.find('Canvas');
                    // @ts-ignore
                    let node = cc.instantiate(res);
                    node.parent = canvas;
                    this.createGizmo(node);
                    rs(node);
                }
            })
        })
    }


}

export let nodeOperation = new NoedeOperation();