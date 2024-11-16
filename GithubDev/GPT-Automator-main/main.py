import os
import requests
from dotenv import load_dotenv
from langchain_community.llms import Ollama
from langchain_openai import OpenAI
import time
from langchain.agents import AgentExecutor, Tool
from langchain.agents import create_openai_functions_agent
from langchain.prompts import PromptTemplate
from langchain.schema import SystemMessage
from commands import chrome_click_on_link, chrome_get_the_links_on_page, chrome_open_url, chrome_read_the_page, computer_applescript_action, say_text

# 加载环境变量
load_dotenv()

def check_internet_connection():
    try:
        requests.get("http://www.google.com", timeout=5)
        return True
    except requests.ConnectionError:
        return False

def initialize_llm(max_retries=3, delay=2):
    if not check_internet_connection():
        print("网络连接失败，请检查您的互联网连接。")
        return None

    for attempt in range(max_retries):
        try:
            # 尝试初始化 Ollama
            llm = Ollama(model="llama3.2:latest", temperature=0)
            llm.invoke("测试")
            print("成功初始化 Ollama")
            return llm
        except Exception as e:
            print(f"Ollama 初始化失败 (尝试 {attempt + 1}/{max_retries}): {str(e)}")
            if attempt < max_retries - 1:
                print(f"等待 {delay} 秒后重试...")
                time.sleep(delay)
    
    # 如果 Ollama 失败，尝试使用 OpenAI
    try:
        openai_api_key = os.getenv("OPENAI_API_KEY")
        if openai_api_key:
            llm = OpenAI(temperature=0)
            llm.invoke("测试")
            print("成功初始化 OpenAI")
            return llm
        else:
            print("OpenAI API 密钥未设置")
    except Exception as e:
        print(f"OpenAI 初始化失败: {str(e)}")
    
    return None

def fallback_mode():
    print("进入备用模式")
    while True:
        command = input("请输入指令 (仅支持基本功能): ")
        if command.lower() == '退出':
            print("谢谢使用,再见！")
            break
        elif command.startswith("打开"):
            url = command.split("打开", 1)[1].strip()
            chrome_open_url(url)
        elif command == "获取链接":
            links = chrome_get_the_links_on_page("current")
            print(f"页面上的链接: {links}")
        elif command == "读取页面":
            content = chrome_read_the_page("current")
            print(f"页面内容: {content}")
        else:
            print("不支持的命令，请尝试 '打开 [URL]'、'获取链接'、'读取页面' 或 '退出'")

def main():
    llm = initialize_llm()
    if not llm:
        print("无法初始化语言模型，进入备用模式")
        fallback_mode()
        return

    tools = [
        Tool(name="Chrome Click Link", func=chrome_click_on_link, description="Click on a link in Chrome"),
        Tool(name="Chrome Get Links", func=chrome_get_the_links_on_page, description="Get all links on a page in Chrome"),
        Tool(name="Chrome Open URL", func=chrome_open_url, description="Open a URL in Chrome"),
        Tool(name="Chrome Read Page", func=chrome_read_the_page, description="Read the content of a page in Chrome"),
        Tool(name="AppleScript Action", func=computer_applescript_action, description="Execute an AppleScript action")
    ]

    system_message = SystemMessage(content="你是一个帮助用户在计算机上自动化任务的AI助手。使用提供的工具来完成用户的请求。")
    prompt = PromptTemplate.from_template(
        "系统消息: {system_message}\n可用工具: {tools}\n用户请求: {input}\n思考过程: {agent_scratchpad}"
    )

    try:
        agent = create_openai_functions_agent(llm, tools, prompt)
        agent_executor = AgentExecutor.from_agent_and_tools(agent=agent, tools=tools, verbose=True, handle_parsing_errors=True)

        print("欢迎使用GPT自动化工具！")
        print("请输入您的指令,输入'退出'来结束程序。")

        while True:
            command = input("请输入指令: ")
            if command.lower() == '退出':
                print("谢谢使用,再见！")
                break

            try:
                result = agent_executor.invoke({"input": command, "tools": tools, "system_message": system_message})
                if result:
                    say_text(f'结果是 {result["output"]}')
                    print(f'结果是: {result["output"]}')
                else:
                    say_text(f'已完成 {command}')
                    print(f'已完成: {command}')
            except Exception as e:
                print(f"执行过程中出现错误: {str(e)}")
                print(f"错误类型: {type(e).__name__}")
                print(f"详细错误信息: {e.args}")
                say_text("执行过程中出现错误,请检查控制台输出。")

    except Exception as e:
        print(f"Agent 创建失败: {str(e)}")
        fallback_mode()

if __name__ == "__main__":
    main()