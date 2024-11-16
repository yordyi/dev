# 使用Gradio界面生成Groq提示

该项目提供了一个用户友好的Web界面，用于使用Groq的llama-3.1-70b-versatile模型生成文本。它利用Gradio库创建了一个交互式UI，用户可以在其中输入提示并调整各种参数以控制文本生成过程。

## 特点

- 交互式聊天界面
- 系统提示输入以设置上下文
- 用户输入特定查询或提示
- 可调参数：
  - 温度
  - 最大标记数
  - Top P
- 实时流式生成文本

## 先决条件

在开始之前，请确保您满足以下要求：

- Python 3.7或更高版本
- Groq API密钥（设置为环境变量）

## 安装

1. 克隆此存储库：
   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. 创建并激活虚拟环境：
   ```
   python -m venv venv
   venv\Scripts\activate  # 在Windows上
   # 或者
   source venv/bin/activate  # 在macOS和Linux上
   ```

3. 安装所需的依赖项：
   ```
   pip install gradio groq
   ```

4. 将您的Groq API密钥设置为环境变量：
   ```
   set GROQ_API_KEY=your_api_key_here  # 在Windows上
   # 或者
   export GROQ_API_KEY=your_api_key_here  # 在macOS和Linux上
   ```

## 用法

要运行该应用程序，请在终端中执行以下命令：

