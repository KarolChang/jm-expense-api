import { hamiApiHelper } from './config'

export default {
  getLiveUrl(code: string) {
    return hamiApiHelper.post(`?id=OTT_LIVE_000000${code}&freeProduct=0&_=2000000000000`)
  }
}
