"""Render a vertical (9:16) audio-reactive animated video for any audio file.

usage: python3 make_video.py <audio file> <out.mp4> [width] [fps]
"""
import colorsys, math, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

audio_in, out_path = sys.argv[1], sys.argv[2]
W = int(sys.argv[3]) if len(sys.argv) > 3 else 720
FPS = int(sys.argv[4]) if len(sys.argv) > 4 else 30
H = W * 16 // 9
SR = 44100
S = W / 720  # scale factor

# ---- audio analysis -------------------------------------------------------
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", audio_in, "-ac", "1", "-ar", str(SR),
                      "-f", "f32le", "-"], capture_output=True, check=True).stdout
x = np.frombuffer(raw, np.float32)
nframes = int(len(x) / SR * FPS)
WIN = 2048
win = np.hanning(WIN)
freqs = np.fft.rfftfreq(WIN, 1 / SR)
NB = 48
edges = np.geomspace(40, 12000, NB + 1)
band_idx = [(np.searchsorted(freqs, edges[i]), max(np.searchsorted(freqs, edges[i + 1]), np.searchsorted(freqs, edges[i]) + 1)) for i in range(NB)]
xp = np.pad(x, WIN)
spec = np.zeros((nframes, NB)); bass = np.zeros(nframes); rms = np.zeros(nframes)
for f in range(nframes):
    c = int(f / FPS * SR) + WIN
    seg = xp[c - WIN // 2: c + WIN // 2] * win
    mag = np.abs(np.fft.rfft(seg))
    spec[f] = [mag[a:b].mean() for a, b in band_idx]
    bass[f] = mag[(freqs > 30) & (freqs < 160)].mean()
    rms[f] = np.sqrt(np.mean(seg ** 2))
spec = np.log1p(spec * 4); spec /= spec.max() + 1e-9
bass /= bass.max() + 1e-9; rms /= rms.max() + 1e-9
# onset detection on bass
onset = np.zeros(nframes)
avg = 0.0
for f in range(nframes):
    if bass[f] > avg * 1.35 + 0.08 and (f == 0 or bass[f] > bass[f - 1]):
        onset[f] = 1
    avg = 0.85 * avg + 0.15 * bass[f]
for f in range(1, nframes):  # debounce
    if onset[f] and onset[max(0, f - 6):f].any():
        onset[f] = 0

# ---- rendering ------------------------------------------------------------
rng = np.random.default_rng(3)
stars = [(rng.uniform(0, W), rng.uniform(0, H), rng.uniform(0.5, 2.2) * S, rng.uniform(0.2, 1)) for _ in range(140)]
particles = []  # [x, y, vx, vy, life, hue]
yy = np.linspace(0, 1, H)[:, None, None]
smooth = np.zeros(NB); pulse = 0.0; rot = 0.0; flash = 0.0
cx, cy = W / 2, H * 0.46

def rgb(h, s, v, a=255):
    r, g, b = colorsys.hsv_to_rgb(h % 1, s, v)
    return (int(r * 255), int(g * 255), int(b * 255), a)

ff = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
                       "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-i", audio_in,
                       "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
                       "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", out_path],
                      stdin=subprocess.PIPE)

for f in range(nframes):
    t = f / FPS
    smooth = np.maximum(spec[f], smooth * 0.82)
    pulse = max(bass[f], pulse * 0.88)
    if onset[f]:
        flash = 1.0
        hue0 = (t * 0.03) % 1
        for _ in range(int(28 * (0.5 + bass[f]))):
            a = rng.uniform(0, 2 * math.pi); sp = rng.uniform(4, 14) * S
            particles.append([cx + math.cos(a) * 120 * S, cy + math.sin(a) * 120 * S,
                              math.cos(a) * sp, math.sin(a) * sp, 1.0, hue0 + rng.uniform(-0.08, 0.12)])
    flash *= 0.85
    rot += 0.004 + 0.03 * rms[f]
    hue = (0.72 + t * 0.012) % 1

    # background gradient
    top = np.array(rgb(hue, 0.85, 0.16 + 0.10 * flash)[:3]); bot = np.array(rgb(hue + 0.12, 0.9, 0.05)[:3])
    bg = (top * (1 - yy) + bot * yy).astype(np.uint8)
    img = Image.fromarray(np.broadcast_to(bg, (H, W, 3)).copy()).convert("RGBA")

    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0)); g = ImageDraw.Draw(glow)
    sharp = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(sharp)

    # stars drifting upward, twinkling with highs
    hi = smooth[-12:].mean()
    for i, (sx, sy, sr, sa) in enumerate(stars):
        y = (sy - t * 25 * S * sa) % H
        a = int(255 * sa * (0.4 + 0.6 * hi))
        d.ellipse([sx - sr, y - sr, sx + sr, y + sr], fill=(255, 255, 255, a))

    # rotating rings
    for k in range(3):
        r = (190 + 55 * k) * S * (1 + 0.08 * pulse)
        start = math.degrees(rot * (1 if k % 2 else -1) * (1 + k * 0.5))
        for seg in range(3 + k):
            s0 = start + seg * 360 / (3 + k)
            g.arc([cx - r, cy - r, cx + r, cy + r], s0, s0 + 360 / (3 + k) * 0.55,
                  fill=rgb(hue + 0.1 * k + 0.3, 0.7, 1, 150), width=int(3 * S))

    # radial spectrum bars (mirrored)
    base_r = 130 * S * (1 + 0.18 * pulse)
    for i in range(NB * 2):
        b = i if i < NB else 2 * NB - 1 - i
        a = rot * 0.5 + i / (NB * 2) * 2 * math.pi - math.pi / 2
        L = (12 + 170 * smooth[b] ** 1.3) * S
        x0, y0 = cx + math.cos(a) * base_r, cy + math.sin(a) * base_r
        x1, y1 = cx + math.cos(a) * (base_r + L), cy + math.sin(a) * (base_r + L)
        col = rgb(hue + 0.35 + b / NB * 0.35, 0.75, 1)
        g.line([x0, y0, x1, y1], fill=col, width=int(7 * S))
        d.line([x0, y0, x1, y1], fill=(255, 255, 255, 200), width=max(1, int(2 * S)))

    # core orb
    r = base_r * 0.82
    for k in range(6, 0, -1):
        rr = r * k / 6
        g.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=rgb(hue + 0.5 - k * 0.03, 0.6, 0.4 + 0.1 * (6 - k), 255))
    rr = r * (0.35 + 0.25 * pulse)
    d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=(255, 255, 255, int(120 + 135 * pulse)))

    # particles
    alive = []
    for p in particles:
        p[0] += p[2]; p[1] += p[3]; p[2] *= 0.97; p[3] = p[3] * 0.97 + 0.15 * S; p[4] -= 0.022
        if p[4] > 0:
            pr = 4 * S * p[4]
            g.ellipse([p[0] - pr * 2, p[1] - pr * 2, p[0] + pr * 2, p[1] + pr * 2], fill=rgb(p[5], 0.8, 1, int(255 * p[4])))
            d.ellipse([p[0] - pr, p[1] - pr, p[0] + pr, p[1] + pr], fill=(255, 255, 255, int(230 * p[4])))
            alive.append(p)
    particles = alive

    # bottom waveform
    c = int(t * SR)
    seg = x[c: c + 1024]
    if len(seg) == 1024:
        wy = H * 0.84
        pts = [(i / 1023 * W, wy + seg[i] * 140 * S) for i in range(0, 1024, 4)]
        g.line(pts, fill=rgb(hue + 0.4, 0.6, 1, 220), width=int(5 * S))
        d.line(pts, fill=(255, 255, 255, 230), width=max(1, int(2 * S)))

    blurred = glow.filter(ImageFilter.GaussianBlur(10 * S))
    img = Image.alpha_composite(img, blurred)
    img = Image.alpha_composite(img, glow)
    img = Image.alpha_composite(img, sharp)
    # progress bar
    bar = Image.new("RGBA", (W, H), (0, 0, 0, 0)); pd = ImageDraw.Draw(bar)
    pd.rounded_rectangle([W * 0.1, H * 0.92, W * 0.9, H * 0.92 + 6 * S], radius=3 * S, fill=(255, 255, 255, 50))
    pd.rounded_rectangle([W * 0.1, H * 0.92, W * 0.1 + W * 0.8 * (f + 1) / nframes, H * 0.92 + 6 * S], radius=3 * S, fill=(255, 255, 255, 220))
    img = Image.alpha_composite(img, bar)
    ff.stdin.write(img.convert("RGB").tobytes())
    if f % 60 == 0:
        print(f"frame {f}/{nframes}", flush=True)

ff.stdin.close(); ff.wait()
print("wrote", out_path)
