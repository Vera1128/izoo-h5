interface AudiosType {
  [propName: string]: any
}

export class AudioGlobal {
  private static _this: AudioGlobal = null

  public audios: AudiosType = null

  public audioCurr: any = null

  static getInstance(): AudioGlobal {
    if (!this._this) {
      this._this = new AudioGlobal()
    }
    return this._this
  }

  private constructor() {
    this.audios = {}
    this.audioCurr = null
  }

  // audio列表更新
  audiosInit(audioList: Array<string>) {
    this.audios = {}
    this.audioCurr = null
    audioList.forEach((audio) => {
      this.audios[audio] = new Audio()
      this.audios[audio].onload = () => {
        console.log('音频加载成功')
      }
      this.audios[audio].onerror = () => {
        console.log('音频加载失败')
      }
      this.audios[audio].src = audio
    })
  }

  // 播放具体src的音频
  audioPlay(src: string) {
    this.audios[src].play()
    this.audioCurr = this.audios[src]
  }
}
