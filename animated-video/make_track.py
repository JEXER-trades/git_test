"""Synthesize an original ~24s electronic track (120 BPM, Am-F-C-G) to track.wav."""
import sys, wave
import numpy as np

SR = 44100
BPM = 120
BEAT = 60 / BPM
BARS = 12
N = int(SR * BEAT * 4 * BARS)
rng = np.random.default_rng(7)
out = np.zeros((N, 2))

def note(m):  # MIDI -> Hz
    return 440 * 2 ** ((m - 69) / 12)

def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x); s = 0.0
    for i, v in enumerate(x):
        s = (1 - a) * v + a * s; y[i] = s
    return y

def add(sig, t, pan=0.0, gain=1.0):
    i = int(t * SR); j = min(N, i + len(sig))
    if i >= N: return
    sig = sig[: j - i] * gain
    out[i:j, 0] += sig * (1 - pan) / 2 * 2 ** 0.5
    out[i:j, 1] += sig * (1 + pan) / 2 * 2 ** 0.5

def saw(f, dur):
    t = np.arange(int(dur * SR)) / SR
    return 2 * ((t * f) % 1) - 1

def kick():
    t = np.arange(int(0.45 * SR)) / SR
    f = 45 + 110 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7)

def snare():
    t = np.arange(int(0.25 * SR)) / SR
    n = rng.standard_normal(len(t))
    n = n - lowpass(n, 1500)
    return (0.7 * n + 0.4 * np.sin(2 * np.pi * 190 * t)) * np.exp(-t * 18)

def hat(open_=False):
    t = np.arange(int((0.18 if open_ else 0.05) * SR)) / SR
    n = rng.standard_normal(len(t)); n = n - lowpass(n, 7000)
    return n * np.exp(-t * (12 if open_ else 70))

def pad(midis, dur):
    s = sum(saw(note(m) * d, dur) for m in midis for d in (0.997, 1.003))
    s = lowpass(s / (len(midis) * 2), 1400)
    t = np.arange(len(s)) / SR
    env = np.minimum(1, t / 0.4) * np.minimum(1, (dur - t) / 0.4)
    return s * env

def pluck(m, dur=0.22):
    s = saw(note(m), dur) + 0.5 * saw(note(m + 12), dur)
    t = np.arange(len(s)) / SR
    return lowpass(s, 3500) * np.exp(-t * 14)

def bass(m, dur):
    s = saw(note(m), dur) + np.sign(np.sin(2 * np.pi * note(m - 12) * np.arange(int(dur * SR)) / SR)) * 0.5
    t = np.arange(len(s)) / SR
    return lowpass(s, 450) * np.minimum(1, t / 0.005) * np.exp(-t * 3)

chords = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]  # Am F C G
roots = [33, 29, 36, 31]
kik, snr, hc, ho = kick(), snare(), hat(), hat(True)

for bar in range(BARS):
    t0 = bar * 4 * BEAT
    c = chords[bar % 4]
    add(pad([m + 12 for m in c] + [c[0]], 4 * BEAT), t0, 0, 0.35)
    drop = bar >= 4
    build = 2 <= bar < 4
    if drop or build:
        for b in range(4):
            add(kik, t0 + b * BEAT, 0, 0.9 if drop else 0.6)
    if drop:
        for b in (1, 3):
            add(snr, t0 + b * BEAT, 0.1, 0.45)
        for e in range(8):
            add(ho if e % 2 else hc, t0 + e * BEAT / 2, -0.3, 0.18 if e % 2 else 0.25)
        for e in range(8):
            if e in (0, 3, 6, 7) or bar % 2:
                add(bass(roots[bar % 4] + (12 if e == 7 else 0), BEAT / 2 * 0.9), t0 + e * BEAT / 2, 0, 0.35)
    if bar >= 2:
        arp = [c[0] + 12, c[1] + 12, c[2] + 12, c[1] + 24]
        for s16 in range(16):
            if bar >= 8 or s16 % 2 == 0:
                add(pluck(arp[s16 % 4]), t0 + s16 * BEAT / 4, 0.4 if s16 % 2 else -0.4, 0.16)
    if bar == 3:  # snare roll riser
        for k in range(16):
            add(snr, t0 + 2 * BEAT + k * BEAT / 8, 0, 0.1 + k * 0.02)

out /= np.max(np.abs(out)) / 0.9
fade = int(1.5 * SR); out[-fade:] *= np.linspace(1, 0, fade)[:, None]
path = sys.argv[1] if len(sys.argv) > 1 else "track.wav"
with wave.open(path, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((out * 32767).astype("<i2").tobytes())
print("wrote", path, N / SR, "s")
