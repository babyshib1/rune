import validid from 'utils/idCard'
export default {
  // 校验购买人姓名
  checkName: [
    { required: true, message: '请填写购买人姓名', trigger: 'onBlur' },
    {
      validator: (val, rule) => {
        return /^[\u4e00-\u9fa5a-zA-Z]{1,20}$/.test(val)
      },
      message: '购买人姓名填写错误，仅支持中文或英文，不超过20个字符'
    }
  ],
  // 校验证件类型
  checkDocType: [{ required: true, message: '请选择证件类型', trigger: 'onChange' }],
  // 校验身份证号码
  checkId: [
    { required: true, message: '请填写证件号码', trigger: 'onBlur' },
    {
      validator: (val, rule) => {
        return validid.cnid(val)
      },
      message: '请输入正确的证件号码'
    }
  ],
  // 校验香港身份证
  checkHKId: [
    { required: true, message: '请填写证件号码', trigger: 'onBlur' },
    {
      validator: (val, rule) => {
        return /^[A-Z]{1,2}\d{6}(\()?[\dA](\))?$/.test(val)
      },
      message: '请输入正确的香港身份证'
    }
  ],
  // 校验澳门身份证
  checkMacaoId: [
    { required: true, message: '请填写证件号码', trigger: 'onBlur' },
    {
      validator: (val, rule) => {
        return /^[1|5|7]\d{6}(\()?[0-9A-Z](\))?$/.test(val)
      },
      message: '请输入正确的澳门身份证'
    }
  ],
  // 校验台湾身份证
  checkTWId: [
    { required: true, message: '请填写证件号码', trigger: 'onBlur' },
    {
      validator: (val, rule) => {
        return /^[a-zA-Z]\d{9}$/.test(val)
      },
      message: '请输入正确的台湾身份证'
    }
  ],
  // 校验护照
  checkPassport: [
    { required: true, message: '请填写证件号码', trigger: 'onBlur' },
    {
      validator: (val, rule) => {
        return /^([a-zA-z]|\d){5,15}$/.test(val)
      },
      message: '请输入正确的护照号码',
      trigger: 'onBlur'
    }
  ],
  // 校验手机号
  checkPhone: [
    { required: true, message: '请输入手机号', trigger: 'onBlur' },
    {
      validator: (val, rule) => {
        return /^1\d{10}$/.test(val)
      },
      message: '手机号码错误，请重新输入',
      trigger: 'onBlur'
    }
  ],
  // 校验手机号 非必填
  checkPhoneNoRequired: [
    {
      required: false,
      validator: (val, rule) => {
        if (val) {
          return /^1\d{10}$/.test(val)
        }
      },
      message: '手机号码错误，请重新输入',
      trigger: 'onBlur'
    }
  ],
  // 校验手机验证码
  checkMsgCode: [
    { required: true, message: '请输入手机验证码', trigger: 'onBlur' },
    {
      validator: (val, rule) => {
        return /^\d{6}$/.test(val)
      },
      message: '请输入正确手机验证码',
      trigger: 'onBlur'
    }
  ],
  // 校验上牌城市
  checkCity: [{ required: true, message: '请选择上牌城市', trigger: 'onChange' }],
  // 校验企业名称
  checkCoName: [
    { required: true, message: '请输入企业名称', trigger: 'onBlur' },
    {
      validator: (val, rule) => {
        return /^[\u2E80-\u9FFF]{5,25}$/.test(val)
      },
      message: '请输入正确企业名称',
      trigger: 'onBlur'
    }
  ],
  // 校验企业代码
  checkCoCode: [
    { required: true, message: '请输入企业代码', trigger: 'onBlur' },
    {
      validator: (val, rule) => {
        return /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/.test(val)
      },
      message: '请输入正确企业代码',
      trigger: 'onBlur'
    }
  ]
}
