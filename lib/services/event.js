import { head, isEmpty } from 'ramda'

export class EventService {
  constructor({
    mongoService,
    genId,
    log
  }) {
    this.mongoService = mongoService
    this.genId = genId
    this.log = log.child({
      service: 'event'
    })
  }

  async addEvent ({ event }) {
    try {
      this.log.info({ event }, 'Add Event: Start')

      const id = this.genId()

      const item = { id, ...event }

      const newEvent = await this.mongoService.add({
        item,
        collection: 'event'
      })

      this.log.info({ event: item }, 'Add Event: Success')

      return newEvent
    } catch (err) {
      this.log.error({ err }, 'Add Event: Fail')
      throw err
    }
  }

  async getEvents () {
    try {
      this.log.info('Get Events: Start')

      const events = await this.mongoService.fetch({
        collection: 'event'
      })

      if (isEmpty(events)) this.log.info('Get Events: Empty')

      return events
    } catch (err) {
      this.log.error({ err }, 'Get Events: Fail')
      throw err
    }
  }
}
