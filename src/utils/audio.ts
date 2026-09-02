/**
 * Ambient Gentle Wedding Music Synthesizer (Web Audio API)
 * Generates an ethereal, romantic, soothing acoustic harp/piano arpeggio chord progression
 * completely self-contained with no external mp3 assets required.
 */

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private currentStep = 0;

  // Romantic chord progression in E Major / C# minor (E - B/D# - C#m - A)
  private chords = [
    [329.63, 392.00, 493.88, 587.33, 659.25], // Em9
    [293.66, 369.99, 440.00, 587.33, 739.99], // D6/9
    [261.63, 329.63, 392.00, 493.88, 523.25], // Cmaj7
    [246.94, 293.66, 369.99, 440.00, 587.33], // Bm7
  ];

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.scheduleNotes();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private scheduleNotes() {
    if (!this.isPlaying || !this.ctx) return;

    const chordIndex = Math.floor(this.currentStep / 8) % this.chords.length;
    const noteInChord = this.currentStep % 8;
    const chord = this.chords[chordIndex];

    // Pick note for soothing arpeggio
    const pattern = [0, 2, 1, 3, 2, 4, 3, 1];
    const freq = chord[pattern[noteInChord] % chord.length];

    this.playTone(freq);

    this.currentStep++;
    this.timerId = window.setTimeout(() => this.scheduleNotes(), 420);
  }

  private playTone(freq: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm low-pass acoustic resonance filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, now);
    filter.Q.setValueAtTime(2.5, now);

    // Gentle fade in & ringing plucked decay
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.4);
  }
}

export const weddingAudio = new WeddingAudioPlayer();
