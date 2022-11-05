<template>
    <div class="h5Header">
        <div class="h5Header-logo"></div>
        <div class="h5Header-menu">
            <menuVue :target="true"></menuVue>
        </div>
        <div class="h5Header-menu" style="float:right">
            <publishVue :target="true"></publishVue>
        </div>
    </div>
</template>

<script setup lang="ts">
import menuVue from './menu/menu.vue';
import publishVue from './publish/publish.vue';
</script>

<style lang="scss">
$headerPadding: 5px;
$headerBorder: 1px solid $lightBorderColor;
$headerBackground: white;
$logoSize: 40px;
$logoBackground: #D8D8D8;
$menuWidth: auto;
$menuHeight: 40px;

.h5Header {
    width: 100%;
    height: $headerHeight;
    background: $headerBackground;
    border-bottom: $headerBorder;
    padding: $headerPadding;
    box-sizing: border-box;
    
    &-logo {
        width: $logoSize;
        height: $logoSize;
        margin-left: 10px;
        background: $logoBackground;
        border-radius: $smBorderRadius;
        display: block;
        float: left;
    }

    &-menu {
        width: $menuWidth;
        height: $menuHeight;
        display: block;
        float: left;
        margin-left: 5px;
        padding-left: 5px;
        border-radius: $smBorderRadius;
        display: flex;
        align-items: center;
        // background: red;
    }
}
</style>