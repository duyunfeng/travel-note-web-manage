import '@wangeditor/editor/dist/css/style.css'; // 引入 css
// @ts-ignore
import { Toolbar, Editor } from '@wangeditor/editor-for-vue';
import type { Component } from 'vue'
const components:Component = {
    Toolbar,
    Editor
}

export const registerEditor = (app: any) => {
    for (const component in components) {
        app.component(component, components[component]);
      }
}