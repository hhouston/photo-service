export class TeamService {
  constructor({
    mongoService
  }) {
    this.mongoService = mongoService
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
