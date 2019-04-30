export class TeamService {
  constructor({
    mongoService,
    genId
  }) {
    this.mongoService = mongoService
    this.genId = genId
  }

  async addTeam ({ team }) {
    try {
      this.log.info({ data }, 'Add Team: Start')

      this.mongoService.add({ item: team, collection: 'team' })

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
