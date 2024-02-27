import { ElMessage, ElNotification, ElMessageBox } from 'element-plus';
import type { ElMessageBoxOptions, Action } from 'element-plus';

interface MessageParmas {
  type?: '' | 'success' | 'warning' | 'info' | 'error';
  showClose?: boolean;
}

interface NotificationParmas {
  title?: string;
  type?: '' | 'success' | 'warning' | 'info' | 'error';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

// 提示信息
export const msg = (message = '', params = {} as MessageParmas) => {
  ElMessage({
    message,
    type: params?.type || 'warning',
    showClose: params?.showClose || true,
    grouping: true,
  });
}

// 通知
export const notify = (message = '', params = {} as NotificationParmas) => {
  ElNotification({
    message,
    title: params.title || '',
    type: params.type || 'warning',
    position: params.position || 'top-right',
  });
}

// 确认框，模拟原生 confirm
export const confirm = (message: string, title = '提示信息', options = {} as ElMessageBoxOptions) => {
  return ElMessageBox.confirm(message , title, {
    type: options.type || 'warning',
    draggable: options.draggable || true, // 是否开启拖拽弹窗
    confirmButtonText: options.confirmButtonText || '确定',
    cancelButtonText: options.cancelButtonText || '取消',
  });
}

// 提示框，模拟原生 alert，按下 ESC 或点击框外无法关闭
export const alert = (message: string, title = '提示', options = {} as ElMessageBoxOptions) => {
  return ElMessageBox.alert(message , title, {
    type: options.type || 'warning',
    // 打开 MessageBox 时是否自动获得焦点
    autofocus: options.autofocus || true,
    confirmButtonText: options.confirmButtonText || '确定',
    callback: (action: Action) => { // 点击按钮触发
      // console.log('alert-action', action)
    }
  });
}