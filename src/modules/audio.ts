interface AudiosType {
  [propName: string]: any
}
interface ProgressType {
  [propName: string]: any
}

export class AudioGlobal {
  private static _this: AudioGlobal = null

  public audios: AudiosType = null

  public audioCurr: any = null

  public progressMap: ProgressType = {}

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
  audiosInit(audioList: Array<string>, playProgressChangeCb: (progress: ProgressType) => void) {
    this.audios = {}
    this.audioCurr = null
    audioList.forEach((audio) => {
      this.audios[audio] = new Audio()
      const audioTemp = this.audios[audio]
      audioTemp.onload = () => {
        console.log('音频加载成功')
      }
      audioTemp.onerror = () => {
        console.log('音频加载失败')
      }

      this.progressMap[audio] = 0
      audioTemp.ontimeupdate = () => {
        const { currentTime, duration } = audioTemp
        const playProgress = `${(currentTime / duration) * 100}%`
        audioTemp.playProgress = playProgress
        this.progressMap[audio] = playProgress
        playProgressChangeCb({ ...this.progressMap })
      }
      audioTemp.src = audio
    })
  }

  // 播放具体src的音频
  audioPlay(src: string) {
    this.audios[src].play()
    this.audioCurr = this.audios[src]
  }
}
