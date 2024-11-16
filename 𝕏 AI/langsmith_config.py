from langchain.smith import RunEvalConfig
from models.grok_adapter import GrokChatModel
import os
from dotenv import load_dotenv

load_dotenv()

def get_custom_llm():
    """返回配置好的 Grok 模型实例"""
    return GrokChatModel(
        api_key=os.getenv("GROK_API_KEY"),
        model_name="grok-beta",
        temperature=0.7
    )

def get_eval_config():
    """返回评估配置"""
    return RunEvalConfig(
        custom_llm=get_custom_llm(),
        eval_llm_name="grok-beta",
        custom_endpoints={
            "grok": {
                "url": "https://api.x.ai/v1/chat/completions",
                "headers": {
                    "Authorization": f"Bearer {os.getenv('GROK_API_KEY')}",
                    "Content-Type": "application/json"
                },
                "model": "grok-beta",
                "input_key": "messages",
                "output_key": "choices.0.message.content"
            }
        }
    ) 