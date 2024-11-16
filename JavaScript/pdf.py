import pymupdf4llm
import pathlib
from typing import Optional

def convert_pdf_to_markdown(
    pdf_path: str,
    output_path: str = "output.md",
) -> Optional[str]:
    """
    将PDF转换为Markdown文档
    
    Args:
        pdf_path: PDF文件路径
        output_path: 输出文件路径
    """
    try:
        # 最简单的转换调用
        md_text = pymupdf4llm.to_markdown(pdf_path)
        
        # 保存文件
        output_file = pathlib.Path(output_path)
        output_file.write_text(md_text, encoding='utf-8')
        
        print(f"转换成功！文件已保存到: {output_path} ✨")
        return md_text
        
    except Exception as e:
        print(f"转换失败: {str(e)} 🚫")
        return None

if __name__ == "__main__":
    # 使用示例
    pdf_path = "./shuaihaoscore.pdf"
    convert_pdf_to_markdown(pdf_path)