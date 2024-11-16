from models.grok_adapter import GrokChatModel

grok = GrokChatModel(api_key="xai-U5TK8x2GlMjtKxwz9MiXHPpA5rBPl6Q9ALkEv4L9A6ktXZJAiU156yXUOC5b72fLRoSirelybhUwtWiL")
response = grok.chat([
    {"role": "user", "content": "Hello Grok!"}
])
print(response) 