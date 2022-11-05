<template>
    <a-menu @select="onSelect" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="light"
        :inline-collapsed="collapsed">
        <a-menu-item v-for="(item, index) in menu" :key="index" style="height: 80px">
            <div class="h5Aside-menu-item-icon">
                <i :class="item.icon"></i>
            </div>
            <div class="h5Aside-menu-item-text">
                {{ item.name }}
            </div>
        </a-menu-item>
    </a-menu>
</template>
<script lang="ts" setup>
import { mcfg } from '@/worker/config/menu.config';
import VueEvent from '@/worker/message/eventBus';
import { reactive, ref } from 'vue';
const collapsed = ref(false);
const selectedKeys = ref([0]);
const openKeys = ref(['sub1']);
const preOpenKeys = ref(['sub1']);
const menu = ref(mcfg.asideMenu);
const onSelect = (event:any) => {
    let item = mcfg.asideMenu[event.key];
    VueEvent.emit(`aside-menu-change`, item);
}
</script>
<style lang="scss" scoped>
.h5Aside-menu-item {
    &-icon {
        font-size: 25px;
        i{
            font-size: 25px;
        }
    }

    &-text {
        margin-top: -15px;
        font-size: 12px;
    }
}
</style>