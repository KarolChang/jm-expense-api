import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm'
import { Record } from '@entity/record'
import { ApolloError } from 'apollo-server-errors'
import { adminApp } from '@/firebase/index'
import { RecordLog, RecordLogInfo } from '@entity/recordLog'
import { RecordLogActionEnum } from '@/graphql/enum'

type AllEvent<T> = UpdateEvent<T> | InsertEvent<T> | RemoveEvent<T>

@EventSubscriber()
export class RecordEventSubscriber implements EntitySubscriberInterface<Record> {
  listenTo() {
    return Record
  }

  oldRecord: Record | null = null

  // async beforeInsert(event: InsertEvent<Record>) {}

  async beforeUpdate(event: UpdateEvent<Record>) {
    const recordRepo = event.manager.getRepository(Record)
    const oldRecord = await recordRepo.findOneOrFail(event.entity!.id)
    this.oldRecord = oldRecord
  }
  // beforeSoftRemove(event: RemoveEvent<User>) {}
  // beforeRemove(event: RemoveEvent<User>) {}
  afterInsert(event: InsertEvent<Record>) {
    this.addRecordLog(event, 'INSERT' as RecordLogActionEnum)
  }
  afterUpdate(event: UpdateEvent<Record>) {
    const fieldName = event.queryRunner.data.ctx.info.fieldName
    if(fieldName === 'saveRecord') {
      this.addRecordLog(event, 'UPDATE' as RecordLogActionEnum)
    } 
  }
  // afterSoftRemove(event: RemoveEvent<User>) {}
  // afterRemove(event: RemoveEvent<User>) {}

  async addRecordLog(event: AllEvent<any>, action: RecordLogActionEnum) {
    const info = {
      record_before: action === 'INSERT' ? null : this.oldRecord,
      record_after: event.entity
    } as RecordLogInfo
    const user = event.entity.user
    const records = [event.entity]
    const recordLog = new RecordLog(action, info, user, records)
    const recordLogRepo = event.manager.getRepository(RecordLog)
    return await recordLogRepo.save(recordLog, { listeners: false })
  }
}
