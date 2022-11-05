<template>
    <div class="materialPanel">
        <div class="materialPanel-detail">
            <div class="materialPanel-detail-list" v-for="(item, index) in panelDetailType" :key="index">
                <div class="materialPanel-detail-list-bar">
                    <div class="materialPanel-detail-list-bar-left"> {{ item.name }}</div>
                </div>
                <div class="materialPanel-detail-list-content">
                    <div v-for="(item, index) in 6"
                        :key="index" 
                        @click="insertAsset(item)"
                        class="materialPanel-detail-list-content-item">
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VueEvent from '@/worker/message/eventBus';
import { ref } from 'vue';
const userName = ref('');
const materialType = ref([
    {
        name: '形状',
        type: 'cube',
        color: '#58C1CA',

    },
    {
        name: '容器',
        type: 'container',
        color: '#E77855'
    },
    {
        name: '图标',
        type: 'icon',
        color: '#ABB97B'
    },
    {
        name: '箭头',
        type: 'arrow',
        color: '#6588F7'
    }
])

const panelDetailType = ref([
    {
        name: '数据收集',
        type: 'suggest'

    },
    {
        name: '数据展示',
        type: 'base'
    },
    {
        name: '互动',
        type: 'line'

    },
    {
        name: '功能',
        type: 'graphics'
    }
])

const insertAsset = (data: any) => {
    VueEvent.emit(`scene-insert-asset`, { data: { action: 'component', data: 'component', params: data } });
}
</script>

<style lang="scss" scoped>
.input-group-md {
    height: 40px !important;
}

.input-md {
    height: 40px !important;
    width: 100%;
}

.materialPanel {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &-search {
        height: 40px;
        width: 100%;

        .ant-input-affix-wrapper {
            border-radius: $smBorderRadius !important;
        }
    }

    &-detail {
        width: 100%;
        height: 100%;
        overflow-y: scroll;

        &-type {
            height: 40px;
            width: 100%;
            display: flex;
            gap: 10px;
            margin-top: 10px;
            line-height: 40px;

            &-item {
                text-align: center;
                box-sizing: border-box;
                flex: 1;
                border-radius: $smBorderRadius;
                color: white;
                cursor: pointer;

                &:hover {
                    opacity: 0.8;
                }
            }
        }

        &-list {
            width: 100%;
            margin-top: 10px;

            &-bar {
                display: flex;
                cursor: pointer;

                &-left {
                    flex: 1;
                    font-weight: bolder;
                    text-align: left;
                    color: $fontColor;
                }

                &-right {
                    flex: 1;
                    color: #A0A0A0;
                    text-align: right;

                    i {
                        font-size: 20px;
                    }
                }
            }

            &-content {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 10px;

                &-item {
                    box-sizing: border-box;
                    width: 30%;
                    padding: 10%;
                    text-align: center;
                    flex-wrap: wrap;
                    background: rgb(243, 243, 243);
                    border-radius: $smBorderRadius;
                }
            }
        }
    }
}
</style>