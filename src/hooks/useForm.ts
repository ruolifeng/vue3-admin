import { reactive, ref, toRefs } from "vue";
import { notify } from "@/utils/element";

interface Params {
    initData?: any, // 一般用于初始数据（新增数据时初始数据）
    addUser: Function,
    updateUser: Function,
}
function useForm<T>(params: Params, emit?: any, props?: any) {
    const formRef = ref();
    // * 关闭之前
    //     * /
    function handleClose() {
        close();
    }

    const state = reactive({
        dialogVisible: false,
        title: '新增',
        loading: false,
        type: 'edit' as FormType,
        formData: {} as T,
        oldFormData: {} as T // 在每一次失去焦点的时候进行数据的校验，如果数据没有变化的话就不需要发送请求
    })
    /**
     * 提交表单
     */
    function submitForm() {
        formRef.value?.validate((valid: boolean) => {
            if (!valid) return;
            submitData();
        })
    }
    /**
     * 关闭
     */
    function close() {
        if (state.loading) return;
        // formRef.value?.resetField();
        state.dialogVisible = false;
    }
    /**
     * 打开
     */
    function open(type: FormType, title: string, data = {} as any) {
        state.type = type;
        state.formData = JSON.parse(JSON.stringify({ ...params.initData, ...data }));
        state.oldFormData = Object.assign({},state.formData);
        state.dialogVisible = true;
    }
    /**
     * 提交数据
     */
    async function submitData() {
        try {
            state.loading = true;
            let res = {} as any;
            if (state.type === 'edit') {
                res = await params.updateUser(state.formData);
            } else {
                // 新增
                res = await params.addUser(state.formData);
            }
            state.dialogVisible = false;
            if (res.code !== 20000) return;
            notify('操作成功', { type: "success" });
            close();
            emit('refresh')
        } catch (e) {

        } finally {
            state.loading = false;
        }
    }
    return {
        formRef,
        ...toRefs(state),
        open,
        close,
        submitForm
    }
}

export default useForm;
export { useForm };
