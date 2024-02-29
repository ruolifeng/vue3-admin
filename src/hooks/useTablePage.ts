import {reactive, toRefs, onMounted, nextTick, defineAsyncComponent, ref, unref} from "vue";
import {notify} from "@/utils/element";
import type {Ref} from "vue";

interface Params {
    disableMounted?: boolean | Ref;
    mustQuery?: any; // 查询条件，使用reactive创建响应式变量，方便后期更新
    getPageList: Function; // 查询列表的api方法
    deleteRoleById?: Function; // 删除数据的api方法
}

/**
 * 分页列表组件
 */
function useTablePage<T = any, Q = any>(params: Params, emit?: Function, props?: any) {
    const tableListRef = ref();
    const editRef = ref();
    // 定义状态
    const state = reactive({
        loading: false,
        page: {
            current: 1, // 当前页
            size: 20, // 每页显示条数
            total: 0 // 总记录数
        } as PageType,
        query: {} as Q,
        tableList: [] as T[]
    });
    onMounted(() => {
        // 禁用首次加载，方便组件中其他位置触发加载列表
        if (unref(params.disableMounted)) return;
        queryData()
    });

    /**
     * 查询列表数据
     */
    function queryData() {
        // resolve: 正常处理完成之后调用，reject：异常的时候调用
        return new Promise(async (resolve, reject) => {
            state.loading = true;
            const {current, size} = state.page;
            // 合并必须传递的查询条件
            const query = params.mustQuery ? Object.assign({}, state.query, params.mustQuery) : state.query
            params.getPageList(query, current, size).then((resp: any) => {
                state.loading = false;
                const {total, records} = resp.data;
                state.tableList = []; // 清空之前的数据
                nextTick(() => {
                    state.tableList = records;
                    state.page.total = total;
                });
                // 正常响应
                resolve(resp);
            }).catch((error: Error) => {
                // 异常情况
                reject(error);
            });
        });
    }

    /**
     * 点击查询
     */
    function handleQuery() {
        // 将页码设置为第一页
        state.page.current = 1;
        queryData();
    }

    /**
     * 编辑
     */
    function handleEdit(row: T) {
        editRef.value.open('edit', '修改', row)
    }

    /**
     * 删除
     */
    async function handleDelete(id: string) {
        try {
            state.loading = true;
            if (params.deleteRoleById) await params.deleteRoleById(id);
            notify('删除成功', {type: 'success'});
            await queryData();
        } catch (e) {
            console.log(e)
        } finally {
            state.loading = false;
        }
    }

    /**
     * 新增
     */
    function handleAdd(parentId?: string) {
        editRef.value.open('add', '新增', parentId);
    }

    return {
        tableListRef,
        editRef,
        ...toRefs(state),
        queryData,
        handleAdd,
        handleEdit,
        handleDelete,
        handleQuery,
    }
}

export default useTablePage;
export {useTablePage};
