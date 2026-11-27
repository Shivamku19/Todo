/**
 * Web Audio API Sound Effects Generator
 * Generates synthetic UI sound feedback without external audio files.
 */

const STORAGE_SOUND_KEY = 'todo_sound_enabled';

export function isSoundEnabled() {
  try {
    const val = localStorage.getItem(STORAGE_SOUND_KEY);
    return val !== null ? JSON.parse(val) : true;
  } catch {
    return true;
  }
}

export function setSoundEnabled(enabled) {
  try {
    localStorage.setItem(STORAGE_SOUND_KEY, JSON.stringify(enabled));
  } catch (err) {
    console.error('Failed to persist sound preference:', err);
  }
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!window._todoAudioContext) {
    window._todoAudioContext = new AudioCtx();
  }
  if (window._todoAudioContext.state === 'suspended') {
    window._todoAudioContext.resume().catch(() => {});
  }
  return window._todoAudioContext;
}

/**
 * Play a cheerful completion chime (C5 -> E5 -> G5)
 */
export function playCompleteSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
  const now = ctx.currentTime;

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);

    gain.gain.setValueAtTime(0.001, now + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 0.26);
  });
}

/**
 * Play a subtle soft pop sound for subtask toggle
 */
export function playPopSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
}

/**
 * Play a gentle bell sound when a Pomodoro session finishes
 */
export function playTimerAlarmSound() {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const bells = [880, 1174.66, 1760]; // A5, D6, A6
  const now = ctx.currentTime;

  bells.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.12);

    gain.gain.setValueAtTime(0.001, now + idx * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.12 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.12);
    osc.stop(now + idx * 0.12 + 0.52);
  });
}
