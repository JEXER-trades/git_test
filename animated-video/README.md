# Animated audio visualizer

`visualizer.mp4`: a 24-second vertical (1080×1920, 9:16) animated video with an original synthesized track. It's ready for Reels, TikTok or Shorts.

Everything on screen reacts to the audio:
- a radial spectrum around a glowing orb, with the orb pulsing on the bass
- a burst of particles on each kick drum
- rotating rings that speed up when the track gets louder
- a live waveform, drifting stars and a background whose colour shifts over time

## Use your own sound

```bash
python3 make_video.py my_sound.mp3 out.mp4          # 720×1280, 30 fps
python3 make_video.py my_sound.mp3 out.mp4 1080 30  # full HD vertical
```

This takes any audio or video file that ffmpeg can read (an mp3, or a saved reel's mp4). Requires `ffmpeg`, `numpy` and `Pillow`.

`make_track.py` regenerates the original track: `python3 make_track.py track.wav`.
