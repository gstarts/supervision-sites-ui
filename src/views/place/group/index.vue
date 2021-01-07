<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择场所" @change="placeChange">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="组名" prop="groupName">
        <el-input
          v-model="queryParams.groupName"
          placeholder="请输入组名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="组编号" prop="groupCode">
        <el-input
          v-model="queryParams.groupCode"
          placeholder="请输入组编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['place:group:add']"
        >新增
        </el-button>
      </el-col>
      <!--<el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['place:group:edit']"
        >修改
        </el-button>
      </el-col>-->
      <!--<el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['place:group:remove']"
        >删除
        </el-button>
      </el-col>-->
    </el-row>
    <el-table v-loading="loading" :data="groupList">
      <!--<af-table-column type="selection" width="55" align="center"/>-->
      <el-table-column label="ID" align="center" prop="id" width="90px"/>
      <!--<af-table-column label="场所" align="center" prop="placeId"/>-->
      <el-table-column label="组名" align="center" prop="groupName" width="170px"/>
      <el-table-column label="组编号" align="center" prop="groupCode" width="190px"/>
      <el-table-column label="成员" align="center" prop="userNames">
        <template slot-scope="scope">
          {{ getUserNickName(scope.row.userNames) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="state" width="80px">
        <template slot-scope="scope">
          {{ scope.row.state === '1' ? '正常' : '失效' }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" style="width:100px" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:group:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:group:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"/>

    <!-- 添加或修改工作小组对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="组名" prop="groupName">
              <el-input v-model="form.groupName" placeholder="请输入组名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组编号" prop="groupCode">
              <el-input v-model="form.groupCode" placeholder="请输入组编号" :disabled="form.id != undefined"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="成员" prop="userNames">
              <el-input v-model="form.userNames" placeholder="请输入内容" disabled style="display:none"/>
              <el-checkbox-group v-model="userNames">
                <el-checkbox v-for="user in userList" :label="user.userName" :key="user.id"
                             v-model="user.isChecked" @change="val=> handleUserSelect(val,user)"
                >{{ user.nickName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="状态" prop="state">
          <el-select v-model="form.state" placeholder="请选择状态">
            <el-option v-for="item in groupStateDic"
                       :key="item.dictValue"
                       :label="item.dictLabel"
                       :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listGroup, getGroup, delGroup, addGroup, updateGroup} from "@/api/place/group";
import {getUserDepts} from "@/utils/charutils";
import {listUser} from "@/api/system/user";

export default {
  name: "Group",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      depts: [],
      userList: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 工作小组表格数据
      groupList: [],
      // 弹出层标题
      title: "",
      groupStateDic: [
        {'dictValue': '1', 'dictLabel': '正常'},
        {'dictValue': '0', 'dictLabel': '无效'},
      ],
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        groupName: undefined,
        groupCode: undefined,
        userNames: undefined,
      },
      userNames: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        groupName: [
          {required: true, message: "小组名不能为空", trigger: "blur"}
        ],
        groupCode: [
          {required: true, message: "小组编号不能为空", trigger: "blur"}
        ],
        userNames: [
          {required: true, message: "成员不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.depts = getUserDepts('')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList();
      this.getUserList()
    }
  },
  methods: {
    /** 查询工作小组列表 */
    getList() {
      this.loading = true;
      listGroup(this.queryParams).then(response => {
        this.groupList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getUserList() {
      listUser({'deptId': this.queryParams.placeId, 'delFlag': '0'}).then(response => {
        if (response.code === 200) {
          this.userList = response.rows
          console.log("==============")
          console.log(this.userList)
        }
      });
    },
    placeChange() {
      this.getList()
      this.getUserList()
    },
    /*handleCheckedUserChange(value) {
      //debugger
      console.log(value)
      this.form.userNames = this.userNames.join(',')

      //let checkedCount = value.length;
      //this.checkAll = checkedCount === this.cities.length;
      // this.form.userNames += value + ','
    },*/
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.userNames = []
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        placeId: this.queryParams.placeId,
        groupName: undefined,
        groupCode: undefined,
        userNames: undefined,
        createTime: undefined,
        createBy: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        state: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    /* handleSelectionChange(selection) {
       this.ids = selection.map(item => item.id)
       this.single = selection.length != 1
       this.multiple = !selection.length
     },*/
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加工作小组";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getGroup(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工作小组";
        this.userNames = response.data.userNames.split(',')
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateGroup(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addGroup(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除工作小组编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delGroup(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    /* handleExport() {
       this.download('place/group/export', {
         ...this.queryParams
       }, `place_group.xlsx`)
     }*/
    getUserNickName(userNames) {
      let names = userNames.split(',')
      let str = []
      for (let userName of names) {
        let userObj = this.userList.find(item => item.userName === userName)
        if (userObj) {
          str.push(userObj.nickName)
        } else {
          str.push(userName)
        }
      }
      return str.join('，')
    },
    handleUserSelect(val, user) {
      // debugger
      console.log(this.userNames)
      console.log(val)
      console.log(user)
      if (val) { //如果是选中了，就增加一个
        //系统已经自动加了，不用再加
        //this.userNames.push(user.userName)
      } else {
        //this.userNames.push(user.userName)//不让删除
        //this.$message.warning('组内用户不能删除')
        //如果是取消了，要删除，删除之前要判断，此用户是否在审批用户 里还有未审批的工作要作 不判断了
        this.deleteItem(user.userName, this.userNames)
      }
      //console.log(this.userNames)
      this.form.userNames = this.userNames.join(',')
    },
    deleteItem(item, list) {
      for (let key in list) {
        if (list[key].userName === item) {
          list.splice(key, 1)
        }
      }
    }
  }
};
</script>
