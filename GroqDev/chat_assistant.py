import os
from groq import Groq

def chat_with_groq():
    # 初始化 Groq 客户端
    client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

    while True:
        # 获取用户输入
        user_input = input("你: ")

        # 如果用户输入 "exit"，退出循环
        if user_input.lower() == "exit":
            print("Groq: 再见！")
            break

        # 请求 Groq 聊天完成
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "您是一个有帮助的助手。"
                },
                {
                    "role": "user",
                    "content": user_input,
                }
            ],
            model="mixtral-8x7b-32768",
        )

        # 打印 Groq 的回复
        print(f"Groq: {chat_completion.choices[0].message.content}")

if __name__ == "__main__":
    chat_with_groq()
