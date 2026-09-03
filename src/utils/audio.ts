/**
 * Wedding Audio Player
 * Plays the romantic soundtrack: "Clara & Mateo"
 */
import claraMateoAudio from '../assets/audio/clara-mateo.mp3';

class WeddingAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private listeners: Set<(playing: boolean) => void> = new Set();

  private getAudio(): HTMLAudioElement {
    if (!this.audio && typeof window !== 'undefined') {
      this.audio = new Audio(claraMateoAudio);
      this.audio.loop = true;
      this.audio.volume = 0.65;
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });
    }
    return this.audio!;
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.isPlaying));
  }

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
    const audio = this.getAudio();
    if (!audio) return;

    audio
      .play()
      .then(() => {
        this.isPlaying = true;
        this.notify();
      })
      .catch((err) => {
        console.warn('Audio playback was prevented or interrupted:', err);
        this.isPlaying = false;
        this.notify();
      });
  }

  public stop() {
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.notify();
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public subscribe(callback: (playing: boolean) => void): () => void {
    this.listeners.add(callback);
    callback(this.isPlaying);
    return () => {
      this.listeners.delete(callback);
    };
  }
}

export const weddingAudio = new WeddingAudioPlayer();
