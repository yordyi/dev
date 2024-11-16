<div align="center">

# ComfyUI
**最强大和模块化的扩散模型GUI和后端。**


[![网站][website-shield]][website-url]
[![动态JSON徽章][discord-shield]][discord-url]
[![Matrix][matrix-shield]][matrix-url]
<br>
[![][github-release-shield]][github-release-link]
[![][github-release-date-shield]][github-release-link]
[![][github-downloads-shield]][github-downloads-link]
[![][github-downloads-latest-shield]][github-downloads-link]

[matrix-shield]: https://img.shields.io/badge/Matrix-000000?style=flat&logo=matrix&logoColor=white
[matrix-url]: https://app.element.io/#/room/%23comfyui_space%3Amatrix.org
[website-shield]: https://img.shields.io/badge/ComfyOrg-4285F4?style=flat
[website-url]: https://www.comfy.org/
<!-- 显示总用户数的解决方法，来自 https://github.com/badges/shields/issues/4500#issuecomment-2060079995 -->
[discord-shield]: https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdiscord.com%2Fapi%2Finvites%2Fcomfyorg%3Fwith_counts%3Dtrue&query=%24.approximate_member_count&logo=discord&logoColor=white&label=Discord&color=green&suffix=%20总数
[discord-url]: https://www.comfy.org/discord

[github-release-shield]: https://img.shields.io/github/v/release/comfyanonymous/ComfyUI?style=flat&sort=semver
[github-release-link]: https://github.com/comfyanonymous/ComfyUI/releases
[github-release-date-shield]: https://img.shields.io/github/release-date/comfyanonymous/ComfyUI?style=flat
[github-downloads-shield]: https://img.shields.io/github/downloads/comfyanonymous/ComfyUI/total?style=flat
[github-downloads-latest-shield]: https://img.shields.io/github/downloads/comfyanonymous/ComfyUI/latest/total?style=flat&label=downloads%40latest
[github-downloads-link]: https://github.com/comfyanonymous/ComfyUI/releases

![ComfyUI 截图](comfyui_screenshot.png)
</div>

这个UI将让你使用基于图表/节点/流程图的界面设计和执行高级稳定扩散管道。有关一些工作流程示例以及了解ComfyUI的功能，你可以查看：
### [ComfyUI 示例](https://comfyanonymous.github.io/ComfyUI_examples/)

### [安装 ComfyUI](#installing)

## 功能
- 节点/图表/流程图界面，无需编写代码即可实验和创建复杂的稳定扩散工作流程。
- 完全支持SD1.x、SD2.x、[SDXL](https://comfyanonymous.github.io/ComfyUI_examples/sdxl/)、[Stable Video Diffusion](https://comfyanonymous.github.io/ComfyUI_examples/video/)、[Stable Cascade](https://comfyanonymous.github.io/ComfyUI_examples/stable_cascade/)、[SD3](https://comfyanonymous.github.io/ComfyUI_examples/sd3/)和[Stable Audio](https://comfyanonymous.github.io/ComfyUI_examples/audio/)
- [Flux](https://comfyanonymous.github.io/ComfyUI_examples/flux/)
- 异步队列系统
- 多项优化：仅重新执行工作流程中在执行之间发生变化的部分。
- 智能内存管理：可以自动在低至1GB显存的GPU上运行模型。
- 即使你没有GPU也可以使用：```--cpu```（速度较慢）
- 可以加载ckpt、safetensors和diffusers模型/检查点。独立的VAE和CLIP模型。
- 嵌入/文本反转
- [Loras（常规、locon和loha）](https://comfyanonymous.github.io/ComfyUI_examples/lora/)
- [超网络](https://comfyanonymous.github.io/ComfyUI_examples/hypernetworks/)
- 从生成的PNG、WebP和FLAC文件加载完整工作流程（包括种子）。
- 将工作流程保存/加载为Json文件。
- 节点界面可用于创建复杂的工作流程，如[高分辨率修复](https://comfyanonymous.github.io/ComfyUI_examples/2_pass_txt2img/)或更高级的工作流程。
- [区域合成](https://comfyanonymous.github.io/ComfyUI_examples/area_composition/)
- [修复](https://comfyanonymous.github.io/ComfyUI_examples/inpaint/)，支持常规和修复模型。
- [ControlNet和T2I-Adapter](https://comfyanonymous.github.io/ComfyUI_examples/controlnet/)
- [放大模型（ESRGAN、ESRGAN变体、SwinIR、Swin2SR等）](https://comfyanonymous.github.io/ComfyUI_examples/upscale_models/)
- [unCLIP模型](https://comfyanonymous.github.io/ComfyUI_examples/unclip/)
- [GLIGEN](https://comfyanonymous.github.io/ComfyUI_examples/gligen/)
- [模型合并](https://comfyanonymous.github.io/ComfyUI_examples/model_merging/)
- [LCM模型和Loras](https://comfyanonymous.github.io/ComfyUI_examples/lcm/)
- [SDXL Turbo](https://comfyanonymous.github.io/ComfyUI_examples/sdturbo/)
- [AuraFlow](https://comfyanonymous.github.io/ComfyUI_examples/aura_flow/)
- [HunyuanDiT](https://comfyanonymous.github.io/ComfyUI_examples/hunyuan_dit/)
- 使用[TAESD](#如何显示高质量预览)的潜在预览
- 启动非常快速。
- 完全离线工作：永远不会下载任何内容。
- [配置文件](extra_model_paths.yaml.example)用于设置模型的搜索路径。

工作流程示例可以在[示例页面](https://comfyanonymous.github.io/ComfyUI_examples/)找到

## 快捷键

| 快捷键                             | 说明                                                                                   |
|------------------------------------|----------------------------------------------------------------------------------------|
| Ctrl + Enter                       | 将当前图表排队等待生成                                                                 |
| Ctrl + Shift + Enter               | 将当前图表作为第一个排队等待生成                                                       |
| Ctrl + Alt + Enter                 | 取消当前生成                                                                           |
| Ctrl + Z/Ctrl + Y                  | 撤销/重做                                                                              |
| Ctrl + S                           | 保存工作流程                                                                           |
| Ctrl + O                           | 加载工作流程                                                                           |
| Ctrl + A                           | 选择所有节点                                                                           |
| Alt + C                            | 折叠/展开选定的节点                                                                    |
| Ctrl + M                           | 静音/取消静音选定的节点                                                                |
| Ctrl + B                           | 绕过选定的节点（就像从图表中移除节点并重新连接线一样）                                 |
| Delete/Backspace                   | 删除选定的节点                                                                         |
| Ctrl + Backspace                   | 删除当前图表                                                                           |
| 空格                               | 按住并移动光标时移动画布                                                               |
| Ctrl/Shift + 点击                  | 将点击的节点添加到选择中                                                               |
| Ctrl + C/Ctrl + V                  | 复制和粘贴选定的节点（不保持与未选定节点输出的连接）                                   |
| Ctrl + C/Ctrl + Shift + V          | 复制和粘贴选定的节点（保持从未选定节点的输出到粘贴节点输入的连接）                     |
| Shift + 拖动                       | 同时移动多个选定的节点                                                                 |
| Ctrl + D                           | 加载默认图表                                                                           |
| Alt + `+`                          | 画布放大                                                                               |
| Alt + `-`                          | 画布缩小                                                                               |
| Ctrl + Shift + 左键 + 垂直拖动     | 画布放大/缩小                                                                          |
| P                                  | 固定/取消固定选定的节点                                                                |
| Ctrl + G                           | 对选定的节点进行分组                                                                   |
| Q                                  | 切换队列的可见性                                                                       |
| H                                  | 切换历史记录的可见性                                                                   |
| R                                  | 刷新图表                                                                               |
| 双击左键                           | 打开节点快速搜索面板                                                                   |
| Shift + 拖动                       | 一次移动多条线                                                                         |
| Ctrl + Alt + 左键                  | 断开点击插槽的所有线                                                                   |

对于macOS用户，Ctrl也可以替换为Cmd

# 安装

## Windows

在[发布页面](https://github.com/comfyanonymous/ComfyUI/releases)上有一个适用于Windows的便携式独立版本，可以在Nvidia GPU上运行或仅在CPU上运行。

### [直接下载链接](https://github.com/comfyanonymous/ComfyUI/releases/latest/download/ComfyUI_windows_portable_nvidia.7z)

只需下载，使用[7-Zip](https://7-zip.org)解压缩并运行即可。确保将你的Stable Diffusion检查点/模型（巨大的ckpt/safetensors文件）放在：ComfyUI\models\checkpoints

如果你在解压缩时遇到问题，右键单击文件 -> 属性 -> 解除阻止

#### 如何在另一个UI和ComfyUI之间共享模型？

请参阅[配置文件](extra_model_paths.yaml.example)来设置模型的搜索路径。在Windows独立版本中，你可以在ComfyUI目录中找到此文件。将此文件重命名为extra_model_paths.yaml，并使用你喜欢的文本编辑器进行编辑。

## Jupyter Notebook

要在paperspace、kaggle或colab等服务上运行它，你可以使用我的[Jupyter Notebook](notebooks/comfyui_colab.ipynb)

## 手动安装（Windows、Linux）

Git克隆此仓库。

将你的SD检查点（巨大的ckpt/safetensors文件）放在：models/checkpoints

将你的VAE放在：models/vae


### AMD GPU（仅限Linux）
AMD用户可以使用pip安装rocm和pytorch（如果你还没有安装的话），这是安装稳定版本的命令：
