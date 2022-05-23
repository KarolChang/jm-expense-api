import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm'
import { Event } from '@entity/event'

@EventSubscriber()
export class EventEventSubscriber implements EntitySubscriberInterface<Event> {
  listenTo() {
    return Event
  }

  beforeInsert(event: InsertEvent<Event>) {
    // const e = event.entity
    // console.log('beforeInsert-event', e)
  }
}
