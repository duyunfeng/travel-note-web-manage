import { registerElements, registerElementIcons } from './registerElements'

export const initElements = (app: any) => {
  registerElements(app)
  registerElementIcons(app)
}