from langchain.schema.runnable import ConfigurableField
from models.grok_adapter import GrokChatModel

def get_chat_model():
    return GrokChatModel().configurable_fields(
        temperature=ConfigurableField(
            id="temperature",
            name="Temperature",
            description="Controls randomness in the output. Higher values mean more random completions.",
            default=0.7,
        ),
        model_name=ConfigurableField(
            id="model_name",
            name="Model Name",
            description="The Grok model to use",
            default="grok-beta"
        )
    ) 