from langchain_community.llms import Ollama

llm = Ollama(model="llama3.2:latest")  # 使用确认可以工作的模型名称
result = llm.invoke("你好，世界！")
print(result)