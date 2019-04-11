export class TeamService {
  constructor({
    mongoService
  }) {
    this.mongoService = mongoService
  }

  async getTeamsByOrganization ({ orgId }) {
    const teams = await this.mongoService.fetch({
      collection: 'teams'
    })

    return teams
  }
}
