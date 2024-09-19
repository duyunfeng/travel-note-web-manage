import 'element-plus/dist/index.css'
import {
  ElButton,
  ElMenu,
  ElMenuItem,
  ElConfigProvider,
  ElForm,
  ElFormItem,
  ElSubMenu,
  ElSwitch,
  ElRow,
  ElCol,
  ElMenuItemGroup,
  ElIcon,
  ElInput,
  ElRadioGroup,
  ElRadioButton,
  ElDatePicker,
  ElAvatar,
  ElSelect,
  ElOption,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElDrawer,
  ElRadio,
  ElPopconfirm
} from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components = {
  ElButton,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElSwitch,
  ElRow,
  ElCol,
  ElMenuItemGroup,
  ElIcon,
  ElForm,
  ElInput,
  ElRadioGroup,
  ElRadioButton,
  ElDatePicker,
  ElAvatar,
  ElSelect,
  ElOption,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElPopconfirm,
  ElDrawer,
  ElRadio,
  ElConfigProvider,
  ElFormItem
}

export const registerElements = (app: any) => {
  for (const component in components) {
    app.component(component, components[component])
  }
}

export const registerElementIcons = (app: any) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
