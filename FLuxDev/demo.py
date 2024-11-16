import os
import replicate
import requests
from PIL import Image
from io import BytesIO
import random

# 检查是否设置了API令牌
if "REPLICATE_API_TOKEN" not in os.environ:
    raise ValueError("请设置REPLICATE_API_TOKEN环境变量")

# 确保输出文件夹存在
output_folder = "FluxGenImage"
os.makedirs(output_folder, exist_ok=True)

def generate_image(prompt):
    output = replicate.run(
        "black-forest-labs/flux-1.1-pro",
        input={
            "prompt": prompt,
            "num_images": 1,
            "width": 768,
            "height": 768,
            "guidance_scale": 5.0,  # 降低guidance_scale
            "num_inference_steps": 50,
            "seed": random.randint(0, 2**32 - 1),
            "negative_prompt": "nsfw, explicit content, nudity",  # 添加负面提示
            "scheduler": "K_EULER_ANCESTRAL"
        }
    )
    
    print("API返回结果:", output)  # 打印输出以检查内容
    
    # 检查输出是否为列表，并且包含至少一个元素
    if isinstance(output, list) and len(output) > 0:
        image_url = output[0]
    else:
        raise ValueError(f"无效的API响应: {output}")
    
    # 确保URL是完整的
    if not image_url.startswith(('http://', 'https://')):
        raise ValueError(f"无效的图片URL: {image_url}")
    
    # 下载图片
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))
    
    # 保存图片
    filename = f"{output_folder}/generated_image_{prompt[:20]}.png"
    img.save(filename)
    print(f"图片已保存到: {filename}")

def main():
    print("提示：请使用更加委婉或中性的语言来描述您想要的图像，以避免触发内容过滤。")
    while True:
        prompt = input("请输入您的prompt (输入'q'退出): ")
        if prompt.lower() == 'q':
            break
        try:
            generate_image(prompt)
        except Exception as e:
            print(f"生成图片时发生错误: {e}")

if __name__ == "__main__":
    main()