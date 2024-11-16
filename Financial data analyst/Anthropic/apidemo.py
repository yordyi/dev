import anthropic
import os

# 使用环境变量获取 API 密钥
api_key = os.environ.get("ANTHROPIC_API_KEY")

if not api_key:
    raise ValueError("请设置 ANTHROPIC_API_KEY 环境变量")

client = anthropic.Anthropic(api_key=api_key)

# Replace placeholders like {{COMPANY_NAME}} with real values,
# because the SDK does not support variables.
message = client.messages.create(
    model="claude-3-5-sonnet-20240620",
    max_tokens=1000,
    temperature=0,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "You are tasked with creating a landing page for a company. Follow these instructions carefully to design an effective and visually appealing landing page.\n\nThe company name for this landing page is:\n<company_name>\n{{COMPANY_NAME}}\n</company_name>\n\nThe UI style to emulate is:\n<ui_style>\n{{UI_STYLE}}\n</ui_style>\n\nYour landing page should include the following key components:\n1. Header\n2. Hero section\n3. Features or Benefits section\n4. Call-to-Action (CTA)\n5. Footer\n\nFor each component, follow these guidelines:\n\n1. Header:\n   - Include the company name and logo (you can describe a simple logo design)\n   - Add a navigation menu with 3-4 relevant items\n   - Ensure the header is sticky and remains visible when scrolling\n\n2. Hero section:\n   - Create a compelling headline that captures the company's main value proposition\n   - Write a brief subheadline or description (1-2 sentences)\n   - Include a prominent CTA button\n   - Add a relevant hero image or illustration (describe it conceptually)\n\n3. Features or Benefits section:\n   - List 3-4 key features or benefits of the product/service\n   - For each feature, include a title, brief description, and a simple icon or illustration (describe conceptually)\n   - Arrange the features in a visually appealing grid or list format\n\n4. Call-to-Action (CTA):\n   - Create a dedicated CTA section with a clear and compelling message\n   - Include a prominent CTA button with action-oriented text\n   - Add a brief explanation of what users can expect after clicking the CTA\n\n5. Footer:\n   - Include essential links (About, Contact, Terms of Service, Privacy Policy)\n   - Add social media icons (specify 3-4 popular platforms)\n   - Include a copyright notice and the current year\n\nWhen designing the landing page, keep the following in mind:\n- Use the specified UI style consistently throughout the page\n- Employ a clean, modern layout with ample white space≈\n- Use a color scheme that complements the company name and UI style (suggest 2-3 primary colors)\n- Ensure the design is responsive and works well on both desktop and mobile devices\n- Focus on creating a clear visual hierarchy to guide users' attention\n\nPresent your landing page design as a detailed textual description, organized by the components listed above. Use XML tags to separate each component, like this:\n\n<header>\n[Your header description here]\n</header>\n\n<hero_section>\n[Your hero section description here]\n</hero_section>\n\n[Continue with other components]\n\nBegin your response with \"Here's the landing page design for [COMPANY_NAME]:\" and end with a brief conclusion summarizing the key aspects of your design."
                }
            ]
        }
    ]
)
print(message.content)
