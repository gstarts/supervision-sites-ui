<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select
          v-model="queryParams.placeId"
          placeholder="请选择场所"
          clearable
          size="small"
          @change="handleQuery">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="区域类型" prop="zoneType">
        <el-select v-model="queryParams.zoneType" placeholder="请选择区域类型" clearable size="small">
          <el-option
            v-for="dict in zoneTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="区域名称" prop="zoneName">
        <el-input
          v-model="queryParams.zoneName"
          placeholder="请输入区域名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区域代码" prop="zoneCode">
        <el-input
          v-model="queryParams.zoneCode"
          placeholder="请输入区域代码"
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
          v-hasPermi="['tax:zone:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['tax:zone:edit']"
        >修改
        </el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['tax:zone:remove']"-->
<!--        >删除-->
<!--        </el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:zone:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="zoneList" @selection-change="handleSelectionChange" :height="tableHeight">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="区域类型" align="center" prop="zoneType" :formatter="zoneTypeFormat"/>
      <el-table-column label="区域名称" align="center" prop="zoneName"/>
      <el-table-column label="区域代码" align="center" prop="zoneCode"/>
      <el-table-column label="区域长" align="center" prop="zoneLength"/>
      <el-table-column label="区域宽" align="center" prop="zoneWidth"/>
      <el-table-column label="区域面积(㎡)" align="center" prop="zoneArea"/>
      <el-table-column label="存放行数" align="center" prop="storeRows"/>
      <el-table-column label="存放列数" align="center" prop="storeColumns"/>
      <!--<el-table-column label="货位层数" align="center" prop="storeLevel"/>-->
      <el-table-column label="货位数量" align="center" prop="storeCount"/>
      <el-table-column label="货位容量" align="center" prop="storeCapacity"/>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['tax:zone:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tax:zone:remove']"
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
      @pagination="getList"
    />

    <!-- 添加或修改保税库分区库位信息 对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="保税库" prop="placeId">
              <el-select v-model="form.placeId" placeholder="请选择保税库">
                <el-option
                  v-for="dept in depts"
                  :key="dept.deptId"
                  :label="dept.deptName"
                  :value="dept.deptId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域类型" prop="zoneType">
              <el-select v-model="form.zoneType" placeholder="请选择区域类型" disabled>
                <el-option
                  v-for="dict in zoneTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域名称" prop="zoneName">
              <el-select v-model="form.zoneName" placeholder="请输入区域名称(A-Z)">
                <el-option
                  v-for="item in wordArr"
                  :key="item.char"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="区域编号" prop="zoneCode">
              <el-select v-model="form.zoneCode" placeholder="请输入区域编号">
                <el-option
                  v-for="item in numArr"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域长" prop="zoneLength">
              <el-input v-model="form.zoneLength" placeholder="请输入区域长"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域宽" prop="zoneWidth">
              <el-input v-model="form.zoneWidth" placeholder="请输入区域宽"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="区域面积(㎡)" prop="zoneArea">
              <el-input v-model="form.zoneArea" placeholder="请输入区域面积(㎡)"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="存放行数" prop="storeRows">
              <el-input v-model="form.storeRows" placeholder="请输入存放行数"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="存放列数" prop="storeColumns">
              <el-input v-model="form.storeColumns" placeholder="请输入存放列数"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <!--<el-col :span="8">
            <el-form-item label="货位层数" prop="storeLevel">
              <el-input v-model="form.storeLevel" placeholder="请输入货位层数"/>
            </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="货位数量" prop="storeCount">
              <el-input v-model="form.storeCount" placeholder="请输入货位数量"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货位容量" prop="storeCapacity">
              <el-input v-model="form.storeCapacity" placeholder="请输入货位容量"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>

.el-table th.gutter{

  display: table-cell !important;

}

</style>

<script>
import {listZone, getZone, delZone, addZone, updateZone} from "@/api/tax/zone";
import {genEnglishChar, genNumChar, getUserDepts} from "@/utils/charutils";

export default {
  name: "Zone",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 保税库分区库位信息 表格数据
      zoneList: [],
      //保税库列表
      depts: [],
      //第一个
      deptId: 0,
      // 区域类型字典
      zoneTypeOptions: [],
      wordArr: [],
      numArr: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        zoneType: undefined,
        zoneName: undefined,
        zoneCode: undefined,
        zoneLength: undefined,
        zoneWidth: undefined,
        zoneArea: undefined,
        storeRows: undefined,
        storeColumns: undefined,
        storeLevel: undefined,
        storeCount: undefined,
        storeCapacity: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        placeId: [
          {required: true, message: "保税库不能为空", trigger: "blur"}
        ],
        zoneType: [
          {required: true, message: "区域类型不能为空", trigger: "change"}
        ],
        zoneName: [
          {required: true, message: "区域名称不能为空", trigger: "blur"}
        ],
        zoneCode: [
          {required: true, message: "区域代码不能为空", trigger: "blur"}
        ],
        storeRows: [
          {required: true, message: "存放行数不能为空", trigger: "blur"}
        ],
        storeColumns: [
          {required: true, message: "存放列数不能为空", trigger: "blur"}
        ],
       /* storeLevel: [
          {required: true, message: "货位层数不能为空", trigger: "blur"}
        ],*/
      },
      // tableHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight - 475,
      tableHeight: window.innerHeight - 280,
      // tableHeight: 600,
    };
  },
  created() {
    this.wordArr = genEnglishChar()
    this.numArr = genNumChar(1, 10,'')

    this.getDicts("yard_zone_type").then(response => {
      this.zoneTypeOptions = response.data;
    });
    // 0 监管场所，1保税库，2堆场，3企业
    this.depts = getUserDepts('1')
    if (this.depts.length > 0) {
      //默认选中第一个
      this.queryParams.placeId = this.depts[0].deptId;
      this.deptId = this.depts[0].deptId;
      this.form.placeId = this.queryParams.placeId
      this.getList()
    }
  },
  methods: {
    /** 查询保税库分区库位信息 列表 */
    getList() {
      this.loading = true;
      listZone(this.queryParams).then(response => {
        this.zoneList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        placeId: this.queryParams.placeId,
        zoneType: '2',
        zoneName: undefined,
        zoneCode: undefined,
        zoneLength: undefined,
        zoneWidth: undefined,
        zoneArea: undefined,
        storeRows: undefined,
        storeColumns: undefined,
        storeLevel: 1,
        storeCount: undefined,
        storeCapacity: undefined,
        remark: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined
      };
      this.resetForm("form");
    },
    // 区域类型字典翻译
    zoneTypeFormat(row, column) {
      return this.selectDictLabel(this.zoneTypeOptions, row.zoneType);
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
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加保税库分区库位信息 ";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getZone(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改保税库分区库位信息 ";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateZone(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addZone(this.form).then(response => {
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
      this.$confirm('是否确认删除保税库分区库位信息 编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delZone(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tax/zone/export', {
        ...this.queryParams
      }, `tax_zone.xlsx`)
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.tableHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        that.tableHeight = window.tableHeight - that.$refs.queryHeight.offsetHeight - 280
      })()
    }
  },
  watch: {
    // 这里的定时器是为了优化，如果频繁调用window.onresize方法会造成页面卡顿，增加定时器会避免频繁调用window.onresize方法
    // timer默认值设置为false，这里相当于一个按钮，防止频繁改变时引起卡顿
    tableHeight(val) {
      if (!this.timer) {
        this.tableHeight = val
        this.timer = true
        const that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    }
  },
}
;
</script>
