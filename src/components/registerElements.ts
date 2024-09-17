import 'element-plus/dist/index.css'
import { ElButton, ElMenu, ElMenuItem, ElConfigProvider, ElForm, ElFormItem } from 'element-plus'

const components = {
  ElButton,
  ElMenu,
  ElMenuItem,
  ElConfigProvider,
  ElForm,
  ElFormItem
}

export const registerElements = (app: any) => {
  for (const component in components) {
    app.component(component, components[component])
  }
}
