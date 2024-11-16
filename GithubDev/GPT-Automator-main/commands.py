import subprocess
import re

from langchain.agents import tool

@tool
def computer_applescript_action(apple_script):
    """
    使用此函数在计算机上执行 AppleScript 命令。
    """
    try:
        result = subprocess.run(['osascript', '-e', apple_script], capture_output=True, text=True, check=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        return f"执行 AppleScript 时出错：{e.stderr}"

@tool
def chrome_get_the_links_on_page(input):
    """
    Use this when you want to get the links on the current page.

    You should use this before clicking on anything
    """
    return run_javascript('Array.from(document.querySelectorAll("a")).map(x => x.innerText + ": " + x.href).join(" - ")')[:4000]

@tool
def chrome_click_on_link(link):
    """
    Use this when you want to go to a link. 
    
    The link should be a url from a previous observation
    """
    return run_javascript(f'window.location.href = "{link}"')[:4000]

@tool
def chrome_read_the_page(input):
    """
    Use this when you want to read the page.
    """

    return run_javascript('document.body.innerText')[:4000]


# @tool
# def chrome_javascript_action(javascript):
#     """
#     Use this when you want to execute a javascript command on Chrome either to get data or trigger an action. The command should be in Javascript.

#     Here are some examples of good Javascript commands:

#     Command: Get the links on the page
#     document.querySelectorAll('a')

#     Command: Get the buttons on the page
#     document.querySelectorAll('button')

#     Command: Click the first button on the page
#     document.querySelectorAll('button')[0].click()

#     Write the Javascript for the command:
#     """

#     stdout = run_javascript(javascript)

#     return f"""
#     Current URL: {run_javascript('window.location.href')}

#     Result: {stdout}
#     """

@tool
def chrome_open_url(url):
    """
    Use this tool to open a URL in Chrome. It is recommended to use this tool before doing any other actions on Chrome.
    
    The URL should be a string. For example: https://gmail.com
    """
    script = f'''
    tell application "Google Chrome"
        open location "{url}"
    end tell
    '''

    return run_applescript(script)

def run_javascript(javascript):
    javascript = javascript.replace('"', '\\"')

    if javascript.startswith('open '):
        return "Invalid command, not javascript"

    script = f'''
    tell application "Google Chrome"
        tell active tab of front window
            execute javascript "{javascript}"
        end tell
    end tell
    '''
    
    return run_applescript(script)

def run_applescript(applescript):
    p = subprocess.Popen(['osascript', '-'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    stdout, stderr = p.communicate(applescript.encode('utf-8'))

    if p.returncode != 0:
        raise Exception(stderr)

    decoded_text = stdout.decode("utf-8")

    return decoded_text


def say_text(text):
    run_applescript(f'say "{text}"')
