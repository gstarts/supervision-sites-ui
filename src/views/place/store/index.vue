<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="场所" prop="placeId">
        <el-select v-model="queryParams.placeId" placeholder="请选择场所" @change="handleQuery">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="区域编号" prop="zoneCode">
        <el-input
          v-model="queryParams.zoneCode"
          placeholder="请输入区域编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区域类型" prop="zoneType">
        <el-select v-model="queryParams.zoneType" placeholder="请选择区域类型" clearable size="small" @change="handleQuery">
          <el-option
            v-for="dict in yardZoneTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="库位编号" prop="storeCode">
        <el-input
          v-model="queryParams.storeCode"
          placeholder="请输入库位编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位状态" prop="storeState">
        <el-select v-model="queryParams.storeState" placeholder="请选择库位状态" clearable size="small" @change="handleQuery">
          <el-option
            v-for="dict in storeStateOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="变更原因" prop="updateReason">
         <el-select v-model="queryParams.updateReason" placeholder="请选择变更原因" clearable size="small">
           <el-option
             v-for="dict in updateReasonOptions"
             :key="dict.dictValue"
             :label="dict.dictLabel"
             :value="dict.dictValue"
           />
         </el-select>
       </el-form-item>-->
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
          v-hasPermi="['place:store:add']"
        >新增
        </el-button>
      </el-col>
      <!-- <el-col :span="1.5">
         <el-button
           type="success"
           icon="el-icon-edit"
           size="mini"
           :disabled="single"
           @click="handleUpdate"
           v-hasPermi="['place:store:edit']"
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
          v-hasPermi="['place:store:remove']"
        >删除
        </el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['place:store:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="storeList">
      <!-- <el-table-column type="selection" width="55" align="center" />-->
      <!--<el-table-column label="ID" align="center" prop="id" />-->
      <el-table-column label="场所" align="center" prop="placeId" :fixed="true">
        <template slot-scope="scope">
          <span> {{ depts.find(item => item.deptId === scope.row.placeId).deptName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域类型" align="center" prop="zoneType">
        <template slot-scope="scope">
          <span> {{ yardZoneTypeOptions.find(item => item.dictValue === scope.row.zoneType).dictLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域编号" align="center" prop="zoneCode"/>
      <!--<el-table-column label="区域ID" align="center" prop="zoneId" />-->
      <el-table-column label="库位编号" align="center" prop="storeCode"/>
      <!--<el-table-column label="库位层级" align="center" prop="storeLevel" />-->
      <el-table-column label="库位状态" align="center" prop="storeState" :formatter="storeStateFormat"/>
      <!--<el-table-column label="集装箱号" align="center" prop="containerNo" />-->
      <el-table-column label="库位容量(KG)" align="center" prop="storeCapacity"/>
      <!--<el-table-column label="空/重箱" align="center" prop="isHeavy" :formatter="isHeavyFormat" />-->
      <!--<el-table-column label="货物净重(KG)" align="center" prop="netWeight" />-->
      <!-- <el-table-column label="货物毛重(KG)" align="center" prop="roughWight" />-->
      <el-table-column label="货物批次号" align="center" prop="goodsBatchNo"/>
      <el-table-column label="变更原因" align="center" prop="updateReason"/>
      <el-table-column label="更新人" align="center" prop="updateBy"/>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情" align="center">
        <!--<template slot-scope="scope">
          <router-link :to="'/yard/store/detail?yardId=' + scope.row.yardId+'&storeCode='+scope.row.storeCode" class="link-type">
            <span>查看详情</span>
          </router-link>
        </template>-->
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="gotoDetail(scope.row)"
            v-hasPermi="['place:store_sub:list']"
          >查看详情
          </el-button>
          <!--<el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['place:store:edit']"
          >修改</el-button>-->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['place:store:remove']"
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
    <!-- 添加或修改场所库存详细 对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="场所" prop="placeId">
              <el-select v-model="form.placeId" placeholder="请选择场所">
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
              <el-select v-model="form.zoneType" placeholder="请选择区域类型" @change="getZoneCode">
                <el-option
                  v-for="dict in yardZoneTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域编号" prop="zoneCode">
              <el-select v-model="form.zoneCode" placeholder="请选择区域编号">
                <el-option
                  v-for="str in zoneCodeList"
                  :key="str"
                  :label="str"
                  :value="str"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="库位编号" prop="storeCode">
              <el-input v-model="form.storeCode" placeholder="请输入库位编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库位层级" prop="storeLevel">
              <el-input v-model.number="form.storeLevel" placeholder="请输入库位层级" :disabled="useLevel"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库位容量(KG)" prop="storeCapacity">
              <el-input v-model="form.storeCapacity" placeholder="请输入库位容量(KG)"/>
            </el-form-item>
          </el-col>
        </el-row>
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
import {listStore, getStore, delStore, addStore, updateStore} from "@/api/place/store";
import {getUserDepts} from '@/utils/charutils'
import {getZoneList} from "@/api/place/zone";

export default {
  name: "Store",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      depts: [],
      // 总条数
      total: 0,
      // 堆场库存明细 表格数据
      storeList: [],
      // 库位状态字典
      storeStateOptions: [],
      yardZoneTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        placeId: undefined,
        zoneCode: undefined,
        zoneId: undefined,
        zoneType: undefined,
        storeCode: undefined,
        storeState: undefined,
        goodsBatchNo: undefined,
      },
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        placeId: [
          {required: true, message: "场所不能为空", trigger: "change"}
        ],
        zoneType: [
          {required: true, message: "区域类型不能为空", trigger: "blur"}
        ],
        zoneCode: [
          {required: true, message: "区域编号不能为空", trigger: "blur"}
        ],
        storeCode: [
          {required: true, message: "库位编号不能为空", trigger: "blur"}
        ],
        storeLevel: [
          {type: "number", required: true, message: "库位层级不能为空", trigger: "blur"}
        ]
      },
      zoneCodeList: [],
      useLevel: false
    };
  },
  created() {
    this.getDicts("yard_store_state").then(response => {
      this.storeStateOptions = response.data;
    });

    this.getDicts("yard_zone_type").then(response => {
      this.yardZoneTypeOptions = response.data;
    });

    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList();
    }
  },
  methods: {
    /** 查询堆场库存明细 列表 */
    getList() {
      this.loading = true;
      listStore(this.queryParams).then(response => {
        this.storeList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 库位状态字典翻译
    storeStateFormat(row, column) {
      return this.selectDictLabel(this.storeStateOptions, row.storeState);
    },
    /*// 变更原因字典翻译
    updateReasonFormat(row, column) {
      return this.selectDictLabel(this.updateReasonOptions, row.updateReason);
    },*/
    gotoDetail(row) {
      this.$router.push({
        path: '/place/store/detail',
        query: {
          'placeId': row.placeId,
          'storeCode': row.storeCode
        }
      })
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
        zoneCode: undefined,
        zoneId: undefined,
        zoneType: undefined,
        storeCode: undefined,
        storeLevel: undefined,
        storeState: undefined,
        containerNo: undefined,
        storeCapacity: undefined,
        isHeavy: undefined,
        netWeight: undefined,
        roughWeight: undefined,
        goodsBatchNo: undefined,
        updateReason: undefined,
        remark: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        version: undefined
      };
      this.resetForm("form");
    },
    /*// 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },*/
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加场所库位信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getStore(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改场所库位信息";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateStore(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addStore(this.form).then(response => {
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
      this.$confirm('是否确认删除库位"' + row.storeCode + '"的全部数据?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delStore(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/store/export', {
        ...this.queryParams
      }, `place_store.xlsx`)
    },
    getZoneCode(event) {
      this.zoneCodeList = []
      getZoneList(this.form.placeId, this.form.zoneType).then(response => {
        if (response.code === 200) {
          this.zoneCodeList = response.data
        } else {
          this.$message.error(response.msg)
        }
      });

      if (event === '2') {//散杂货
        this.form.storeLevel = 1
        this.useLevel = true
      } else {
        this.useLevel = false
      }
      //区域类型变化时，获取对应场所的id，区域类型，返回对应区域内的区域编号
    }
  }
};
</script>
