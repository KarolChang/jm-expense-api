import axios from 'axios'

const hamiURL = 'https://hamivideo.hinet.net/api/play.do'

export const hamiApiHelper = axios.create({
  baseURL: hamiURL,
  headers: { Cookie: process.env.HAMI_COOKIE!, Host: 'hamivideo.hinet.net' }
})
