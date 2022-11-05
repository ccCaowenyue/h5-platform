<template>
    <div class="inspector">
        <div class="inspector-menu">
            <a-menu @select="onSelect" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="horizontal"
                theme="light" :inline-collapsed="collapsed">
                <a-menu-item v-for="(item, index) in menu" :key="index" style="height: 50px;width: 100px;">
                    <div style="float:left;padding-right: 10px;">
                        <i :class="item.icon"></i>
                    </div>
                    <div style="padding-left:5px">
                        {{ item.name }}
                    </div>
                </a-menu-item>
            </a-menu>
        </div>
        <div class="inspector-panel">
            <div class="inspector-attr" v-show="panelMatrix[0]">
                属性列表
                {{currentNode && currentNode.name}}
            </div>
            <div class="inspector-animation" v-show="panelMatrix[1]">
                动画列表
            </div>
            <div class="inspector-interactive" v-show="panelMatrix[2]">
                交互列表
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import VueEvent from '@/worker/message/eventBus';
import { ref } from 'vue';

const collapsed = ref(false);
const selectedKeys = ref([0]);
const openKeys = ref(['sub1']);
const preOpenKeys = ref(['sub1']);
const panelMatrix = ref([true, false, false]);
const currentNode = ref<any>(null);

const menu = ref([
    {
        name: '属性',
        type: 'attr',
        icon: 'ri-settings-6-line'
    },
    {
        name: '动画',
        type: 'animation',
        icon: 'ri-star-line'
    },
    {
        name: '交互',
        type: 'interactive',
        icon: 'ri-apps-fill'
    }
])
const onSelect = (event: any) => {
    for (let index = 0; index < panelMatrix.value.length; index++) {
        panelMatrix.value[index] = false;
    }
    panelMatrix.value[event.key] = true;
}

VueEvent.on('scene-node-select', () => {
    currentNode.value = globalThis.currentSelectNode;
});
VueEvent.on('scene-node-unselect', () => {
    currentNode.value = null;
});
</script>
<style lang="scss" scoped>
.inspector {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    &-menu{
        height: 50px;
    }
    &-panel{
        flex: 1;
        overflow-y: scroll;
        padding: 10px;
        box-sizing: border-box;
        // background: red;
    }
    &-attr{

    }
    &-animation{

    }
    &-interactive{

    }
}
</style>