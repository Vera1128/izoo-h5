import EventManager from 'src/modules/eventManager'
import { EventType } from 'src/modules/EventType'
import { notify } from '@tgu/toast'

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

  public continuousPlay: true // 是否连续播放

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
  audiosInit(audioList: Array<any>) {
    console.log('audioList', audioList)
    this.audios = {}
    this.audioCurr = null
    audioList.forEach((audio) => {
      this.audios[audio.subId] = new Audio()
      const audioTemp = this.audios[audio.subId]
      audioTemp.onload = () => {
        console.log('音频加载成功')
      }
      audioTemp.onerror = () => {
        console.log('音频加载失败')
      }

      this.progressMap[audio.subId] = {}
      audioTemp.ontimeupdate = () => {
        const { currentTime, duration } = audioTemp
        const playProgress = `${(currentTime / duration) * 100}%`
        audioTemp.playProgress = playProgress
        this.progressMap[audio.subId] = {
          currentTime,
          duration,
          progress: playProgress,
          isPlay: !audioTemp.paused,
        }
        EventManager.emit(EventType.AUDIO_PROGRESS_UPDATE, { ...this.progressMap })
      }
      audioTemp.src = audio.audioUri
    })
  }

  // 播放具体src的音频
  audioPlay(id: string) {
    if (!this.audios[id]) {
      notify('啊哦，音频地址出问题啦~', 1000)
      return
    }
    if (this.audioCurr?.id !== id) {
      this.audioCurr?.audio.pause()
      this.audioCurr = {
        id,
        audio: this.audios[id],
      }
      try {
        this.audioCurr?.audio.play()
      } catch (error) {
        notify('啊哦，音频播放出问题啦~', 1000)
      }
    } else {
      if (this.audioCurr?.audio.paused) {
        try {
          this.audioCurr?.audio.play()
        } catch (error) {
          notify('啊哦，音频播放出问题啦~', 1000)
        }
      } else {
        this.audioCurr?.audio.pause()
      }
    }
  }

  audioStop() {
    this.audioCurr?.audio.pause()
  }
}
