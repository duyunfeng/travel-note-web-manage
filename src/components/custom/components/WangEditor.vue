<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 400px; overflow-y: hidden"
      v-model="editorValue"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, inject, defineProps } from 'vue';
import type { IEditorConfig } from '@wangeditor/editor';
import { uploads } from '@/services/index';

const props = defineProps({
  // 默认内容
  content: {
    type: String,
    default: ''
  }
});
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 内容 HTML
const editorValue = inject('editorValue');
const allImages: any = inject('allImages');
const lastUploadImages: any = inject('lastUploadImages');
const mode = ref('simple');

const toolbarConfig = {};
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      //   server: 'http://localhost:3000/api/upload/articlesImage',
      //   headers: {
      //     Authorization: `Bearer ${JSON.parse(cookie.get('token') || '')}`
      //   },
      async customUpload(file: File, insertFn: Function) {
        const formData = new FormData();
        formData.append('image', file);
        let url = '';
        let alt = '';
        let href = '';
        uploads.uploadArticle(formData).then(
          (res) => {
            url = `http://localhost:3000${res.data.data.url}`;
            alt = res.data.data.alt;
            href = res.data.data.href;
            insertFn(url, alt, href);
          },
          (error) => {}
        );
      }
    },
    insertImage: {
      onInsertedImage(imageNode: any) {
        if (imageNode == null) return;

        const { src, alt, url, href } = imageNode;
        allImages.value.push(src);
        lastUploadImages.value = editorRef.value.getElemsByType('image');
      }
    }
  }
};
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  editor.setHtml(props.content);
};
</script>
