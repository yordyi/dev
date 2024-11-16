import os
from openai import OpenAI

# 设置环境变量
os.environ["OPENAI_API_KEY"] = "eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNjI0OTgxMTc4NjUwNDQ0NDQ0NSIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTg4OTQwOTMzNSwidXVpZCI6IjVjNjQyMjEyLTIwMDItNDMzZi05MmU5LTFhNjFiODZiYjU4MCIsIm5hbWUiOiJVbm5hbWVkIGtleSIsImV4cGlyZXNfYXQiOiIyMDI5LTExLTE1VDAzOjU1OjM1KzAwMDAifQ.Q6g6r8xM-_e8QFIs91ONkRdp0cScs9reNsDZMXGLtBM"

# 读取系统提示文件
with open('cursorrules', 'r', encoding='utf-8') as file:
    system_prompt = file.read()

client = OpenAI(
    base_url="https://api.studio.nebius.ai/v1/",
)

def get_multiline_input():
    print("\n请输入你的问题 (输入两次回车结束输入，输入 'quit' 退出):")
    lines = []
    while True:
        line = input()
        if line.lower() == 'quit':
            return 'quit'
        if line == '' and lines and lines[-1] == '':  # 检测到连续两个空行
            break
        lines.append(line)
    return '\n'.join(lines[:-1])  # 去掉最后一个空行

def chat():
    # 初始化对话历史，包含系统提示
    conversation_history = [
        {"role": "system", "content": system_prompt}
    ]
    
    print("开始对话")
    
    while True:
        # 获取用户多行输入
        user_input = get_multiline_input()
        
        # 检查是否退出
        if user_input.lower() == 'quit':
            break
            
        # 将用户输入添加到对话历史
        conversation_history.append({"role": "user", "content": user_input})
        
        try:
            # 发送流式请求
            print("\n助手: ", end="", flush=True)
            full_response = ""
            
            for chunk in client.chat.completions.create(
                model="Qwen/Qwen2.5-Coder-32B-Instruct",
                messages=conversation_history,
                temperature=0.6,
                max_tokens=512,
                top_p=0.9,
                stream=True  # 启用流式传输
            ):
                # 获取当前块的内容
                if chunk.choices[0].delta.content is not None:
                    content = chunk.choices[0].delta.content
                    print(content, end="", flush=True)
                    full_response += content
            
            print("\n")  # 换行
            
            # 将完整回复添加到对话历史
            conversation_history.append({"role": "assistant", "content": full_response})
            
        except Exception as e:
            print(f"\n发生错误: {str(e)}")

if __name__ == "__main__":
    chat()