<template>
    <div class="scene-container" id="scene-container">
        <div class="h5EngineScene">
            <div class="h5EngineContainer"
                ref="h5EngineContainer"
                id="h5EngineContainer"
                :style="`width:${defaultConfig.designResolution.width}px;height:${defaultConfig.designResolution.height}px`">
                <iframe id="h5Engine" style="width:100%;height:100%" ref="h5Engine" class="h5Engine"
                    src="h5-framework/index.html" frameborder="0"></iframe>
                <DraggableContainer :key="key">
                    <Vue3DraggableResizable classNameDraggable="gizmo" :parent="true" v-for="(item, index) in sizerData"
                        :key="index" :initW="item.width" :initH="item.height" :id="`sizer${index}`" v-model:x="item.x"
                        v-model:y="item.y" v-model:w="item.width" v-model:h="item.height" v-model:active="item.active"
                        :draggable="true" :resizable="true"
                        @activated="gizmoWorker.onGizmoChange('activated', item, index)"
                        @deactivated="gizmoWorker.onGizmoChange('deactivated', item, index)"
                        @drag-start="gizmoWorker.onGizmoChange('drag-start', item, index)"
                        @resize-start="gizmoWorker.onGizmoChange('resize-start', item, index)"
                        @dragging="gizmoWorker.onGizmoChange('dragging', item, index)"
                        @resizing="gizmoWorker.onGizmoChange('resizing', item, index)"
                        @drag-end="gizmoWorker.onGizmoChange('drag-end', item, index)"
                        @resize-end="gizmoWorker.onGizmoChange('resize-end', item, index)">
                    </Vue3DraggableResizable>
                </DraggableContainer>
            </div>
        </div>

        <div class="h5EngineBar">
            <div class="h5EngineBar-sizer">
                <div class="button-add">
                    <a-tooltip placement="topLeft">
                        <template #title>
                        <span>放大</span>
                        </template>
                        <i @click="onAddClick" class="ri-add-circle-fill"></i>
                    </a-tooltip>
                    
                </div>
                <div class="sizerNumber">
                    {{`${size}%`}}
                </div>
                <div class="button-indet">
                    <a-tooltip placement="topRight">
                        <template #title>
                        <span>缩小</span>
                        </template>
                        <i @click="onIndeteClick" class="ri-indeterminate-circle-fill"></i>
                    </a-tooltip>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { sceneWorker } from '@/worker/scene/sceneWorker';
import { gizmoWorker } from '@/worker/scene/gizmoWorker';
import VueEvent from '@/worker/message/eventBus';
import { defaultConfig } from '@/worker/config/default.config';
const h5Engine = ref<any>(null);
const h5EngineContainer = ref<any>(null);
// @ts-ignore
const sizerData = ref(globalThis.gizmoDataList);
const key = ref(1);
const size = ref(100);
const gizmoUpdate = (data: any) => {
    sizerData.value = data;
    key.value++;
}
const onAddClick = () => {
    if (size.value < 200) {
        size.value += 10;
    } else {
        return;
    }
    h5EngineContainer.value.style.zoom = `${size.value / 100}`;
}
const onIndeteClick = () => {
    if (size.value >=0) {
        size.value -= 10;
    } else {
        return;
    }
    h5EngineContainer.value.style.zoom = `${size.value / 100}`;
}
onMounted(() => {
    VueEvent.on('scene-gizmo-update', gizmoUpdate);

});
nextTick(() => {
    h5Engine.value.onload = () => {
        console.log('Scene loading ...');
        sceneWorker.init(h5Engine?.value?.contentWindow)
    }
})
</script>

<style scoped lang="scss">
.scene-container {
    width: 100%;
    height: 100%;
    background: #F1F3F4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .h5EngineScene {
        width: 100%;
        flex: 1;
        overflow: scroll;
        // background: #3478C6;
    }

    .h5EngineContainer {
        margin: 20px auto;

        .h5Engine {
            float: left;
        }

        .gizmo {
            &:active {
                border: 1px dashed #3478C6;
            }
        }

        .active {
            border: 1px dashed #3478C6;
        }
    }

    .h5EngineBar {
        width: 100%;
        height: 50px;

        &-sizer {
            width: 120px;
            height: 40px;
            float: right;
            margin-right: 20px;
            border-radius: 50px;
            border: 1px solid $lightBorderColor;
            box-shadow: 0 8px 12px 0 rgb(51 51 51 / 8%);
            background: white;
           display: flex;
            .button-indet {
                width: 35px;
                height: 35px;
                text-align: center;
                float: left;
                font-size: 25px;
                color: #656C77;
                cursor: pointer;
                &:hover{
                    color: #51545a;
                }
            }
            .sizerNumber{
                width: 50px;
                height: 30px;
                margin-top: 4px;
                text-align: center;
                line-height: 30px;
                font-weight: 600;
                float: left;
                color: #656C77;
            }

            .button-add {
                width: 35px;
                height: 35px;
                text-align: center;
                float: right;
                font-size: 25px;
                color: #656C77;
                cursor: pointer;
                &:hover{
                    color: #51545a;
                }
            }
        }
    }
}
</style>