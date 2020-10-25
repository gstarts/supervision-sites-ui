<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="48px">
      <el-form-item label="场所" prop="placeId">
        <el-select @change="handleQuery"
                   v-model="queryParams.placeId" placeholder="请选择场所" size="small">
          <el-option
            v-for="dept in depts"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="进/出库" prop="direction" label-width="70px">
        <el-select @change="handleQuery"
                   v-model="queryParams.direction" placeholder="请选择进/出库" size="small">
          <el-option
            v-for="dept in directionDic"
            :key="dept.key"
            :label="dept.label"
            :value="dept.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车号" prop="vehicleNo">
        <!-- <el-autocomplete
           class="inline-input"
           v-model="queryParams.vehicleNo"
           :fetch-suggestions="nameSearch"
           placeholder="请输入发货单位"
           @select="handleSelect"
           clearable
         ></el-autocomplete>
       </el-form-item>-->
        <el-select @change="setDoc"
                   v-model="queryParams.vehicleNo" placeholder="请选择车牌号" size="small">
          <el-option
            v-for="dept in instoreDocList"
            :key="dept.id"
            :label="dept.vehicleNo"
            :value="dept.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 添加或修改入库通知单对话框 -->
    <el-card style="max-width: 700px">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="寄舱客户" prop="checkConsumer">
              <el-input v-model="form.checkConsumer" placeholder="请输入寄舱客户" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="集装箱号1" prop="containerNo1">
              <el-input v-model="form.containerNo1" placeholder="请输入集装箱号1" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库位号1" prop="storeCode">
              <el-select v-model="form.storeCode" placeholder="请选择库位号1" size="small">
                <el-option
                  v-for="store in storeList"
                  :key="store.storeCode"
                  :label="store.storeCode"
                  :value="store.storeCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="集装箱号2" prop="containerNo2">
              <el-input v-model="form.containerNo2" placeholder="请输入集装箱号2" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库位号2" prop="storeCode2">
              <el-select v-model="form.storeCode2" placeholder="请选择库位号2" size="small">
                <el-option
                  v-for="store in storeList"
                  :key="store.storeCode"
                  :label="store.storeCode"
                  :value="store.storeCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="集装箱号3" prop="containerNo3">
              <el-input v-model="form.containerNo3" placeholder="请输入集装箱号3" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库位号3" prop="storeCode3">
              <el-select v-model="form.storeCode3" placeholder="请选择库位号3" size="small">
                <el-option
                  v-for="store in storeList"
                  :key="store.storeCode"
                  :label="store.storeCode"
                  :value="store.storeCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="集装箱号4" prop="containerNo4">
              <el-input v-model="form.containerNo4" placeholder="请输入集装箱号4" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库位号4" prop="storeCode4">
              <el-select v-model="form.storeCode4" placeholder="请选择库位号4" size="small">
                <el-option
                  v-for="store in storeList"
                  :key="store.storeCode"
                  :label="store.storeCode"
                  :value="store.storeCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="text-align: right;padding-right: 20px">
          <el-col :span="24">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <!--<el-button @click="cancel">取 消</el-button>-->
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {listInstoreDoc, getInstoreDoc, delInstoreDoc, addInstoreDoc, updateInstoreDoc} from "@/api/place/instoreDoc";
import {getUserDepts} from "@/utils/charutils";
import {listStore, listStoreCanUse} from "@/api/place/store";

export default {
  name: "InstoreDoc",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      depts: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 入库通知单表格数据
      instoreDocList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        placeId: undefined,
        docNo: undefined,
        vehicleNo: undefined,
        storeState: undefined,
        packMode: '1' //集装箱
      },
      // 表单参数
      form: {
        containerNo1: undefined,
        containerNo2: undefined,
        containerNo3: undefined,
        containerNo4: undefined,
        id: undefined,
        storeCode: undefined,
        storeCode2: undefined,
        storeCode3: undefined,
        storeCode4: undefined,
      },
      // 表单校验
      rules: {
        checkConsumer: [
          {type: 'string', required: true, message: "寄舱客户不能为空", trigger: "blur"}
        ],
        containerNo1: [
          {required: true, message: "集装箱号1不能为空", trigger: "blur"}
        ],
        containerNo2: [
          {required: true, message: "集装箱号2不能为空", trigger: "blur"}
        ],
        containerNo3: [
          {required: true, message: "集装箱号3不能为空", trigger: "blur"}
        ],
        containerNo4: [
          {required: true, message: "集装箱号4不能为空", trigger: "blur"}
        ],
        storeCode: [
          {type: 'string', required: true, message: "库位号1不能为空", trigger: "change"}
        ],
        storeCode2: [
          {required: true, message: "库位号2不能为空", trigger: "change"}
        ],
        storeCode3: [
          {required: true, message: "库位号3不能为空", trigger: "change"}
        ],
        storeCode4: [
          {required: true, message: "库位号4不能为空", trigger: "change"}
        ],
      },
      vehicleList: [],
      storeList: [],
      directionDic: [
        {'key':'1',label:'入库'},
        {'key':'0',label:'出库'},
      ]
    };
  },
  created() {
    this.depts = getUserDepts('0')
    if (this.depts.length > 0) {
      this.queryParams.placeId = this.depts[0].deptId
      this.getList();
    }
  },
  methods: {
    /** 查询入库通知单列表 */
    getList() {
      this.loading = true;
      this.queryParams.storeState = '0' //待入库的状态
      listInstoreDoc(this.queryParams).then(response => {
        this.instoreDocList = response.rows;
        //this.total = response.total;
        this.loading = false;
      });

      //查询可用的集装箱库位
      let store = {
        placeId: this.queryParams.placeId,
        zoneType: '1',//集装箱区域
        storeState: '0',
      }
      listStoreCanUse(store).then(response => {
        if (response.data.length === 0) {
          this.$message.warning("此场所没有可用的集装箱库位")
        }
        this.storeList = response.data;
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
        placeId: undefined,
        docNo: undefined,
        businessNo: undefined,
        checkConsumer: undefined,
        checkContractNo: undefined,
        mongoliaBillNo: undefined,
        vehicleNo: undefined,
        trailerNo1: undefined,
        trailerNo2: undefined,
        vehicleTeam: undefined,
        mongoliaNetWeight: undefined,
        mongoliaTareWeight: undefined,
        vehicleCount: undefined,
        driverName: undefined,
        vehicleTeamContact: undefined,
        vehicleTeamTel: undefined,
        vehicleType: undefined,
        measuringUnit: undefined,
        packMode: undefined,
        containerNo1: undefined,
        containerNo2: undefined,
        containerNo3: undefined,
        containerNo4: undefined,
        netWeight: undefined,
        tareWeight: undefined,
        roughWeight: undefined,
        remark: undefined,
        genTime: undefined,
        genBy: undefined,
        poundTime: undefined,
        poundNo: undefined,
        batchNo: undefined,
        loadingBillNo: undefined,
        storeCode: undefined,
        storeCode2: undefined,
        storeCode3: undefined,
        storeCode4: undefined,
        hasManifest: undefined,
        hasDeclare: undefined,
        hasTransit: undefined,
        storeState: undefined,
        fileId: undefined,
        passNo: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        revision: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
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
      this.title = "添加入库通知单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getInstoreDoc(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改入库通知单";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let stores = []
          stores.push(this.form.storeCode)
          stores.push(this.form.storeCode2)
          stores.push(this.form.storeCode3)
          stores.push(this.form.storeCode4)
          if(this.isRepeat(stores)){
            this.$message.warning("库位号有重复项")
            return false
          }
          if (this.form.id != undefined) {
            updateInstoreDoc(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addInstoreDoc(this.form).then(response => {
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
      this.$confirm('是否确认删除入库通知单编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delInstoreDoc(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('place/instoreDoc/export', {
        ...this.queryParams
      }, `place_instoreDoc.xlsx`)
    },
    setDoc(event) {
      //event =  doc_id
      this.form = this.instoreDocList.find(item => item.id === event)
    },
    // 收发货单位建议
    nameSearch(queryString, cb) {
      let results = queryString ? this.instoreDocList.filter(this.createFilter(queryString)) : this.instoreDocList
      cb(results)
    },
    createFilter(queryString) {
      return (name) => {
        return (name.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item2) {
      console.log(item2)
      this.queryParams.vehicleNo = item2.vehicleNo
      this.form = this.instoreDocList.find(item => item.vehicleNo === item2)
    },
    isRepeat(arr) { //判断数组中是否有重复
      let hash = {};
      for (let i in arr) {
        if (hash[arr[i]]) //hash 哈希
          return true;
        hash[arr[i]] = true;
      }
      return false;
    }
  }
};
</script>
