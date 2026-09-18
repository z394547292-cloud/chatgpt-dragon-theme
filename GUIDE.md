# ChatGPT 霜璃 · 冰晶龙娘主题

这是给 ChatGPT 网页版使用的 Tampermonkey 用户脚本。

## 当前推荐版本

请使用 **V3**：

`chatgpt_shuangli_theme_v3.user.js`

V3 不再只是右下角角色卡，而是完整的网页主题：整窗冰晶背景、半透明玻璃侧栏与输入框、龙鳞微纹、雪粒与呼吸辉光、霜璃陪伴卡、暗色模式适配，并可单独关闭动态特效。

## 安装

1. 浏览器先安装 Tampermonkey。
2. 在 Tampermonkey 里关闭旧的“银白龙娘 V1/V2”“霜璃 V2”和测试脚本，避免样式冲突。
3. 打开 V3 Raw：
   https://raw.githubusercontent.com/z394547292-cloud/chatgpt-dragon-theme/main/chatgpt_shuangli_theme_v3.user.js
4. Tampermonkey 出现安装页后点击“安装”。
5. 回到 https://chatgpt.com/ ，按 **Ctrl + F5** 强制刷新。
6. 右下角出现“霜璃”卡片后，点击“导入”，选择你的霜璃图片。

## V3 功能

- 霜璃银白 / 冰蓝 / 淡紫整窗主题
- 玻璃质感侧栏、顶部栏、菜单与输入区
- 龙鳞感微纹背景
- 雪粒 + 呼吸辉光 + 卡片流光
- 右下角霜璃陪伴卡，可拖动并记忆位置
- 点击气泡切换短句
- 图片只保存在当前浏览器 localStorage
- “⋯”菜单可关闭动态特效、重置位置、清除角色图片
- 跟随系统暗色模式调整配色
- GitHub Raw 自动更新地址已写入脚本头

## 如果界面没有变化

优先检查下面三件事：

1. Tampermonkey 右上角图标里确认 V3 已启用。
2. 确认旧版主题脚本已经关闭，只保留 V3。
3. 在 ChatGPT 页面按 Ctrl + F5。

如果右下角能看到“❄ 霜璃”，说明脚本已经运行；如果只有卡片而主界面没变化，通常是旧脚本样式冲突或 ChatGPT 页面缓存未刷新。

## 恢复原界面

在 Tampermonkey 中关闭 V3，再刷新 ChatGPT 即可。脚本不修改 ChatGPT 安装文件，也不会上传你导入的图片。
