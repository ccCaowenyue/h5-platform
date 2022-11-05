// 配置参数
export interface ConfigData {
    // 名称
    name: string,
    // 标题
    title?:string,
    // 图标
    icon?: string,
    // 动作
    action: string,
    // 回调函数
    callback?: Function,
    // 对象
    target?: Function,

    // 参数
    data?: any,

    // 子菜单
    children?: ConfigData[],
}
export default abstract class Config {
    abstract config: ConfigData[];
}