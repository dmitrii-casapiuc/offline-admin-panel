import { Icon } from '@visurel/iconify-angular'

export interface Item {
  label: string
  route: string
  icon?: Icon
  level: number 
}

export interface SidenavMenuLinks {
  icon?: Icon
  label: string
  route?: string
  level: number 
  children?: Item[]
}
