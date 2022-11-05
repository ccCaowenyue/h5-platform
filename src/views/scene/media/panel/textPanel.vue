<template>
    <div class="textPanel">
        <div class="textPanel-search">
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

        <div class="textPanel-detail">
            <div class="textPanel-detail-type">
                <div class="textPanel-detail-type-bar">
                    <div class="textPanel-detail-type-bar-left">
                        文字
                    </div>

                </div>
                <div v-for="(item, index) in materialType" :key="index" class="textPanel-detail-type-item"
                    :style="`font-size:${item.fontSize}`">
                    {{ item.name }}
                </div>
            </div>

            <div class="textPanel-detail-list" v-for="(item, index) in panelDetailType" :key="index">
                <div class="textPanel-detail-list-bar">
                    <div class="textPanel-detail-list-bar-left"> {{ item.name }}</div>
                    <div class="textPanel-detail-list-bar-right">
                        <span>全部</span>
                        <i class="ri-arrow-right-s-line" style="float: right;line-height: 20px;"></i>

                    </div>
                </div>
                <div class="textPanel-detail-list-content">
                    <div v-for="(item, index) in 6"
                        :key="index" 
                        @click="insertAsset(item)"
                        class="textPanel-detail-list-content-item">
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
        name: '添加标题',
        type: 'title',
        fontSize: '24px',

    },
    {
        name: '添加副标题',
        type: 'secondTitle',
        fontSize: '18px'
    },
    {
        name: '添加正文',
        type: 'article',
        fontSize: '14px'
    }
])

const panelDetailType = ref([
    {
        name: '为你推荐',
        type: 'suggest'

    },
    {
        name: '基础装饰',
        type: 'base'

    },
    {
        name: '线·箭头',
        type: 'line'

    },
    {
        name: '形状',
        type: 'graphics'

    },
    {
        name: '容器',
        type: 'container'

    },
])

const insertAsset = (data: any) => {
    VueEvent.emit(`scene-insert-asset`, { data: { action: 'text', data: 'text', params: data } });
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

.textPanel {
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

            // height: 40px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 10px;
            line-height: 40px;

            &-item {
                text-align: center;
                box-sizing: border-box;
                flex: 1;
                border-radius: $smBorderRadius;
                color: $fontColor;
                background: $lightBorderColor;
                box-sizing: border-box;
                padding: 5px;
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