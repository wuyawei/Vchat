<template>
    <el-dialog title="新增活动" :visible.sync="visible">
        <el-form :model="todoForm" ref="todoForm">
            <el-form-item label="标题" label-width="100px">
                <el-input v-model="todoForm.title"></el-input>
            </el-form-item>
            <el-form-item label="地点" label-width="100px">
                <el-input v-model="todoForm.address"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" label-width="100px">
                <el-date-picker
                        v-model="todoForm.start"
                        type="datetime"
                        placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" label-width="100px">
                <el-date-picker
                        v-model="todoForm.end"
                        type="datetime"
                        placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="sure">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default{
        name: 'dialogTodo',
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                todoForm: {
                    title: '',
                    start: '',
                    end: '',
                    address: ''
                }
            }
        },
        computed: {
        },
        methods: {
            cancel() {
                this.$refs['todoForm'].resetFields();
                this.$emit('close');
            },
            sure() {
                this.$emit('close');
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>