from dotenv import load_dotenv
import os
import sys
from pathlib import Path

# 添加项目根目录到 Python 路径
sys.path.append(str(Path(__file__).parent.parent))

from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from models.grok_adapter import GrokChatModel

# 加载环境变量
load_dotenv()

def main():
    # 初始化Grok模型
    grok = GrokChatModel(
        api_key=os.getenv("GROK_API_KEY"),
        model_name="grok-beta",
        temperature=0.7
    )

    # 创建对话链
    conversation = ConversationChain(
        llm=grok,
        memory=ConversationBufferMemory()
    )

    # 测试对话
    response = conversation.predict(input="你好!请介绍一下你自己。")
    print("Grok:", response)

if __name__ == "__main__":
    main() 