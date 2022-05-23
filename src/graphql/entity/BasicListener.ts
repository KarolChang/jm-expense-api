import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm'
import { Log } from '@entity/log'

type AllEvent<T> = UpdateEvent<T> | InsertEvent<T> | RemoveEvent<T>

@EventSubscriber()
export class BasicEventSubscriber implements EntitySubscriberInterface<any> {
  beforeInsert(event: InsertEvent<any>) {}
  beforeUpdate(event: UpdateEvent<any>) {}
  beforeSoftRemove(event: RemoveEvent<any>) {}
  beforeRemove(event: RemoveEvent<any>) {}

  async afterInsert(event: InsertEvent<any>) {
    if (event.entity && event.entity.constructor.name !== 'Object') {
      await this.addLog(event, 'INSERT')
    }
  }

  async afterUpdate(event: UpdateEvent<any>) {
    if (event.entity && event.entity.constructor.name !== 'Object') {
      await this.addLog(event, 'UPDATE')
    }
  }

  async afterSoftRemove(event: RemoveEvent<any>) {
    if (event.entity && event.entity.constructor.name !== 'Object') {
      await this.addLog(event, 'SOFT_REMOVE')
    }
  }

  async afterRemove(event: RemoveEvent<any>) {
    if (event.entity && event.entity.constructor.name !== 'Object') {
      await this.addLog(event, 'REMOVE')
    }
  }

  async addLog(event: AllEvent<any>, action: 'INSERT' | 'UPDATE' | 'SOFT_REMOVE' | 'REMOVE') {
    // decorator: InjectData (先在repo方法中加入data資訊)
    const data = event.queryRunner.data
    const entity = event.entity
    console.log('[addLog]data!!!', data)
    if (data.ctx) {
      if (data.log) {
        const log = new Log(data.ctx, entity, action)
        const logRepo = event.manager.getRepository(Log)
        return await logRepo.save(log)
      }
    }
  }
}
