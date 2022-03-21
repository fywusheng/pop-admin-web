import Vue from 'vue';
import {Upload} from 'element-ui';
import { clientUpload } from '@/api/sys'

let _handleStart = Upload.methods.handleStart;
let _uploader = Upload.components.Upload

let _ajax = _uploader.props.httpRequest.default
_uploader.props.httpRequest.default = async function (options) {
  const onSuccess = options.onSuccess;
 options.onSuccess = function(result){
   if(result.code){
     result.code = parseInt(result.code);
     onSuccess(result)
   }
 }
  const result = await clientUpload({
    dirPrefix: 'item',
    objectName: Date.now() + '.' + options.file.name.split('.').pop()
  })
  if (result.code == 200) {
    options.data = {
      key: result.data.filename,
      policy: result.data.policy,
      OSSAccessKeyId: result.data.accessId,
      signature: result.data.signature,
      success_action_status: '200',
      callback: result.data.callback,
    }
    return _ajax(options);
  }
}


export default function () {
  Vue.component(Upload.name, {
    props: {
      action: {
        required: false,
        default() {
          return process.env.VUE_APP_UPLOAD_BASE_API
        }
      },
      // 图片上传大小限制(默认5M)
      maxSize: {
        type: Number,
        default: 100
      }
    },
    methods: {
      handleStart(rawFile) {
        // if (this.maxSize && rawFile.size > this.maxSize * 1024 * 1024) {
        //   if (this.$message) {
        //     this.$message({
        //       message: `图片不能超过 ${this.maxSize} M`,
        //       type: 'warning'
        //     })
        //   } else {
        //     console.log(`图片不能超过${this.maxSize}M`);
        //   }
        //   return;
        // }
        _handleStart.call(this, rawFile);
      }
    },
    extends: Upload
  })
}
