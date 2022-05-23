import axios from 'axios'

const baseURL = 'http://linebot20220114.herokuapp.com'

export const apiHelper = axios.create({
  baseURL
})

export interface Message {
  type: string
  text: string
}

export interface LineInput {
  to: string | string[]
  messages: Message | Message[]
}
