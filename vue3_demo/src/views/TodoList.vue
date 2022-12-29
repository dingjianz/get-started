<template>
  <div :class="styles['todo-container']">
    <h1>todolist</h1>
    <div :class="styles['ipt-wrap']">
      <el-input v-model="text" size="small" placeholder="请输入todoItem"></el-input>
      <el-button type="primary" size="small" @click="addTodoList">添加</el-button>
    </div>
    <ul :class="styles.ul">
      <li v-for="(item, index) in list" :key="item.id" :class="styles.red">
        <el-checkbox v-model="item.isFinished" @change="(val) => handleTodoItemChange(val, index)" />
        <el-tag :type="item.isFinished ? 'success' : 'info'">{{ item.isFinished ? "完成" : "待做" }}</el-tag>
        <span :class="styles.text">{{ item?.title }}</span>
        <el-button type="danger" size="small" @click="deleteTodoList(index)">删除</el-button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElButton, ElMessage, ElCheckbox, ElTag, type CheckboxValueType } from 'element-plus';

const list = reactive<ITodo.ITodoItem[]>([{ title: '看篮球', isFinished: false, id: 0, }]);
const text = ref('');

function addTodoList (): void | boolean {
  if (!text.value.trim()) {
    ElMessage.warning('请输入待办事项');
    return false;
  }
  list.push({
    title: text.value,
    isFinished: false,
    id: list.length > 0 ? list[list.length - 1].id++ : 0,
  });
  text.value = '';
}

function deleteTodoList (index: number) {
  // removeFromArray<ITodo.ITodoItem>(list, index);
  list.splice(index, 1);
}

function handleTodoItemChange (val: CheckboxValueType, index: number) {
  console.log(index, val);
  list[index].isFinished = val as boolean;
}
</script>

<style lang="scss" module="styles">
.todo-container {
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;

  .ipt-wrap {
    padding: 10px 0;
    display: flex;
    width: 200px;
  }

  .ul {
    width: 250px;
    background-color: #ccc;
    li {
      padding: 0 6px;
      height: 38px;
      background-color: orange;
      margin-bottom: 1px;
      color: #ffffff;
      line-height: 38px;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .text {
        width: 50%;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
