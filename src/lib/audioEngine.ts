/**
 * CHRONO-DEX Procedural Acoustic Synthesis Engine
 * 100% Web Audio API. Zero external audio dependencies.
 * Features CONTINUOUS PROCEDURAL AMBIENT SOUNDSCAPES tailored to all 5 Epochs!
 */

class ChronoAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;

  // Era ambient nodes
  private ambientGain: GainNode | null = null;
  private currentEpoch: number = 2; // Default Mesozoic
  private activeAmbientSources: (AudioNode & { stop?: () => void })[] = [];
  private ambientTimer: any = null;

  public init(): void {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (this.ctx) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0.0 : 0.8, this.ctx.currentTime);

      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(24, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(5, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.2, this.ctx.currentTime);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);

      if (!this.isMuted) {
        this.startEpochAmbient(this.currentEpoch);
      }
    } catch (e) {
      console.warn('Audio Context initialization failed:', e);
    }
  }

  public toggleMute(): boolean {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (this.masterGain && this.ctx) {
      const t = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(t);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0.0 : 0.8, t + 0.08);
    }

    if (!this.isMuted) {
      this.startEpochAmbient(this.currentEpoch);
    } else {
      this.stopEpochAmbient();
    }

    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Smoothly transitions ambient soundscape to the selected Epoch
   */
  public switchEpochAmbient(epochNumber: number): void {
    this.currentEpoch = epochNumber;
    this.init();
    this.playEpochTransition(epochNumber);
    if (!this.isMuted && this.ctx) {
      this.startEpochAmbient(epochNumber);
    }
  }

  private stopEpochAmbient(): void {
    if (this.ambientTimer) {
      clearInterval(this.ambientTimer);
      this.ambientTimer = null;
    }
    for (const node of this.activeAmbientSources) {
      try {
        if ('stop' in node && typeof node.stop === 'function') {
          node.stop();
        }
        node.disconnect();
      } catch {
        // ignore
      }
    }
    this.activeAmbientSources = [];
  }

  private startEpochAmbient(epochNumber: number): void {
    if (!this.ctx || !this.ambientGain) return;
    this.stopEpochAmbient();

    try {
      const t = this.ctx.currentTime;

      // 1. PRIMORDIAL (Volcanic Sub-bass rumble + Magma crackle)
      if (epochNumber === 1) {
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99 * b0 + white * 0.05;
          b1 = 0.96 * b1 + white * 0.1;
          data[i] = (b0 + b1) * 0.25;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(85, t);
        filter.Q.setValueAtTime(4.0, t);

        noise.connect(filter);
        filter.connect(this.ambientGain);
        noise.start();
        this.activeAmbientSources.push(noise, filter);
      }

      // 2. MESOZOIC DRIFT (Parchment Hiss + Antique Clockwork Tick)
      else if (epochNumber === 2) {
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.015;
        }
        const hiss = this.ctx.createBufferSource();
        hiss.buffer = buffer;
        hiss.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, t);
        filter.Q.setValueAtTime(1.2, t);

        hiss.connect(filter);
        filter.connect(this.ambientGain);
        hiss.start();
        this.activeAmbientSources.push(hiss, filter);

        // Gentle astrolabe gear ticks
        this.ambientTimer = setInterval(() => {
          if (this.ctx && !this.isMuted) {
            this.playBronzeGear(0.08);
          }
        }, 1400);
      }

      // 3. FEUDAL HISUI (Zen Bamboo Wind + Peaceful Temple Bell Echoes)
      else if (epochNumber === 3) {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(165, t);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(320, t);
        filter.Q.setValueAtTime(2.5, t);

        gain.gain.setValueAtTime(0.08, t);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ambientGain);
        osc.start();
        this.activeAmbientSources.push(osc, filter, gain);

        this.ambientTimer = setInterval(() => {
          if (this.ctx && !this.isMuted) {
            this.playTempleBell();
          }
        }, 3200);
      }

      // 4. MODERN VICTORIAN (Oceanic Coastal Surf + Telegraph Relay)
      else if (epochNumber === 4) {
        const bufferSize = this.ctx.sampleRate * 3;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.035;
        }
        const surf = this.ctx.createBufferSource();
        surf.buffer = buffer;
        surf.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(260, t);
        filter.Q.setValueAtTime(1.8, t);

        surf.connect(filter);
        filter.connect(this.ambientGain);
        surf.start();
        this.activeAmbientSources.push(surf, filter);
      }

      // 5. PARADOX FUTURE (Cyber Quantum Synth Sweep Drone)
      else if (epochNumber === 5) {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(110, t);

        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(110.8, t); // Detuned for chorus shimmer

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(380, t);
        filter.Q.setValueAtTime(4.5, t);

        gain.gain.setValueAtTime(0.06, t);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(this.ambientGain);

        osc1.start();
        osc2.start();
        this.activeAmbientSources.push(osc1, osc2, filter, gain);
      }
    } catch {
      // ignore
    }
  }

  /**
   * Sound effect when transitioning epochs
   */
  public playEpochTransition(epochNumber: number): void {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      switch (epochNumber) {
        case 1: this.playStoneGrind(); break;
        case 2: this.playBronzeGear(); break;
        case 3: this.playTempleBell(); break;
        case 4: this.playCompassDetent(); break;
        case 5: this.playCyberChord(); break;
        default: this.playBronzeGear();
      }
    } catch {
      // ignore
    }
  }

  public playLayerPeel(layerIndex: number): void {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(700 + layerIndex * 300, t);
      filter.Q.setValueAtTime(1.8, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(t);
    } catch {
      // ignore
    }
  }

  private playStoneGrind(): void {
    const t = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const filter = this.ctx!.createBiquadFilter();
    const gain = this.ctx!.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(70, t);
    osc.frequency.linearRampToValueAtTime(40, t + 0.4);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, t);
    filter.Q.setValueAtTime(3.0, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.24, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.48);
  }

  private playBronzeGear(vol = 0.2): void {
    const t = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(580, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.06);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.08);
  }

  private playTempleBell(): void {
    const t = this.ctx!.currentTime;
    const chord = [440, 554.37, 659.25];
    chord.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.09 / chord.length, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2 + idx * 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(t);
      osc.stop(t + 1.5);
    });
  }

  private playCompassDetent(): void {
    const t = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(820, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.04);

    gain.gain.setValueAtTime(0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(t);
    osc.stop(t + 0.06);
  }

  private playCyberChord(): void {
    const t = this.ctx!.currentTime;
    const freqs = [329.63, 493.88, 659.25, 987.77];
    freqs.forEach((f) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, t);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.035, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(t);
      osc.stop(t + 0.65);
    });
  }

  /**
   * Deep pulsing bio-resonance surge when stimulating specimen elemental organ
   */
  public playBioResonance(type = 'normal'): void {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;

      // Sub harmonic pulse
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(82.4, t); // Low E
      subOsc.frequency.exponentialRampToValueAtTime(164.8, t + 0.35);
      subOsc.frequency.exponentialRampToValueAtTime(55, t + 0.9);

      subGain.gain.setValueAtTime(0.001, t);
      subGain.gain.linearRampToValueAtTime(0.28, t + 0.08);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.95);

      subOsc.connect(subGain);
      subGain.connect(this.masterGain);
      subOsc.start(t);
      subOsc.stop(t + 1.0);

      // Resonant harmonic sweep
      const sweepOsc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const sweepGain = this.ctx.createGain();

      sweepOsc.type = type.toLowerCase() === 'electric' ? 'sawtooth' : 'triangle';
      sweepOsc.frequency.setValueAtTime(220, t);
      sweepOsc.frequency.exponentialRampToValueAtTime(880, t + 0.25);
      sweepOsc.frequency.exponentialRampToValueAtTime(330, t + 0.8);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, t);
      filter.frequency.exponentialRampToValueAtTime(2400, t + 0.3);
      filter.frequency.exponentialRampToValueAtTime(500, t + 0.85);
      filter.Q.setValueAtTime(3.5, t);

      sweepGain.gain.setValueAtTime(0.001, t);
      sweepGain.gain.linearRampToValueAtTime(0.18, t + 0.05);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, t + 0.88);

      sweepOsc.connect(filter);
      filter.connect(sweepGain);
      sweepGain.connect(this.masterGain);

      sweepOsc.start(t);
      sweepOsc.stop(t + 0.9);
    } catch {
      // ignore
    }
  }

  /**
   * Tactile fossil chisel scrape / dusting sound
   */
  public playFossilChisel(): void {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;

      // Noise scraping burst
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.09);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400 + Math.random() * 600, t);
      filter.Q.setValueAtTime(2.2, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(t);

      // Chisel metallic tap
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950 + Math.random() * 250, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.04);

      oscGain.gain.setValueAtTime(0.12, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.05);
    } catch {
      // ignore
    }
  }

  /**
   * Harmonious discovery chord when fossil excavation reaches 100%
   */
  public playExcavationComplete(): void {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const t = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C major pentatonic
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.06);

        gain.gain.setValueAtTime(0.0001, t + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.08, t + idx * 0.06 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.06 + 0.8);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(t + idx * 0.06);
        osc.stop(t + idx * 0.06 + 0.85);
      });
    } catch {
      // ignore
    }
  }
}

export const chronoAudio = new ChronoAudioEngine();
