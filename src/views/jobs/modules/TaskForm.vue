<template>
  <a-form @submit="handleSubmit" :form="form">
    <!--  任务名称: jobName  -->
    <a-form-item
      label="任务名称"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['jobName', {rules:[{required: true, message: '请输入任务名称'}]}]"/>
    </a-form-item>

    <!--  任务类型: jobName  -->
    <a-form-item
      label="任务类型"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-select v-decorator="['jobType', {rules:[{required: true, message: '请选择任务类型'}]}]">
        <a-select-option value="script">script</a-select-option>
        <a-select-option value="cli">cli</a-select-option>
      </a-select>
    </a-form-item>

    <!--<a-form-item
      label="开始时间"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-date-picker
        style="width: 100%"
        valueFormat="YYYY-MM-DD HH:mm"
        v-decorator="['startAt', {rules:[{required: true, message: '请选择开始时间'}]}]"
      />
    </a-form-item>-->

    <!--  任务内容: jobCmd  -->
    <a-form-item
      label="任务内容"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['jobCmd', {rules:[{required: true, message: '请输入任务内容'}]}]"/>
    </a-form-item>

    <!--  时间风格: timeStyle  -->
    <a-form-item
      label="时间风格"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-select v-decorator="['timeStyle', {rules:[{required: true, message: '目前只支持cron风格'}]}]">
        <a-select-option value="cron">cron</a-select-option>
      </a-select>
    </a-form-item>

    <!--  时间计划: timeData  -->
    <a-form-item
      label="时间计划"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['timeData', {rules:[{required: true, message: '请输入时间计划'}]}]"/>
    </a-form-item>

    <!--  脚本名称: file  -->
    <a-form-item
      label="脚本名称"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['file']"></a-input>
    </a-form-item>

    <!--  所属业务: category  -->
    <a-form-item
      label="所属业务"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['category']"></a-input>
    </a-form-item>

    <!--  任务说明: comment  -->
    <a-form-item
      label="任务说明"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-textarea v-decorator="['comment']"></a-textarea>
    </a-form-item>

  </a-form>
</template>

<script>
  import pick from 'lodash.pick'

  const fields = [
    'jobName',
    'jobType',
    'jobCmd',
    'timeStyle',
    'timeData',
    'nextRunTime',
    'file',
    'category',
    'comment'
  ]

  export default {
    name: 'TaskForm',
    props: {
      record: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        },
        form: this.$form.createForm(this)
      }
    },
    mounted () {
      this.record && this.form.setFieldsValue(pick(this.record, fields))
    },
    methods: {
      onOk () {
        console.log('监听了 modal ok 事件')
        return new Promise(resolve => {
          resolve(true)
        })
      },
      onCancel () {
        console.log('监听了 modal cancel 事件')
        return new Promise(resolve => {
          resolve(true)
        })
      },
      handleSubmit () {
        const { form: { validateFields } } = this
        this.visible = true
        validateFields((errors, values) => {
          if (!errors) {
            console.log('values', values)
          }
        })
      }
    }
  }
</script>
