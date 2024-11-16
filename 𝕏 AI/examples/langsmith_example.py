from langchain.smith import RunEvalConfig
from langsmith_config import get_eval_config
from langchain.callbacks import LangSmithCallback
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

# 获取配置
eval_config = get_eval_config()

# 创建回调
callbacks = [LangSmithCallback()]

# 创建提示模板
prompt = PromptTemplate(
    input_variables=["question"],
    template="请回答以下问题: {question}"
)

# 创建链
chain = LLMChain(
    llm=eval_config.custom_llm,
    prompt=prompt,
    callbacks=callbacks
)

# 运行测试
response = chain.run(question="你好,请介绍一下自己")
print(response) 