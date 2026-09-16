import argparse
import json
import os
import shutil
import subprocess
import tempfile
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro import KPipeline

SAMPLE_RATE = 24000
PAUSE_BETWEEN_REPEATS = 0.65
PAUSE_BETWEEN_SENTENCES = 1.25

VOICE = {
    "en": {"female": ("a", "af_heart"), "male": ("a", "am_michael")},
    "zh": {"female": ("z", "zf_001"), "male": ("z", "zm_010")},
}
REPO = {"en": "hexgrad/Kokoro-82M", "zh": "hexgrad/Kokoro-82M-v1.1-zh"}


def synthesize_day(pipe: KPipeline, items, voice: str, speed: float = 1.0) -> np.ndarray:
    parts = []
    pause_repeat = np.zeros(int(SAMPLE_RATE * PAUSE_BETWEEN_REPEATS), dtype=np.float32)
    pause_sentence = np.zeros(int(SAMPLE_RATE * PAUSE_BETWEEN_SENTENCES), dtype=np.float32)

    for i, item in enumerate(items):
        text = str(item["text"]).strip()
        generated = []
        for _, _, audio in pipe(text, voice=voice, speed=speed, split_pattern=r"\n+"):
            generated.append(np.asarray(audio, dtype=np.float32))
        if not generated:
            raise RuntimeError(f"Kokoro returned no audio for: {text}")
        clip = np.concatenate(generated)
        parts.extend([clip, pause_repeat, clip])
        if i < len(items) - 1:
            parts.append(pause_sentence)

    return np.concatenate(parts) if parts else np.zeros(1, dtype=np.float32)


def make_track(lang: str, gender: str, day: int, items, out_root: Path) -> None:
    lang_code, voice = VOICE[lang][gender]
    pipe = KPipeline(lang_code=lang_code, repo_id=REPO[lang])
    audio = synthesize_day(pipe, items, voice)

    out_dir = out_root / lang / gender
    out_dir.mkdir(parents=True, exist_ok=True)
    wav = out_dir / f"day-{day:02d}.wav"
    mp3 = out_dir / f"day-{day:02d}.mp3"

    sf.write(wav, audio, SAMPLE_RATE, subtype="PCM_16")
    subprocess.run(
        [
            "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
            "-i", str(wav), "-codec:a", "libmp3lame",
            "-b:a", "64k", "-ar", str(SAMPLE_RATE), str(mp3),
        ],
        check=True,
    )
    wav.unlink(missing_ok=True)
    size_mb = mp3.stat().st_size / (1024 * 1024)
    if size_mb > 95:
        raise RuntimeError(f"Generated {mp3} is {size_mb:.1f} MB; reduce day length before committing.")
    print(f"OK {mp3} ({size_mb:.2f} MB)")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--lessons", default="lessons.json")
    parser.add_argument("--start-day", type=int, default=1)
    parser.add_argument("--end-day", type=int, default=10)
    parser.add_argument("--out", default="audio-generated")
    args = parser.parse_args()

    if not (1 <= args.start_day <= args.end_day <= 100):
        raise SystemExit("start-day/end-day must be between 1 and 100, with start <= end")

    lessons = json.loads(Path(args.lessons).read_text(encoding="utf-8"))
    out_root = Path(args.out)

    for lang in ("en", "zh"):
        for day in range(args.start_day, args.end_day + 1):
            items = lessons.get(lang, {}).get(str(day), [])
            if not items:
                print(f"SKIP {lang} day {day}: no lesson data")
                continue
            for gender in ("male", "female"):
                make_track(lang, gender, day, items, out_root)


if __name__ == "__main__":
    main()
