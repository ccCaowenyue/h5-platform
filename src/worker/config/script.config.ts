import Config, { type ConfigData } from "./config.base";

export default class ScriptConfig {
    script:any = {
        ccLabel: 'cc.Label',
        ccSprite: 'cc.Sprite'
    }
}

export let scriptConfig = new ScriptConfig();