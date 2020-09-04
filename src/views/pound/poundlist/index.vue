<template>
  <div class="app-container">
      <!-- 按钮组 -->
    <div class="mb20">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="headHandleAdd"
      >打印</el-button>
      <el-button
        type="success"
        icon="el-icon-edit"
        size="mini"
        @click="handleAdd"
      >暂存</el-button>

    </div>
    
    <el-card class="mb20">
      <el-form :model="form" ref="form"  :rules="rules" label-width="160px">
        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="发货单位" prop="deliveryUnit">
              <el-input v-model="form.deliveryUnit" placeholder="请输入发货单位" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车号" prop="plateNum">
              <el-input v-model="form.plateNum" placeholder="请输入车号" clearable></el-input>
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
            <el-form-item label="毛重" prop="grossWeight">
              <el-input v-model.number="form.grossWeight" placeholder="请输入毛重" clearable></el-input>
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
            <el-form-item label="皮重" prop="tare">
              <el-input v-model.number="form.tare" placeholder="请输入皮重" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="规格型号" prop="specification">
              <el-input v-model="form.specification" placeholder="请输入规格型号" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="净重" prop="netWeight">
              <el-input v-model.number="form.netWeight" placeholder="请输入净重" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex">
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="流向" prop="flowDirection">
              <!-- <el-input v-model="form.flowDirection" placeholder="请输入流向" clearable></el-input> -->
              <el-select v-model="form.flowDirection" placeholder="请选择流向">
                <el-option
                  v-for="dict in flowDirectionOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
            </el-select>
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
            
            <el-form-item label="签字:" prop="clientId">
              <el-input v-model="form.clientId" placeholder="请输入签字" clearable></el-input>
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
import {
  addSheet,updateSheet
} from "@/api/pound/poundlist";
import{genTimeCode} from "@/utils/common"

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
      // 流向
      flowDirectionOptions:[],
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
        finalInspectionTime:undefined,
        time:undefined,
        stringTime:undefined,


      },
      // 表单校验
      rules: {
         grossWeight: [
          { type: "number", message: "请输入数字" }
        ],

        tare: [
          { type: "number", message: "请输入数字" }
        ],
         netWeight: [
          { type: "number", message: "请输入数字" }
        ],
        
      },
    };
  },
  created() {

     /**流向  */
    this.getDicts("station_IO_flag").then((response) => {
      this.flowDirectionOptions = response.data;
    });

   
  },
  methods: {

    headHandleAdd(){
      this.reset()
    },

     /** 提交按钮 */
    handleAdd: function () {
     this.form.finalInspectionTime= genTimeCode(new Date(),'YYYY-MM-DD HH:mm:ss')
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
              console.log(JSON.stringify(this.form))
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
    
    // 取消按钮
    cancel() {
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
      };
      this.resetForm("form");
    },
    
   
   
    
  },
};
</script>