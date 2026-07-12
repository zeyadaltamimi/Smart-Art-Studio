# -*- coding: utf-8 -*-
"""
استوديو الصوت — نسخة الويب (Streamlit).
حتى 3 مناطق، كل منطقة بإعداداتها المستقلة. تفتح من أي متصفح.
"""
import io
import os
import numpy as np
import streamlit as st
from pydub import AudioSegment

# ffmpeg-less handling — نستخدم WAV مباشرة
try:
    import imageio_ffmpeg
    _exe = imageio_ffmpeg.get_ffmpeg_exe()
    AudioSegment.converter = _exe
    AudioSegment.ffmpeg = _exe
except Exception:
    pass

import dsp

REGION_COLORS = ["#e74c3c", "#f1c40f", "#2ecc71"]

st.set_page_config(page_title="Smart Art Studio",
                   page_icon="🎛️", layout="centered")

# --------------- CSS ---------------
st.markdown("""
<style>
    .stApp { background: #141a2e; color: #eaf0ff; }
    section[data-testid="stSidebar"] { background: #1f2740; }
    h1, h2, h3, h4, label, p, div { color: #eaf0ff !important; }
    .stSlider label, .stCheckbox label { color: #eaf0ff !important; }
    .region-badge {
        display:inline-block; padding:4px 12px; border-radius:8px;
        color:white; font-weight:bold; margin:4px 4px 4px 0;
    }
    .stTabs [data-baseweb="tab"] { color: #eaf0ff; }
</style>
""", unsafe_allow_html=True)

st.title("🎛️ استوديو الصوت")
st.caption("حدّد حتى 3 مناطق — كل منطقة بإعداداتها المستقلة")

# --------------- تحميل الملف ---------------
uploaded = st.file_uploader("📂 اختر ملف WAV", type=["wav"])

if uploaded is None:
    st.info("ارفع ملف WAV للبدء")
    st.stop()


@st.cache_data(show_spinner=False)
def load_audio(file_bytes):
    seg = AudioSegment.from_file(io.BytesIO(file_bytes), format="wav")
    arr = np.array(seg.get_array_of_samples()).reshape((-1, seg.channels))
    maxv = float(2 ** (8 * seg.sample_width - 1))
    return seg, arr.astype(np.float64) / maxv


file_bytes = uploaded.read()
seg, arr = load_audio(file_bytes)
duration_s = len(seg) / 1000.0
sr = seg.frame_rate
mono = arr.mean(axis=1) if arr.shape[1] > 1 else arr[:, 0]

st.audio(file_bytes, format="audio/wav")
st.caption(f"⏱ المدة: {duration_s:.2f} ثانية  •  {sr} Hz  •  {arr.shape[1]} قناة")

# --------------- عرض الموجة ---------------
def plot_waveform(mono, sr, regions):
    """يعرض الموجة مع المناطق الملوّنة عبر matplotlib."""
    import matplotlib.pyplot as plt
    import matplotlib
    matplotlib.rcParams['axes.facecolor'] = '#0d1226'
    matplotlib.rcParams['figure.facecolor'] = '#141a2e'
    fig, ax = plt.subplots(figsize=(9, 2.2))
    t = np.linspace(0, len(mono)/sr, num=len(mono))
    # downsample للعرض
    step = max(1, len(mono) // 2000)
    ax.plot(t[::step], mono[::step], color="#6aa0ff", linewidth=0.6)
    for i, r in enumerate(regions):
        if r["start"] < r["end"]:
            ax.axvspan(r["start"], r["end"], alpha=0.28,
                       color=REGION_COLORS[i], label=f"R{i+1}")
    ax.set_xlim(0, len(mono)/sr)
    ax.set_ylim(-1, 1)
    ax.set_xlabel("الثواني", color="#93a0c8")
    ax.tick_params(colors="#93a0c8")
    for spine in ax.spines.values():
        spine.set_color("#2a3050")
    ax.legend(loc="upper right", facecolor="#1f2740",
              edgecolor="#2a3050", labelcolor="#eaf0ff")
    st.pyplot(fig, use_container_width=True)


# --------------- إعدادات كل منطقة ---------------
tabs = st.tabs([f"🔴 منطقة 1", f"🟡 منطقة 2", f"🟢 منطقة 3"])
regions = []

for i, tab in enumerate(tabs):
    with tab:
        col1, col2 = st.columns(2)
        with col1:
            enabled = st.checkbox(f"تفعيل المنطقة {i+1}",
                                  key=f"en_{i}", value=(i == 0))
            start = st.number_input(f"من (ثانية):",
                                    min_value=0.0, max_value=duration_s,
                                    value=0.0, step=0.1, key=f"s_{i}")
            end = st.number_input(f"إلى (ثانية):",
                                  min_value=0.0, max_value=duration_s,
                                  value=min(duration_s, 3.0),
                                  step=0.1, key=f"e_{i}")
        with col2:
            pitch = st.slider("Pitch (نصف نغمة)",
                              -12.9, 12.9, 0.0, 0.01, key=f"p_{i}")
            tempo = st.slider("Tempo (السرعة)",
                              0.5, 2.0, 1.0, 0.01, key=f"t_{i}")
            gain = st.slider("Volume (dB)",
                             -20.0, 20.0, 0.0, 0.1, key=f"g_{i}")
        col3, col4, col5 = st.columns(3)
        with col3:
            fin = st.number_input("Fade in (ث)", 0.0, 5.0, 0.0, 0.1,
                                  key=f"fi_{i}")
        with col4:
            fout = st.number_input("Fade out (ث)", 0.0, 5.0, 0.0, 0.1,
                                   key=f"fo_{i}")
        with col5:
            norm = st.checkbox("Normalize", key=f"n_{i}", value=False)

        regions.append({
            "enabled": enabled, "start": start, "end": end,
            "pitch": pitch, "tempo": tempo, "gain": gain,
            "norm": norm, "fin": fin, "fout": fout, "idx": i+1,
        })

# --------------- الموجة مع المناطق ---------------
st.subheader("الموجة")
plot_waveform(mono, sr, regions)

# --------------- المعالجة ---------------
def seg_to_np(s):
    a = np.array(s.get_array_of_samples()).reshape((-1, s.channels))
    return a.astype(np.float64) / float(2 ** (8 * s.sample_width - 1))

def np_to_seg(a, sr, ch):
    a = np.clip(a, -1, 1); ints = (a * 32767).astype(np.int16)
    return AudioSegment(ints.flatten().tobytes(), frame_rate=sr,
                        sample_width=2, channels=ch)

def process(seg, pitch, tempo, gain, norm, fin, fout):
    a = seg_to_np(seg); sr, ch = seg.frame_rate, seg.channels
    if abs(pitch) > 1e-6:
        a = np.stack([dsp.pitch_shift(a[:, c], pitch)
                      for c in range(ch)], axis=1)
    if abs(tempo - 1.0) > 1e-6:
        a = np.stack([dsp.time_stretch(a[:, c], tempo)
                      for c in range(ch)], axis=1)
    if abs(gain) > 1e-6:
        a = a * (10.0 ** (gain / 20.0))
    if norm:
        pk = np.max(np.abs(a))
        if pk > 0: a = a * (0.99 / pk)
    if fin > 0:
        n = min(int(fin * sr), len(a))
        if n > 0: a[:n] *= np.linspace(0, 1, n)[:, None]
    if fout > 0:
        n = min(int(fout * sr), len(a))
        if n > 0: a[-n:] *= np.linspace(1, 0, n)[:, None]
    return np_to_seg(a, sr, ch)


st.markdown("---")
if st.button("⚙️ عالج واحفظ", type="primary", use_container_width=True):
    active = [r for r in regions
              if r["enabled"] and r["end"] > r["start"]]
    active.sort(key=lambda r: r["start"])
    # تحقق من التداخل
    bad = False
    for i in range(len(active) - 1):
        if active[i]["end"] > active[i+1]["start"]:
            st.error(f"⚠️ المنطقة {active[i]['idx']} والمنطقة "
                     f"{active[i+1]['idx']} متداخلتان.")
            bad = True
    if not bad:
        with st.spinner("جارٍ المعالجة…"):
            cf = 5
            def _append(a, b):
                if len(a) == 0: return b
                return a.append(b, crossfade=min(cf, len(a), len(b)))
            cursor = 0
            out = AudioSegment.silent(duration=0,
                                      frame_rate=seg.frame_rate)
            out = out.set_channels(seg.channels)
            for r in active:
                s_ms = int(r["start"] * 1000); e_ms = int(r["end"] * 1000)
                if cursor < s_ms:
                    out = _append(out, seg[cursor:s_ms])
                mid = process(seg[s_ms:e_ms], r["pitch"], r["tempo"],
                              r["gain"], r["norm"], r["fin"], r["fout"])
                out = _append(out, mid)
                cursor = e_ms
            if cursor < len(seg):
                out = _append(out, seg[cursor:])
            buf = io.BytesIO()
            out.export(buf, format="wav")
            buf.seek(0)
        st.success(f"✅ تم! المدة الجديدة: {len(out)/1000:.2f} ثانية")
        st.audio(buf.getvalue(), format="audio/wav")
        st.download_button("📥 تحميل الملف الناتج",
                           data=buf.getvalue(),
                           file_name="studio_output.wav",
                           mime="audio/wav",
                           use_container_width=True)
