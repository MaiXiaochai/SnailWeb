<template>
  <a-card
    style="margin-top: 0"
    :bordered="false"
    size="small"
    title="任务编辑">

    <div slot="extra">
      <a-radio-group v-model="status">
        <a-radio-button value="all">全部</a-radio-button>
        <a-radio-button value="processing">进行中</a-radio-button>
        <a-radio-button value="waiting">等待中</a-radio-button>
      </a-radio-group>
      <a-input-search style="margin-left: 16px; width: 272px;"/>
    </div>

    <div class="operate">
      <a-button type="primary" style="width: 100%" icon="plus" @click="add" ghost>添加任务</a-button>
    </div>

    <a-table :data-source="data">
      <a-table-column key="jobName" title="任务名称" data-index="jobName"/>
      <a-table-column key="jobType" title="任务类型" data-index="jobType"/>
      <a-table-column key="jobCmd" title="任务内容" data-index="jobCmd"/>
      <a-table-column key="timeStyle" title="时间类型" data-index="timeStyle"/>
      <a-table-column key="timeData" title="时间内容" data-index="timeData"/>

      <a-table-column key="nextRunTime" title="下次运行时间" data-index="nextRunTime"/>
      <a-table-column key="file" title="脚本名称" data-index="file"/>

      <a-table-column key="action" title="操作">
        <template v-slot="{ text }">
          <span slot="actions">
            <a @click="edit(item)">编辑</a>
          </span>
          <a-divider type="vertical"/>
          <a-dropdown :trigger="['click']">
            <a-menu slot="overlay">
              <a-menu-item><a>运行</a></a-menu-item>
              <a-menu-item><a>删除</a></a-menu-item>
            </a-menu>
            <a>更多
              <a-icon type="down"/>
            </a>
          </a-dropdown>
        </template>
      </a-table-column>

      <template #expandedRowRender="record">
        <tr>
          <td><b>[ 所属业务 ]: </b></td>
          <td>
            <a-tag color="blue">
              {{record.category}}
            </a-tag>
          </td>
        </tr>
        <tr>
          <td><b>[ 任务注释 ]: </b></td>
          <td>
            <a-tag color="blue">
              {{record.comment}}
            </a-tag>
          </td>
        </tr>
      </template>

    </a-table>
  </a-card>

</template>

<script>
  // 演示如何使用 this.$dialog 封装 modal 组件
  import TaskForm from './modules/TaskForm'
  import Info from './components/Info'
  import { getAllJobs } from '@/api/manage'

  export default {
    name: 'JobEditor',
    components: {
      TaskForm,
      Info
    },
    data () {
      return {
        data: [],
        status: 'all'
      }
    },
    mounted () {
      getAllJobs().then(res => {
        this.data = res.data
      })
    },
    methods: {
      add () {
        console.log(typeof this.result)
        console.log(this.result)
        this.$dialog(TaskForm,
          // component props
          {
            record: {},
            on: {
              ok () {
                console.log('ok 回调')
              },
              cancel () {
                console.log('cancel 回调')
              },
              close () {
                console.log('modal close 回调')
              }
            }
          },
          // modal props
          {
            title: '新增',
            width: 700,
            centered: true,
            maskClosable: false
          })
      },
      edit (record) {
        console.log('record', record)
        this.$dialog(TaskForm,
          // component props
          {
            record,
            on: {
              ok () {
                console.log('ok 回调')
              },
              cancel () {
                console.log('cancel 回调')
              },
              close () {
                console.log('modal close 回调')
              }
            }
          },
          // modal props
          {
            title: '操作',
            width: 700,
            centered: true,
            maskClosable: false
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  .list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;

    span {
      line-height: 20px;
      font-size: 8px;
    }

    .columns-style {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
      color: rgba(0, 0, 0, 1);
    }
  }
</style>
