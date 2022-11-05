import Config, { type ConfigData } from "./config.base";

export default class MenuConfig extends Config {
    config: ConfigData[] = [
        {
            name: '文件',
            action: 'file',
            title:'电商双十一返场家居活动产品长图海报',
            children: [
                {
                    name: '新建',
                    action: 'new-file',
                },
                {
                    name: '保存',
                    action: 'save',
                },
                {
                    name: '退出',
                    action: 'quit',
                }
            ]
        },
        {
            name: '工具',
            action: 'tool',
            children: [
                {
                    name: '全选',
                    action: 'select-all',
                },
                {
                    name: '删除',
                    action: 'delete',
                },
                {
                    name: '撤销',
                    action: 'back',
                }
            ]
        },
        {
            name: '场景',
            action: 'scene',
            children: [
                {
                    name: '空节点',
                    action: 'insert-asset',
                    data: 'empty'
                },
                {
                    name: '文字节点',
                    action: 'insert-asset',
                    data: 'text'
                },
                {
                    name: '精灵节点',
                    action: 'insert-asset',
                    data: 'sprite'
                }
            ]
        }
    ];
    asideMenu: ConfigData[] = [
        {
            name: '元素',
            action: 'graphics',
            icon: 'ri-send-backward'
        },
        // {
        //     name: '模板',
        //     action: 'template',
        //     icon: 'ri-layout-2-line'
        // },
        {
            name: '文字',
            action: 'text',
            icon: 'ri-emphasis-cn'
        },
        {
            name: '照片',
            action: 'sprite',
            icon: 'ri-image-line'
        }, 
        {
            name: '背景',
            action: 'background',
            icon: 'ri-mist-line'
        },
        {
            name: '组件',
            action: 'component',
            icon: 'ri-briefcase-3-fill'
        },
        {
            name: '我的',
            action: 'mine',
            icon: 'ri-upload-cloud-2-line'
        }
    ]
}

export let mcfg = new MenuConfig();