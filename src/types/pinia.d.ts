declare interface LayoutConfigState {
    isCollapse: boolean, // 是否展开菜单
    globalTitle: string, // 网站标题
    isFullScreen: boolean, // 是否是全屏
    isDark: boolean // 是否是黑暗模式
}

declare interface LoginData {
    username: string,
    password: string
}

declare interface AuthState<T = any> {
    rememberData?: LoginData,
    accessToken?: string, // 登录访问令牌
    userInfo?: UserInfo, // 登录用户信息
    buttonList: string[], // 路由按钮权限
    menuList: T[] // 路由菜单权限
}

declare interface UserInfo {
    nickName: string, // 用户昵称
    username: string, // 用户账号
    imageUrl: string // 用户图片
}

// 视图路由状态
declare interface ViewRoutesState {
    cacheRouteNames: string[]; // 要缓存路由的name
}
