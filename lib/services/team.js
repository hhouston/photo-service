export class TeamService {
  constructor({
    mongoService,
    genId,
    log
  }) {
    this.mongoService = mongoService
    this.genId = genId
    this.log = log.child({
      service: 'team'
    })
  }

  async addTeam ({ team }) {
    try {
      this.log.info({ team }, 'Add Team: Start')

      const id = this.genId()
      const item = { id, ...team }

      const dbResp = await this.mongoService.add({
        item,
        collection: 'team'
      })

      this.log.info({ team: item }, 'Add Team: Success')

      return dbResp
    } catch (err) {
      this.log.error({ err }, 'Add Team: Fail')
      throw err
    }
  }

  async getTeamsByOrganization ({ orgId }) {
    // const teams = await this.mongoService.fetch({
    //   collection: 'teams'
    // })
    const teams = [
        {
          id: 1,
          name: "rip",
          thumbnail: "1234",
          roster: "1234"
      },
        {
          id: 1,
          name: "rip",
          thumbnail: "1234",
          roster: "1234"
      },
        {
          id: 1,
          name: "rip",
          thumbnail: "1234",
          roster: "1234"
      }
  ]
    return teams
  }
}
