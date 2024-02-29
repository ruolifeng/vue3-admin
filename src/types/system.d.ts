/**
 * 系统管理类型定义
 */
declare interface SysMenuQuery {
    keyWord: string
}

/**
 * 菜单实体类型
 */
declare interface SysMenuType {
    id: string,
    parentId: string,
    type: '1' | '2' // 1菜单 2按钮
    path: string,
    name: string,
    code: string,
    redirect: string,
    component: string, // src/views下的相对路径
    isLink: boolean
    meta: {
        title: string; // 菜单标题
        icon: string; // 菜单图标
        linkTo: string; // 外链地址
        cache: boolean; // 是否缓存，将值放在<keep-alive include="xxx">中
        hidden: boolean; // 是否在左侧菜单中隐藏，true是隐藏
        isBreadcrumb: boolean; // 是否显示在面包屑中，默认是true
    },
    sort: number,
    remark: string,
    createTime: string,
    updateTime: string,
    children: SysMenuType[]
}

/**
 * 角色查询条件
 */
declare interface SysRoleQuery {
    name: string // 角色名称
}

// 角色实体类型
declare interface SysRoleType {
    id: string,
    roleName: string,
    roleCode: string,
    status: boolean,
    remark: string,
    createTime: string,
    updateTime: string,
}

/**
 * 用户查询条件类型定义
 */
declare interface SysUserQuery {
    keyWord: string
}

// 用户实体类型
declare interface SysUserType {
    id: string,
    username: string,
    password: string,
    nickName: string,
    mobile: string,
    roleIds: string[],
    email: string,
    imageUrl: string,
    remark: string,
    accountNonExpired: boolean,
    accountNonLocked: boolean,
    credentialsNonExpired: boolean,
    createTime: string,
    updateTime: string,
}
