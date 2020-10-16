<template>
  <!--  <page-header-wrapper>-->
  <!--<a-card :bordered="false">
    <a-row>
      <a-col :sm="8" :xs="24">
        <info title="我的待办" value="8个任务" :bordered="true" />
      </a-col>
      <a-col :sm="8" :xs="24">
        <info title="本周任务平均处理时间" value="32分钟" :bordered="true" />
      </a-col>
      <a-col :sm="8" :xs="24">
        <info title="本周完成任务数" value="24个" />
      </a-col>
    </a-row>
  </a-card>-->

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

    <!--<a-list size="small" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
      <a-list-item :key="index" v-for="(item, index) in data">
&lt;!&ndash;        <a-list-item-meta :description="item.comment">&ndash;&gt;
&lt;!&ndash;          <a slot="title">{{ item.jobName }}</a>&ndash;&gt;
&lt;!&ndash;        </a-list-item-meta>&ndash;&gt;
        <div slot="actions">
          <a @click="edit(item)">编辑</a>
        </div>
        <div slot="actions">
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item><a>编辑</a></a-menu-item>
              <a-menu-item><a>删除</a></a-menu-item>
            </a-menu>
            <a>更多
              <a-icon type="down"/>
            </a>
          </a-dropdown>
        </div>
        <div class="list-content">
          <div class="list-content-item">
            <span>任务名称</span>
            <p>{{ item.jobName }}</p>
          </div>
          <div class="list-content-item">
            <span>任务类型</span>
            <p>{{ item.jobType }}</p>
          </div>
          <div class="list-content-item">
            <span>任务内容</span>
            <p>{{ item.jobCmd }}</p>
          </div>
          <div class="list-content-item">
            <span>时间风格</span>
            <p>{{ item.timeStyle }}</p>
          </div>
          <div class="list-content-item">
            <span>时间内容</span>
            <p>{{ item.timeData }}</p>
          </div>
          <div class="list-content-item">
            <span>下次运行时间</span>
            <p>{{ item.nextRunTime }}</p>
          </div>
          <div class="list-content-item">
            <span>所属业务</span>
            <p>{{ item.category }}</p>
          </div>
          &lt;!&ndash;          <div class="list-content-item">&ndash;&gt;
          &lt;!&ndash;            <a-progress :percent="item.progress.value" :status="!item.progress.status ? null : item.progress.status" style="width: 180px"/>&ndash;&gt;
          &lt;!&ndash;          </div>&ndash;&gt;
        </div>
      </a-list-item>
    </a-list>-->
  </a-card>
  <!--  </page-header-wrapper>-->
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

    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
      color: rgba(0, 0, 0, 1);
    }
  }
</style>
