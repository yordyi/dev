from openai import OpenAI

client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = "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"
)

completion = client.chat.completions.create(
  model="nvidia/llama-3.1-nemotron-70b-instruct",
  messages=[{"role":"user","content":"Write me a fully complete web app as a single HTML file. The app should contain a simple side-scrolling game where I use WASD to move around. When moving around the world, occasionally the character/sprite will encounter words. When a word is encountered, the player must correctly type the word as fast as possible.The faster the word is successfully typed, the more point the player gets. We should have a counter in the top-right to keep track of points. Words should be random and highly variable to keep the game interesting.\n\n\n\n\nYou should make the website very aesthetic and use Tailwind."}],
  temperature=0.9,
  top_p=1,
  max_tokens=1024,
  stream=True
)

for chunk in completion:
  if chunk.choices[0].delta.content is not None:
    print(chunk.choices[0].delta.content, end="")

