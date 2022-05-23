import { apiHelper, LineInput } from './config'

export default {
  push(data: LineInput) {
    return apiHelper.post('/push', data)
  }
}
