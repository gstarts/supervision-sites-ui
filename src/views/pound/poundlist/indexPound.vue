<template>
  <div class="app-container">
    <!-- 按钮组 -->
    <div class="mb20">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="headHandleAdd">新增</el-button>
      <el-button type="success" icon="el-icon-edit" size="mini" @click="MeasurementSheetSave">暂存</el-button>
    </div>

    <el-card class="mb20">
      <el-form :model="form" ref="form" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="日期:" prop="time">
              <el-input v-model="form.time" placeholder="请输入日期" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间:" prop="stringTime">
              <el-input v-model="form.stringTime" placeholder="请输入时间" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="发货单位" prop="deliveryUnit">
              <el-input v-model="form.deliveryUnit" placeholder="请输入发货单位" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="毛重" prop="grossWeight">
              <el-input v-model="form.grossWeight" placeholder="请输入毛重" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="收货单位" prop="receivingUnit">
              <el-input v-model="form.receivingUnit" placeholder="请输入收货单位" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="皮重" prop="tare">
              <el-input v-model="form.tare" placeholder="请输入皮重" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="货物名称" prop="goodsName">
              <el-input v-model="form.goodsName" placeholder="请输入货物名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="箱皮重" prop="tareWeight">
              <el-input v-model="form.tareWeight" placeholder="请输入箱皮重" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="车号" prop="plateNum">
              <el-input v-model="form.plateNum" placeholder="请输入车牌号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="净重" prop="netWeight">
              <el-input v-model="form.netWeight" placeholder="请输入净重" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="箱号" prop="containerNum">
              <el-input v-model="form.containerNum" placeholder="请输入箱号" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="提煤单号" prop="coalBillNum">
              <el-input v-model="form.coalBillNum" placeholder="请输入提煤单号" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="24">
            <el-form-item label="备注" prop="rmk">
              <el-input v-model="form.rmk" placeholder="请输入备注" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="司磅员:" prop="measurer">
              <el-input v-model="form.measurer" placeholder="请输入司磅员" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签字:" prop="rmk">
              <el-input v-model="form.rmk" placeholder="请输入签字" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="保管员:" prop="keeper">
              <el-input v-model="form.keeper" placeholder="请输入保管员" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addSheet, updateSheet } from "@/api/pound/poundlist";

export default {
  name: "Client",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 终端表格数据
      clientList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        clientId: undefined,
      },
      // 是否新增
      isAdd: false,
      // 表单参数
      form: {
        time: undefined,
        stringTime: undefined,
        finalInspectionTime: undefined,
        rmk: undefined,
      },
      // 表单校验
      rules: {},
    };
  },
  created() {},
  methods: {
    // 取消按钮
    cancel() {},

    headHandleAdd() {
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {};
      this.resetForm("form");
    },

    /** 提交按钮 */
    MeasurementSheetSave: function () {
      this.form.finalInspectionTime = this.form.time + this.form.stringTime;
      this.form.finalInspectionTime = this.form.time + this.form.stringTime;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updateSheet(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.reset();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addSheet(this.form).then((response) => {
              console.log(JSON.stringify(this.form));
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.reset();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
  },
};
</script>