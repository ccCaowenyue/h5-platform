<template>
    <div class="h5Scene">
        <div class="h5Scene-aside">
            <asideVue></asideVue>
        </div>
        <div class="h5Scene-media" v-show="showMediaPanel">
            <mediaVue></mediaVue>
            <div class="tag" @click="hideMediaPanel"></div>
        </div>
        <div class="h5Scene-scene">
            <sceneVue></sceneVue>
        </div>
        <div class="h5Scene-inspector">
            <inspectorVue></inspectorVue>
        </div>
    </div>
</template>
<script setup lang="ts">
import asideVue from './aside/aside.vue';
import sceneVue from './scene/scene.vue';
import mediaVue from './media/media.vue';
import inspectorVue from './inspector/inspector.vue';
import { ref } from 'vue';
import VueEvent from '@/worker/message/eventBus';
const showMediaPanel = ref(true);
const hideMediaPanel = () => {
    showMediaPanel.value = false;
}
VueEvent.on('aside-menu-change', () => {
    showMediaPanel.value = true;
})
</script>
<style lang="scss" scoped>
.h5Scene {
    width: 100%;
    height: calc(100vh - $headerHeight);
    display: flex;
    &-aside{
        width: auto;
        height: 100%;
        border-right: 1px solid $lightBorderColor;
    }
    &-media{
        width: 300px;
        min-width: 300px;
        height: 100%;
        z-index: 999;
    }
    &-scene{
        flex: 1;
        height: 100%;
        z-index: 1;
        overflow: scroll;
    }
    &-inspector{
        width: 300px;
        min-width: 300px;
        height: 100%;
    }
}
.tag{
    width: 15px;
    height: 50px;
    z-index: 999;
    margin-top: -50vh;
    margin-right: -15px;
    float: right;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAACACAMAAABOb9vcAAAAhFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAADHx8cODg50dHTx8fF2dnZ1dXWWlpZHR0c4ODhQpkZ5AAAAIXRSTlMA9t+/upkRAnPq5NXDfDEsKQjMeGlRThkMsquljTwzIWhBHpjgAAABJElEQVRYw+3YyW7CQBCEYbxig8ELGJyQkJRJyPb+75dj3zy/lD7kMH3+ZEuzSFO1mlZwhjOE2uwhVHJYMygNVwilhz2EUvNaMigledUFoE1anKYAtA9nVRuANpviOQBt0t2ZQSnZ9QxK6Qih9LSGUHkJobYlhGp6CPW4hlAVhckLhMop1InCjEK1FBYU1hSqo/BI4YXCjMIthTWFijDCCB3g7fuO4O1t/rkvQXPz/LUIzX0oAM0tQHOfCkBzC9DcuwLQXACao9Dv1yb9lsek2xaaxMcMH1x6Ff79dY0wwgj/DGv3p2tG4cX9wd55h4rCO/hk3uEs9w6QlXPIbXrfIJ6XrmVBOtJCA1YkXqVLkh1aUgyNk1fV1BxLxzpsuNLKzrME/AWr0ywwvyj83AAAAABJRU5ErkJggg==');
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
}
</style>