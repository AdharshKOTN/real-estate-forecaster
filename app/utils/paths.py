from pathlib import Path

# Get the absolute path to this file, then go up 3 levels
BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"