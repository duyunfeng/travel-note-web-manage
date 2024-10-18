import { registerElements, registerElementIcons } from './registerPlugins/registerElements'
import { registerEditor } from './registerPlugins/registerEditor'
import customComponents from './custom'
import elementUiComponents from './elementUi'
import echartsComponents from './echarts'

const components:any = {
  ...customComponents,
  ...elementUiComponents,
  ...echartsComponents
}

export const initElements = (app: any) => {
  registerElements(app)
  registerElementIcons(app)
  registerEditor(app)
}

export const initComponents = (app:any) => {
  for (const component in components) {
    app.component(component, components[component]);
  }
}