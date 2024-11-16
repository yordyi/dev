from typing import Any, List, Optional
from langchain.callbacks.manager import CallbackManagerForLLMRun
from langchain.chat_models.base import BaseChatModel
from langchain.schema import ChatResult, BaseMessage, ChatGeneration, AIMessage, HumanMessage
from pydantic import Field, PrivateAttr
import requests

class GrokChatModel(BaseChatModel):
    """Grok chat model wrapper for LangChain."""
    
    model_name: str = Field(default="grok-beta")
    temperature: float = Field(default=0.7)
    base_url: str = Field(default="https://api.x.ai/v1")
    
    _api_key: str = PrivateAttr()
    _headers: dict = PrivateAttr()

    def __init__(
        self, 
        api_key: str,
        **kwargs
    ):
        super().__init__(**kwargs)
        self._api_key = api_key
        self._headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

    @property
    def _llm_type(self) -> str:
        return "grok-chat"

    def _generate(
        self,
        messages: List[BaseMessage],
        stop: Optional[List[str]] = None,
        run_manager: Optional[CallbackManagerForLLMRun] = None,
        **kwargs: Any,
    ) -> ChatResult:
        grok_messages = [
            {
                "role": "system" if msg.type == "system" else 
                        "assistant" if msg.type == "ai" else "user",
                "content": msg.content
            }
            for msg in messages
        ]

        try:
            payload = {
                "model": self.model_name,
                "messages": grok_messages,
                "temperature": self.temperature,
                "stream": False,
                **kwargs
            }
            
            print(f"Debug - Payload: {payload}")
            
            response = requests.post(
                f"{self.base_url}/chat/completions",
                headers=self._headers,
                json=payload,
                timeout=30
            )
            
            print(f"Debug - Response Status: {response.status_code}")
            print(f"Debug - Response Text: {response.text}")
            
            response.raise_for_status()
            result = response.json()
            
            message = AIMessage(content=result["choices"][0]["message"]["content"])
            return ChatResult(generations=[ChatGeneration(message=message)])
            
        except Exception as e:
            print(f"Debug - Headers: {self._headers}")
            print(f"Debug - URL: {self.base_url}/chat/completions")
            print(f"Debug - Request body: {grok_messages}")
            raise ValueError(f"Error calling Grok API: {e}") 