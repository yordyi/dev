import os
import logging
from bs4 import BeautifulSoup
from colorama import init, Fore, Style
import subprocess

init()

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def add_tailwind_classes(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    
    logger.info(f"{Fore.BLUE}Adding Tailwind CSS...{Style.RESET_ALL}")
    
    # 添加 Tailwind CSS 到 <head>
    head = soup.find('head')
    if not head:
        head = soup.new_tag('head')
        if soup.html:
            soup.html.insert(0, head)
        else:
            soup.append(head)
    
    # 添加 Tailwind CSS 链接
    tailwind_link = soup.new_tag('link', rel='stylesheet', href='styles.css')
    head.append(tailwind_link)
    
    # 添加自定义样式
    custom_style = soup.new_tag('style')
    custom_style.string = """
    .folder-content { display: none; }
    .folder-open > .folder-content { display: block; }
    """
    head.append(custom_style)
    
    # 为 body 添加类
    body = soup.find('body')
    if not body:
        body = soup.new_tag('body')
        soup.append(body)
    body['class'] = 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen'
    
    # 创建主容器
    main_container = soup.new_tag('div')
    main_container['class'] = 'container mx-auto px-4 py-8'
    body.append(main_container)
    
    # 添加标题
    title = soup.new_tag('h1')
    title['class'] = 'text-4xl font-bold mb-8 text-center'
    title.string = '书签'
    main_container.append(title)
    
    # 添加搜索栏和暗黑模式切换
    header = soup.new_tag('div')
    header['class'] = 'mb-8 flex justify-between items-center'
    search_input = soup.new_tag('input', id='search', type='text', placeholder='搜索书签...')
    search_input['class'] = 'p-2 border rounded dark:bg-gray-800 dark:text-white w-64'
    search_input['oninput'] = 'searchBookmarks()'
    dark_mode_button = soup.new_tag('button', onclick='toggleDarkMode()')
    dark_mode_button['class'] = 'p-2 bg-gray-200 dark:bg-gray-700 rounded'
    dark_mode_button.string = '切换暗黑模式'
    header.append(search_input)
    header.append(dark_mode_button)
    main_container.append(header)
    
    # 处理书签结构
    bookmarks_container = soup.new_tag('div')
    bookmarks_container['class'] = 'space-y-4'
    main_container.append(bookmarks_container)
    
    for dl in soup.find_all('dl'):
        dl['class'] = 'ml-6'
    
    for dt in soup.find_all('dt'):
        if dt.find('h3'):
            folder = soup.new_tag('div')
            folder['class'] = 'folder'
            dt['class'] = 'cursor-pointer mb-2 flex items-center'
            dt['onclick'] = 'toggleFolder(this.parentNode)'
            h3 = dt.find('h3')
            h3['class'] = 'text-xl font-bold text-blue-600 dark:text-blue-400'
            icon = soup.new_tag('span')
            icon['class'] = 'mr-2 transform transition-transform duration-200'
            icon.string = '▶'
            dt.insert(0, icon)
            folder.append(dt)
            folder.append(dt.find_next_sibling('dl'))
            bookmarks_container.append(folder)
        else:
            dt['class'] = 'bookmark-item mb-1'
            bookmarks_container.append(dt)
    
    for a in soup.find_all('a'):
        a['class'] = 'text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500 transition duration-300'
    
    # 添加 JavaScript 到 <body> 末尾
    script = soup.new_tag('script')
    script.string = """
    function toggleFolder(el) {
        el.classList.toggle('folder-open');
        const icon = el.querySelector('dt > span');
        if (icon) {
            icon.style.transform = el.classList.contains('folder-open') ? 'rotate(90deg)' : '';
        }
    }
    function searchBookmarks() {
        const query = document.getElementById('search').value.toLowerCase();
        document.querySelectorAll('.bookmark-item, .folder').forEach(function(item) {
            const isFolder = item.classList.contains('folder');
            const text = isFolder ? item.querySelector('h3').textContent : item.textContent;
            if (text.toLowerCase().includes(query)) {
                item.style.display = '';
                if (isFolder) {
                    item.classList.add('folder-open');
                }
            } else {
                if (!isFolder) {
                    item.style.display = 'none';
                }
            }
        });
    }
    function toggleDarkMode() {
        document.body.classList.toggle('dark');
    }
    """
    body.append(script)
    
    logger.info(f"{Fore.GREEN}Added Tailwind classes and custom styles to HTML elements{Style.RESET_ALL}")
    
    return str(soup)

def main():
    input_file = 'input/Safari浏览器书签.html'
    output_file = 'output/Safari浏览器书签_tailwind.html'
    
    logger.info(f"{Fore.YELLOW}Starting bookmark beautification process...{Style.RESET_ALL}")
    
    try:
        with open(input_file, 'r', encoding='utf-8') as file:
            original_html = file.read()
        logger.info(f"{Fore.GREEN}Successfully read input file{Style.RESET_ALL}")
        
        converted_html = add_tailwind_classes(original_html)
        
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        with open(output_file, 'w', encoding='utf-8') as file:
            file.write(converted_html)
        logger.info(f"{Fore.GREEN}Successfully saved beautified HTML to: {output_file}{Style.RESET_ALL}")
        
        # 运行 Tailwind CSS CLI
        logger.info(f"{Fore.BLUE}Running Tailwind CSS CLI...{Style.RESET_ALL}")
        subprocess.run(["npx", "tailwindcss", "-i", "./src/input.css", "-o", "./output/styles.css"], check=True)
        logger.info(f"{Fore.GREEN}Successfully generated Tailwind CSS{Style.RESET_ALL}")
        
    except FileNotFoundError:
        logger.error(f"{Fore.RED}Input file not found: {input_file}{Style.RESET_ALL}")
    except subprocess.CalledProcessError:
        logger.error(f"{Fore.RED}Error running Tailwind CSS CLI{Style.RESET_ALL}")
    except Exception as e:
        logger.error(f"{Fore.RED}An error occurred: {str(e)}{Style.RESET_ALL}")
    else:
        logger.info(f"{Fore.YELLOW}Bookmark beautification process completed!{Style.RESET_ALL}")

if __name__ == "__main__":
    main()