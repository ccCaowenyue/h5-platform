
<template>
    <a-popover placement="bottomLeft" v-for="(menuItem, menuIndex) in config" :key="menuIndex">
        <template #title v-if="menuItem.title">
            <div class="menu-title">
                <textarea type="text" v-model="menuItem.title" />
            </div>
        </template>
        <template #content>
            <div class="menu-buttons">
                <a-button type="text" class="menu-button" v-for="(item, itemIndex) in menuItem.children"
                    :key="itemIndex" @click="handleMenuClick(item)">
                    <div class="menu-button-icon">
                        <i :class="item.icon"></i>
                    </div>
                    <div class="menu-button-text">
                        {{ item.name }}
                    </div>
                </a-button>
            </div>
        </template>
        <a-button type="text" class="menu-button">
            <div class="menu-button-icon">
                <i :class="menuItem.icon"></i>
            </div>
            <div class="menu-button-text  text-base-content">
                {{ menuItem.name }}
            </div>
        </a-button>
    </a-popover>
</template>

<script lang="ts" setup>
import { mcfg } from '@/worker/config/menu.config.js';
import { ref, toRef } from 'vue';

const props = defineProps({
    target: {
        type: Boolean,
        default: false
    }
})

const target = toRef(props, 'target');
const config = ref(mcfg.config);

const handleMenuClick = (data: any) => {
    // @ts-expect-error
    VueEvent.emit(`scene-${data.action}`, { data: data })
}
</script>

<style lang="scss">
$menuTitleInputBg: #F6F7F9;

.ant-popover-inner {
    border-radius: $smBorderRadius !important;
}

.menu-title {
    padding: 10px 0px 10px 0px;

    textarea {
        padding: 10px;
        border: none;
        outline: none;
        border-radius: $smBorderRadius;
        resize: none;
        font-weight: bolder;

        &:hover {
            background: $menuTitleInputBg;
            cursor: pointer;
        }

        &:focus {
            cursor: text;
            outline: 1px solid #85B5FA;
            box-sizing: border-box;
        }
    }
}

.menu-buttons {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .menu-button {
        margin-top: 10px;
        text-align: left;


    }

}

.menu-button-icon {
    font-size: 20px;
    padding-right: 10px;
    line-height: 20px;
    float: left;
}

.menu-button-text {
    float: left;
    vertical-align: center;

}
</style>