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

declare interface AuthState<> {
    rememberData?: LoginData;
    accessToken?: string
}
