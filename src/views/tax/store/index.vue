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
      <el-form-item label="区域编号" prop="zoneCode">
<!--        <el-input
          v-model="queryParams.zoneCode"
          placeholder="请输入区域编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />-->
        <el-select v-model="queryParams.zoneCode" placeholder="请选择区域编号" clearable size="small" @change="handleQuery" >
          <el-option v-for="item in zoneCodeList"
                     :key="item.code"
                     :value="item.code"
                     :label="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="区域类型" prop="zoneType">
        <el-select v-model="queryParams.zoneType" placeholder="请选择区域类型" clearable size="small">
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
        <el-select v-model="queryParams.storeState" placeholder="请选择库位状态" clearable size="small">
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
          v-hasPermi="['yard:store:add']"
        >新增
        </el-button>
      </el-col>
      <!--
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['yard:store:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['yard:store:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tax:store:export']"
        >导出
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="storeList">
      <!-- <el-table-column type="selection" width="55" align="center" />-->
      <!--<el-table-column label="ID" align="center" prop="id" />-->
      <!--<el-table-column label="场所" align="center" prop="placeId" :fixed="true">
        <template slot-scope="scope">
          <span> {{depts.find(item=>item.deptId === scope.row.placeId).deptName}}</span>
        </template>
      </el-table-column>-->
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
      <!--<el-table-column label="库位容量" align="center" prop="storeCapacity" />-->
      <!--<el-table-column label="空/重箱" align="center" prop="isHeavy" :formatter="isHeavyFormat" />-->
      <!--<el-table-column label="货物净重(KG)" align="center" prop="netWeight" />-->
      <!-- <el-table-column label="货物毛重(KG)" align="center" prop="roughWight" />-->
      <el-table-column label="货物批次号" align="center" prop="goodsBatchNo"/>
      <el-table-column label="货物数量" align="center" prop="storeGoodsCount"/>
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
            v-hasPermi="['tax:goods_info:list']"
          >查看详情
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

    <!-- 添加或修改库存库位对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="场所" prop="placeId" style="display: none">
          <el-input v-model="form.placeId" placeholder="请输入场所ID"/>
        </el-form-item>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="区域编号" prop="zoneId">
              <el-select v-model="form.zoneId" placeholder="请选择区域编号" clearable @change="zoneChange">
                <el-option v-for="item in zoneCodeList"
                           :key="item.id"
                           :value="item.id"
                           :label="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货位号" prop="storeCode">
              <el-input v-model="form.storeCode" placeholder="请输入货位号"/>
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

<script>
import {addStore, getStore, listStore, updateStore} from "@/api/tax/store";
import {getUserDepts} from '@/utils/charutils'
import {listZone} from "@/api/tax/zone";

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
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        zoneId: [
          {required: true, message: '区域编号不能为空', trigger: 'change'}
        ],
        storeCode: [
          {required: true, message: '库位号不能为空', trigger: 'blur'}
        ],
      },
      title: '',
      zoneCodeList: [],
    }
  },
  created() {

    this.getDicts("yard_store_state").then(response => {
      this.storeStateOptions = response.data;
    });

    this.getDicts("yard_zone_type").then(response => {
      this.yardZoneTypeOptions = response.data;
    });

    this.depts = getUserDepts('1')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList();
      this.getZoneList()
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
        path: '/tax/store/goods',
        query: {
          'placeId': row.placeId,
          'storeCode': row.storeCode
        }
      })
    },
    getZoneList(){
      listZone({'placeId': this.queryParams.placeId}).then(response => {
        if (response.code === 200) {
          if (response.rows.length > 0) {
            for (let zone of response.rows) {
              this.zoneCodeList.push({'id': zone.id, 'code': zone.zoneName + zone.zoneCode})
            }
          }
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
    /** 导出按钮操作 */
    handleExport() {
      this.download('tax/store/export', {
        ...this.queryParams
      }, `place_store.xlsx`)
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
        createBy: undefined,
        createTime: undefined,
        remark: undefined,
        updateBy: undefined,
        updateTime: undefined,
        goodsBatchNo: undefined,
        placeId: undefined,
        storeCapacity: undefined,
        storeCode: undefined,
        storeGoodsCount: undefined,
        storeLevel: undefined,
        storeNetWeight: undefined,
        storeRoughWeight: undefined,
        storeState: undefined,
        updateReason: undefined,
        zoneCode: undefined,
        zoneId: undefined,
        zoneType: undefined
      };
      this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加库位";
      this.form.placeId = this.queryParams.placeId
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getStore(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改库存库位";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
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
    zoneChange(event) {
      let code = this.zoneCodeList.find(item => item.id === event)
      if (code) {
        this.form.storeCode = code.code
      }
    },
    placeChange(){
      this.getList()
      this.getZoneList()
    }
  }
};
</script>
