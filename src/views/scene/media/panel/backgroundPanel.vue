<template>
    <div class="materialPanel">
        <div class="materialPanel-search">
            <a-input style="width: 100%;height: 100%;" v-model:value="userName" placeholder="搜索素材">
                <template #prefix>
                    <i class="ri-search-line"></i>
                </template>
                <template #suffix>
                    <a-tooltip title="Search by color">
                        <i class="ri-equalizer-line"></i>
                    </a-tooltip>
                </template>
            </a-input>
        </div>

        <div class="materialPanel-detail">
            <div class="materialPanel-detail-type">
                <div v-for="(item, index) in colorType" :key="index" class="materialPanel-detail-type-item"
                    :style="`background:${item.color}`">
                </div>
            </div>

            <div class="materialPanel-detail-list">
                <div class="materialPanel-detail-list-content">
                    <div v-for="(item, index) in colorType"
                        :key="index" 
                        @click="insertAsset(item)"
                        class="materialPanel-detail-list-content-item"
                        :style="`background:${item.color}`">
                         
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
const colorType = ref([
    {
        name: '红色',
        type: 'red',
        color: '#D55D58',

    },
    {
        name: '黄色',
        type: 'yellow',
        color: '#F9D959'
    },
    {
        name: '绿色',
        type: 'green',
        color: '#82BA65'
    },
    {
        name: '蓝色',
        type: 'blue',
        color: '#6579EC'
    },
    {
        name: '紫色',
        type: 'purple',
        color: '#906DE6',

    },
])

const insertAsset = (data: any) => {
    VueEvent.emit(`scene-insert-asset`, { data: { action: 'background', data: 'background', params: data } });
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
            height: 25px;
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
                    cursor: pointer;
                }
            }
        }
    }
}
</style>