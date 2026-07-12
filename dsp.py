# -*- coding: utf-8 -*-
"""
معالجة صوت نقية بـ NumPy فقط: تغيير طبقة الصوت (Pitch) وسرعته (Tempo)
بدون أي مكتبات خارجية أو ملفات exe — يعمل على أي جهاز.
يعتمد على Phase Vocoder قياسي.
"""
import numpy as np


def _frames(x, n_fft, hop):
    pad = n_fft // 2
    x = np.concatenate([np.zeros(pad), x, np.zeros(pad + n_fft)])
    n = 1 + (len(x) - n_fft) // hop
    idx = np.arange(n_fft)[None, :] + hop * np.arange(n)[:, None]
    return x[idx]  # (n_frames, n_fft)


def _stft(x, n_fft, hop, win):
    frames = _frames(x, n_fft, hop) * win[None, :]
    return np.fft.rfft(frames, axis=1).T  # (bins, frames)


def _istft(stft, n_fft, hop, win):
    frames = np.fft.irfft(stft.T, n=n_fft, axis=1)  # (n_frames, n_fft)
    n = frames.shape[0]
    out_len = n_fft + hop * (n - 1)
    out = np.zeros(out_len)
    wsum = np.zeros(out_len)
    w2 = win ** 2
    for i in range(n):
        s = i * hop
        out[s:s + n_fft] += frames[i] * win
        wsum[s:s + n_fft] += w2
    wsum[wsum < 1e-8] = 1e-8
    return out / wsum


def time_stretch(x, rate, n_fft=2048, hop=512):
    """rate>1 => أسرع/أقصر ، rate<1 => أبطأ/أطول. يحافظ على الطبقة."""
    if abs(rate - 1.0) < 1e-6:
        return x.copy()
    win = np.hanning(n_fft).astype(np.float64)
    stft = _stft(x, n_fft, hop, win)
    n_bins, n_frames = stft.shape
    mag = np.abs(stft)
    phase = np.angle(stft)
    omega = 2 * np.pi * hop * np.arange(n_bins) / n_fft

    steps = np.arange(0, n_frames - 1, rate)
    out = np.zeros((n_bins, len(steps)), dtype=complex)
    acc = phase[:, 0].copy()
    for j, t in enumerate(steps):
        i = int(np.floor(t))
        frac = t - i
        m = (1 - frac) * mag[:, i] + frac * mag[:, i + 1]
        out[:, j] = m * np.exp(1j * acc)
        dphi = phase[:, i + 1] - phase[:, i] - omega
        dphi -= 2 * np.pi * np.round(dphi / (2 * np.pi))
        acc += omega + dphi
    return _istft(out, n_fft, hop, win)


def _resample(x, factor):
    """يرجع إشارة بطول len(x)/factor (تغيير معدل العينات)."""
    n = max(1, int(round(len(x) / factor)))
    idx = np.linspace(0, len(x) - 1, n)
    return np.interp(idx, np.arange(len(x)), x)


def pitch_shift(x, n_semitones, n_fft=2048, hop=512):
    """يرفع/يخفض الطبقة مع الحفاظ على المدة. موجب=أعلى، سالب=أخفض."""
    if abs(n_semitones) < 1e-6:
        return x.copy()
    r = 2.0 ** (n_semitones / 12.0)
    stretched = time_stretch(x, 1.0 / r, n_fft, hop)  # أطول بمعامل r
    y = _resample(stretched, r)                        # يعيد الطول ويرفع الطبقة
    if len(y) >= len(x):
        return y[:len(x)]
    return np.pad(y, (0, len(x) - len(y)))
