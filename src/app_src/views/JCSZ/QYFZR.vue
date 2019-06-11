<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select v-model="value" placeholder="请选择区域" size="mini" class="filter-item">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        class="filter-item"
        placeholder="请输入负责人名称"
        v-model="listQuery.Name"
        size="mini"
      ></el-input>

      <el-button
        class="filter-item"
        type="primary"
        v-waves
        icon="el-icon-search"
        @click="handleFilter"
        size="mini"
      >查询</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        @click="handleCreate"
        type="primary"
        icon="el-icon-edit"
        size="mini"
      >添加</el-button>
      <el-button
        class="filter-item"
        type="primary"
        :loading="downloadLoading"
        v-waves
        icon="el-icon-download"
        @click="handleDownload"
        size="mini"
      >导出</el-button>
    </div>
    <el-table
      :key="tableKey"
      :data="list"
      :header-cell-class-name="tableRowClassName"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      style="width: 50%"
      size="mini"
      id="table"
    >
      <el-table-column width="200px" align="center" label="区域名称">
        <template slot-scope="scope">
          <span>{{scope.row.quyu}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="负责人">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话">
        <template slot-scope="scope">
          <span>{{scope.row.tel}}</span>
        </template>
      </el-table-column>
       <el-table-column align="center" width="150px" label="操作">
              <template slot-scope="scope">
                <el-button type="primary"   size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                <el-button type="danger"  size="mini" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
    </el-table>
    <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="listQuery.page"
              :page-sizes="[10,20,30, 50]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="10"
            ></el-pagination>
    <el-dialog
      :visible.sync="editVisible"
      class="selecttrees"
      :title="textMap[dialogStatus]"
      width="500px"
    >
      <el-card>
        <el-form
          ref="dataForm"
          :model="temp"
          :rules="rules"
          label-width="120px"
          style="width: 99%;"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="区域：" prop="quyu">
                <el-input v-model="temp.quyu" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="负责人：" prop="name">
                <el-input v-model="temp.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="电话" prop="tel">
                <el-input v-model="temp.tel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
         <div style="text-align:center">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">保存</el-button>
          <el-button v-else type="primary" @click="updateData">保存</el-button>
        </div>
         
      </el-card>
    </el-dialog>
  </div>
</template>
            
<script>
export default {
  name: "qyfzr",
  data() {
    return {
      listLoading: false,
      listQuery: {
        QuYu: "",
        Name: ""
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      list: [
        {
          quyu: "A区",
          name: "张三",
          tel: "1345262556"
        },
        {
          quyu: "b区",
          name: "李四",
          tel: "13265985415"
        },
        {
          quyu: "C区",
          name: "王五",
          tel: "1345262556"
        },
        {
          quyu: "D区",
          name: "马六",
          tel: "1345262556"
        },
        {
          quyu: "E区",
          name: "赵启",
          tel: "1345262556"
        },
        {
          quyu: "F区",
          name: "王五",
          tel: "1345262556"
        },
        {
          quyu: "G区",
          name: "刘久",
          tel: "1345262556"
        },
        {
          quyu: "H区",
          name: "韩十",
          tel: "1345262556"
        }
      ],
      textMap: {
        update: "修改区域负责人",
        create: "添加区域负责人"
      },
      editVisible: false,
      dialogStatus: "",
      tableKey:0,
       temp: {
        quyu:'A区',
        name:'张三',
        tel:'1375565256'
      },
    };
  },
  methods: {
    handleFilter() {
       
    },
    handleUpdate(){
  this.editVisible=true;
        this.dialogStatus = "update";
    },
    handleCreate() {
        this.editVisible=true;
        this.dialogStatus = "create";
    },
    handleDownload() {},
    tableRowClassName({ row, rowIndex }) {
      // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return "el-button--primary is-active"; // 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return "";
    }
  }
};
</script>
            
<style>
</style>
            