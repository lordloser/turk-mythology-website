import shutil, os

src = os.path.join(os.path.expanduser("~"), ".gemini", "antigravity", "brain",
    "1e06fd16-da3c-4fbd-b78b-fc754db3c273", "umay_ana_1774611464975.png")
dst = os.path.join(os.path.expanduser("~"), "Desktop", "turk-mitoloji",
    "turk-mythology-website", "public", "images", "umay-ana.png")
audio_dir = os.path.join(os.path.expanduser("~"), "Desktop", "turk-mitoloji",
    "turk-mythology-website", "public", "audio")

shutil.copy2(src, dst)
os.makedirs(audio_dir, exist_ok=True)
print("umay-ana.png copied to:", dst)
print("audio dir created:", audio_dir)
