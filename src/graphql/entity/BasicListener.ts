import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm'
import { Log } from '@entity/log'
import { Container } from 'typedi'
import { LineMsg } from '@entity/LineMsg'
import { Record } from '@entity/record'

type AllEvent<T> = UpdateEvent<T> | InsertEvent<T> | RemoveEvent<T>

@EventSubscriber()
export class BasicEventSubscriber implements EntitySubscriberInterface<any> {
  oldEntity: any = null

  beforeInsert(event: InsertEvent<any>) {}
  async beforeUpdate(event: UpdateEvent<any>) {
    if (event.entity?.constructor.name === 'Record') {
      const recordRepo = event.manager.getRepository(Record)
      const oldRecord = await recordRepo.findOneOrFail(event.entity.id)
      this.oldEntity = oldRecord
    }
  }
  beforeSoftRemove(event: RemoveEvent<any>) {}
  beforeRemove(event: RemoveEvent<any>) {}

  async afterInsert(event: InsertEvent<any>) {
    if (event.entity && event.entity.constructor.name !== 'Object') {
      await this.addLog(event, 'INSERT')
      await this.pushLineMsg(event, 'INSERT')
    }
  }

  async afterUpdate(event: UpdateEvent<any>) {
    if (event.entity && event.entity.constructor.name !== 'Object') {
      await this.addLog(event, 'UPDATE')
      await this.pushLineMsg(event, 'UPDATE')
    }
  }

  async afterSoftRemove(event: RemoveEvent<any>) {
    if (event.entity && event.entity.constructor.name !== 'Object') {
      await this.addLog(event, 'SOFT_REMOVE')
      await this.pushLineMsg(event, 'SOFT_REMOVE')
    }
  }

  async afterRemove(event: RemoveEvent<any>) {
    if (event.entity && event.entity.constructor.name !== 'Object') {
      await this.addLog(event, 'REMOVE')
      await this.pushLineMsg(event, 'REMOVE')
    }
  }

  async addLog(event: AllEvent<any>, action: 'INSERT' | 'UPDATE' | 'SOFT_REMOVE' | 'REMOVE') {
    // decorator: InjectData (先在repo方法中加入data資訊)
    const data = event.queryRunner.data
    const entity = event.entity
    // LineLog不要紀錄!!
    if (entity.constructor.name === 'LineLog') return
    console.log('[addLog]', action, entity.constructor.name, data)
    if (data.ctx) {
      if (data.log) {
        const oldEntity = action === 'UPDATE' ? this.oldEntity : null
        const log = new Log(data.ctx, entity, oldEntity, action)
        const logRepo = event.manager.getRepository(Log)
        return await logRepo.save(log, { listeners: false })
      }
    }
  }

  async pushLineMsg(event: AllEvent<any>, action: 'INSERT' | 'UPDATE' | 'SOFT_REMOVE' | 'REMOVE') {
    const serviceName = `${event.entity.constructor.name}_LineMsg`
    let message
    try {
      message = Container.get(serviceName) as LineMsg<any>
    } catch (error) {
      // 找不到對應的 serviceName 時，進到這裡
    }
    if (message) {
      message.ctx = event.queryRunner.data.ctx
      message.entity = event.entity
      message.action = action
      message.manager = event.manager
      await message.push()
    }
  }
}
