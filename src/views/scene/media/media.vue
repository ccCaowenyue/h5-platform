<template>
    <div class="media">
        <component :is='component'></component>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueEvent from '@/worker/message/eventBus';
import backgroundPanel from './panel/backgroundPanel.vue';
import componentPanel from './panel/componentPanel.vue';
import graphicsPanel from './panel/graphicsPanel.vue';
import minePanel from './panel/minePanel.vue';
import spritePanel from './panel/spritePanel.vue';
import templatePanel from './panel/templatePanel.vue';
import textPanel from './panel/textPanel.vue';
const components: any = {
    'backgroundPanel': backgroundPanel,
    'componentPanel': componentPanel,
    'graphicsPanel': graphicsPanel,
    'minePanel': minePanel,
    'spritePanel': spritePanel,
    'templatePanel': templatePanel,
    'textPanel': textPanel
}
const component = ref(graphicsPanel);
VueEvent.on(`aside-menu-change`, (item: any) => {
    component.value = components[`${item.action}Panel`];
})
</script>

<style scoped>
.media{
    width:100%;height:100%
}
</style>