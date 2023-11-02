<script setup>
import { Search } from '@element-plus/icons-vue'
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import moment from 'moment'
import { useRouter } from 'vue-router'
import pagination from '@/components/pagination'
import * as echarts from 'echarts';



moment.locale('zh-cn')
const router = useRouter()
const input2 = ref("")
const visible = ref(false)
const newlist = ref([])
const pagecount =ref()
const arr1 = ref([])
const arr2 = ref([])
const arr3 = ref([])
const arr4 = ref([])
const number =ref(1)
const activeName = ref(1)
const datavalue =ref(1)
const gettime = (time) => {
    return moment(time).format("lll")
}
onMounted(async () => {
    var res = await axios.get('/webapi/news/list')
    newlist.value = res.data.data
    for (let i = 0; i < newlist.value.length; i++) {
        if (newlist.value[i].category == 1) {
            arr1.value.push(newlist.value[i])
        }
        else if (newlist.value[i].category == 2) {
            arr2.value.push(newlist.value[i])
        }
        else if (newlist.value[i].category == 3) {
            arr3.value.push(newlist.value[i])
        }
    }
   arr4.value=arr1.value.slice(0,5)
   axios.get(`/webapi/news/getlist1/${number.value}`).then(res=>{
        pagecount.value =Math.ceil(res.data.data/5)
   })
    var myChart = echarts.init(document.getElementById('mychar'));
var option = {
        title: {
          text: '新闻统计'
        },
        tooltip: {},
        legend: {
          data: ['数量']
        },
        xAxis: {
          data: ['最新动态', '典型案例', '通知公告']
        },
        yAxis: {},
        series: [
          {
            name: '数量',
            type: 'bar',
            data: [arr1.value.length, arr2.value.length, arr3.value.length]
          }
        ]
      };
      myChart.setOption(option);
})

const searchnewslist = computed(() => input2.value ? newlist.value.filter(item => item.title.includes(input2.value)) : [])
const toplist = computed(() => newlist.value.slice(0, 4))
const centerlist = [
    {
        label: "最新动态",
        name: 1

    },
    {
        label: "典型案例",
        name: 2

    },
    {
        label: "通知公告",
        name: 3

    }
]
const handlist = (id) => {
    router.push(`/news/${id}`)
}
const pagination1 =(newlist)=>{

  if(newlist[1]==1){
    arr4.value=newlist[0]
  }
  else if(newlist[1]==2){
    arr2.value=newlist[0]
  }
  else if(newlist[1]==3){
    arr3.value=newlist[0]
  }

}
const tables = (name)=>{
    datavalue.value=name
    axios.get(`/webapi/news/getlist1/${name}`).then(res=>{
        pagecount.value =Math.ceil(res.data.data/5)
   })
}
</script>

<template>
    <video  src="@/assets/video/rc.mp4" autoplay="autoplay" loop="loop" muted="muted">
        </video>
    <div class="div1">
        <el-popover  placement="bottom" title="搜索结果" width="25%" trigger="click" content="" :visible="visible">
            <template #reference>
                <el-input style="width: 25%;" v-model="input2" class="w-50 m-2" placeholder="请输入查询关键字" :prefix-icon="Search"
                    type="search" @input="visible = true" @blur="visible = false" />
            </template>
            <div v-if="searchnewslist.length">
                <div class="div2" v-for="data in searchnewslist" :key="data._id" @click="handlist(data._id)">{{ data.title
                }}</div>
            </div>
            <div v-else>
                <el-empty description="暂无新闻" :image-size="100" />
            </div>
        </el-popover>
        <!-- <video  src="@/assets/video/rc.mp4">
        </video> -->
       
    
    </div>
    <div class="topnew">
        <el-row :gutter="15">
            <el-col :span="6" v-for="k in toplist" :key="k._id">
                <el-card @click="handlist(k._id)" :body-style="{ padding: '0px' }" shadow="hover">
                    <img style="height: 200px;width: 100%;"
                        :src="k.cover.includes('blob') ? k.cover : 'http://localhost:3000' + k.cover" class="image" />
                    <div style="padding: 14px">
                        <span>{{ k.title }}</span>
                        <div class="time">
                            <span>{{ gettime(k.editTime) }}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
    <el-row :gutter="15">
        <el-col :span="14">
            <div class="center">
                <el-tabs v-model="activeName" class="demo-tabs" @tab-change="tables">
                    <el-tab-pane v-for=" data in centerlist" :key="data.name" :label="data.label" :name="data.name" >
                    
                        <div class="center1" v-if="data.name == 1" v-for="item in arr4" :key="item._id">
                            <el-card @click="handlist(item._id)" :body-style="{ padding: '0px' }" shadow="hover">
                                <img style="height: 150px;width: 25%;" :src="'http://localhost:3000' + item.cover"
                                    class="image" />
                                <div style="padding: 14px">
                                    <span>{{ item.title }}</span>
                                    <div class="time">
                                        <span>{{ gettime(item.editTime) }}</span>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                        <div class="center1" v-else-if="data.name == 2" v-for="item2 in arr2" :key="item2._id">
                            <el-card @click="handlist(item2._id)" :body-style="{ padding: '0px' }" shadow="hover">
                                <img style="height: 150px;width: 25%;" :src="'http://localhost:3000' + item2.cover"
                                    class="image" />
                                <div style="padding: 14px">
                                    <span>{{ item2.title }}</span>
                                    <div class="time">
                                        <span>{{ gettime(item2.editTime) }}</span>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                        <div class="center1" v-else="data.name == 3" v-for="item3 in arr3" :key="item3._id">
                            <el-card @click="handlist(item3._id)" :body-style="{ padding: '0px' }" shadow="hover">
                                <img style="height: 150px;width: 25%;" :src="'http://localhost:3000' + item3.cover"
                                    class="image" />
                                <div style="padding: 14px">
                                    <span>{{ item3.title }}</span>
                                    <div class="time">
                                        <span>{{ gettime(item3.editTime) }}</span>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                       
                    </el-tab-pane>
                    <pagination :pagecount=pagecount :path=datavalue  :pageSize3=5  @pagination="pagination1"></pagination>
                </el-tabs>
               
            </div>
        </el-col>
        <el-col :span="10">
            <div class="mychar" id="mychar" style="height: 400px;width: 500px;"> </div>
        </el-col>
    </el-row>
    <el-backtop :visibility-height="100" />
</template>
<style lang="scss" scoped >
video{
    position: absolute;
    top: 20px;
    z-index: -2;
    margin: 0;
    width: 100%;
    height: 100%;
   left: 0px;
   object-fit: cover
}
.topnew {
    margin-top: 40px;
}

.center {
    margin-top: 50px;
    padding: 10px;
    margin-left: 30px;
}

.center1 {
    margin-top: 10px;
    padding: 10px;
}

.image {
    float: left;
}

.time {
    color: #878787;
    font-size: 12px;
}

.div1 {
    margin: 0;
    width: 100%;
    height: 750px;
    text-align: center;
    line-height: 750px;
}

.div2 {
    margin-top: 10px;

    &:hover {
        background-color: #ebf2f7;
        color: #507999;
        cursor: pointer;
    }
}
.mychar{
margin-top: 100px;
}

</style>
