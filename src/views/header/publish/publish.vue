
<template>
    <a-button :type="publishItem.type" class="publish-button" v-for="(publishItem, publishIndex) in config" :key="publishIndex">
        <div class="publish-button-icon">
            <i :class="publishItem.icon"></i>
        </div>
        <div class="publish-button-text  text-base-content">
            {{ publishItem.name }}
        </div>
    </a-button>
</template>

<script lang="ts" setup>
import { ref, toRef } from 'vue';

const props = defineProps({
    target: {
        type: Boolean,
        default: false
    }
})

const target = toRef(props, 'target');
const config = ref([
    {
        name: '设置',
        action: 'setting',
        type: 'text'
    },
    {
        name: '预览',
        action: 'preview',
        type: 'text'
    },
    {
        name: '发布',
        action: 'publish',
        type: 'primary',
        icon: 'ri-send-plane-fill'
    }
]);

const handlepublishClick = (data: any) => {
    // @ts-expect-error
    VueEvent.emit(`scene-${data.action}`, { data: data })
}
</script>

<style lang="scss">
$publishTitleInputBg: #F6F7F9;

.ant-popover-inner {
    border-radius: $smBorderRadius !important;
}

.publish-title {
    padding: 10px 0px 10px 0px;

    textarea {
        padding: 10px;
        border: none;
        outline: none;
        border-radius: $smBorderRadius;
        resize: none;
        font-weight: bolder;

        &:hover {
            background: $publishTitleInputBg;
            cursor: pointer;
        }

        &:focus {
            cursor: text;
            outline: 1px solid #85B5FA;
            box-sizing: border-box;
        }
    }
}

.publish-buttons {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .publish-button {
        margin-top: 10px;
        text-align: left;


    }

}

.publish-button-icon {
    font-size: 20px;
    padding-right: 10px;
    line-height: 20px;
    float: left;
}

.publish-button-text {
    float: left;
    vertical-align: center;

}
</style>