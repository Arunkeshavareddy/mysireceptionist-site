"""Tag styles.css and site.js in index.html with a hash of their contents.

Browsers keep these files for a while, so after a change they would keep
showing the old version. A new tag makes them fetch the new file.
Run before every push:  python3 stamp.py
"""

import hashlib
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent
PAGE = ROOT / "index.html"

html = PAGE.read_text(encoding="utf-8")
for name in ("styles.css", "site.js"):
    digest = hashlib.sha256((ROOT / name).read_bytes()).hexdigest()[:10]
    html, count = re.subn(rf'"{re.escape(name)}(\?v=[0-9a-f]+)?"', f'"{name}?v={digest}"', html)
    assert count == 1, f"expected exactly one reference to {name}, found {count}"
PAGE.write_text(html, encoding="utf-8")
print("stamped", ", ".join(re.findall(r'"((?:styles\.css|site\.js)\?v=[0-9a-f]+)"', html)))
