/**
 * 视图相关类型定义
 */

declare type FormType = 'edit' | 'add'

// page类型定义
declare interface PageType {
    current: number,
    size: number,
    total: number,
}
