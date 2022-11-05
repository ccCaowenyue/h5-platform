export interface Uuid{
    uuid:string,
}
export interface Size {
    width: number;
    height: number;
}
export interface Vec2 {
    x: number;
    y: number;
}

export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface Font {
    fontSize: number;
    fontFamily: Uuid;
    fontFamiliName: string;
    fontWeight: number;
    fontItaly: boolean;
    fontBold: boolean;
    lineHeight: number;
    lineType: number;
}

export interface CCNode{
    active: boolean;
    activeInHierarchy: boolean;
    name: string;
    uuid: string;
    opacity: number;
    contentSize: Size | null;
    position: Vec2 | null;
    anchorPoint: Vec2 | null;
    color: Color | null;
    _objFlags: number;
    children: any[];
    _id: string;
    zIndex: number;
    isValid: boolean;
    groupIndex: number;
    group: string;
    angle: number;
    nodeType: string;
}

export interface CCLabel extends CCNode{
    font: Font;
}

// export default class DumpDataTemplate {
//     size: Size | null = null;
//     position: Vec2 | null = null;
//     color: Color | null = null;

// }