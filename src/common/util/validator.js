//校验器

export const REGEX = {
    intege: '^-?[1-9]\\d*$', 				//整数
    intege1: '^[1-9]\\d*$', 				//正整数
    intege2: '^-[1-9]\\d*$', 				//负整数
    num: '^([+-]?)\\d*\\.?\\d+$', 		//数字
    num1: '^[1-9]\\d*|0$', 				//正数（正整数 + 0）
    num2: '^-[1-9]\\d*|0$', 				//负数（负整数 + 0）
    decmal: '^([+-]?)\\d*\\.\\d+$', 		//浮点数
    decmal1: '^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$', //正浮点数
    decmal2: '^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$', //负浮点数
    decmal3: '^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$', //浮点数
    decmal4: '^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$', //非负浮点数（正浮点数 + 0）
    decmal5: '^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$', //非正浮点数（负浮点数 + 0）

    email: '^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$', //邮件
    color: '^[a-fA-F0-9]{6}$', 			//颜色
    url: '^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$', //url
    website: '^([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$', //website
    chinese: '^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$', 				//仅中文
    ascii: '^[\\x00-\\xFF]+$', 			//仅ACSII字符
    zipcode: '^\\d{6}$', 					//邮编
    mobile: '^(13|15|18|17)[0-9]{9}$', 			//手机
    ip4: '^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$', //ip地址
    notempty: '^\\S+$', 					//非空
    picture: '(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$', //图片
    rar: '(.*)\\.(rar|zip|7zip|tgz)$', 							//压缩文件
    date: '^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$', 				//日期
    qq: '^[1-9]*[1-9][0-9]*$', 			//QQ号码
    tel: '^(([0\\+]\\d{2,3}-)?(\\d{2,4})-)?(\\d{7,8})(-(\\d{3,}))?$', //电话号码的函数(包括验证国内区号,国际区号,分机号)'^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$'
    telcountry: '^\\+?\\d{1,4}$', //电话号码的国家区号号+86
    telarea: '\\d{1,4}$', //电话号码的地区区号
    telnumber: '^\\d{7,8}$', //电话号码
    username: '^\\w+$', 					//用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
    letter: '^[A-Za-z]+$', 				//字母
    letter_u: '^[A-Z]+$', 				//大写字母
    letter_l: '^[a-z]+$', 				//小写字母
    idcard: '^[1-9]([0-9]{14}|[0-9]{17})$',	//身份证
    nickname: '^[\u4E00-\u9FA5A-Za-z0-9_]+$'
};

export function isValid(type, value) {
    return new RegExp(REGEX[type]).test(value);
}
